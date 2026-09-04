/**
 * @file authHooks.jsx
 * @layer features/auth/hooks
 * @description Custom React hook providing authentication methods and reactive state to UI components.
 * Bridges the Auth State slice and the Auth API layer.
 */

import { useDispatch, useSelector } from 'react-redux';
import {
  authRequestStart,
  authSuccess,
  authFailure,
  authLogout,
  clearAuthError,
  selectCurrentUser,
  selectIsAuthenticated,
  selectAuthLoading,
  selectAuthError,
} from '../state/authSlices';
import { loginUserApi, registerUserApi, logoutUserApi } from '../api/LoginApi';

export const useAuth = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isLoading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  /**
   * Executes login workflow
   */
  const login = async (credentials) => {
    dispatch(authRequestStart());
    try {
      const response = await loginUserApi(credentials);
      dispatch(authSuccess(response));
      return { success: true, data: response };
    } catch (err) {
      dispatch(authFailure(err.toString()));
      return { success: false, error: err };
    }
  };

  /**
   * Executes registration workflow
   */
  const register = async (userData) => {
    dispatch(authRequestStart());
    try {
      const response = await registerUserApi(userData);
      dispatch(authSuccess(response));
      return { success: true, data: response };
    } catch (err) {
      dispatch(authFailure(err.toString()));
      return { success: false, error: err };
    }
  };

  /**
   * Executes logout workflow
   */
  const logout = async () => {
    await logoutUserApi();
    dispatch(authLogout());
  };

  /**
   * Clears transient errors
   */
  const clearError = () => {
    dispatch(clearAuthError());
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    clearError,
  };
};

export default useAuth;
