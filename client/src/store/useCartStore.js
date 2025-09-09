import { create } from "zustand";
import axios from "../utils/axios";
import toast from "react-hot-toast";

export const useCartStore = create((set, get) => ({
    cart: [],
    total: 0,
    coupon: null,
    subTotal: 0,

    getCartItems: async () => {
    try {
      const res = await axios.get("/cart");
      console.log("res: ", res.data)
      set({ cart: res.data });
      get().calculateTotals();
    } catch (err) {
         set({ cart: [] });
      console.error("Error fetching cart items:", err);
    }
  },

  addToCart: async (product) => {
      console.log("product: ", product);
    try {
    
      await axios.post("/cart", { productId: product._id });
      toast.success("Product added to cart");
set((prevState) => {
				const existingItem = prevState.cart.find((item) => item._id === product._id);
				const newCart = existingItem
					? prevState.cart.map((item) =>
							item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
					  )
					: [...prevState.cart, { ...product, quantity: 1 }];
				return { cart: newCart };
			});
			get().calculateTotals();
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add product to cart");
    }
  },
removeFromCart: async (productId) => {
  try {
    
    await axios.delete("/cart", { data: { productId } });


    set((prevState) => ({
      cart: prevState.cart.filter(item => item._id !== productId)
    }));
      get().calculateTotals();
    toast.success("Product removed from cart");
  } catch (error) {
    console.error("Error removing product from cart:", error);
    toast.error("Failed to remove product from cart");
  }
},

  calculateTotals: () => {
    const {cart, coupon} = get();
    const subTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let total = subTotal;

    if(coupon){
        const discount = subTotal * (coupon.discountPercentage / 100);
        const total = subTotal - discount;
    }

    set({subTotal, total});

  }
}));



