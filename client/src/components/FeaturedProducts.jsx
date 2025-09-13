import { ShoppingCart } from "lucide-react";
import { useCartStore } from "../store/useCartStore";

const FeaturedProducts = ({ featuredProducts }) => {
  const { addToCart } = useCartStore();

  return (
    <div className="relative w-full max-w-7xl mx-auto py-5">
      <h1 className="text-3xl font-bold text-sky-500 text-center mb-4">
        Featured
      </h1>

      {/* ✅ Scrollable container */}
      <div
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-2"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {featuredProducts.map((product) => (
          <div
            key={product.id}
            className="flex-shrink-0 w-48 sm:w-50 md:w-60 scroll-snap-align-start "
          >
            <div className="bg-white rounded-xl shadow-md p-3 flex flex-col items-center">
              {/* Product Image */}
              <div className="w-full h-40">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover rounded"
                />
              </div>

              {/* Product Details */}
              <h3 className="mt-2 text-sm md:text-base font-medium truncate text-center">
                {product.name}
              </h3>
              <p className="text-xs md:text-sm text-sky-500 font-bold">
                ₹{product.price}
              </p>

              {/* Add to Cart Button */}
              <button
                onClick={() => addToCart(product)}
                className="mt-2 flex items-center gap-1 text-xs md:text-sm bg-sky-500 text-white px-3 py-1.5 rounded-md hover:bg-sky-600 transition"
              >
                <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
                Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
