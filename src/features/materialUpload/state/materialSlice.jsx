/**
 * @file materialSlice.jsx
 * @layer features/materialUpload/state
 * @description Redux slice managing learning material upload status, document extraction,
 * and AI-grounded MCQ generation state.
 */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  uploadedFile: null, // { name, size, type }
  extractedText: '',
  wordCount: 0,
  isExtracting: false,
  isGenerating: false,
  generatedQuestions: [],
  groundingConfidence: 0,
  sourceSummary: '',
  error: null,
};

export const materialSlice = createSlice({
  name: 'material',
  initialState,
  reducers: {
    startExtraction: (state) => {
      state.isExtracting = true;
      state.error = null;
    },
    extractionSuccess: (state, action) => {
      const { file, text, wordCount } = action.payload;
      state.isExtracting = false;
      state.uploadedFile = file;
      state.extractedText = text;
      state.wordCount = wordCount;
      state.error = null;
    },
    extractionFailure: (state, action) => {
      state.isExtracting = false;
      state.error = action.payload;
    },
    startGeneration: (state) => {
      state.isGenerating = true;
      state.error = null;
    },
    generationSuccess: (state, action) => {
      const { questions, groundingConfidence, sourceSummary } = action.payload;
      state.isGenerating = false;
      state.generatedQuestions = questions;
      state.groundingConfidence = groundingConfidence;
      state.sourceSummary = sourceSummary;
      state.error = null;
    },
    generationFailure: (state, action) => {
      state.isGenerating = false;
      state.error = action.payload;
    },
    resetMaterialState: () => initialState,
  },
});

export const {
  startExtraction,
  extractionSuccess,
  extractionFailure,
  startGeneration,
  generationSuccess,
  generationFailure,
  resetMaterialState,
} = materialSlice.actions;

export const selectMaterial = (state) => state.material;
export const selectUploadedFile = (state) => state.material?.uploadedFile;
export const selectExtractedText = (state) => state.material?.extractedText;
export const selectIsExtracting = (state) => state.material?.isExtracting;
export const selectIsGenerating = (state) => state.material?.isGenerating;
export const selectGeneratedQuestions = (state) => state.material?.generatedQuestions;
export const selectGroundingConfidence = (state) => state.material?.groundingConfidence;
export const selectMaterialError = (state) => state.material?.error;

export default materialSlice.reducer;
