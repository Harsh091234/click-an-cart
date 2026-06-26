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
    <div className="group w-full max-w-[270px] overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Image */}
      <div
        onClick={handleClick}
        className="relative aspect-square cursor-pointer overflow-hidden bg-gray-100"
      >
        <img
          src={
            product?.images?.[0] ||
            "https://via.placeholder.com/500x500?text=No+Image"
          }
          alt={product.name}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 p-5">
        <div>
          <h2 className="line-clamp-2 text-lg font-semibold leading-6 text-gray-800">
            {product.name}
          </h2>

          <p className="mt-2 text-2xl font-bold text-sky-600">
            ${product.price}
          </p>
        </div>

        {user.role !== "seller" && (
          <button
            onClick={handleAddToCart}
            disabled={loading}
            className="mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-sky-500 py-2 font-medium text-white transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Adding...
              </>
            ) : (
              <>
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
