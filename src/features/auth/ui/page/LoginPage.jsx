/**
 * @file LoginPage.jsx
 * @layer features/auth/ui/page
 * @description Page view orchestrating the LoginComp form, consuming the useAuth custom hook,
 * and navigating upon successful authentication.
 */

import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import LoginComp from '../component/LoginComp';
import { useAuth } from '../../hooks/authHooks';
import { useAppContext } from '@/context/AppContext';

export const LoginPage = () => {
  const { login, isLoading, error } = useAuth();
  const { notify } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect to previously intended destination or dashboard
  const destination = location.state?.from?.pathname || '/';

  const handleLoginSubmit = async (data) => {
    const result = await login(data);
    if (result.success) {
      notify('Logged in successfully!', 'success');
      navigate(destination, { replace: true });
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-12 bg-slate-50">
      <div className="w-full max-w-md">
        <LoginComp
          onSubmit={handleLoginSubmit}
          isLoading={isLoading}
          errorMessage={error}
        />
        <p className="text-center text-xs text-slate-500 mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-500">
            Sign up now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
