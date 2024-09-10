// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    console.log('PrivateRoute Token:', token);
    return token ? children : <Navigate to="/admin/login" />;
};

export default PrivateRoute;
