import React from 'react'
import { useUserStore } from '../store/useUserStore';
import { Navigate } from 'react-router-dom';

const PublicOnlyRoutes = ({children}) => {
  const { user } = useUserStore();

  // User is not logged in
  if (!user) {
    return children;
  }

  return <Navigate to="/" replace />;
}

export default PublicOnlyRoutes
