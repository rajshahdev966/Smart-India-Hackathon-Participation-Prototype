/**
 * @file RegisterPage.jsx
 * @layer features/auth/ui/page
 * @description Page view orchestrating the RegisterComp form, connecting to useAuth custom hook.
 */

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RegisterComp from '../component/RegisterComp';
import { useAuth } from '../../hooks/authHooks';
import { useAppContext } from '@/context/AppContext';

export const RegisterPage = () => {
  const { register: registerUser, isLoading, error } = useAuth();
  const { notify } = useAppContext();
  const navigate = useNavigate();

  const handleRegisterSubmit = async (formData) => {
    const result = await registerUser(formData);
    if (result.success) {
      notify('Registration complete! Welcome aboard.', 'success');
      navigate('/', { replace: true });
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-12 bg-slate-50">
      <div className="w-full max-w-md">
        <RegisterComp
          onSubmit={handleRegisterSubmit}
          isLoading={isLoading}
          errorMessage={error}
        />
        <p className="text-center text-xs text-slate-500 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
