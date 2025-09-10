import React from "react";
import {  ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const EmptyCart = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center p-6">
      {/* Icon with background */}
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-sky-100 text-sky-500 mb-4 animate-bounce">
        <ShoppingCart className="w-10 h-10" />
      </div>

      {/* Title */}
      <h2 className="text-2xl font-semibold text-sky-500">
        Your cart is empty
      </h2>

      {/* Subtitle */}
      <p className="text-base text-gray-500 mt-2">
        Looks like you haven’t added anything yet.
      </p>

      {/* CTA Button */}
      <Link to="/" className="mt-6 px-5 py-2.5 bg-sky-500 text-white rounded-lg shadow hover:bg-sky-600 transition">
        Start Shopping
      </Link>
    </div>
  );
};

export default EmptyCart;
