/**
 * @file Sidebar.jsx
 * @layer shared/ui
 * @description Application sidebar component matching KarmaLearn Dashboard (Screenshot 3).
 */

import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  Landmark,
  Sparkles,
  BookOpen,
  User,
  Settings,
  HelpCircle,
  X,
  Bot,
  BarChart3,
} from 'lucide-react';
import { useAppContext } from '@/context/AppContext';

export const Sidebar = () => {
  const { isSidebarOpen, toggleSidebar } = useAppContext();

  const mainLinks = [
    { to: '/dashboard', label: 'Recommendations', icon: Sparkles, end: true },
    { to: '/upload', label: 'Learning Materials', icon: BookOpen },
    { to: '/analysis', label: 'Recent Diagnostics', icon: BarChart3 },
    { to: '/total-analysis', label: 'Profile & Framework', icon: User },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs md:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed md:sticky top-16 left-0 z-40 w-64 h-[calc(100vh-4rem)] bg-white border-r border-slate-200 transition-transform duration-200 ease-in-out md:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full justify-between p-4">
          <div>
            {/* Mobile Close Button */}
            <div className="flex items-center justify-between pb-3 md:hidden border-b border-slate-100 mb-3">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Menu
              </span>
              <button
                onClick={toggleSidebar}
                className="p-1 rounded text-slate-500 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* National Portal Brand Item (Screenshot 3 top of sidebar) */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 mb-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                <Landmark className="w-5 h-5" />
              </div>
              <div className="overflow-hidden">
                <div className="font-bold text-xs text-slate-900 leading-tight truncate">
                  National Portal
                </div>
                <div className="text-[10px] text-slate-500 font-medium truncate">
                  Competency Framework
                </div>
              </div>
            </div>

            {/* Navigation Menu Items */}
            <div className="space-y-1">
              {mainLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.end}
                    onClick={() => isSidebarOpen && toggleSidebar()}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                        isActive
                          ? 'bg-sky-50 text-sky-700 border-l-3 border-sky-600 font-bold'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`
                    }
                  >
                    <Icon className="w-4 h-4" />
                    <span>{link.label}</span>
                  </NavLink>
                );
              })}
            </div>

            {/* AI Test Generator Pill Button (Screenshot 3) */}
            <div className="mt-5">
              <Link
                to="/upload"
                onClick={() => isSidebarOpen && toggleSidebar()}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#0F2942] hover:bg-[#1E3A5F] text-white text-xs font-bold shadow-xs transition-colors"
              >
                <Bot className="w-4 h-4 text-sky-400" />
                <span>AI Test Generator</span>
              </Link>
            </div>
          </div>

          {/* Bottom Settings & Support (Screenshot 3) */}
          <div className="border-t border-slate-100 pt-3 space-y-1 text-xs">
            <button className="w-full flex items-center gap-3 px-3 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors text-left">
              <Settings className="w-4 h-4 text-slate-400" />
              <span>Settings</span>
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors text-left">
              <HelpCircle className="w-4 h-4 text-slate-400" />
              <span>Support</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
