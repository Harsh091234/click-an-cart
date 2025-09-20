const ProductCardSkeleton = ({ count = 6 }) => {
  return (
    <div className="flex flex-wrap gap-4">
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-xl w-full sm:w-[15rem] shadow-md p-2 flex flex-col items-center text-center"
        >
          {/* Product Image Skeleton */}
          <div className="cursor-pointer h-60 sm:h-40 w-full flex items-center justify-center bg-gray-200 rounded-lg overflow-hidden animate-pulse">
            <div className="h-full w-full bg-gray-300"></div>
          </div>

          {/* Product Info Skeleton */}
          <div className="mt-3 h-5 w-3/4 bg-gray-300 rounded animate-pulse"></div>
          <div className="mt-2 h-6 w-1/2 bg-gray-400 rounded animate-pulse"></div>

          {/* Button Skeleton */}
          <div className="mt-3 h-9 w-28 bg-gray-300 rounded-lg animate-pulse"></div>
        </div>
      ))}
    </div>
  );
};

export default ProductCardSkeleton;