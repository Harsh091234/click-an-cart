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
    if(user.role === "seller") return navigate(`/seller/product/${product._id}`);
    navigate(`/product/${product._id}`);
  }

  return (
    <div className="bg-white rounded-xl w-full sm:w-[15rem] shadow-md p-2 flex flex-col items-center text-center hover:shadow-lg transition">
      {/* Product Image */}
      <div
        onClick={handleClick}
        className="cursor-pointer h-60 sm:h-40 w-full flex items-center justify-center bg-sky-50 rounded-lg overflow-hidden"
      >
        <img
          src={
            product.image ||
            "https://www.google.com/imgres?q=tshirt%20logo&imgurl=https%3A%2F%2Fimg.freepik.com%2Fpremium-vector%2Ft-shirt-design-template_135595-7391.jpg%3Fsemt%3Dais_hybrid%26w%3D740%26q%3D80&imgrefurl=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Ft-shirt-outline%2F60&docid=JMtpq5HhLJ3xHM&tbnid=OhRzX39Es-WE6M&vet=12ahUKEwjejvyfo6qUAxVQSmwGHaudLXUQnPAOegQIIBAA..i&w=740&h=740&hcb=2&ved=2ahUKEwjejvyfo6qUAxVQSmwGHaudLXUQnPAOegQIIBAA"
          }
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Product Info */}
      <p className="mt-3 text-lg font-semibold text-gray-800">{product.name}</p>
      <span className="text-sky-500 font-bold text-xl ">${product.price}</span>

      {/* Add to Cart Button */}
      {user.role !== "seller" && (
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
      )}
    </div>
  );
};

export default ProductCard;
