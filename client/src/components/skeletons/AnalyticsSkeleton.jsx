import React from "react";

const AnalyticsSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 animate-pulse">
      {/* Top Cards Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-md p-4 shadow border border-gray-100"
          >
            <div className="flex justify-between items-center">
              <div>
                {/* Title */}
                <div className="h-3 w-20 bg-gray-200 rounded mb-2"></div>
                {/* Value */}
                <div className="h-5 w-16 bg-gray-300 rounded"></div>
              </div>
              {/* Icon Placeholder */}
              <div className="h-12 w-12 bg-gray-100 rounded-full"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Skeleton */}
      <div className="bg-white rounded-md p-4 shadow border border-gray-100">
        {/* Heading */}
        <div className="h-4 w-40 bg-gray-200 rounded mb-4"></div>
        {/* Chart area */}
        <div className="h-[270px] bg-gray-100 rounded"></div>
      </div>
    </div>
  );
};

export default AnalyticsSkeleton;
