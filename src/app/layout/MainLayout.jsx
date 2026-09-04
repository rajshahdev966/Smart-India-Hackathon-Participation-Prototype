/**
 * @file MainLayout.jsx
 * @layer app/layout
 * @description Standard application shell with sticky Navbar, collapsible Sidebar,
 * and responsive main content area.
 */

import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '@/shared/ui/Navbar';
import Sidebar from '@/shared/ui/Sidebar';
import { useAppContext } from '@/context/AppContext';

export const MainLayout = () => {
  const { activeNotification } = useAppContext();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Navbar */}
      <Navbar />

      {/* Global Toast Notification Banner */}
      {activeNotification && (
        <div
          className={`fixed bottom-5 right-5 z-50 px-4 py-3 rounded-xl shadow-lg text-sm font-medium transition-all ${
            activeNotification.type === 'success'
              ? 'bg-emerald-600 text-white'
              : activeNotification.type === 'error'
              ? 'bg-rose-600 text-white'
              : 'bg-indigo-600 text-white'
          }`}
        >
          {activeNotification.message}
        </div>
      )}

      {/* Body with Sidebar and Outlet Content */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
