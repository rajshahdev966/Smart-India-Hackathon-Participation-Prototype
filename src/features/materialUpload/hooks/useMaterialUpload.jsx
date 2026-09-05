/**
 * @file useMaterialUpload.jsx
 * @layer features/materialUpload/hooks
 * @description Custom hook coordinating document validation, text extraction,
 * grounded AI MCQ generation, and launching customized assessments.
 */

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  startExtraction,
  extractionSuccess,
  extractionFailure,
  startGeneration,
  generationSuccess,
  generationFailure,
  resetMaterialState,
  selectUploadedFile,
  selectExtractedText,
  selectIsExtracting,
  selectIsGenerating,
  selectGeneratedQuestions,
  selectGroundingConfidence,
  selectMaterialError,
  selectMaterial,
} from '../state/materialSlice';
import { extractDocumentTextApi, generateGroundedMCQsApi, validateLearningMaterialFile } from '../api/materialApi';
import { loadCustomQuestions } from '@/features/quiz/state/quesList';
import { useAppContext } from '@/context/AppContext';

export const useMaterialUpload = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { notify } = useAppContext();

  const materialState = useSelector(selectMaterial);
  const uploadedFile = useSelector(selectUploadedFile);
  const extractedText = useSelector(selectExtractedText);
  const isExtracting = useSelector(selectIsExtracting);
  const isGenerating = useSelector(selectIsGenerating);
  const generatedQuestions = useSelector(selectGeneratedQuestions);
  const groundingConfidence = useSelector(selectGroundingConfidence);
  const error = useSelector(selectMaterialError);

  /**
   * Validates and extracts text from an uploaded file
   */
  const processFile = async (file) => {
    const check = validateLearningMaterialFile(file);
    if (!check.isValid) {
      dispatch(extractionFailure(check.error));
      notify(check.error, 'error');
      return { success: false, error: check.error };
    }

    dispatch(startExtraction());
    try {
      const result = await extractDocumentTextApi(file);
      dispatch(
        extractionSuccess({
          file: {
            name: file.name,
            size: (file.size / 1024).toFixed(1) + ' KB',
            type: file.type || 'document',
          },
          text: result.text,
          wordCount: result.wordCount,
        })
      );
      notify(`Successfully extracted ${result.wordCount} words from "${file.name}"`, 'success');
      return { success: true, data: result };
    } catch (err) {
      const errMsg = err.message || 'Failed to process the uploaded learning document.';
      dispatch(extractionFailure(errMsg));
      notify(errMsg, 'error');
      return { success: false, error: errMsg };
    }
  };

  /**
   * Generates grounded MCQs using AI based on the extracted text
   */
  const generateQuestions = async ({ questionCount = 5, difficulty = 'Medium' } = {}) => {
    if (!extractedText) {
      notify('Please upload learning material before generating an assessment.', 'warning');
      return { success: false };
    }

    dispatch(startGeneration());
    try {
      const result = await generateGroundedMCQsApi({
        text: extractedText,
        title: uploadedFile?.name || 'Document',
        questionCount,
        difficulty,
      });

      dispatch(
        generationSuccess({
          questions: result.questions,
          groundingConfidence: result.groundingConfidence,
          sourceSummary: result.sourceSummary,
        })
      );
      notify(`Generated ${result.questions.length} grounded questions with ${result.groundingConfidence}% grounding confidence!`, 'success');
      return { success: true, data: result };
    } catch (err) {
      const errMsg = err.message || 'AI MCQ Generation failed. Please try again.';
      dispatch(generationFailure(errMsg));
      notify(errMsg, 'error');
      return { success: false, error: errMsg };
    }
  };

  /**
   * Loads the generated questions into the assessment engine and navigates to the exam
   */
  const launchAssessment = () => {
    if (!generatedQuestions || generatedQuestions.length === 0) {
      notify('No generated questions available to launch.', 'warning');
      return;
    }

    // Sanitize questions for public test-taker mode (strip correctAnswer to prevent DevTools cheating)
    const publicQuestions = generatedQuestions.map(
      ({ correctAnswer, explanation, ...publicFields }) => publicFields
    );

    dispatch(loadCustomQuestions(publicQuestions));
    notify('Starting proctored assessment on your custom material...', 'info');
    navigate('/quiz');
  };

  const reset = () => {
    dispatch(resetMaterialState());
  };

  return {
    uploadedFile,
    extractedText,
    wordCount: materialState?.wordCount || 0,
    isExtracting,
    isGenerating,
    generatedQuestions,
    groundingConfidence,
    sourceSummary: materialState?.sourceSummary,
    error,
    processFile,
    generateQuestions,
    launchAssessment,
    reset,
  };
};

export default useMaterialUpload;
