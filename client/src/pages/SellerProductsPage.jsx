import React, { useEffect } from "react";
import { useProductStore } from "../store/useProductStore";
import ProductCard from "../components/ProductCard";

const SellerProductsPage = () => {
  const { fetchSellerProducts, sellerProducts, loading } = useProductStore();

  useEffect(() => {
    fetchSellerProducts();
  }, [fetchSellerProducts]);

  return (
    <div className="h-full w-full px-4 py-6 text-sky-500 overflow-y-auto scrollbar-hide">
      {/* Page Title */}
      <h1 className="text-2xl font-bold mb-6">Your Products</h1>

      {/* Loader */}
      {loading && <p className="text-gray-500">Loading your products...</p>}

      {/* No Products */}
      {!loading && sellerProducts?.length === 0 && (
        <p className="text-gray-500">You haven’t added any products yet.</p>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sellerProducts?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default SellerProductsPage;
