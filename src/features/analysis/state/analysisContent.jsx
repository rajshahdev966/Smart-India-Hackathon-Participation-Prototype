/**
 * @file analysisContent.jsx
 * @layer features/analysis/state
 * @description Redux Toolkit slice managing individual quiz performance results,
 * category breakdown scores, and question-by-question review items.
 */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentAnalysis: null,
  isLoading: false,
  error: null,
};

export const analysisSlice = createSlice({
  name: 'analysis',
  initialState,
  reducers: {
    fetchAnalysisStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchAnalysisSuccess: (state, action) => {
      state.isLoading = false;
      state.currentAnalysis = action.payload;
    },
    fetchAnalysisFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    clearAnalysis: (state) => {
      state.currentAnalysis = null;
    },
  },
});

export const {
  fetchAnalysisStart,
  fetchAnalysisSuccess,
  fetchAnalysisFailure,
  clearAnalysis,
} = analysisSlice.actions;

export const selectCurrentAnalysis = (state) => state.analysis.currentAnalysis;
export const selectAnalysisLoading = (state) => state.analysis.isLoading;
export const selectAnalysisError = (state) => state.analysis.error;

export default analysisSlice.reducer;
