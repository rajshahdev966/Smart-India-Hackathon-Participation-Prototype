/**
 * @file Sidebar.jsx
 * @layer shared/ui
 * @description Application sidebar component with responsive collapsible drawer for mobile and navigation links.
 */

import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BookOpen, BarChart3, PieChart, ShieldCheck, X } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';

export const Sidebar = () => {
  const { isSidebarOpen, toggleSidebar } = useAppContext();

  const links = [
    { to: '/', label: 'Overview', icon: Home, end: true },
    { to: '/quiz', label: 'Start Assessment', icon: BookOpen },
    { to: '/analysis', label: 'Last Assessment', icon: BarChart3 },
    { to: '/total-analysis', label: 'Overall Analytics', icon: PieChart },
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
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Navigation</span>
              <button onClick={toggleSidebar} className="p-1 rounded text-slate-500 hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Menu items */}
            <div className="space-y-1">
              {links.map((link) => {
                const Icon = link.icon;
                return (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.end}
                    onClick={() => isSidebarOpen && toggleSidebar()}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-indigo-50 text-indigo-700 font-semibold'
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
          </div>

          {/* System Badge in Sidebar Footer */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
            <div className="flex items-center gap-2 text-indigo-700 font-semibold text-xs mb-1">
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              <span>SIH 2026 Engine</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              4-Layer modular architecture with automated competency evaluations.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
