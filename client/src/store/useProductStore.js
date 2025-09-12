import toast from "react-hot-toast";
import { create } from "zustand";
import axios from "../utils/axios"
export const useProductStore = create((set) => ({
    loading: false,
    uploading: false,
    products: [],
    
    setProducts: (products) => set({products}),
    createProducts: async(productData) => {
        set({ loading: true });
		try {
            console.log("data: ", productData)
			const res = await axios.post("/products", productData);
          
            set((previousState) => ({
                products: [...previousState.products, res.data],
                loading: false,
            }))
            set({loading: false})
            toast.success("Product created successfully.")
			
		} catch (error) {
			toast.error(error.response.data.error);
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
  toggleFeatureProduct: async(productId) => {
      set({loading: true});
      try {
        const res = await axios.patch(`/products/${productId}`)
        set((prevProducts) => ({
          products: prevProducts.products.map((product) => product._id === productId ? {...product, isFeatured: res.data.isFeatured} : product),
          loading: false,
        }))

      } catch (error) {
        set({loading: false});
        toast.error(error.response.data.error || "Failed to update product");
      }
  },
   deleteProduct: async (productId) => {
    set({ loading: true });
    try {
      await axios.delete(`/products/${productId}`);   
      set((prevProducts) => ({
        products: prevProducts.products.filter((product) => product._id !== productId), loading:false
      }));

      toast.success("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product", error);
      toast.error(error.response?.data?.message || "Failed to delete product");
    } 
  },
  fetchProductsByCategory: async(category) => {
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