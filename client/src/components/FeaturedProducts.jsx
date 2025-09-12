import { useEffect, useState } from "react";
import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { useCartStore } from "../store/useCartStore";

const FeaturedProducts = ({ featuredProducts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  const { addToCart } = useCartStore();

  useEffect(() => {
    const handleResize = () => {
         const width = window.innerWidth;
       if (width < 640) {
      // default / mobile
      setItemsPerPage(1);
    }
     else if (width < 820) {
      // small screens
      setItemsPerPage(2);
    }  
    else if (width < 1024) {
      // small screens
      setItemsPerPage(3);
    } else if (width < 1280) {
      // medium screens
      setItemsPerPage(4);
    } else {
      // large screens
      setItemsPerPage(8);
    }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => prevIndex + itemsPerPage);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => prevIndex - itemsPerPage);
  };

  const isStartDisabled = currentIndex === 0;
  const isEndDisabled = currentIndex >= featuredProducts.length - itemsPerPage;

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-4xl font-bold text-sky-500 mb-6">
          Featured
        </h2>
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
              }}
            >
              {featuredProducts?.map((product) => (
  <div
    key={product._id}
    className={`flex-shrink-0 px-2`}
    style={{ width: `${100 / itemsPerPage}%` }} // dynamic width per slide
  >
    <div className="bg-white rounded-xl shadow-md overflow-hidden h-full transition-all duration-300 hover:shadow-lg border border-sky-100">
      <div className="overflow-hidden h-48 w-full">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
        />
      </div>
      <div className="py-3 px-5">
        <h3 className="text-lg font-semibold text-gray-800">
          {product.name}
        </h3>
        <p className="text-sky-500 font-bold mb-2">
          ${Number(product.price).toFixed(2)}
        </p>
        <button
          onClick={() => addToCart(product)}
          className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold text-sm py-2 px-4 rounded-lg transition-colors duration-300 
          flex items-center justify-center"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </button>
      </div>
    </div>
  </div>
))}
            </div>
          </div>

          {/* Left button */}
          <button
            onClick={prevSlide}
            disabled={isStartDisabled}
            className={`absolute top-1/2 -left-4 transform -translate-y-1/2 p-2 rounded-full shadow-md transition-colors duration-300 ${
              isStartDisabled
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-sky-500 hover:bg-sky-600 text-white"
            }`}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right button */}
          <button
            onClick={nextSlide}
            disabled={isEndDisabled}
            className={`absolute top-1/2 -right-4 transform -translate-y-1/2 p-2 rounded-full shadow-md transition-colors duration-300 ${
              isEndDisabled
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-sky-500 hover:bg-sky-600 text-white"
            }`}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
