/**
 * @file App.jsx
 * @description Main application component providing Data Routing via RouterProvider,
 * ErrorBoundary, and top-level provider wrapping.
 */

import React from 'react';
import { RouterProvider } from 'react-router-dom';
import AppLayout from '@/app/layout/AppLayout';
import { router } from '@/routes/AppRoutes';
import ErrorBoundary from '@/shared/ui/ErrorBoundary';

export function App() {
  return (
    <ErrorBoundary>
      <AppLayout>
        <RouterProvider router={router} />
      </AppLayout>
    </ErrorBoundary>
  );
}

export default App;
