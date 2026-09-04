/**
 * @file useQues.jsx
 * @layer features/quiz/hooks
 * @description Custom hook coordinating question loading, option selection, palette navigation,
 * and test submission logic.
 */

import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchQuestionsStart,
  fetchQuestionsSuccess,
  fetchQuestionsFailure,
  setCurrentQuestionIndex,
  selectOptionAnswer,
  toggleMarkForReview,
  clearCurrentAnswer,
  resetQuizSession,
  submitQuizStart,
  submitQuizSuccess,
  submitQuizFailure,
  selectQuestions,
  selectCurrentIndex,
  selectCurrentQuestion,
  selectUserAnswers,
  selectMarkedForReview,
  selectQuizLoading,
  selectQuizSubmitting,
  selectSubmissionResult,
} from '../state/quesList';
import { getQuestionsApi } from '../api/quesApi';
import { submitAnswersApi } from '../api/ansApi';

export const useQues = (courseId = 'cs_core') => {
  const dispatch = useDispatch();

  const questions = useSelector(selectQuestions);
  const currentIndex = useSelector(selectCurrentIndex);
  const currentQuestion = useSelector(selectCurrentQuestion);
  const userAnswers = useSelector(selectUserAnswers);
  const markedForReview = useSelector(selectMarkedForReview);
  const isLoading = useSelector(selectQuizLoading);
  const isSubmitting = useSelector(selectQuizSubmitting);
  const submissionResult = useSelector(selectSubmissionResult);

  // Load questions on mount if empty
  const loadQuestions = useCallback(async () => {
    dispatch(fetchQuestionsStart());
    try {
      const data = await getQuestionsApi(courseId);
      dispatch(fetchQuestionsSuccess(data));
    } catch (err) {
      dispatch(fetchQuestionsFailure(err.toString()));
    }
  }, [courseId, dispatch]);

  useEffect(() => {
    if (questions.length === 0) {
      loadQuestions();
    }
  }, [questions.length, loadQuestions]);

  // Navigate to specific index
  const goToQuestion = (index) => {
    dispatch(setCurrentQuestionIndex(index));
  };

  // Next and Previous navigation
  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      dispatch(setCurrentQuestionIndex(currentIndex + 1));
    }
  };

  const prevQuestion = () => {
    if (currentIndex > 0) {
      dispatch(setCurrentQuestionIndex(currentIndex - 1));
    }
  };

  // Answer selection
  const chooseOption = (optionId) => {
    if (!currentQuestion) return;
    dispatch(
      selectOptionAnswer({
        questionId: currentQuestion.id,
        optionId,
      })
    );
  };

  // Toggle mark for review
  const toggleReview = () => {
    if (!currentQuestion) return;
    dispatch(toggleMarkForReview(currentQuestion.id));
  };

  // Clear answer for current question
  const clearAnswer = () => {
    if (!currentQuestion) return;
    dispatch(clearCurrentAnswer(currentQuestion.id));
  };

  // Reset entire quiz session for a retake
  const resetQuiz = () => {
    dispatch(resetQuizSession());
  };

  // Submit test
  const submitQuiz = async (timeSpentSeconds = 300) => {
    dispatch(submitQuizStart());
    try {
      const result = await submitAnswersApi({
        answers: userAnswers,
        timeSpentSeconds,
      });
      dispatch(submitQuizSuccess(result));
      return { success: true, result };
    } catch (err) {
      dispatch(submitQuizFailure(err.toString()));
      return { success: false, error: err };
    }
  };

  // Helper stats for palette
  const answeredCount = Object.keys(userAnswers).length;
  const markedCount = markedForReview.length;
  const totalCount = questions.length;

  return {
    questions,
    currentIndex,
    currentQuestion,
    userAnswers,
    markedForReview,
    isLoading,
    isSubmitting,
    submissionResult,
    answeredCount,
    markedCount,
    totalCount,
    goToQuestion,
    nextQuestion,
    prevQuestion,
    chooseOption,
    toggleReview,
    clearAnswer,
    resetQuiz,
    submitQuiz,
    reloadQuestions: loadQuestions,
  };
};

export default useQues;
