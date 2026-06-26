import React, { useEffect, useState } from "react";
import { useProductStore } from "../store/useProductStore";
import { Trash2, Star, ImageOff, Loader, Pencil } from "lucide-react";
import ProductsListSkeleton from "./skeletons/ProductsListSkeleton";
import EditProductModal from "./modals/EditProductModal";
import AdminEditProductModal from "./modals/AdminEditProductModal";

const ProductsList = () => {
  const { fetchAllProducts,  products, deleteProduct,deletingProductId, loading, toggleFeatureProduct } =
    useProductStore();
    const [modalOpen, setModalOpen] = useState(false);
    const [activeProduct, setActiveProduct] = useState(null) 
  const [showSkeleton, setShowSkeleton] = useState(true);
const handleEdit = (product) => {
  
  setActiveProduct(product);
  setModalOpen(true)
}
  
  useEffect(() => {
    fetchAllProducts();
    // force skeleton for at least 1.5s
    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [fetchAllProducts]);

  if (showSkeleton) return <ProductsListSkeleton />;
  return (
    <div className="p-4 bg-white rounded-xl shadow-md">
      {/* Mobile Layout (Cards) */}
      <div className="md:hidden max-h-87 scrollbar-hide overflow-y-auto space-y-4">
        {products?.map((p) => (
          <div
            key={p._id}
            className="p-3 border-b border-gray-200 shadow-sm hover:shadow-md transition flex flex-col justify-between"
          >
            {/* Top part: Image + info */}
            <div className="flex gap-3">
              <div className="flex-shrink-0 h-20 w-20 flex items-center justify-center rounded-lg bg-sky-200 overflow-hidden">
                {p.images ? (
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <ImageOff className="h-8 w-8 text-sky-600" />
                )}
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="font-medium text-gray-800">{p.name}</h3>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Price:</span> ${p.price}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Category:</span> {p.category}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Stock:</span> {p.stock}
                </p>
              </div>
            </div>

            {/* Bottom buttons */}
            <div className="flex justify-end gap-3 mt-2">
              <button
                onClick={() => toggleFeatureProduct(p._id)}
                className={`p-2 rounded-full transition ${
                  p.isFeatured
                    ? "bg-sky-500 text-white"
                    : "text-sky-500 hover:text-sky-600"
                }`}
              >
                <Star className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleEdit(p)}
                className="p-2 rounded-full text-blue-600 hover:text-blue-700 transition"
              >
                <Pencil className="w-4 h-4" />
              </button>
              <button
                onClick={() => deleteProduct(p._id)}
                className="text-red-500 hover:text-red-600"
              >
                {deletingProductId === p._id ? (
                  <Loader className="w-5 h-5 animate-spin" />
                ) : (
                  <Trash2 className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Layout (Table) */}
      <div className="hidden md:block max-h-96 overflow-y-auto scrollbar-hide">
        <table className="w-full border-collapse">
          <thead className="bg-sky-100 text-sky-600 sticky top-0 z-10">
            <tr>
              <th className="uppercase text-left px-4 py-2 text-sm">Product</th>
              <th className="uppercase text-left px-4 py-2 text-sm">Price</th>
              <th className="uppercase text-left px-4 py-2 text-sm">
                Category
              </th>
              <th className="uppercase text-left px-4 py-2 text-sm">
                In Stock
              </th>
              <th className="uppercase text-left px-4 py-2 text-sm">
                Featured
              </th>
              <th className="uppercase text-left px-4 py-2 text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((p) => (
              <tr
                key={p._id}
                className="border-b border-gray-300 text-sm hover:bg-sky-50 transition-colors"
              >
                <td className="px-4 py-2 flex items-center gap-2">
                  <div className="h-8 w-8 flex items-center justify-center rounded-full bg-sky-200 overflow-hidden">
                    {p.images ? (
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <ImageOff className="h-4 w-4 text-sky-600" />
                    )}
                  </div>
                  <span className="font-medium text-gray-800">{p.name}</span>
                </td>
                <td className="px-4 py-2 text-gray-700">${p.price}</td>
                <td className="px-4 py-2 text-gray-700">{p.category}</td>
                <td className="px-4 py-2 text-gray-700">{p.stock}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => toggleFeatureProduct(p._id)}
                    className={`p-1.5 rounded-full transition ${
                      p.isFeatured
                        ? "bg-sky-500 text-white"
                        : "text-sky-500 hover:text-sky-600"
                    }`}
                  >
                    <Star className="w-4 h-4" />
                  </button>
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleEdit(p)}
                    className="p-2 rounded-full text-blue-500 hover:text-blue-600 transition"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteProduct(p._id)}
                    className="p-2 rounded-full text-red-500 hover:text-red-600 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}

            {products.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="text-center text-sm pt-3 text-gray-400 italic"
                >
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <AdminEditProductModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        product={activeProduct}
      />
    </div>
  );
};

export default ProductsList;
