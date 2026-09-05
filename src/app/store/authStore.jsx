/**
 * @file authStore.jsx
 * @layer app/store
 * @description Central Redux Toolkit store configuring reducers for auth, quiz sessions,
 * single assessment analysis, and cumulative user analytics.
 */

import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/features/auth/state/authSlices';
import quizReducer from '@/features/quiz/state/quesList';
import analysisReducer from '@/features/analysis/state/analysisContent';
import userTotalAnalysisReducer from '@/features/userTotalAnalysis/state/userTotalAnalysisSlice';
import sharedReducer from '@/shared/state/sharedSlice';
import materialReducer from '@/features/materialUpload/state/materialSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    quiz: quizReducer,
    analysis: analysisReducer,
    userTotalAnalysis: userTotalAnalysisReducer,
    shared: sharedReducer,
    material: materialReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
