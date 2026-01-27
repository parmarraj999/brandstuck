import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const isLogIn = window.localStorage.getItem('isLogIn') === 'true';

    if (!isLogIn) {
        return <Navigate to="/auth" replace />;
    }

    return children ? children : <Outlet />;
};

export default ProtectedRoute;
