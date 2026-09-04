/**
 * @file LoginComp.jsx
 * @layer features/auth/ui/component
 * @description Presentational login form component with validation and error states using react-hook-form.
 */

import React from 'react';
import { useForm } from 'react-hook-form';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import Button from '@/shared/ui/Button';

export const LoginComp = ({ onSubmit, isLoading, errorMessage }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: 'alex.johnson@example.com',
      password: 'password123',
    },
  });

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Welcome Back</h2>
        <p className="text-sm text-slate-500 mt-1">
          Log in to continue your assessment journey
        </p>
      </div>

      {errorMessage && (
        <div className="mb-5 p-3.5 bg-rose-50 border border-rose-200 rounded-lg flex items-center gap-2.5 text-rose-700 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email Field */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Mail className="w-4 h-4" />
            </div>
            <input
              type="email"
              placeholder="you@institution.edu"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Please enter a valid email address',
                },
              })}
              className="w-full pl-9 pr-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            />
          </div>
          {errors.email && (
            <p className="text-xs text-rose-600 mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Password
            </label>
            <span className="text-xs text-indigo-600 hover:underline cursor-pointer">
              Forgot?
            </span>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Lock className="w-4 h-4" />
            </div>
            <input
              type="password"
              placeholder="••••••••"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
              className="w-full pl-9 pr-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            />
          </div>
          {errors.password && (
            <p className="text-xs text-rose-600 mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* Submit button */}
        <Button
          type="submit"
          variant="primary"
          size="md"
          isLoading={isLoading}
          className="w-full mt-2"
        >
          Sign In
        </Button>
      </form>
    </div>
  );
};

export default LoginComp;
