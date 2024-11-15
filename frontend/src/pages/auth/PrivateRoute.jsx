import React from 'react'
import { useAuth } from './AuthProvider'
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    const token = localStorage.getItem('token');

    if(!token){
        return <Navigate to={'/signin'} />
    }

    return <Outlet />;
}

export default PrivateRoute