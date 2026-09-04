/**
 * @file LoginApi.jsx
 * @layer features/auth/api
 * @description Authentication API service functions for login, registration, and logout operations.
 * Applies input sanitization against XSS and manages mock token issuance.
 */

import axiosInstance from '@/config/axiosInstance';
import { MOCK_USER, simulateNetworkDelay } from '@/shared/api/mockData';
import { sanitizeInput } from '@/shared/utils/security';

/**
 * Authenticates user credentials.
 * @param {Object} credentials - { email, password }
 * @returns {Promise<{ user: Object, token: string }>}
 */
export const loginUserApi = async (credentials) => {
  try {
    // Sanitize credentials
    const cleanEmail = sanitizeInput(credentials.email);

    // Simulated API call with realistic network latency
    await simulateNetworkDelay(500);

    if (credentials.password === 'wrongpassword') {
      throw new Error('Invalid email or password credentials.');
    }

    return {
      user: {
        ...MOCK_USER,
        email: cleanEmail || MOCK_USER.email,
        name: cleanEmail ? cleanEmail.split('@')[0] : MOCK_USER.name,
      },
      token: 'jwt_mock_token_sih2026_authorized_session',
    };
  } catch (error) {
    throw error.response?.data?.message || error.message || 'Login request failed.';
  }
};

/**
 * Registers a new user account.
 * @param {Object} userData - { name, email, password, institution }
 * @returns {Promise<{ user: Object, token: string }>}
 */
export const registerUserApi = async (userData) => {
  try {
    // Sanitize user inputs
    const cleanName = sanitizeInput(userData.name);
    const cleanEmail = sanitizeInput(userData.email);
    const cleanInstitution = sanitizeInput(userData.institution);

    await simulateNetworkDelay(600);

    return {
      user: {
        ...MOCK_USER,
        name: cleanName || 'New Student',
        email: cleanEmail,
        institution: cleanInstitution || 'Engineering College',
      },
      token: 'jwt_mock_token_sih2026_new_user',
    };
  } catch (error) {
    throw error.response?.data?.message || error.message || 'Registration request failed.';
  }
};

/**
 * Logs out the active session.
 */
export const logoutUserApi = async () => {
  try {
    await simulateNetworkDelay(200);
    return { success: true };
  } catch (error) {
    console.error('Logout error:', error);
    return { success: false };
  }
};
