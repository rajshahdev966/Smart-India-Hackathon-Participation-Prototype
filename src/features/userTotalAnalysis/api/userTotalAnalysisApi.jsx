/**
 * @file userTotalAnalysisApi.jsx
 * @layer features/userTotalAnalysis/api
 * @description API service to fetch student's historical assessments, performance trends,
 * and weakness/strength profiles from persistent local storage or baseline data.
 */

import axiosInstance from '@/config/axiosInstance';
import { MOCK_TOTAL_ANALYSIS, simulateNetworkDelay } from '@/shared/api/mockData';

/**
 * Fetches the user's cumulative analytics across all historical assessments.
 * @param {string} userId
 * @returns {Promise<Object>}
 */
export const getUserTotalAnalysisApi = async (userId = 'usr_101') => {
  try {
    // If backend is active:
    // const response = await axiosInstance.get(`/users/${userId}/analytics`);
    // return response.data;

    await simulateNetworkDelay(400);

    // Retrieve dynamically updated cumulative state if available
    const savedTotal = localStorage.getItem('sih_user_total_analysis');
    if (savedTotal) {
      try {
        return JSON.parse(savedTotal);
      } catch (e) {
        console.warn('Failed to parse saved total analysis, falling back');
      }
    }

    return { ...MOCK_TOTAL_ANALYSIS };
  } catch (error) {
    throw error.response?.data?.message || error.message || 'Failed to fetch user cumulative analytics.';
  }
};
