import React from 'react';
import Cookies from 'cookies-js
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    return Cookies.get("user") ? children : <Navigate to="/pages/login" replace />;
};

module.exports = ProtectedRoute
