/**
 * @file AppRoutes.jsx
 * @layer routes
 * @description Central routing configuration specifying page hierarchies, layout wrappers,
 * and authentication guards.
 */

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import MainLayout from '@/app/layout/MainLayout';
import QuizLayout from '@/app/layout/QuizLayout';

// Protected Route Guards
import AuthProtected from './Protected/AuthProtected';
import PublicProtected from './Protected/PublicProtected';

// Feature Pages
import LoginPage from '@/features/auth/ui/page/LoginPage';
import RegisterPage from '@/features/auth/ui/page/RegisterPage';
import QuizPage from '@/features/quiz/ui/page/QuizPage';
import AnalysisPage from '@/features/analysis/ui/page/AnalysisPage';
import UserTotalAnalysisPage from '@/features/userTotalAnalysis/ui/page/UserTotalAnalysisPage';
import DashboardPage from '@/features/dashboard/ui/DashboardPage';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Authentication Routes (Restricted if already authenticated) */}
      <Route
        path="/login"
        element={
          <PublicProtected>
            <LoginPage />
          </PublicProtected>
        }
      />
      <Route
        path="/register"
        element={
          <PublicProtected>
            <RegisterPage />
          </PublicProtected>
        }
      />

      {/* Dedicated Quiz Layout Routes (Auth Protected, Fullscreen / Focused) */}
      <Route
        element={
          <AuthProtected>
            <QuizLayout />
          </AuthProtected>
        }
      >
        <Route path="/quiz" element={<QuizPage />} />
      </Route>

      {/* Standard Application Shell (Auth Protected) */}
      <Route
        element={
          <AuthProtected>
            <MainLayout />
          </AuthProtected>
        }
      >
        <Route path="/" element={<DashboardPage />} />
        <Route path="/analysis" element={<AnalysisPage />} />
        <Route path="/total-analysis" element={<UserTotalAnalysisPage />} />
      </Route>

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
