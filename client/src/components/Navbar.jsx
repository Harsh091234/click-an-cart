import React from "react";
import { UserPlus, LogIn, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";

import { useNavigate } from "react-router-dom";
import GoogleLoginButton from "./ui/GoogleLoginButton";
const Navbar = () => {
  const navigate = useNavigate();
  const { logout, user } = useUserStore();
  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  };
 

  return (
    <nav className="bg-sky-500 px-6 py-3 flex justify-between items-center shadow border-b border-b-sky-600">
      {/* Brand */}
      <h1 className="text-white font-bold text-2xl">Click-n-Cart !!</h1>

      {/* Nav Links / Buttons */}
      <div className="flex gap-3 items-center text-sm">
        {user && (
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="text-gray-200 font-semibold hover:text-white transition"
            >
              Home
            </Link>
            <Link
              to="/"
              className="text-gray-200 font-semibold hover:text-white transition"
            >
              Dashboard
            </Link>
            <Link
              to="/"
              className="text-gray-200 font-semibold hover:text-white transition"
            >
              Cart
            </Link>
            <Link
              to="/"
              className="bg-white text-sky-600 font-semibold px-4 py-1.5 rounded-full shadow-sm hover:bg-gray-100 hover:shadow-md transition"
            >
              Get CartPlus
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-red-600 font-semibold bg-white px-4 py-1.5 rounded-lg shadow-sm  hover:bg-gray-100 hover:shadow-md transition"
            >
              <LogOut className="h-4 w-4" /> Logout
            </button>
          </div>
        )}

        {!user && (
          <GoogleLoginButton styles={"flex gap-1 items-center text-sky-600 font-semibold bg-white px-4 py-1.5 rounded-lg shadow-sm hover:bg-gray-100 hover:shadow-md transition"} />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
