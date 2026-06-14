import React, { useState } from "react";
import { ShoppingCart, Loader2 } from "lucide-react";
import { useUserStore } from "../store/useUserStore";
import { useCartStore } from "../store/useCartStore";
import { useNavigate } from "react-router-dom";

const PeopleAlsoBoughtCard = ({ product }) => {
  const { user, loading } = useUserStore();
   const navigate = useNavigate();
  const { addToCart } = useCartStore();

  const handleAddToCart = async () => {
   
    await addToCart(product);

  };

   const handleClick = () => {
    navigate(`/product/${product._id}`);
  }


  return (
    <div className="bg-white rounded-lg shadow-sm p-2 flex flex-col items-center text-center hover:shadow-md transition w-44">
      {/* Product Image */}
      <div onClick={handleClick} className="h-28 w-full flex items-center justify-center bg-sky-50 rounded-md overflow-hidden cursor-pointer">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Product Info */}
      <p className="mt-2 text-sm font-medium text-gray-800 truncate w-full">
        {product.name}
      </p>
      <span className="text-sky-500 font-semibold text-base mt-1">
        ${product.price}
      </span>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={loading}
        className="mt-2 flex items-center gap-1 bg-sky-500 text-white text-xs px-2.5 py-1.5 rounded-md hover:bg-sky-600 transition disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Adding...
          </>
        ) : (
          <>
            <ShoppingCart className="w-4 h-4" />
            Add
          </>
        )}
      </button>
    </div>
  );
};

export default PeopleAlsoBoughtCard;
