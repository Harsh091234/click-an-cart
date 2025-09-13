import React, { useState } from "react";
import { LogOut, Lock, Star, Menu, ShoppingCart, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";
import { useNavigate } from "react-router-dom";
import GoogleLoginButton from "./ui/GoogleLoginButton";
import { useCartStore } from "../store/useCartStore";

const Navbar = () => {
  const navigate = useNavigate();
  const { logout, user } = useUserStore();
  const { cart } = useCartStore();
   const [menuOpen, setMenuOpen] = useState(false);

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
        <div className="">
          {/* for desktop */}
          <div className="flex items-center gap-2 text-xs"> <div className="flex gap-2">
         <Link
  to="/"
  className="hidden sm:flex items-center gap-1 bg-white text-sky-600 font-semibold px-3 py-1.5 rounded-lg shadow-sm hover:bg-gray-100 hover:shadow-md transition"
>
  <Home className="w-4 h-4 text-sky-600" />
  <span className="hidden md:inline">Home</span>
</Link>

   <Link
  to="/cart"
  className="hidden sm:flex items-center gap-1 relative bg-white text-sky-600 font-semibold px-3 py-1.5 rounded-lg shadow-sm hover:bg-gray-100 hover:shadow-md transition"
>
  <ShoppingCart className="w-4 h-4 text-sky-600" />
  <span className="hidden md:inline">Cart</span>

  {cart.length > 0 && (
    <span className="absolute -top-1 -right-1.5 bg-sky-500 text-white text-[0.6rem] font-bold px-[6px] py-[1px] rounded-full shadow-md border border-white">
      {cart.length}
    </span>
  )}
</Link>

  </div>
  {user.role === "admin" &&   <Link
    to="/secret-dashboard"
    className="hidden sm:flex items-center gap-1 bg-white text-sky-600 font-semibold px-3 py-1.5 rounded-lg shadow-sm hover:bg-gray-100 hover:shadow-md transition"
  >
    <Lock className="w-4 h-4 text-sky-600" />
    <span className="hidden md:inline">Dashboard</span>
  </Link>}


  {/* <Link
    to="/premium"
    className="hidden sm:flex items-center gap-1 bg-white text-sky-600 font-semibold px-3 py-1.5 rounded-lg shadow-sm hover:bg-gray-100 hover:shadow-md transition"
  >
    <Star className="w-4 h-4 text-sky-600" />
    <span className="hidden sm:inline">Get CartPlus</span>
  </Link> */}

  <button
    onClick={handleLogout}
    className="hidden sm:flex items-center gap-1 text-red-600 font-semibold bg-white px-3 py-1.5 rounded-lg shadow-sm hover:bg-gray-100 hover:shadow-md transition"
  >
    <LogOut className="h-4 w-4" />{" "}
    <span className="hidden md:inline">Logout</span>
  </button>
          
        {/* Mobile Hamburger */}
        <button
  className="sm:hidden text-white transition-transform duration-300"
  onClick={() => setMenuOpen(!menuOpen)}
>
  <Menu
    className={`w-6 h-6 transform transition-transform duration-300 ${
      menuOpen ? "rotate-90" : "rotate-0"
    }`}
  />
</button>

          </div>
         
          {/* for mobile */}
        <div>

   <div
  className={`absolute top-11.5 right-3.5 w-50 bg-white rounded-xl shadow-xl p-2 z-50 flex flex-col items-center gap-1 text-sm font-medium text-gray-700 transform transition-all duration-300 ease-in-out ${
    menuOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
  }`}
>
  <Link
    to="/"
    onClick={() => setMenuOpen(false)}
    className="w-full text-center py-2 rounded-lg hover:bg-sky-100 transition"
  >
    Home
  </Link>

  <Link
    to="/cart"
    className="relative  w-full text-center py-2 rounded-lg hover:bg-sky-100 transition"
    onClick={() => setMenuOpen(false)}
  >
    Cart
    {cart.length > 0 && (
      <span className="absolute px-1 py-[0.087rem] top-2.5 right-13 bg-sky-500 text-white text-[0.55rem] sm:text-[0.65rem] font-bold sm:px-2 sm:py-0.5 rounded-full shadow">
        {cart.length}
      </span>
    )}
  </Link>
    {user.role === "admin" &&    <Link
    to="/secret-dashboard"
    onClick={() => setMenuOpen(false)}
    className="w-full text-center py-2 rounded-lg hover:bg-sky-100 transition"
  >
    Dashboard
  </Link>
}

  <button
    onClick={handleLogout}
    className="w-full text-center py-2 rounded-lg text-red-600 font-semibold hover:bg-red-50 transition"
  >
    Logout
  </button>
</div>


</div>

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