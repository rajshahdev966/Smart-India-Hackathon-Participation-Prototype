/**
 * @file quesApi.jsx
 * @layer features/quiz/api
 * @description API service to fetch assessment questions, topics, and question metadata.
 */

import axiosInstance from '@/config/axiosInstance';
import { MOCK_QUESTIONS, simulateNetworkDelay } from '@/shared/api/mockData';

/**
 * Fetches assessment questions for a particular test track or module.
 * @param {string} courseId - Course module ID
 * @returns {Promise<Array>} Array of question objects
 */
export const getQuestionsApi = async (courseId = 'cs_core') => {
  try {
    // If backend is active:
    // const response = await axiosInstance.get(`/courses/${courseId}/questions`);
    // return response.data;

    // Simulate network response
    await simulateNetworkDelay(450);
    return [...MOCK_QUESTIONS];
  } catch (error) {
    throw error.response?.data?.message || error.message || 'Failed to load assessment questions.';
  }
};

/**
 * Fetches a single question detail by ID
 * @param {number|string} questionId
 */
export const getQuestionByIdApi = async (questionId) => {
  try {
    await simulateNetworkDelay(200);
    const question = MOCK_QUESTIONS.find((q) => q.id === Number(questionId));
    if (!question) throw new Error('Question not found');
    return question;
  } catch (error) {
    throw error.message || 'Failed to load question details.';
  }
};
