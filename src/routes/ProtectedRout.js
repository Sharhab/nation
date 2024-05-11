import React from 'react';

import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, isLoggedIn }) => {
    return isLoggedIn ? children : <Navigate to="/pages/login" replace />;
};

export default ProtectedRoute
