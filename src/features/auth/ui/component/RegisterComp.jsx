/**
 * @file RegisterComp.jsx
 * @layer features/auth/ui/component
 * @description Presentational registration form component with validation and institution affiliation.
 */

import React from 'react';
import { useForm } from 'react-hook-form';
import { User, Mail, Lock, School, AlertCircle } from 'lucide-react';
import Button from '@/shared/ui/Button';

export const RegisterComp = ({ onSubmit, isLoading, errorMessage }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch('password');

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Create Account</h2>
        <p className="text-sm text-slate-500 mt-1">
          Join the SIH national assessment platform
        </p>
      </div>

      {errorMessage && (
        <div className="mb-5 p-3.5 bg-rose-50 border border-rose-200 rounded-lg flex items-center gap-2.5 text-rose-700 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <User className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Priya Sharma"
              {...register('name', { required: 'Full name is required' })}
              className="w-full pl-9 pr-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
          {errors.name && <p className="text-xs text-rose-600 mt-1">{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Mail className="w-4 h-4" />
            </div>
            <input
              type="email"
              placeholder="priya@college.edu"
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' },
              })}
              className="w-full pl-9 pr-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
          {errors.email && <p className="text-xs text-rose-600 mt-1">{errors.email.message}</p>}
        </div>

        {/* Institution */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
            College / Institution
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <School className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="National Institute of Technology"
              {...register('institution', { required: 'Institution is required' })}
              className="w-full pl-9 pr-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
          {errors.institution && <p className="text-xs text-rose-600 mt-1">{errors.institution.message}</p>}
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Lock className="w-4 h-4" />
            </div>
            <input
              type="password"
              placeholder="••••••••"
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Minimum 6 characters' },
              })}
              className="w-full pl-9 pr-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
          {errors.password && <p className="text-xs text-rose-600 mt-1">{errors.password.message}</p>}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
            Confirm Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Lock className="w-4 h-4" />
            </div>
            <input
              type="password"
              placeholder="••••••••"
              {...register('confirmPassword', {
                required: 'Please confirm password',
                validate: (value) => value === password || 'Passwords do not match',
              })}
              className="w-full pl-9 pr-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-xs text-rose-600 mt-1">{errors.confirmPassword.message}</p>
          )}
        </div>

        <Button
          type="submit"
          variant="primary"
          size="md"
          isLoading={isLoading}
          className="w-full mt-3"
        >
          Create Account
        </Button>
      </form>
    </div>
  );
};

export default RegisterComp;
