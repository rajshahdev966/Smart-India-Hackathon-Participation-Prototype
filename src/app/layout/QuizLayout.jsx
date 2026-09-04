/**
 * @file QuizLayout.jsx
 * @layer app/layout
 * @description Dedicated distraction-free examination layout without general navigation bars or sidebars.
 * Provides a minimal header with assessment security badge and emergency exit button.
 */

import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Shield, AlertCircle, LogOut } from 'lucide-react';
import { useQuizContext } from '@/context/QuizContext';

export const QuizLayout = () => {
  const navigate = useNavigate();
  const { isTimerRunning } = useQuizContext();

  const handleExit = () => {
    if (window.confirm('Are you sure you want to exit the assessment? Your answers will be saved.')) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100/70 flex flex-col">
      {/* Minimal Examination Topbar */}
      <header className="bg-white border-b border-slate-200 px-6 py-3.5 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-slate-900 leading-none">
              SIH Assessment Portal
            </h1>
            <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase">
              Secure Evaluation Mode
            </span>
          </div>
        </div>

        <button
          onClick={handleExit}
          className="flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-lg transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Exit Assessment</span>
        </button>
      </header>

      {/* Examination Content */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default QuizLayout;
