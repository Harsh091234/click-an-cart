import { Navigate } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";

const ProtectedRoute = ({
  children,
  
}) => {
  const { user, checkingAuth } = useUserStore();

  if (checkingAuth) return <>Loading</>;
  // User not logged in

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (!user.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }


  return children;
};

export default ProtectedRoute;
