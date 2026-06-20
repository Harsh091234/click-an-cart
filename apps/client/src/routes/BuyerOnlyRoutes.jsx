import { Navigate } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";

const BuyerOnlyRoutes = ({ children }) => {
  const { user } = useUserStore();
console.log("BuyerOnlyRoutes:", user);


  // Admin can access everything
  if (user.role === "admin") return children;

  // Only buyers can access
  if (user.role !== "buyer") {
    return <Navigate to="/seller" replace />;
  }

  return children;
};

export default BuyerOnlyRoutes;
