import { create } from "zustand";
import axios from "../utils/axios";
import toast from "react-hot-toast";

export const useCartStore = create((set, get) => ({
    cart: [],
    total: 0,
    coupon: null,
    subTotal: 0,
    isCouponApplied: false,
    recommendations: [],
    loading: false,

    getCartItems: async () => {
    try {
      set({loading: true});
      const res = await axios.get("/cart");
      console.log("res: ", res.data)
      set({ cart: res.data, loading: false });
      get().calculateTotals();
    } catch (err) {
         set({ cart: [] , loading:false});
      console.error("Error fetching cart items:", err);
    }
  },
  clearCart: () => {
    set({cart: [], coupon: null, total:0, subTotal: 0});
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
  updateQuantity: async (productId, quantity) => {
    if(quantity === 0){
      get().removeFromCart(productId);
    }
    if(quantity > 10){
    return toast("Maximum limit reached — upgrade to CartPlus for extended access.", {
  icon: "ℹ️",
  style: {
    borderRadius: "8px",
    background: "#f0f4ff",
    color: "#1e3a8a",
  },
});



    }
    axios.put(`/cart/${productId}`, {quantity});
    set((prevState) => ({
      cart: prevState.cart.map(item => item._id === productId ? {...item, quantity}: item)
    }))
    get().calculateTotals();
  },


fetchRecommendations: async () => {
  set({ loading: true });
  try {
    const res = await axios.get("/products/recommendations");
    set({ recommendations: res.data, loading: false });
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    set({ recommendations: [], loading: false }); 
  }
},

  calculateTotals: () => {
    set({loading : true})
    const {cart, coupon} = get();
    const subTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let total = subTotal;

    if(coupon){
        const discount = subTotal * (coupon.discountPercentage / 100);
        const total = subTotal - discount;
    }

    set({subTotal, total, loading:false});

  },

  getMyCoupon: async() => {
    try {
      const response = await axios.get("/coupons");
      set({coupon: response.data})
    } catch (error) {
      console.error("Error in getMyCoupon: ", error);
    }
  },

  applyCoupon: async(code) => {
    try {
      const res = await axios.post("/coupons/validate", {code});
      set({coupon: res.data, isCouponApplied: true});
      get().calculateTotals();
      toast.success("Coupon applied successfully");  
    } catch (error) {
            console.error("Error applying coupon:", error);
         toast.error(error.response.data.message);
    }
  },

  removeCoupon: async() => {
    set({coupon: null, isCouponApplied: false});
      get().calculateTotals();
      toast.success("Coupon removed successfully");
  }
}));



