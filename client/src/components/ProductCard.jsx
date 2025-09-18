import React, { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useUserStore } from "../store/useUserStore";
import { useCartStore } from "../store/useCartStore";
import {useNavigate} from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const [loading, setLoading] = useState(false);
  const {addToCart} = useCartStore();

  const handleAddToCart = async() => {  await addToCart(product);};
  const handleClick = () => {
    navigate(`/product/${product._id}`);
  }

  return (
    <div className="bg-white rounded-xl w-full sm:w-[15rem] shadow-md p-2 flex flex-col items-center text-center hover:shadow-lg transition">
      {/* Product Image */}
      <div onClick={handleClick} className="cursor-pointer h-60 sm:h-40 w-full flex items-center justify-center bg-sky-50 rounded-lg overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Product Info */}
      <p className="mt-3 text-lg font-semibold text-gray-800">{product.name}</p>
      <span className="text-sky-500 font-bold text-xl ">${product.price}</span>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={loading}
        className="mt-2 flex text-sm items-center gap-1.5 bg-sky-500 text-white px-3 py-2 rounded-lg hover:bg-sky-600 transition disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Adding...
          </>
        ) : (
          <>
            <ShoppingCart className="w-5 h-5" />
            Add to cart
          </>
        )}
      </button>
    </div>
  );
};

export default ProductCard;
