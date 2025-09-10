import React from "react";

const CategoryItemSkeleton = () => {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
  {Array.from({ length: 6 }).map((_, idx) => (
    <div
      key={idx}
      className="relative bg-sky-100 h-60 w-60 overflow-hidden rounded-xl shadow-md animate-pulse"
    >
      {/* Image placeholder */}
      <div className="h-full w-full bg-white"></div>

      {/* Overlay text placeholder */}
      <div className="absolute bottom-3 left-3 flex flex-col gap-2">
        <div className="h-4 w-24 bg-sky-200 rounded"></div>
        <div className="h-3 w-32 bg-sky-200 rounded"></div>
      </div>
    </div>
  ))}
</div>

  );
};

export default CategoryItemSkeleton;
