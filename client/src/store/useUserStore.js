import toast from "react-hot-toast";
import { create } from "zustand";
import axios from "../utils/axios";

export const useUserStore = create((set, get) => ({
  user: null,
  loading: false,
  checkingAuth: true,

  signup: async ({ name, email, password, confirmPassword }) => {
    set({ loading: true });
    if (password !== confirmPassword) {
      set({ loading: false });
      return toast.error("Passwords do not match");
    }

    try {
      const res = await axios.post("/auth/register", { name, email, password });
      set({ user: res.data, loading: false });
      toast.success("User created successfully");
    } catch (error) {
      set({ loading: false });
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
}));
