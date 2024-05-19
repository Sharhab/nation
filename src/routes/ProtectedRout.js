import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useSelector(state => state.userStat.isLoggedIn);
  return isLoggedIn ? children : <Navigate to="/pages/login" />;
};

export default ProtectedRoute;
