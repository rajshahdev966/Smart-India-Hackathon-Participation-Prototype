/**
 * @file App.jsx
 * @description Main application component providing router integration, ErrorBoundary,
 * and top-level provider wrapping.
 */

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppLayout from '@/app/layout/AppLayout';
import AppRoutes from '@/routes/AppRoutes';
import ErrorBoundary from '@/shared/ui/ErrorBoundary';

export function App() {
  return (
    <ErrorBoundary>
      <AppLayout>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AppLayout>
    </ErrorBoundary>
  );
}

export default App;
