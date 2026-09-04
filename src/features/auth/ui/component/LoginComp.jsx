/**
 * @file LoginComp.jsx
 * @layer features/auth/ui/component
 * @description KarmaLearn India login component with OTP/Password tabs and Parichay instructions matching UI design.
 */

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Mail, Lock, AlertCircle, ShieldCheck, CheckSquare, Square, RefreshCw, KeyRound } from 'lucide-react';
import Button from '@/shared/ui/Button';

export const LoginComp = ({ onSubmit, isLoading, errorMessage }) => {
  const [activeTab, setActiveTab] = useState('password'); // 'otp' | 'password'
  const [recaptchaChecked, setRecaptchaChecked] = useState(true);

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
    <div className="w-full max-w-4xl bg-white rounded-2xl border border-slate-200/90 shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12">
      {/* Left Column: How to Login Graphical Guidance (Screenshot 3) */}
      <div className="md:col-span-6 bg-gradient-to-br from-[#0F2942] via-[#0A1E33] to-[#04111E] text-white p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
        {/* Background watermark */}
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-sky-500/10 rounded-full blur-2xl pointer-events-none"></div>

        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-[11px] font-semibold mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Official Authentication</span>
          </div>

          <h3 className="text-xl font-bold tracking-tight text-white">
            Welcome to iGOT Karmayogi
          </h3>
          <p className="text-xs text-sky-200 font-medium mt-0.5 mb-6">
            How To Login
          </p>

          <div className="space-y-4 text-xs text-slate-300">
            {/* Step 1 */}
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center shrink-0 text-[11px]">
                1
              </span>
              <div>
                <span className="font-semibold text-white">Logging in with Email ID:</span>
                <p className="mt-0.5 text-slate-400 text-[11px] leading-relaxed">
                  In case of session timeout, clear browser cache or open an incognito window.
                  Use your registered institutional credentials.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center shrink-0 text-[11px]">
                2
              </span>
              <div>
                <span className="font-semibold text-white">Logging in with Parichay (SSO):</span>
                <p className="mt-0.5 text-slate-400 text-[11px] leading-relaxed">
                  Ensure all open Parichay browser tabs are refreshed. Authenticate via mobile OTP
                  linked to Jan Parichay.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Parichay Badge */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
          <span className="font-semibold text-amber-400">PARICHAY</span>
          <span>National Single Sign-On</span>
        </div>
      </div>

      {/* Right Column: Form (Screenshot 3) */}
      <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-center">
        <div className="mb-6">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Karma<span className="text-sky-600">Learn</span> India
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Access your continuous capacity building dashboard
          </p>
        </div>

        {/* Tab Switcher: Login with OTP vs Login with Password */}
        <div className="grid grid-cols-2 bg-slate-100 p-1 rounded-lg text-xs font-semibold mb-5">
          <button
            type="button"
            onClick={() => setActiveTab('otp')}
            className={`py-2 rounded-md transition-all ${
              activeTab === 'otp'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Login with OTP
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('password')}
            className={`py-2 rounded-md transition-all ${
              activeTab === 'password'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Login with Password
          </button>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-lg flex items-center gap-2 text-rose-700 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Address */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                placeholder="Enter your email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Please enter a valid email address',
                  },
                })}
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
              />
            </div>
            {errors.email && (
              <p className="text-[11px] text-rose-600 mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password or OTP Field */}
          {activeTab === 'password' ? (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-700">
                  Password
                </label>
                <span className="text-[11px] text-sky-600 hover:underline cursor-pointer">
                  Forgot Password?
                </span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  placeholder="Enter your password"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters',
                    },
                  })}
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
                />
              </div>
              {errors.password && (
                <p className="text-[11px] text-rose-600 mt-1">{errors.password.message}</p>
              )}
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-700">
                  One-Time Password (OTP)
                </label>
                <button
                  type="button"
                  className="text-[11px] text-sky-600 hover:underline cursor-pointer flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Get OTP</span>
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  placeholder="Enter 6-digit OTP sent to email/mobile"
                  defaultValue="123456"
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
                />
              </div>
            </div>
          )}

          {/* reCAPTCHA Mockup Box matching Screenshot 3 */}
          <div
            onClick={() => setRecaptchaChecked(!recaptchaChecked)}
            className="cursor-pointer border border-slate-200 bg-slate-50 rounded-lg p-3 flex items-center justify-between hover:bg-slate-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              {recaptchaChecked ? (
                <CheckSquare className="w-5 h-5 text-emerald-600" />
              ) : (
                <Square className="w-5 h-5 text-slate-400" />
              )}
              <span className="text-xs font-medium text-slate-700">I'm not a robot</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[9px] text-slate-400 font-bold">reCAPTCHA</span>
              <span className="text-[8px] text-slate-400">Privacy - Terms</span>
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 rounded-lg bg-[#0F2942] hover:bg-[#1E3A5F] text-white text-xs sm:text-sm font-bold shadow-sm transition-colors flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <span>Authenticating...</span>
            ) : (
              <span>Login</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginComp;
