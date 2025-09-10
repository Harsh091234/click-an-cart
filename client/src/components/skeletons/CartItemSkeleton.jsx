import React from "react";

const CartItemsSkeleton = () => {
  return (
    <div className="w-full flex flex-col gap-1">
     

      {Array.from({ length: 2 }).map((_, idx) => (
        <div
          key={idx}
          className="flex items-center bg-white p-2 rounded-xl shadow-sm mb-2.5 animate-pulse"
        >
          <div className="w-28 h-28 rounded-lg bg-gray-300 flex-shrink-0"></div>
          <div className="flex flex-col ml-3 w-full justify-between gap-2">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            <div className="flex justify-between items-center mt-2">
              <div className="flex gap-2">
                <div className="w-6 h-6 bg-gray-300 rounded"></div>
                <div className="w-6 h-6 bg-gray-300 rounded"></div>
              </div>
              <div className="w-10 h-4 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartItemsSkeleton;
