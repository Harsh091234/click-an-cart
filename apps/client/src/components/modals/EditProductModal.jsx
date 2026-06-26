  import React, { useEffect, useRef, useState } from "react";
  import { CirclePlus, Loader, Upload, X } from "lucide-react";
  import CustomModal from "./CustomModal";
  import { useAnimatedFormErrors } from "../../hooks/UseAnimatedFormErrors";
  import { useUserStore } from "../../store/useUserStore";
  import { useForm } from "react-hook-form";
  import { zodResolver } from "@hookform/resolvers/zod";
  import { EditProductSchema } from "@repo/shared";
  import Input from "../Input";
  import FormError from "../FormError";
  import { categories } from "../../constants/index";
  import { useProductStore } from "../../store/useProductStore";
  import ProductImagesModal from "./ProductImagesModal";

  const EditProductModal = ({ open, onClose}) => {
    
  const { user } = useUserStore();
  const [images, setImages] = useState([]);
  const [removedImages, setRemovedImages] = useState([]);
    const [isProductsImagesModalOpen, setIsProductsImagesModalOpen] =
      useState(false);
    const [error, setError] = useState("");
    const [uploadStatus, setUploadStatus] = useState("");
    // "success" | "error" | ""
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm({
      resolver: zodResolver(EditProductSchema),
      shouldUnregister: true,
    });
    const {editProduct, product, loading} = useProductStore();

    const { ref: nameRef, ...nameField } = register("name");
    const { ref: descriptionRef, ...descriptionField } = register("description");
    const { ref: priceRef, ...priceField } = register("price");
    const { ref: categoryRef, ...categoryField } = register("category");
    const { ref: stockRef, ...stockField } = register("stock");

    const inputRefs = useRef({});
    const errorRefs = useRef({});

  const onSubmit = async (data) => {
    const formData = new FormData();

    
  images
    .filter((img) => !img.existing)
    .forEach((img) => {
      formData.append("images", img.file);
    });

  if (removedImages.length) {
    formData.append("removedImages", JSON.stringify(removedImages));
  }

    // Append only changed fields
  if (data.name !== undefined && data.name !== product.name) {
    formData.append("name", data.name);
  }

  if (
    data.description !== undefined &&
    data.description !== product.description
  ) {
    formData.append("description", data.description);
  }

  if (data.price !== undefined && data.price !== String(product.price)) {
    formData.append("price", data.price);
  }

  if (data.stock !== undefined && data.stock !== String(product.stock)) {
    formData.append("stock", data.stock);
  }

  if (data.category !== undefined && data.category !== product.category) {
    formData.append("category", data.category);
  }
    const success = await editProduct(product._id, formData);

    if (success) {
      onClose();
      setUploadStatus("");
      setError("");
    }
  };

    const handleDone = () => {
      if (images.length > 0) {
        setUploadStatus("success");
        setIsProductsImagesModalOpen(false);
      } else {
        setUploadStatus("error");
      }
    };

    const handleImageChange = (e) => {
      const files = Array.from(e.target.files);

      if (files.length + images.length > 5) {
        setError("You can only upload up to 5 images");
        return;
      }

      const newImages = files.map((file) => ({
        file,
        url: URL.createObjectURL(file),
        existing: false,
      }));

      setImages((prev) => [...prev, ...newImages]);
      setError("");
    };
  const removeImage = (index) => {
    const image = images[index];

    if (image.existing) {
      setRemovedImages((prev) => [...prev, image.url]);
    }

    setImages((prev) => prev.filter((_, i) => i !== index));
  };


    useEffect (() => {
      if (open && product) {
        reset({
          name: product.name,
          description: product.description,
          price: String(product.price),
          stock: String(product.stock),
          category: product.category,
        });

        setImages(
          product.images.map((url) => ({
            url,
            existing: true,
          })),
        );
  setRemovedImages([]);
        setError("");
        setUploadStatus("");
      }
    }, [open, product, reset]);

        useAnimatedFormErrors({
          errors,
          inputRefs,
          errorRefs,
          fields: ["name", "description", "price", "category", "stock"],
        });

    return (
      <CustomModal open={open} onClose={onClose} title="Edit Product">
        <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
          {/* Row: Product Name + Price */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
            <div className="w-full sm:w-[60%]">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Product Name
              </label>
              <Input
                {...nameField}
                ref={(el) => {
                  nameRef(el);
                  inputRefs.current.name = el;
                }}
              />
              <FormError
                error={errors.name}
                errorRef={(el) => (errorRefs.current.name = el)}
              />
            </div>
            <div className="w-full sm:w-[40%]">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Price
              </label>
              <Input
                type="text"
                {...priceField}
                ref={(el) => {
                  priceRef(el);
                  inputRefs.current.price = el;
                }}
              />

              <FormError
                error={errors.price}
                errorRef={(el) => (errorRefs.current.price = el)}
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Description
            </label>
            <textarea
              {...descriptionField}
              ref={(el) => {
                descriptionRef(el);
                inputRefs.current.description = el;
              }}
              className="w-full h-30 resize-none overflow-y-auto   rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-700 focus:outline-none"
            />

            <FormError
              error={errors.description}
              errorRef={(el) => (errorRefs.current.description = el)}
            />
          </div>

          {/* Row: Category + Stock */}
          <div className="flex gap-3 sm:gap-6">
            <div className="w-[60%]">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Category
              </label>
              <select
                {...categoryField}
                ref={(el) => {
                  categoryRef(el);
                  inputRefs.current.category = el;
                }}
                className="w-full    rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-700 focus:outline-none"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              <FormError
                error={errors.category}
                errorRef={(el) => (errorRefs.current.category = el)}
              />
            </div>
            <div className="w-[40%]">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Count in Stock
              </label>
              <Input
                type="text"
                {...stockField}
                ref={(el) => {
                  stockRef(el);
                  inputRefs.current.stock = el;
                }}
              />

              <FormError
                error={errors.stock}
                errorRef={(el) => (errorRefs.current.stock = el)}
              />
            </div>
          </div>

          {/* Upload + Submit */}
          <div className="flex flex-col gap-3 sm:flex-row  items-center justify-between pt-2">
            <div className="flex flex-col sm:flex-row items-center w-full sm:w-auto gap-2">
              <label
                onClick={() => setIsProductsImagesModalOpen(true)}
                className={`flex items-center justify-center gap-1 
        bg-sky-100 border border-sky-200 text-sky-600 
        px-4 py-1.5 rounded-md font-medium text-sm 
        hover:bg-sky-200 transition cursor-pointer 
        w-full sm:w-32 text-center`} // full width before sm
              >
                <Upload className="h-3.5 w-3.5" />
                <span>Upload</span>
              </label>
              {uploadStatus === "success" && (
                <span className="text-blue-500 text-sm">
                  Image uploaded successfully
                </span>
              )}

              {uploadStatus === "error" && (
                <span className="text-red-500 text-sm">
                  Failed to upload images
                </span>
              )}

              {/* {
                <span className="text-sm text-gray-400">
                  Image uploaded success
                </span>
              } */}
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`flex items-center font-medium justify-center gap-1 sm:w-34 px-6 py-1.5 rounded-md w-full text-sm transition shadow text-white ${
                loading
                  ? "bg-sky-600 cursor-not-allowed"
                  : "bg-sky-500 hover:bg-sky-600"
              }`}
            >
              {loading ? (
                <>
                  <Loader className="h-3.5 w-3.5 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <CirclePlus className="h-3.5 w-3.5" />
                  Update
                </>
              )}
            </button>
          </div>
        </form>
        <ProductImagesModal
          images={images}
          open={isProductsImagesModalOpen}
          onClose={() => {
            setImages([]);
            setUploadStatus("error");
            setIsProductsImagesModalOpen(false);
          }}
          handleImageChange={handleImageChange}
          removeImage={removeImage}
          error={error}
          onDone={handleDone}
        />
      </CustomModal>
    );
  };

  export default EditProductModal;
