import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { useCartStore } from "../store/useCartStore";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FeaturedProducts = ({ featuredProducts }) => {
  const { addToCart } = useCartStore();
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const checkScrollPosition = () => {
    if (!scrollRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setIsAtStart(scrollLeft <= 0);
    setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 1);
  };

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const scrollAmount = 250; // adjust how much it scrolls per click

    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });

    // Give time for smooth scroll to finish before checking
    setTimeout(checkScrollPosition, 400);
  };

  useEffect(() => {
    checkScrollPosition();
    const el = scrollRef.current;
    if (!el) return;

    el.addEventListener("scroll", checkScrollPosition);
    return () => el.removeEventListener("scroll", checkScrollPosition);
  }, []);

    const handleClick = (id) => {
    navigate(`/product/${id}`);
  }
  return (
    <div className="relative w-full max-w-7xl mx-auto mt-14">
      <h1 className="text-3xl font-bold text-sky-500 text-center mb-4">
        Featured
      </h1>

      {/* Left Scroll Button */}
      <button
        onClick={() => scroll("left")}
        disabled={isAtStart}
        className={`absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full transition z-10 shadow-md
          ${isAtStart ? "bg-gray-200 cursor-not-allowed" : "bg-white hover:bg-sky-100"}`}
      >
        <ChevronLeft
          className={`w-5 h-5 ${isAtStart ? "text-gray-400" : "text-sky-500"}`}
        />
      </button>

      {/* Right Scroll Button */}
      <button
        onClick={() => scroll("right")}
        disabled={isAtEnd}
        className={`absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full transition z-10 shadow-md
          ${isAtEnd ? "bg-gray-200 cursor-not-allowed" : "bg-white hover:bg-sky-100"}`}
      >
        <ChevronRight
          className={`w-5 h-5 ${isAtEnd ? "text-gray-400" : "text-sky-500"}`}
        />
      </button>

      {/* ✅ Scrollable container */}
      <div
        ref={scrollRef}
        className="py-2 flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-8"
      >
        {featuredProducts.map((product, index) => (
          <div
           key={product._id || product.id || index}
            className="flex-shrink-0 w-48 sm:w-52 md:w-60"
          >
            <div className="bg-white rounded-xl shadow-md p-3 flex flex-col items-center">
              {/* Product Image */}
              <div onClick={() =>handleClick(product._id)} className="w-full h-40 cursor-pointer">
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
