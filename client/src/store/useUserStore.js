import toast from "react-hot-toast";
import { create } from "zustand";
import axios from "../utils/axios";


export const useUserStore = create((set, get) => ({
 
  user: null,
  clientId: null,
  loading: false,
  checkingAuth: true,

  setClientId: async () => {
    try {
      const res = await axios.get("/auth/google/client-id");
      set({ clientId: res.data.clientId });
    } catch (err) {
      console.error("Failed to load Google Client ID", err);
      return toast.error("Failed to load Google Client ID");
    }
  },
  googleLogin: async (access_token) => {
    set({ loading: true });
    try {
      const res = await axios.post("/auth/google", { access_token});
      set({ user: res.data, loading: false });
      
      toast.success(
      res.data.isVerified
        ? "User logged in successfully"
        : "Verification required. Check your email!"
    );
    } catch (err) {
    
      set({ loading: false });
       console.log("Google login failed:", err);
      toast.error("Google login failed" || err.res.data.message)
    }
  },
  signup: async ({ name, email, password, confirmPassword }) => {
    set({ loading: true });
    if (password !== confirmPassword) {
      set({ loading: false });
      return toast.error("Passwords do not match");
    }

    try {
      const res = await axios.post("/auth/register", { name, email, password });
      console.log("data:", res.data)
      set({ user: res.data, loading: false });
      toast.success("User created successfully");
    } catch (error) {
      set({ loading: false });
      toast.error(
        error.response.data.message || "Something went wrong. Please try again."
      );
    }
  },
  verifyEmail: async(code) => {
    set({loading: true});
    try {
      const res = await axios.post("/auth/verify-email", {code});
      console.log("data:", res.data)
      set({loading: false, user: res.data});

      toast.success("Email verified successfully");
    } catch (error) {
          set({ loading: false });
          console.error("Error in verifyEmail", error);
          toast.error(
        error.response.data.message || "Something went wrong. Please try again."
      );
    }
  },
  login: async ({ email, password }) => {
    set({ loading: true });

    try {
      const res = await axios.post("/auth/login", { email, password });
      set({ user: res.data, loading: false });
      toast.success("User authenticated successfully");
    } catch (error) {
      set({ loading: false });
      toast.error(
        error.response.data.message || "Something went wrong. Please try again."
      );
    }
  },

  checkAuth: async () => {
    set({ checkingAuth: true });
    try {
      const res = await axios.get("/auth/profile");
        console.log("auth user: ", res.data);
            set({ user: res.data, checkingAuth: false });
          
    } catch (error) {
      set({ user: null, checkingAuth: false });
      console.error(
        "Auth check failed:",
        error.response?.data?.message || error.message
      );
    }
  },

  logout: async () => {
    try {
      await axios.post("/auth/logout");
      set({ user: null });
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error(error.response?.data?.message || "Failed to log out.");
    }
  },
  resendVerificationCode: async (email) => {
  set({ loading: true });
  try {
    const res = await axios.post("/auth/resend-verification", { email });
    set({ loading: false });
    toast.success(res.data.message);
    return true;
  } catch (err) {
    set({ loading: false });
    console.error("Resend verification code failed", err);
    toast.error(err.response?.data?.message || "Failed to resend code");
    return false;
  }
},

}));
