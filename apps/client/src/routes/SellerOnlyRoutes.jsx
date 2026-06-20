import { Navigate } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";


const SellerOnlyRoutes = ({children}) => {
  const { user} = useUserStore();

   
 if(user.role !== "seller") return <Navigate to={"/"} replace />

  return children;
}

export default SellerOnlyRoutes