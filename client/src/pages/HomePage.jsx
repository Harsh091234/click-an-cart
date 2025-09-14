import React, { useEffect, useState } from "react";
import CategoryItem from "../components/CategoryItem";
import CategoryItemSkeleton from "../components/skeletons/CategoryItemSkeleton";
import { useProductStore } from "../store/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";
import { RefreshCw } from "lucide-react";
import { useUserStore } from "../store/useUserStore";
import { useNavigate } from "react-router-dom";

const categories = [
  { href: "/jeans", name: "Jeans", imageUrl: "/jeans.jpg" },
  { href: "/t-shirts", name: "T-shirts", imageUrl: "/tshirts.jpg" },
  { href: "/shoes", name: "Shoes", imageUrl: "/shoes.jpg" },
  { href: "/glasses", name: "Glasses", imageUrl: "/glasses.png" },
  { href: "/jackets", name: "Jackets", imageUrl: "/jackets.jpg" },
  { href: "/suits", name: "Suits", imageUrl: "/suits.jpg" },
];

const HomePage = () => {
   const [hover, setHover] = useState(false);
  const { loading, fetchFeaturedProducts,products } = useProductStore();
  const [delayedLoading, setDelayedLoading] = useState(true);
  const {switchLoading, switchRole, user} = useUserStore();
  const navigate = useNavigate();
  useEffect(() => {
    let timer;
    if (!loading) {
      // Add a delay before hiding skeleton
      timer = setTimeout(() => {
        setDelayedLoading(false);
      }, 1000); // delay of 1 second
    } else {
      setDelayedLoading(true);
    }

    return () => clearTimeout(timer);
  }, [loading]);

  	useEffect(() => {
		fetchFeaturedProducts();
	}, [fetchFeaturedProducts]);
  const handleClick = async() => {
      await switchRole();
      navigate("/");
  }
  return (
    <div className="h-full px-3 py-3  justify-center text-black overflow-y-auto w-full">
      <h1 className="mt-8 mb-3 text-center text-4xl font-bold text-sky-500">
        Explore Our Categories
      </h1>
      <p className="mt-2 mb-7 text-center text-gray-600">
        Discover the latest trends in eco-friendly fashion
      </p>

      <div className="flex  w-full justify-center   ">
        <div className="justify-center md:justify-start flex gap-3 flex-wrap max-w-[58.6rem]" >
{delayedLoading
          ? Array.from({ length: 6 }).map((_, idx) => (
              <CategoryItemSkeleton key={idx} />
            ))
          : categories.map((category) => (
              <CategoryItem key={category.name} category={category} />
            ))}
        </div>
        
      </div>

      	{!loading && products.length > 0 && 
      
           <FeaturedProducts featuredProducts={products} />
     } {user.role !== "admin" &&     <button
        onClick={handleClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="absolute bottom-10 right-10 flex items-center justify-center rounded-full bg-sky-500 text-white 
                   hover:bg-white hover:text-sky-500 p-3 shadow-lg transition-all duration-300"
      >
        <RefreshCw size={17} />

        {/* Hover label */}
        {hover && (
          <span
            className="absolute bottom-0 right-15 bg-white text-sky-600 text-xs px-3 py-1 rounded-lg shadow-md
                       transition-all duration-300 whitespace-nowrap"
          >
            Switch to Admin
          </span>
        )}
      </button> }
    
    </div>
  );
};

export default HomePage;
