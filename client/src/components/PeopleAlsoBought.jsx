import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import { useCartStore } from "../store/useCartStore";
import PeopleAlsoBoughtCard from "./PeopleAlsoBoughtCard";
import PeopleAlsoBoughtSkeleton from "./skeletons/PeopleAlsoBoughtSkeleton";

const PeopleAlsoBought = () => {
  const { fetchRecommendations, recommendations, loading } = useCartStore();
  
  useEffect(() => {
    fetchRecommendations();
  }, [fetchRecommendations]);

  return (
    <div className="h-full">
      {/* Header */}
      <h2 className="text-base   font-semibold text-sky-700 opacity-80 mb-2  ">
        People Also Bought
      </h2>

      {/* Content */}
      {loading ? (
        <p className="text-gray-500 text-sm"><PeopleAlsoBoughtSkeleton /></p>
      ) : recommendations.length > 0 ? (
        <div className="flex gap-3 flex-wrap">
          {recommendations.map((item) => (
            <PeopleAlsoBoughtCard key={item._id} product={item} className="" />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-sm">
          No recommendations available right now.
        </p>
      )}
    </div>
  );
};

export default PeopleAlsoBought;
