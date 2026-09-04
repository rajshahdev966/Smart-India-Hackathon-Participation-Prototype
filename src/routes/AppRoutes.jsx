/**
 * @file AppRoutes.jsx
 * @layer routes
 * @description Central data routing configuration using React Router's createBrowserRouter,
 * specifying route hierarchies, nested layout wrappers, and authentication guards.
 */

import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

// Layouts
import MainLayout from '@/app/layout/MainLayout';
import QuizLayout from '@/app/layout/QuizLayout';

// Protected Route Guards
import AuthProtected from './Protected/AuthProtected';
import PublicProtected from './Protected/PublicProtected';

// Feature Pages
import LandingPage from '@/features/landing/ui/LandingPage';
import LoginPage from '@/features/auth/ui/page/LoginPage';
import RegisterPage from '@/features/auth/ui/page/RegisterPage';
import QuizPage from '@/features/quiz/ui/page/QuizPage';
import AnalysisPage from '@/features/analysis/ui/page/AnalysisPage';
import UserTotalAnalysisPage from '@/features/userTotalAnalysis/ui/page/UserTotalAnalysisPage';
import DashboardPage from '@/features/dashboard/ui/DashboardPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/login',
    element: (
      <PublicProtected>
        <LoginPage />
      </PublicProtected>
    ),
  },
  {
    path: '/register',
    element: (
      <PublicProtected>
        <RegisterPage />
      </PublicProtected>
    ),
  },
  {
    element: (
      <AuthProtected>
        <QuizLayout />
      </AuthProtected>
    ),
    children: [
      {
        path: '/quiz',
        element: <QuizPage />,
      },
    ],
  },
  {
    element: (
      <AuthProtected>
        <MainLayout />
      </AuthProtected>
    ),
    children: [
      {
        path: '/dashboard',
        element: <DashboardPage />,
      },
      {
        path: '/analysis',
        element: <AnalysisPage />,
      },
      {
        path: '/total-analysis',
        element: <UserTotalAnalysisPage />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);

export const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default router;
