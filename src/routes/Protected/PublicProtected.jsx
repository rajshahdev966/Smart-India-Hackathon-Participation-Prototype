/**
 * @file PublicProtected.jsx
 * @layer routes/Protected
 * @description Route guard for public-only pages (e.g. Login, Register).
 * Automatically redirects already logged-in users to the main dashboard.
 */

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/hooks/authHooks';

export const PublicProtected = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicProtected;
