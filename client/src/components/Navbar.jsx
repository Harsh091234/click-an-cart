import React from "react";
import { UserPlus, LogIn, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";

const Navbar = () => {
  const {logout} = useUserStore();
  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  }
  return (
    <nav className="bg-gray-900 px-6 py-3 flex justify-between items-center shadow border-b border-b-emerald-800">
      {/* Logo */}
      <h1 className="text-emerald-500 font-bold text-2xl">Click-n-Cart !!</h1>

      {/* Right Side - Tabs */}
       
      <div className="flex gap-3 items-center text-sm">
        <Link
          to="/"
          className="text-gray-400 hover:text-gray-200 transition"
        >
          Home
        </Link>

        <Link
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
        </Link>

        <button onClick={handleLogout}  className=" flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-lg  transition">
         <LogOut className="h-4 w-4" /> Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
