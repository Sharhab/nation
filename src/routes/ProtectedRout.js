import React from 'react';

import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, isAuthenticated }) => {
    return isAuthenticated ? children : <Navigate to="/pages/login" replace />;
};

export default ProtectedRoute
