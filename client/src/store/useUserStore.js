import toast from "react-hot-toast";
import { create } from "zustand";
import axios from "../utils/axios";

export const useUserStore = create((set, get) => ({
  user: null,
  clientId: null,
  loading: false,
  resending: false,
  checkingAuth: true,
  validResetToken: null,

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
      const res = await axios.post("/auth/google", { access_token });
      set({ user: res.data, loading: false });

      toast.success(
        res.data.isVerified
          ? "User logged in successfully"
          : "Verification required. Check your email!"
      );
      return res.data;
    } catch (err) {
      set({ loading: false });
      console.log("Google login failed:", err);
      toast.error("Google login failed" || err.res.data.message);
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
      console.log("data:", res.data);
      set({ user: res.data, loading: false });
      toast.success("User created successfully");
      return true;
    } catch (error) {
      set({ loading: false });
      toast.error(
        error.response.data.message || "Something went wrong. Please try again."
      );
    }
  },
  verifyEmail: async (code) => {
    set({ loading: true });
    try {
      const res = await axios.post("/auth/verify-email", { code });
      console.log("data:", res.data);
      set({ loading: false, user: res.data });

      toast.success("Email verified successfully");
      return res.data;
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
      toast.success("User logout successfully.");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error(error.response?.data?.message || "Failed to log out.");
    }
  },
  resendVerificationCode: async (email) => {
    set({ resending: true });
    try {
      const res = await axios.post("/auth/resend-verification", { email });
      set({ resending: false });
      toast.success(res.data.message);
      return true;
    } catch (err) {
      set({ resending: false });
      console.error("Resend verification code failed", err);
      toast.error(err.response?.data?.message || "Failed to resend code");
      return false;
    }
  },
  forgotPassword: async (email) => {
    set({ loading: true });
    try {
      const res = await axios.post("/auth/forgot-password", { email });

      toast.success(res.data.message);
      set({ loading: false });
      return res.data;
    } catch (err) {
      console.log("Error in Forgot password:", err);
      toast.error(err.response.data.message || "Forgot password failed");
      set({ loading: false });
    }
  },
  resetPassword: async (code, newPassword, confirmNewPassword) => {
    set({ loading: true });
    if (confirmNewPassword !== newPassword) {
      set({ loading: false });
      return toast.error("Passwords do not match");
    }
    try {
      const res = await axios.post(`/auth/reset-password/${code}`, {
        newPassword,
      });

      toast.success(res.data.message);
      set({ loading: false });
      return res.data;
    } catch (err) {
      console.error("Reset password error:", err);
      toast.error(err.response.data.message || "Something went wrong");
      set({ loading: false });
    }
  },
  checkResetToken: async (token) => {
    try {
      await axios.get(`/auth/verify-reset-token/${token}`);
      set({ validResetToken: true });
    } catch (err) {
      set({ validResetToken: false });
      console.error("Error in password reset token", err);
    }
  },
  setUserPassword: async (password) => {
    try {
      set({ loading: true });

      const res = await axios.post("/auth/set-password", { password });
      console.log("res", res.data);
      set({
        user: res.data,
      });
      toast.success("Password set successfully");
      return res.data;
    } catch (err) {
      set({
        loading: false,
      });
      console.error("Error setting password:", err);
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  },

  refreshToken: async () => {
    if (get().checkingAuth) return;

    set({ checkingAuth: true });
    try {
      const res = await axios.post("/auth/refresh-token");
const { accessToken } = res.data;
axios.defaults.withCredentials = true;

set({ checkingAuth: false });

      return res.data;
    } catch (error) {
      set({ user: null, checkingAuth: false });
      throw error;
    }
  },
}));

let refreshPromise = null;

//to refresh access token
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        if (refreshPromise) {
          await refreshPromise;
          return axios(originalRequest);
        }

        refreshPromise = useUserStore.getState().refreshToken();
        await refreshPromise;
        refreshPromise = null;

        return axios(originalRequest);
      } catch (refreshError) {
        useUserStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
