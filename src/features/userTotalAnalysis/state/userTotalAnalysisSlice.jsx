/**
 * @file userTotalAnalysisSlice.jsx
 * @layer features/userTotalAnalysis/state
 * @description Redux slice tracking user's cumulative multi-test analytics, historical trends,
 * percentile rank, and subject mastery matrices.
 */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalData: null,
  isLoading: false,
  error: null,
};

export const userTotalAnalysisSlice = createSlice({
  name: 'userTotalAnalysis',
  initialState,
  reducers: {
    fetchTotalAnalysisStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchTotalAnalysisSuccess: (state, action) => {
      state.isLoading = false;
      state.totalData = action.payload;
    },
    fetchTotalAnalysisFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchTotalAnalysisStart,
  fetchTotalAnalysisSuccess,
  fetchTotalAnalysisFailure,
} = userTotalAnalysisSlice.actions;

export const selectTotalAnalysisData = (state) => state.userTotalAnalysis.totalData;
export const selectTotalAnalysisLoading = (state) => state.userTotalAnalysis.isLoading;
export const selectTotalAnalysisError = (state) => state.userTotalAnalysis.error;

export default userTotalAnalysisSlice.reducer;
