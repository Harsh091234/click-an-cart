import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useProductStore } from "../store/useProductStore";
import { useCartStore } from "../store/useCartStore";
import { Loader2, ShoppingCart } from "lucide-react";
const ProductPage = () => {
    const {products} = useProductStore();
      const [loading, setLoading] = useState(false);
    const {id} = useParams();
const {addToCart} = useCartStore();
    const handleAddToCart = async() => {  await addToCart(product);};


    const product = products.find((p)=> p._id === id);
    if(!product){
        return <div>Product not found</div>
    }
  return (
    <div className="h-full flex flex-col items-center justify-center  p-2 sm:p-6 ">
      {/* Product Image */}
      <div className="w-full h-50  min-[330px]:w-70 sm:w-60 sm:h-60   md:w-70 md:h-70  mb-2 md:mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col gap-0.5 md:gap-1 max-w-2xl w-full text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-sky-500">{product.name}</h1>
        <p className="text-gray-600 leading-relaxed text-sm md:text-base">{product.description}</p>
        <p className="text-[1.3rem]  md:text-2xl font-bold text-sky-600">${product.price}</p>
        <p className= "text-xs  md:text-sm text-gray-500">In Stock: {product.stock}</p>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={loading}
          className="mt-2 mx-auto flex items-center gap-1.5 bg-sky-500 text-white px-4 text-xs md:text-sm py-1.5 rounded-lg hover:bg-sky-600 transition disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 md:w-5 md:h-5 animate-spin" />
              Adding...
            </>
          ) : (
            <>
              <ShoppingCart className="h-4 w-4 md:w-5 md:h-5" />
              Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
