/**
 * @file Navbar.jsx
 * @layer shared/ui
 * @description Top navigation bar displaying brand identity, user profile status, and quick links.
 */

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, LogOut, User, BarChart2, BookOpen, Menu } from 'lucide-react';
import { useAuth } from '@/features/auth/hooks/authHooks';
import { useAppContext } from '@/context/AppContext';

export const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { toggleSidebar } = useAppContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Brand / Logo and Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link to="/" className="flex items-center gap-2.5 font-bold text-slate-900 text-lg">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-sm">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="tracking-tight">
              SIH <span className="text-indigo-600">EduAssess</span>
            </span>
          </Link>
        </div>

        {/* Center: Quick navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link to="/" className="hover:text-indigo-600 transition-colors">
            Dashboard
          </Link>
          <Link to="/quiz" className="hover:text-indigo-600 transition-colors flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" />
            Take Assessment
          </Link>
          <Link to="/analysis" className="hover:text-indigo-600 transition-colors flex items-center gap-1.5">
            <BarChart2 className="w-4 h-4" />
            Recent Analysis
          </Link>
          <Link to="/total-analysis" className="hover:text-indigo-600 transition-colors">
            Total Insights
          </Link>
        </nav>

        {/* Right: User menu or login button */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 pl-2">
                <img
                  src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                  alt={user?.name || 'User'}
                  className="w-8 h-8 rounded-full ring-2 ring-indigo-500/20 object-cover"
                />
                <span className="hidden sm:inline-block text-xs font-medium text-slate-700">
                  {user?.name || 'Student'}
                </span>
              </div>
              <button
                onClick={handleLogout}
                title="Logout"
                className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="text-sm font-medium text-slate-700 hover:text-indigo-600 px-3 py-2 rounded-lg"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-1.5 rounded-lg shadow-xs"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
