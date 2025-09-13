import React from "react";

const ProductsListSkeleton = () => {
  return (
    <div className="p-4 bg-white rounded-xl shadow-md animate-pulse">
      {/* Mobile Layout (Cards) */}
      <div className="md:hidden max-h-87 overflow-y-auto space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="p-3 border-b border-gray-200 shadow-sm flex flex-col gap-3"
          >
            {/* Top part: image + info */}
            <div className="flex gap-3">
              <div className="h-20 w-20 rounded-lg" />
              <div className="flex flex-col gap-2 flex-1">
                <div className="h-4 w-28 rounded" />
                <div className="h-3 w-20 rounded" />
                <div className="h-3 w-24 rounded" />
                <div className="h-3 w-16 rounded" />
              </div>
            </div>

            {/* Bottom buttons */}
            <div className="flex justify-end gap-3">
              <div className="h-8 w-8 bg-sky-100 rounded-full" />
              <div className="h-8 w-8 bg-sky-100 rounded-full" />
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Layout (Table) */}
      <div className="hidden md:block max-h-96 overflow-y-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 text-gray-400 sticky top-0 z-10">
            <tr>
              <th className="uppercase text-left px-4 py-2 text-sm">Product</th>
              <th className="uppercase text-left px-4 py-2 text-sm">Price</th>
              <th className="uppercase text-left px-4 py-2 text-sm">Category</th>
              <th className="uppercase text-left px-4 py-2 text-sm">In Stock</th>
              <th className="uppercase text-left px-4 py-2 text-sm">Featured</th>
              <th className="uppercase text-left px-4 py-2 text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4].map((i) => (
              <tr
                key={i}
                className="border-b border-gray-300 text-sm hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-2 flex items-center gap-2">
                  <div className="h-8 w-8 bg-gray-200 rounded-full" />
                  <div className="h-4 w-24 bg-gray-200 rounded" />
                </td>
                <td className="px-4 py-2">
                  <div className="h-4 w-16 bg-gray-200 rounded" />
                </td>
                <td className="px-4 py-2">
                  <div className="h-4 w-20 bg-gray-200 rounded" />
                </td>
                <td className="px-4 py-2">
                  <div className="h-4 w-12 bg-gray-200 rounded" />
                </td>
                <td className="px-4 py-2">
                  <div className="h-8 w-8 bg-gray-200 rounded-full" />
                </td>
                <td className="px-4 py-2">
                  <div className="h-8 w-8 bg-gray-200 rounded-full " />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsListSkeleton;
