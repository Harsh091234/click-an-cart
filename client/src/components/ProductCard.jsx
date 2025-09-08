import React, { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useUserStore } from "../store/useUserStore";
import { useCartStore } from "../store/useCartStore";

const ProductCard = ({ product }) => {
  const { user } = useUserStore();
  const [loading, setLoading] = useState(false);
  const {addToCart} = useCartStore();

  const handleAddToCart = async() => {  await addToCart(product);};
  console.log(product);

  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center text-center hover:shadow-lg transition">
      {/* Product Image */}
      <div className="h-40 w-56 flex items-center justify-center bg-sky-50 rounded-lg overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Product Info */}
      <p className="mt-3 text-lg font-semibold text-gray-800">{product.name}</p>
      <span className="text-sky-500 font-bold text-xl ">{product.price}</span>

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
