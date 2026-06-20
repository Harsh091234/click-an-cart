import React, { useEffect, useState, lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useUserStore } from "./store/useUserStore";

import LoadingUi from "./components/ui/LoadingUi";
import { useCartStore } from "./store/useCartStore";

const HomePage = lazy(() => import("./pages/HomePage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const VerifyEmailPage = lazy(() => import("./pages/VerifyEmailPage"));
const NotFoundPage = lazy(() => import("./pages/NotPageFound"));
const ForgotPasswordPage = lazy(() => import("./pages/ForgotPasswordPage"));
const ResetPasswordPage = lazy(() => import("./pages/ResetPasswordPage"));
const SetPasswordPage = lazy(() => import("./pages/SetPasswordPage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const PurchaseSuccessPage = lazy(() => import("./pages/PurchaseSuccessPage"));
const PurchaseCancelPage = lazy(() => import("./pages/PurchaseCancelPage"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const SellerHomePage = lazy(() => import("./pages/SellerHomePage"));
const SellerCreateProductsPage = lazy(
  () => import("./pages/SellerCreateProductsPage"),
);
const SellerProductsPage = lazy(() => import("./pages/SellerProductsPage"));
const SellerProductPage = lazy(() => import("./pages/SellerProductPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));

import ProtectedRoute from "./routes/ProtectedRoutes";
import PublicOnlyRoutes from "./routes/PublicOnlyRoutes";
import SellerOnlyRoutes from "./routes/SellerOnlyRoutes";
import BuyerOnlyRoutes from "./routes/BuyerOnlyRoutes";
import AdminOnlyRoutes from "./routes/AdminOnlyRoutes";

const App = () => {
  const { user, checkAuth, checkingAuth } = useUserStore();

  const { getCartItems } = useCartStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!user) return;

    getCartItems();
  }, [getCartItems, user]);
  if (checkingAuth)
    return (
      <div className="h-screen">
        {" "}
        <LoadingUi />
      </div>
    );
  return (
    <div className="h-screen bg-base-300  text-black relative  flex flex-col">
      <div className="relative z-50 h-full flex flex-col overflow-hidden">
        <Navbar />
        <div className="flex-1  overflow-hidden">
          <Suspense
            fallback={
              <div className="h-screen">
                <LoadingUi />
              </div>
            }
          ></Suspense>
          <Routes>
            {/* Root route */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <BuyerOnlyRoutes>
                    <HomePage />
                  </BuyerOnlyRoutes>
                </ProtectedRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicOnlyRoutes>
                  <SignupPage />
                </PublicOnlyRoutes>
              }
            />
            <Route
              path="/login"
              element={
                <PublicOnlyRoutes>
                  <LoginPage />
                </PublicOnlyRoutes>
              }
            />
            <Route
              path="/set-password"
              element={
                <ProtectedRoute>
                  <SetPasswordPage />
                </ProtectedRoute>
              }
            />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route
              path="/reset-password/:token"
              element={<ResetPasswordPage />}
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route path="/verify-email" element={<VerifyEmailPage />} />
            //seller root
            <Route
              path="/seller"
              element={
                <ProtectedRoute>
                  <SellerOnlyRoutes>
                    {" "}
                    <SellerHomePage />
                  </SellerOnlyRoutes>
                </ProtectedRoute>
              }
            />
            <Route
              path="/seller/create"
              element={
                <ProtectedRoute>
                  <SellerOnlyRoutes>
                    <SellerCreateProductsPage />
                  </SellerOnlyRoutes>
                </ProtectedRoute>
              }
            />
            <Route
              path="/seller/products"
              element={
                <ProtectedRoute>
                  <SellerOnlyRoutes>
                    <SellerProductsPage />
                  </SellerOnlyRoutes>
                </ProtectedRoute>
              }
            />
            <Route
              path="seller/product/:id"
              element={
                <ProtectedRoute>
                  <SellerOnlyRoutes>
                    <SellerProductPage />
                  </SellerOnlyRoutes>
                </ProtectedRoute>
              }
            />
            // buyer route
            <Route
              path="/category/:category"
              element={
                <ProtectedRoute>
                  <BuyerOnlyRoutes>
                    <CategoryPage />
                  </BuyerOnlyRoutes>
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <BuyerOnlyRoutes>
                    <CartPage />
                  </BuyerOnlyRoutes>
                </ProtectedRoute>
              }
            />
            <Route
              path="/purchase-success"
              element={
                <ProtectedRoute>
                  <BuyerOnlyRoutes>
                    <PurchaseSuccessPage />
                  </BuyerOnlyRoutes>
                </ProtectedRoute>
              }
            />
            <Route
              path="/purchase-cancel"
              element={
                <ProtectedRoute>
                  <BuyerOnlyRoutes>
                    <PurchaseCancelPage />
                  </BuyerOnlyRoutes>
                </ProtectedRoute>
              }
            />
            <Route
              path="/product/:id"
              element={
                <ProtectedRoute>
                  <BuyerOnlyRoutes>
                    <ProductPage />
                  </BuyerOnlyRoutes>
                </ProtectedRoute>
              }
            />
            <Route
              path="/secret-dashboard"
              element={
                <ProtectedRoute>
                  <AdminOnlyRoutes>
                    <AdminPage />
                  </AdminOnlyRoutes>
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
