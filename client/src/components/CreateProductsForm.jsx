import { Upload, CirclePlus, Loader } from "lucide-react";
import React, { useState } from "react";
import { useProductStore } from "../store/useProductStore";
import {useUserStore} from "../store/useUserStore";
const categories = [
  "jeans",
  "t-shirts",
  "shoes",
  "glasses",
  "jackets",
  "suits",
  "bags",
];

const CreateProductsForm = () => {
  const {loading, uploading, createProducts, createSellerProduct} = useProductStore();
   const {user} = useUserStore();
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    image: null,
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if(file){
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct({...newProduct, image: reader.result});
      }
      reader.readAsDataURL(file);
    }
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
   
    if(user && user.role === "seller"){
      await createSellerProduct(newProduct);
    }
    else{
       await createProducts(newProduct);
    }
   
    
    setNewProduct({ name: "", description: "", price: "", category: "", image: "" ,  stock: "",});
  };

  return (
    <div className="w-full sm:max-w-xl mx-auto bg-white shadow rounded-xl border border-gray-200 py-5 px-7 h-full ">
      <h1 className="text-[1.77rem] font-semibold text-sky-500 mb-6 text-center">
        Create New Product
      </h1>

      <form className="space-y-3" onSubmit={handleSubmit}>
        {/* Row: Product Name + Price */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="w-full sm:w-[60%]">
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              className="w-full outline-0 rounded-md border border-gray-300 px-2 py-1 text-sm focus:ring-1 focus:ring-sky-500 focus:border-sky-500"
            />
          </div>
          <div className="w-full sm:w-[40%]">
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              className="w-full outline-0 rounded-md border border-gray-300 px-2 py-1 text-sm focus:ring-1 focus:ring-sky-500 focus:border-sky-500"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
            className="w-full  outline-0 rounded-md border border-gray-300 px-2 py-1 text-sm h-8 sm:h-20 resize-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500"
          />
        </div>

        {/* Row: Category + Stock */}
        <div className="flex gap-3">
          <div className="w-[60%]">
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Category
            </label>
            <select
              name="category"
              value={newProduct.category}
              onChange={(e) =>
                setNewProduct({ ...newProduct, category: e.target.value })
              }
              className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm focus:ring-1 focus:ring-sky-500 focus:border-sky-500"
            >
              <option value="" disabled>
                Select Category
              </option>
              {categories.map((cat) => (
                <option key={cat} value={cat} className="text-gray-700 text-sm">
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="w-[40%]">
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Count in Stock
            </label>
            <input
              type="number"
              name="stock"
              value={newProduct.stock}
              onChange={(e) =>
                setNewProduct({ ...newProduct, stock: e.target.value })
              }
              className="w-full rounded-md outline-0 border border-gray-300 px-2 py-1 text-sm focus:ring-1 focus:ring-sky-500 focus:border-sky-500"
            />
          </div>
        </div>

        {/* Upload + Submit */}
        <div className="flex flex-col gap-3 sm:flex-row  items-center justify-between pt-2">
         <div className="flex flex-col sm:flex-row items-center w-full sm:w-auto gap-2">
  <input
    type="file"
    id="fileUpload"
    name="image"
    onChange={handleImageChange}
    className="hidden"
    accept="image/*"
  />
  <label
    htmlFor="fileUpload"
    className={`flex items-center justify-center gap-1 
      bg-sky-100 border border-sky-200 text-sky-600 
      px-4 py-1.5 rounded-md font-medium text-sm 
      hover:bg-sky-200 transition cursor-pointer 
      w-full sm:w-32 text-center`} // full width before sm
  >
    {uploading ? (
      <>
        <Loader className="h-3.5 w-3.5 animate-spin" />
        <span>Uploading...</span>
      </>
    ) : (
      <>
        <Upload className="h-3.5 w-3.5" />
        <span>Upload</span>
      </>
    )}
  </label>

  {newProduct.image && (
    <span className="text-sm text-gray-400">Image uploaded success</span>
  )}
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
                Creating...
              </>
            ) : (
              <>
                <CirclePlus className="h-3.5 w-3.5" />
                Create
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProductsForm;
