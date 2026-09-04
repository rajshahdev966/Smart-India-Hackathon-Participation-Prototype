/**
 * @file LoginPage.jsx
 * @layer features/auth/ui/page
 * @description Page view orchestrating the LoginComp form, matching Screenshot 3 UI.
 */

import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Globe, HelpCircle, Eye, ArrowLeft } from 'lucide-react';
import LoginComp from '../component/LoginComp';
import { useAuth } from '../../hooks/authHooks';
import { useAppContext } from '@/context/AppContext';

export const LoginPage = () => {
  const { login, isLoading, error } = useAuth();
  const { notify } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect to previously intended destination or dashboard
  const destination = location.state?.from?.pathname || '/dashboard';

  const handleLoginSubmit = async (data) => {
    const result = await login(data);
    if (result.success) {
      notify('Logged in successfully! Welcome to KarmaLearn.', 'success');
      navigate(destination, { replace: true });
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-100/70 font-sans">
      {/* Top Header Bar */}
      <header className="bg-white border-b border-slate-200 px-4 sm:px-8 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-sky-600 flex items-center justify-center text-white font-bold text-xs">
            KL
          </div>
          <span className="font-extrabold text-lg text-slate-900 tracking-tight">
            Karma<span className="text-sky-600">Learn</span>
          </span>
        </Link>

        <div className="flex items-center gap-5 text-xs text-slate-600">
          <Link to="/" className="hidden sm:flex items-center gap-1 hover:text-sky-600">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Portal</span>
          </Link>
          <button className="flex items-center gap-1 hover:text-slate-900">
            <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
            <span>Help</span>
          </button>
          <button className="flex items-center gap-1 hover:text-slate-900">
            <Eye className="w-3.5 h-3.5 text-slate-500" />
            <span>Accessibility</span>
          </button>
          <button className="flex items-center gap-1 hover:text-slate-900 font-medium">
            <Globe className="w-3.5 h-3.5 text-slate-500" />
            <span>English</span>
          </button>
        </div>
      </header>

      {/* Main Login Card Container */}
      <main className="flex-1 flex flex-col justify-center items-center px-4 py-10">
        <LoginComp
          onSubmit={handleLoginSubmit}
          isLoading={isLoading}
          errorMessage={error}
        />

        <div className="mt-6 text-center text-xs text-slate-600">
          New to KarmaLearn?{' '}
          <Link to="/register" className="font-bold text-sky-700 hover:text-sky-900 underline">
            Register Now
          </Link>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="bg-white border-t border-slate-200 py-3 text-center text-[11px] text-slate-500">
        KarmaLearn • National Education Portal • Mission Karmayogi Bharat
      </footer>
    </div>
  );
};

export default LoginPage;
