import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProductStore } from "../store/useProductStore";
import { useCartStore } from "../store/useCartStore";
import { Loader2, ShoppingCart } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { changeImage } from "../utils/changeImageAnimation";
import { Pencil } from "lucide-react";
import { useUserStore } from "../store/useUserStore";
import CustomBtn from "../components/ui/CustomBtn";
import EditProductModal from "../components/modals/EditProductModal";

const ProductPage = () => {
  const { product, loading, fetchProductById, editProduct } = useProductStore();

  const { user } = useUserStore();
  const { id } = useParams();
  const { addToCart } = useCartStore();
  const [isEditProductModalOpen, setIsEditProductModalOpen] = useState(false);
  const images = product?.images;
  const isAuthor = product?.author === user?._id;
  const [currentImage, setCurrentImage] = useState(0);
  const imageRef = useRef(null);

  const handleAddToCart = async () => {
    await addToCart(product);
  };
  const handleSubmit = () => {};
  useEffect(() => {
    fetchProductById(id);
  }, [id, fetchProductById, editProduct]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-sky-200 border-t-sky-500" />
      </div>
    );
  }
  if (!product) {
    return (
      <div className="flex h-screen items-center justify-center px-6">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-semibold text-gray-900">
            Product not found
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            The product you are looking for doesn’t exist or may have been
            removed.
          </p>

          <button
            onClick={() => window.history.back()}
            className="mt-6 inline-flex items-center justify-center rounded-lg bg-sky-500 px-5 py-2 text-white text-sm font-medium transition hover:bg-sky-600 active:scale-95"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="h-full flex flex-col items-center justify-center  p-2 sm:p-6 ">
      {/* Product Image */}
      <div className="relative w-full mb-3 max-w-sm mx-auto">
        <div className="overflow-hidden rounded-xl">
          <img
            ref={imageRef}
            src={images[currentImage]}
            alt={product.name}
            className="w-full h-72 object-cover"
          />
        </div>

        {images?.length > 1 && (
          <>
            <button
              disabled={currentImage === 0}
              onClick={() =>
                changeImage(
                  "prev",
                  imageRef,
                  currentImage,
                  setCurrentImage,
                  images,
                )
              }
              className={`text-gray-700  
    absolute
left-2 sm:-left-10 md:-left-12
top-1/2
-translate-y-1/2
    rounded-full 
    ${currentImage === 0 ? "opacity-40 cursor-not-allowed" : "hover:scale-110 "}
  `}
            >
              <ChevronLeft size={35} />
            </button>

            <button
              disabled={currentImage === images.length - 1}
              onClick={() =>
                changeImage(
                  "next",
                  imageRef,
                  currentImage,
                  setCurrentImage,
                  images,
                )
              }
              className={`text-gray-700
    absolute right-2 sm:-right-10 md:-right-12
top-1/2
-translate-y-1/2
    
    ${
      currentImage === images.length - 1
        ? "opacity-40 cursor-not-allowed"
        : "hover:scale-110 "
    }
  `}
            >
              <ChevronRight size={35} />
            </button>
          </>
        )}
      </div>

      {/* Product Details */}
      <div className="flex flex-col items-center gap-0.5 md:gap-1 max-w-2xl w-full text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-sky-500">
          {product.name}
        </h1>
        <p className="text-gray-600 leading-relaxed text-sm md:text-base">
          {product.description}
        </p>
        <p className="text-[1.3rem]  md:text-2xl font-bold text-sky-600">
          ${product.price}
        </p>
        <p className="text-xs  md:text-sm text-gray-500">
          In Stock: {product.stock}
        </p>
        {user.role === "seller" && isAuthor && (
          <CustomBtn
            onClick={() => setIsEditProductModalOpen(true)}
            text={"Edit Product"}
            Icon={Pencil}
            iconClassName="h-4 w-4"
            className="mt-3"
          />
        )}

        {/* Add to Cart Button */}
        {user.role !== "seller" && (
          <button
            onClick={handleAddToCart}
            disabled={loading}
            className="mt-2 mx-auto flex items-center gap-1.5 bg-sky-500 text-white px-4 text-xs md:text-sm py-1.5 rounded-lg hover:bg-sky-600 transition disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 md:w-5 md:h-5 animate-spin" />
                Adding...
              </>
            ) : (
              <>
                <ShoppingCart className="h-4 w-4 md:w-5 md:h-5" />
                Add to Cart
              </>
            )}
          </button>
        )}
      </div>

      <EditProductModal
        open={isEditProductModalOpen}
        onSubmit={handleSubmit}
        onClose={() => setIsEditProductModalOpen(false)}
      />
    </div>
  );
};

export default ProductPage;
