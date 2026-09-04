/**
 * @file useUserTotalAnalysis.jsx
 * @layer features/userTotalAnalysis/hooks
 * @description Custom hook coordinating cumulative analytics data fetch and selector extraction.
 * Refreshes aggregate timeline and percentile rank when accessed.
 */

import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchTotalAnalysisStart,
  fetchTotalAnalysisSuccess,
  fetchTotalAnalysisFailure,
  selectTotalAnalysisData,
  selectTotalAnalysisLoading,
  selectTotalAnalysisError,
} from '../state/userTotalAnalysisSlice';
import { getUserTotalAnalysisApi } from '../api/userTotalAnalysisApi';

export const useUserTotalAnalysis = (userId = 'usr_101') => {
  const dispatch = useDispatch();
  const totalData = useSelector(selectTotalAnalysisData);
  const isLoading = useSelector(selectTotalAnalysisLoading);
  const error = useSelector(selectTotalAnalysisError);

  const loadTotalAnalysis = useCallback(async () => {
    dispatch(fetchTotalAnalysisStart());
    try {
      const data = await getUserTotalAnalysisApi(userId);
      dispatch(fetchTotalAnalysisSuccess(data));
    } catch (err) {
      dispatch(fetchTotalAnalysisFailure(err.toString()));
    }
  }, [userId, dispatch]);

  useEffect(() => {
    loadTotalAnalysis();
  }, [loadTotalAnalysis]);

  return {
    totalData,
    isLoading,
    error,
    reloadTotalAnalysis: loadTotalAnalysis,
  };
};

export default useUserTotalAnalysis;
