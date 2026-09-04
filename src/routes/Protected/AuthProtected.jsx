/**
 * @file AuthProtected.jsx
 * @layer routes/Protected
 * @description Route guard ensuring only authenticated sessions access protected views.
 * Relies on Redux auth state as single source of truth without render-time side-effects.
 */

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/features/auth/hooks/authHooks';

export const AuthProtected = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default AuthProtected;
