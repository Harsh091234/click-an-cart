import React from "react";
import { UserPlus, LogIn, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const {logout, googleLogin, user} = useUserStore();
  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  }
 const loginWithGoogle = useGoogleLogin({
    onSuccess: async(credentialResponse) => {
      if (credentialResponse?.access_token) {
        // Send access_token to backend
       
        const success = await    googleLogin(credentialResponse.access_token);
        
        if(success){
          if(success.isVerified === false) navigate("/verify-email");
          else  navigate("/");
        }
        
        
      }
    },
    onError: () => {
      console.error("Google Login Failed");
    },
  });

  return (
    <nav className="bg-gray-800 px-6 py-3 flex justify-between items-center shadow border-b border-b-emerald-800">
     
      <h1 className="text-emerald-500 font-bold text-2xl">Click-n-Cart !!</h1>

     
       
      <div className="flex gap-3 items-center text-sm">
       {(user) &&
        <div>
          <Link
          to="/"
          className="text-gray-400 hover:text-gray-200 transition"
        >
          Home
        </Link>
           <button onClick={handleLogout}  className=" flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-lg  transition">
         <LogOut className="h-4 w-4" /> Logout
        </button>
          </div>} 

        {/* <Link
          to="/signup"
          className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white  px-4 py-1.5 rounded-lg transition"
        >
          <UserPlus className="h-4 w-4" />
          Sign Up
        </Link>

        <Link
          to="/login"
          className="flex items-center gap-1.5 bg-gray-700 hover:bg-gray-600 text-white px-4 py-1.5 rounded-lg  transition"
        >
          <LogIn className="h-4 w-4" />
          Login
        </Link> */}
        {!user 
        && <button
              onClick={loginWithGoogle}
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg transition"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="h-4 w-4"
              />
              Login with Google
            </button>
     
        }
         
      </div>
    </nav>
  );
};

export default Navbar;
