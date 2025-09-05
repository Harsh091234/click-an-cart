import React from "react";
import { LogOut } from "lucide-react";
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
    <nav className="bg-sky-500 px-6 py-2 flex justify-between items-center shadow border-b border-b-sky-600">
      {/* Brand */}
      <h1 className="text-white font-serif italic font-bold text-xl">
        Click-n-Cart !!
      </h1>

      {/* Nav Links / Buttons */}
      <div className="flex gap-4 items-center text-xs">
        {user ? (
          <div className="flex items-center gap-4 text-xs">
            <Link
              to="/"
              className="text-gray-100 font-medium hover:text-white transition"
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className="text-gray-100 font-medium hover:text-white transition"
            >
              Dashboard
            </Link>
            <Link
              to="/cart"
              className="text-gray-100 font-medium hover:text-white transition"
            >
              Cart
            </Link>
            <Link
              to="/premium"
              className="bg-white text-sky-600 font-semibold px-4 py-1.5 rounded-lg shadow-sm hover:bg-gray-100 hover:shadow-md transition"
            >
              Get CartPlus
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-red-600 font-semibold bg-white px-4 py-1.5 rounded-lg shadow-sm hover:bg-gray-100 hover:shadow-md transition"
            >
              <LogOut className="h-4 w-4" /> Logout
            </button>
          </div>
        ) : (
          <GoogleLoginButton
            styles="flex gap-2 items-center text-sky-600 font-semibold bg-white px-4 py-1.5 rounded-lg shadow-sm hover:bg-gray-100 hover:shadow-md transition text-xs"
            textStyles="hidden sm:inline"
            imageStyles="h-4 w-4"
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
