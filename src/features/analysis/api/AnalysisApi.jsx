/**
 * @file AnalysisApi.jsx
 * @layer features/analysis/api
 * @description API service to fetch detailed evaluation metrics for a completed quiz attempt.
 * Retrieves student's actual latest attempt from local storage cache or falls back to mock baseline.
 */

import axiosInstance from '@/config/axiosInstance';
import { MOCK_SINGLE_ANALYSIS, simulateNetworkDelay } from '@/shared/api/mockData';

/**
 * Fetches analysis details for a given quiz attempt.
 * @param {string} quizId
 * @returns {Promise<Object>}
 */
export const getQuizAnalysisApi = async (quizId = 'quiz_tech_assessment_01') => {
  try {
    // If backend is active:
    // const response = await axiosInstance.get(`/quiz/analysis/${quizId}`);
    // return response.data;

    await simulateNetworkDelay(400);

    // Check if the user has an actual recent test attempt saved in localStorage
    const savedAnalysis = localStorage.getItem('sih_latest_quiz_analysis');
    if (savedAnalysis) {
      try {
        return JSON.parse(savedAnalysis);
      } catch (e) {
        console.warn('Failed to parse saved analysis, falling back to mock data');
      }
    }

    return { ...MOCK_SINGLE_ANALYSIS };
  } catch (error) {
    throw error.response?.data?.message || error.message || 'Failed to fetch assessment analysis.';
  }
};
