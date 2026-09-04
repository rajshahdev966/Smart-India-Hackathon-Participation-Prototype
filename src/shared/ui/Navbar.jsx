/**
 * @file Navbar.jsx
 * @layer shared/ui
 * @description Top navigation bar matching KarmaLearn Dashboard (Screenshot 3).
 */

import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Bell, Menu, LogOut, ExternalLink, User } from 'lucide-react';
import { useAuth } from '@/features/auth/hooks/authHooks';
import { useAppContext } from '@/context/AppContext';

export const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { toggleSidebar } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Courses', path: '/#courses' },
    { label: 'My Learning', path: '/dashboard' },
    { label: 'Assessments', path: '/quiz' },
    { label: 'Tests', path: '/quiz' },
    { label: 'Competency', path: '/total-analysis' },
  ];

  // User initials: e.g. "BC" for Bharat Chetri or "AJ" for Alex Johnson
  const userName = user?.name || 'Bharat Chetri';
  const initials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Brand / Logo matching KarmaLearn */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link to="/" className="flex items-center gap-2.5 group">
            {/* KarmaLearn Flame / Sprout icon */}
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-sky-600 p-0.5 shadow-2xs flex items-center justify-center">
              <div className="w-full h-full bg-white rounded-[6px] flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
                  <path
                    d="M12 2C12 2 8 8 8 13C8 16.5 10 19 12 22C14 19 16 16.5 16 13C16 8 12 2 12 2Z"
                    fill="#0284C7"
                  />
                  <path
                    d="M12 7C9.5 9 5 12 5 15.5C5 18.5 7 20.5 9 21.5C9.5 19 11 16 12 14.5"
                    fill="#F59E0B"
                    opacity="0.85"
                  />
                </svg>
              </div>
            </div>
            <span className="font-extrabold text-lg text-slate-900 tracking-tight">
              Karma<span className="text-sky-600">Learn</span>
            </span>
          </Link>
        </div>

        {/* Center: Navigation tabs (Dashboard, Courses, My Learning, Assessments, Tests, Competency) */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-600">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`py-1.5 transition-colors relative ${
                  isActive
                    ? 'text-sky-600 font-bold border-b-2 border-sky-600'
                    : 'hover:text-slate-900'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: Search bar, notification bell, user avatar (BC) */}
        <div className="flex items-center gap-3">
          {/* Search bar matching Screenshot 3 */}
          <div className="hidden sm:flex items-center relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 pointer-events-none" />
            <input
              type="text"
              placeholder="Search..."
              className="w-40 md:w-48 pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-500 focus:bg-white transition-all"
            />
          </div>

          {/* Bell icon */}
          <button
            title="Notifications"
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg relative transition-colors"
          >
            <Bell className="w-4 h-4" />
            <span className="w-2 h-2 rounded-full bg-amber-500 absolute top-1.5 right-1.5 ring-2 ring-white"></span>
          </button>

          {/* User initials circle (BC) matching Screenshot 3 */}
          <div className="relative">
            <button
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              className="w-8 h-8 rounded-full bg-sky-100 border border-sky-200 text-sky-800 font-bold text-xs flex items-center justify-center hover:bg-sky-200 transition-colors shadow-2xs"
            >
              {initials}
            </button>

            {showUserDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-lg p-2 z-50 animate-in fade-in-50">
                <div className="px-3 py-2 border-b border-slate-100">
                  <div className="font-bold text-xs text-slate-900 truncate">{userName}</div>
                  <div className="text-[10px] text-slate-500 truncate">
                    {user?.email || 'officer@gov.in'}
                  </div>
                </div>
                <Link
                  to="/"
                  onClick={() => setShowUserDropdown(false)}
                  className="flex items-center gap-2 px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 rounded-lg"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  <span>Landing Portal</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 rounded-lg text-left"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
