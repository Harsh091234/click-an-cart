import React from 'react'
import { Navigate } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";


const AdminOnlyRoutes = ({children}) => {
    const { user } = useUserStore();
    
 if (user.role !== "admin") {
    if(user.role === "buyer") return <Navigate to={"/"} replace />;
    if(user.role === "seller") return <Navigate to={"/seller"} replace />;
 };

 return children;
}

export default AdminOnlyRoutes
