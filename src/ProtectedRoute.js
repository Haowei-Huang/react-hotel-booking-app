import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'

function ProtectedRoute({ children }) {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }

    return children;
}

export default ProtectedRoute;