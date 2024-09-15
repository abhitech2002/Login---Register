import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loader from './Common/Loader';

interface PrivateRouteProps {
  redirectPath?: string;
  children?: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ redirectPath = '/login', children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div><Loader/></div>;
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default PrivateRoute;
