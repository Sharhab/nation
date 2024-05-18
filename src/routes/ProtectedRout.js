import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const { userStat } = useSelector((state) => state);
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = userStat;
  
return isLoggedIn ? children : <Navigate to="/pages/login" replace />;
};

export default ProtectedRoute;
