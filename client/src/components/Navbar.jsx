import React from "react";
import { LogOut, Lock, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";
import { useNavigate } from "react-router-dom";
import GoogleLoginButton from "./ui/GoogleLoginButton";
import { useCartStore } from "../store/useCartStore";

const Navbar = () => {
  const navigate = useNavigate();
  const { logout, user } = useUserStore();
  const { cart } = useCartStore();

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

      {user ? (
        <div className="flex items-center gap-2 text-xs">
          <div className="flex gap-4 mr-2">
            <Link
              to="/"
              className="text-gray-100 font-medium hover:text-white transition"
            >
              Home
            </Link>

            <Link
              to="/cart"
              className="text-gray-100 relative font-medium hover:text-white transition"
            >
              Cart
              {cart.length > 0 && (
                <span className="absolute -top-1.5 -right-2.5 bg-white text-sky-600 text-[0.45rem] font-bold px-[5px] py-0.5 rounded-full shadow">
                  {" "}
                  {cart.length}
                </span>
              )}
            </Link>
          </div>
          <Link
            to="/secret-dashboard"
            className="flex items-center gap-1 bg-white text-emerald-600 font-semibold px-3 py-1.5 rounded-lg shadow-sm hover:bg-gray-100  hover:shadow-md transition"
          >
            <Lock className="w-4 h-4 text-emerald-600" />
            Dashboard
          </Link>

          <Link
            to="/premium"
            className="flex items-center gap-1 bg-white text-sky-600 font-semibold px-3 py-1.5 rounded-lg shadow-sm hover:bg-gray-100 hover:shadow-md transition"
          >
            <Star className="w-4 h-4 text-sky-600" />
            Get CartPlus
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1 text-red-600 font-semibold bg-white px-3 py-1.5 rounded-lg shadow-sm hover:bg-gray-100 hover:shadow-md transition"
          >
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </div>
      ) : (
        <GoogleLoginButton
          styles="flex gap-2 items-center text-sky-600 font-semibold bg-white px-3 py-1.5 rounded-lg shadow-sm hover:bg-gray-100 hover:shadow-md transition text-xs"
          textStyles="hidden sm:inline"
          imageStyles="h-4 w-4"
        />
      )}
    </nav>
  );
};

export default Navbar;
