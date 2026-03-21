import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { hasValidToken } from './Utility/authToken';

const RoleProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useSelector((state) => state.auth);
  const tokenExists = hasValidToken();

  if (tokenExists && loading && !user) return null;
  if (!user) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(user.user_type)) return <Navigate to="/" replace />;

  return children || <Outlet />;
};

export default RoleProtectedRoute;
