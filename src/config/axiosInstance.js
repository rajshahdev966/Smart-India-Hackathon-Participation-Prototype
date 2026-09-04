/**
 * @file axiosInstance.js
 * @description Centralized Axios HTTP client instance configured with base URLs, 
 * request/response interceptors for JWT token injection and centralized error handling.
 */

import axios from 'axios';

// Base URL can be configured via environment variable VITE_API_BASE_URL or fallback to local mock API
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.sih2026.internal';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

/**
 * Request Interceptor
 * Injects bearer token into Authorization headers if present in localStorage.
 */
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('sih_auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 * Centralizes error responses (e.g. 401 Unauthorized token expirations).
 */
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear token and handle unauthorized redirect if required
      localStorage.removeItem('sih_auth_token');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
