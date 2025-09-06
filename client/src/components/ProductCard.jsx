import React from "react";
import { ShoppingCart } from "lucide-react";

const ProductCard = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center text-center hover:shadow-lg transition">
      {/* Product Image */}
      <div className="h-40 w-56 flex items-center justify-center bg-sky-50 rounded-lg overflow-hidden">
       
        <img
          src=""
          alt="Sun Glasses"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Product Info */}
      <p className="mt-3 text-lg font-semibold text-gray-800">Sun Glasses</p>
      <span className="text-sky-500 font-bold text-xl ">$19</span>

      {/* Add to Cart Button */}
      <button className="mt-2 flex text-sm items-center gap-1.5 bg-sky-500 text-white px-3 py-2 rounded-lg hover:bg-sky-600 transition">
        <ShoppingCart className="w-5 h-5" />
        Add to cart
      </button>
    </div>
  );
};

export default ProductCard;
