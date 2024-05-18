import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const ProtectedRoute = ({ children }) => {
  const { userStat } = useSelector((state) => state);
  const { isLoggedIn } = userStat;
  
return isLoggedIn ? children : <Navigate to="/pages/login" replace />;
};

export default ProtectedRoute;
