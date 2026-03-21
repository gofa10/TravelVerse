// src/components/Routes/PrivateRoute.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { hasValidToken } from './Utility/authToken';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useSelector((state) => state.auth);
  const tokenExists = hasValidToken();

  if (tokenExists && loading && !user) return null;
  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
