import React, { useEffect, useState } from "react";
import { useThemeStore } from "./store/useThemeStore";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import { useUserStore } from "./store/useUserStore";

import LoadingUi from "./components/ui/LoadingUi";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import NotFoundPage from "./pages/NotPageFound";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import SetPasswordPage from "./pages/SetPasswordPage";
import AdminPage from "./pages/AdminPage";
import CategoryPage from "./pages/CategoryPage";
import { useCartStore } from "./store/useCartStore";
import CartPage from "./pages/CartPage";
import PurchaseSuccessPage from "./pages/PurchaseSuccessPage";
import PurchaseCancelPage from "./pages/PurchaseCancelPage";
import ProductPage from "./pages/ProductPage";
import SellerHomePage from "./pages/SellerHomePage";
import SellerCreateProductsPage from "./pages/SellerCreateProductsPage";
import SellerProductsPage from "./pages/SellerProductsPage";
import SellerProductPage from "./pages/SellerProductPage";
import ProtectedRoute from "./routes/ProtectedRoutes";
import PublicOnlyRoutes from "./routes/PublicOnlyRoutes";
import SellerOnlyRoutes from "./routes/SellerOnlyRoutes";
import BuyerOnlyRoutes from "./routes/BuyerOnlyRoutes";
import AdminOnlyRoutes from "./routes/AdminOnlyRoutes";

const App = () => {
  const { user, checkAuth, checkingAuth } = useUserStore();
  const [delayDone, setDelayDone] = useState(false);
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
                element={  <ProtectedRoute>
                <BuyerOnlyRoutes>
                  <PurchaseSuccessPage />
                </BuyerOnlyRoutes>
               </ProtectedRoute>}
              />
              <Route
                path="/purchase-cancel"
                element={  <ProtectedRoute>
                <BuyerOnlyRoutes>
                  <PurchaseCancelPage />
                </BuyerOnlyRoutes>
               </ProtectedRoute>}
              />
           
              <Route
                path="/product/:id"
                element={  <ProtectedRoute>
                <BuyerOnlyRoutes>
                  <ProductPage />
                </BuyerOnlyRoutes>
               </ProtectedRoute>}
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
