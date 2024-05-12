import React from 'react'; 
import AuthenticationRoutes from './AuthenticationRoute'

import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, isLoggedIn }) => {
    return isLoggedIn ? children : <AuthenticationRoutes />;
};

export default ProtectedRoute
