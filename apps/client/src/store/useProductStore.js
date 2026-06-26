import toast from "react-hot-toast";
import { create } from "zustand";
import axios from "../utils/axios";
import SellerProductsPage from "../pages/SellerProductsPage";
export const useProductStore = create((set, get) => ({
  loading: false,
  uploading: false,
  products: [],
  deletingProductId: null,
  product: null,
  sellerProducts: [],
  setSellerProducts: (products) => set({ sellerProducts }),
  setProducts: (products) => set({ products }),
  createProducts: async (productData) => {
    set({ loading: true });
    try {
      const res = await axios.post("/products", productData);

      set((previousState) => ({
        products: [...previousState.products, res.data],
        loading: false,
      }));
      set({ loading: false });
      toast.success("Product created successfully.");
      return true;
    } catch (error) {
      toast.error(error.response.data.error);
      set({ loading: false });
    }
  },

  createSellerProduct: async (productData) => {
    set({ loading: true });
    try {
      const res = await axios.post("/products/seller", productData);

      set((previousState) => ({
        products: [...previousState.products, res.data],
        loading: false,
      }));
      set({ loading: false });
      toast.success("Product created successfully.");
      return true;
    } catch (error) {
      toast.error("Product creation failed");
      set({ loading: false });
    }
  },

  editProduct: async (productId, formData) => {
    set({ loading: true });
    try {
      const res = await axios.patch(`/products/edit/${productId}`, formData);
      set((state) => ({
        products: state.products.map((p) =>
          p._id === productId ? res.data : p,
        ),
        product: state.product?._id === productId ? res.data : state.product,
      }));
      set({ loading: false });
      toast.success("Product edited successfully.");
      return true;
    } catch (error) {
      toast.error("Product editing failed");
      set({ loading: false });
    }
  },
  fetchAllProducts: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("/products");
      if (!res || !res.data) {
        throw new Error("No response from backend");
      }

      set({ products: res.data.products, loading: false });
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error(error.response?.data?.message || "Failed to fetch products");
      set({ loading: false });
    }
  },
  fetchProductById: async (productId) => {
    set({ loading: true });
    try {
      const res = await axios.get(`/products/${productId}`);
      if (!res || !res.data) {
        throw new Error("No response from backend");
      }

      set({ product: res.data, loading: false });
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error(error.response?.data?.message || "Failed to fetch product");
      set({ loading: false });
    }
  },
  fetchSellerProducts: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("/products/seller");

      if (!res || !res.data) {
        throw new Error("No response from backend");
      }

      set({ sellerProducts: res.data, loading: false });
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error(error.response?.data?.message || "Failed to fetch products");
      set({ loading: false, sellerProducts: [] });
    }
  },

  toggleFeatureProduct: async (productId) => {
    set({ loading: true });
    try {
      const res = await axios.patch(`/products/${productId}`);
      set((prevProducts) => ({
        products: prevProducts.products.map((product) =>
          product._id === productId
            ? { ...product, isFeatured: res.data.isFeatured }
            : product,
        ),
        loading: false,
      }));
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.error || "Failed to update product");
    }
  },
  deleteProduct: async (productId) => {
      set({ deletingProductId: productId });
    try {
      set((state) => ({
        products: state.products.filter((p) => p._id !== productId),
      }));

      toast.success("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product", error);
      toast.error(error.response?.data?.message || "Failed to delete product");
    } finally {
      set({ deletingProductId: null });
    } 
  },
  fetchProductsByCategory: async (category) => {
    try {
      set({ loading: true });
      const res = await axios.get(`/products/category/${category}`);
      set({ products: res.data.products, loading: false });
    } catch (err) {
      console.error("Error fetching products by category:", err);
      set({ loading: false });
    }
  },
  fetchFeaturedProducts: async () => {
    set({ loading: true });
    try {
      const response = await axios.get("/products/featured");
      set({ products: response.data, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch products", loading: false });
      console.log("Error fetching featured products:", error);
    }
  },
}));
