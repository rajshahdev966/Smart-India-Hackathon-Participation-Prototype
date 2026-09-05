/**
 * @file authSlices.jsx
 * @layer features/auth/state
 * @description Redux Toolkit slice managing authentication status, JWT token persistence,
 * authenticated user profile, and authentication errors.
 */

import { createSlice } from '@reduxjs/toolkit';
import { MOCK_USER } from '@/shared/api/mockData';
import { isValidTokenFormat } from '@/shared/utils/security';

// Read token from localStorage and validate structure
const storedToken = localStorage.getItem('sih_auth_token');
const hasValidSession = Boolean(storedToken && isValidTokenFormat(storedToken));

const initialState = {
  user: hasValidSession ? MOCK_USER : null,
  token: hasValidSession ? storedToken : null,
  isAuthenticated: hasValidSession,
  isLoading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Start login or registration async request
    authRequestStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    // Authentication succeeded
    authSuccess: (state, action) => {
      const { user, token } = action.payload;
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = user;
      state.token = token;
      state.error = null;
      // Persist valid token in browser
      if (token && isValidTokenFormat(token)) {
        localStorage.setItem('sih_auth_token', token);
      }
    },
    // Authentication failed
    authFailure: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.error = action.payload;
      localStorage.removeItem('sih_auth_token');
    },
    // User logged out
    authLogout: (state) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem('sih_auth_token');
    },
    // Clear any transient error messages
    clearAuthError: (state) => {
      state.error = null;
    },
  },
});

export const {
  authRequestStart,
  authSuccess,
  authFailure,
  authLogout,
  clearAuthError,
} = authSlice.actions;

// Selectors for consuming auth state across components
export const selectAuth = (state) => state.auth;
export const selectCurrentUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthLoading = (state) => state.auth.isLoading;
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;
