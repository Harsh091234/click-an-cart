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
  
}));