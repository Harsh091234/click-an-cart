import React from 'react'
import { Navigate } from 'react-router-dom';
import { useUserStore } from '../store/useUserStore';

const BuyerOnlyRoutes = ({children}) => {
 const { user } = useUserStore();

 if(user.role === "admin") return children;
 if (user.role !== "buyer") return <Navigate to={"/seller"} replace />;

 return children;
}

export default BuyerOnlyRoutes
