/**
 * @file RegisterPage.jsx
 * @layer features/auth/ui/page
 * @description Page view orchestrating the RegisterComp form matching Screenshot 3 UI.
 */

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
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
      notify('Registration complete! Welcome to KarmaLearn.', 'success');
      navigate('/dashboard', { replace: true });
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-100/70 font-sans">
      {/* Top Navbar matching Screenshot 3 */}
      <header className="bg-white border-b border-slate-200 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-sky-600 flex items-center justify-center text-white font-bold text-xs">
            KL
          </div>
          <span className="font-extrabold text-lg text-slate-900 tracking-tight">
            Karma<span className="text-sky-600">Learn</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-600">
          <Link to="/" className="hover:text-sky-600">Home</Link>
          <a href="/#courses" className="hover:text-sky-600">Courses</a>
          <a href="/#governance" className="hover:text-sky-600">Learning</a>
          <a href="/#about-mission" className="hover:text-sky-600">About</a>
          <a href="/#hubs" className="hover:text-sky-600">Resources</a>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="text-xs font-semibold text-slate-700 hover:text-sky-600 px-3 py-1.5"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="text-xs font-semibold bg-sky-700 text-white hover:bg-sky-800 px-3.5 py-1.5 rounded-lg shadow-2xs"
          >
            Register
          </Link>
        </div>
      </header>

      {/* Main Form Container */}
      <main className="flex-1 flex flex-col justify-center items-center px-4 py-10">
        <RegisterComp
          onSubmit={handleRegisterSubmit}
          isLoading={isLoading}
          errorMessage={error}
        />

        <div className="mt-6 text-center text-xs text-slate-600">
          Already registered?{' '}
          <Link to="/login" className="font-bold text-sky-700 hover:text-sky-900 underline">
            Sign In
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-3 text-center text-[11px] text-slate-500">
        KarmaLearn • National Education Portal • Mission Karmayogi Bharat
      </footer>
    </div>
  );
};

export default RegisterPage;
