import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

/**
 * AdminRoute
 * Wraps any route that only admins should access.
 * Non-admins are silently redirected to "/" .
 */
const AdminRoute = ({ children }) => {
  const { isAdmin, isLoggedIn } = useAuth();

  if (!isLoggedIn) return <Navigate to="/signin" replace />;
  if (!isAdmin)    return <Navigate to="/" replace />;

  return children;
};

export default AdminRoute;
