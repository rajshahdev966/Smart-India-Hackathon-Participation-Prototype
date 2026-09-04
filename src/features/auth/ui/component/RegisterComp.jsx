/**
 * @file RegisterComp.jsx
 * @layer features/auth/ui/component
 * @description KarmaLearn registration form with Centre/State, Organization, Designation, and OTP workflow matching Screenshot 3.
 */

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AlertCircle, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import Button from '@/shared/ui/Button';

export const RegisterComp = ({ onSubmit, isLoading, errorMessage }) => {
  const [step, setStep] = useState(1);
  const [otpSent, setOtpSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: 'Bharat Chetri',
      stateCategory: 'Centre',
      organization: 'Ministry of Statistics & Programme Implementation',
      designation: 'Director / Statistical Officer',
      email: 'bharat.chetri@gov.in',
      password: 'Password123!',
    },
  });

  return (
    <div className="w-full max-w-4xl bg-white rounded-2xl border border-slate-200/90 shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12">
      {/* Left Column: How To Register Graphical Guidance (Screenshot 3) */}
      <div className="md:col-span-5 bg-gradient-to-br from-[#0F2942] via-[#0A1E33] to-[#04111E] text-white p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
        {/* Background watermark */}
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-sky-500/10 rounded-full blur-2xl pointer-events-none"></div>

        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-[11px] font-semibold mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Official Onboarding</span>
          </div>

          <h3 className="text-xl font-bold tracking-tight text-white">
            Welcome to iGOT Karmayogi
          </h3>
          <p className="text-xs text-sky-200 font-medium mt-0.5 mb-6">
            How To Register
          </p>

          <div className="space-y-4 text-xs text-slate-300">
            {/* Step 1 */}
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center shrink-0 text-[11px]">
                1
              </span>
              <div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  You can only register with your government official email ID on this iGOT Karmayogi platform.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center shrink-0 text-[11px]">
                2
              </span>
              <div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  In case you do not have government Email ID, please contact the MDO admin of your organization to onboard you.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Help Note */}
        <div className="mt-6 pt-4 border-t border-white/10 text-[11px] text-slate-400">
          To find your MDO admin details:{' '}
          <span className="text-amber-400 font-semibold underline cursor-pointer">
            Click Here
          </span>
        </div>
      </div>

      {/* Right Column: Register Form (Screenshot 3) */}
      <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-center">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Register
          </h2>

          {/* Stepper (1 step-1, 2 step-2) */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center">
                1
              </div>
              <span className="text-[11px] font-semibold text-slate-700">step -1</span>
            </div>
            <div className="w-6 h-0.5 bg-slate-200"></div>
            <div className="flex items-center gap-1.5 opacity-60">
              <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 font-bold text-xs flex items-center justify-center">
                2
              </div>
              <span className="text-[11px] font-semibold text-slate-500">step -2</span>
            </div>
          </div>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-lg flex items-center gap-2 text-rose-700 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
          {/* Centre / State Dropdown */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Centre / State
            </label>
            <select
              {...register('stateCategory')}
              className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none bg-white"
            >
              <option value="Centre">Centre / Central Ministries</option>
              <option value="Maharashtra">State Govt. - Maharashtra</option>
              <option value="Karnataka">State Govt. - Karnataka</option>
              <option value="Gujarat">State Govt. - Gujarat</option>
              <option value="Tamil Nadu">State Govt. - Tamil Nadu</option>
              <option value="Uttar Pradesh">State Govt. - Uttar Pradesh</option>
            </select>
          </div>

          {/* Organization Dropdown */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Organization
            </label>
            <select
              {...register('organization')}
              className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none bg-white"
            >
              <option value="Ministry of Statistics & Programme Implementation">
                Ministry of Statistics &amp; Programme Implementation (MoSPI)
              </option>
              <option value="Ministry of Electronics & IT">
                Ministry of Electronics &amp; IT (MeitY)
              </option>
              <option value="Department of Personnel and Training">
                Department of Personnel and Training (DoPT)
              </option>
              <option value="NITI Aayog">NITI Aayog</option>
            </select>
          </div>

          {/* Designation Dropdown */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Designation
            </label>
            <select
              {...register('designation')}
              className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none bg-white"
            >
              <option value="Director / Statistical Officer">
                Director / Statistical Officer
              </option>
              <option value="Deputy Secretary">Deputy Secretary</option>
              <option value="Under Secretary">Under Secretary</option>
              <option value="Section Officer">Section Officer</option>
              <option value="Assistant Section Officer">Assistant Section Officer</option>
            </select>
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Bharat Chetri"
              {...register('name', { required: 'Name is required' })}
              className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
            />
          </div>

          {/* Email ID with Send OTP */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Email ID
            </label>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Official Govt. Email ID (e.g. name@gov.in)"
                {...register('email', {
                  required: 'Official email is required',
                  pattern: { value: /^\S+@\S+$/i, message: 'Invalid email format' },
                })}
                className="flex-1 px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
              />
              <button
                type="button"
                onClick={() => setOtpSent(true)}
                className="px-3.5 py-2 bg-sky-700 hover:bg-sky-800 text-white rounded-lg text-xs font-semibold shrink-0 transition-colors"
              >
                {otpSent ? 'OTP Sent ✓' : 'Send OTP'}
              </button>
            </div>
            {errors.email && (
              <p className="text-[11px] text-rose-600 mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Hidden password for auth state */}
          <input type="hidden" value="Password123!" {...register('password')} />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-2.5 rounded-lg bg-[#0F2942] hover:bg-[#1E3A5F] text-white text-xs sm:text-sm font-bold shadow-sm transition-colors flex items-center justify-center gap-2"
          >
            <span>Register Account</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <p className="text-[11px] text-center text-slate-500 pt-2">
            By registering, you agree to our{' '}
            <span className="text-sky-600 underline cursor-pointer">Terms of Service</span> &amp;{' '}
            <span className="text-sky-600 underline cursor-pointer">Privacy Policy</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterComp;
