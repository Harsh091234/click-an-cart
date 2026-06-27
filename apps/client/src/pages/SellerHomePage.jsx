import React, { useEffect } from "react";
import { useProductStore } from "../store/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";
import { useUserStore } from "../store/useUserStore";
import SwitchRoleButton from "../components/ui/SwitchRoleButton";
import { Link } from "react-router-dom";
import { PlusSquare, Boxes } from "lucide-react";

const SellerHomePage = () => {
  const { loading, fetchFeaturedProducts, products } = useProductStore();
  const { user } = useUserStore();

  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);

  return (
    <div className="h-full px-3 py-3 overflow-y-auto w-full scrollbar-hide">
      {/* Two Box Divs */}
      <div className="flex  px-3 flex-col justify-center sm:flex-row gap-4 sm:gap-6 mt-5 sm:mt-6">
        {/* Create Product Box */}
        {/* Create Product Box */}
        <Link
          to="/seller/create"
          className="relative w-full h-60 sm:h-78 sm:w-1/2 sm:max-w-sm  bg-gray-200 hover:bg-gray-50 rounded-lg flex justify-center items-center shadow-md overflow-hidden group transform transition duration-300 hover:scale-105 cursor-pointer"
        >
          {/* Icon */}
          <PlusSquare
            strokeWidth={2}
            className="w-15 h-15 sm:w-20 sm:h-20 text-sky-500 opacity-50 group-hover:scale-110 transition-transform duration-300"
          />

          {/* Text */}
          <h1 className="absolute bottom-5 left-5 text-xl font-semibold text-sky-500">
            Create Product
          </h1>
        </Link>

        {/* View Products Box */}
        <Link
          to="/seller/products"
          className="relative w-full h-60 sm:h-78 sm:w-1/2 sm:max-w-sm bg-gray-200 hover:bg-gray-50 rounded-lg flex justify-center items-center shadow-md overflow-hidden group transform transition duration-300 hover:scale-105 cursor-pointer"
        >
          {/* Background Icon */}
          <Boxes
            strokeWidth={1.5}
            className="w-17 h-17 sm:w-20 sm:h-20  text-sky-500 opacity-50 group-hover:scale-110 transition-transform duration-300"
          />

          {/* Text */}
          <h1 className="absolute bottom-5 left-5 text-xl font-semibold text-sky-500">
            View Products
          </h1>
        </Link>
      </div>

      {/* Featured Products Section */}
      {!loading && products.length > 0 && (
        <div className="mt-8">
          <FeaturedProducts featuredProducts={products} />
        </div>
      )}

      {/* Switch Role Button */}
      {user.role !== "admin" && <SwitchRoleButton />}
    </div>
  );
};

export default SellerHomePage;
