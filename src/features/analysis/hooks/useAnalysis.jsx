/**
 * @file useAnalysis.jsx
 * @layer features/analysis/hooks
 * @description Custom hook coordinating loading and computing single assessment analysis metrics.
 * Ensures the latest test results are retrieved whenever the page is mounted.
 */

import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAnalysisStart,
  fetchAnalysisSuccess,
  fetchAnalysisFailure,
  selectCurrentAnalysis,
  selectAnalysisLoading,
  selectAnalysisError,
} from '../state/analysisContent';
import { getQuizAnalysisApi } from '../api/AnalysisApi';

export const useAnalysis = (quizId = 'quiz_tech_assessment_01') => {
  const dispatch = useDispatch();
  const analysis = useSelector(selectCurrentAnalysis);
  const isLoading = useSelector(selectAnalysisLoading);
  const error = useSelector(selectAnalysisError);

  const loadAnalysis = useCallback(async () => {
    dispatch(fetchAnalysisStart());
    try {
      const data = await getQuizAnalysisApi(quizId);
      dispatch(fetchAnalysisSuccess(data));
    } catch (err) {
      dispatch(fetchAnalysisFailure(err.toString()));
    }
  }, [quizId, dispatch]);

  useEffect(() => {
    loadAnalysis();
  }, [loadAnalysis]);

  return {
    analysis,
    isLoading,
    error,
    reloadAnalysis: loadAnalysis,
  };
};

export default useAnalysis;
