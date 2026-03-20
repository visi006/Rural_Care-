import React from 'react';
import { Navigate } from 'react-router-dom';

// This component wraps any page that requires login
// If no token exists → redirect to login
// If role doesn't match → redirect to dashboard

function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  // No token means not logged in → go to login page
  if (!token) {
    return <Navigate to="/login" />;
  }

  // If allowedRoles is specified, check if user's role matches
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" />;
  }

  // All checks passed → show the actual page
  return children;
}

export default ProtectedRoute;
