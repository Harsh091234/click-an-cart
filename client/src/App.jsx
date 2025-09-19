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

const App = () => {
  const { user, checkAuth, checkingAuth, hasPassword } = useUserStore();
  const [delayDone, setDelayDone] = useState(false);
  const {getCartItems} = useCartStore();

  useEffect(() => {
    checkAuth();

    const timer = setTimeout(() => setDelayDone(true), 1500);
    return () => clearTimeout(timer);
  }, [checkAuth]);

  useEffect(() => {
    if(!user) return;
    getCartItems()
  }, [getCartItems, user])
  return (
    <div className="h-screen bg-base-300  text-black relative  flex flex-col">
    

      {checkingAuth || !delayDone ? (
        <LoadingUi />
      ) : (
        <div className="relative z-50 h-full flex flex-col overflow-hidden">
          <Navbar />
          <div className="flex-1  overflow-hidden">
            <Routes>
              {/* Root route */}
              <Route
                path="/"
                element={
                  user ? (
                    user.isVerified ? (
                      <HomePage />
                    ) : (
                      <Navigate to="/verify-email" />
                    )
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              //seller route
                <Route
                path="/seller"
                element={
                  user ? (
                    user.isVerified ? (
                      <SellerHomePage />
                    ) : (
                      <Navigate to="/verify-email" />
                    )
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
                <Route
                path="/seller/create"
                element={
                  user ? (
                    user.isVerified ? (
                      <SellerCreateProductsPage />
                    ) : (
                      <Navigate to="/verify-email" />
                    )
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
                <Route
                path="/seller/products"
                element={
                  user ? (
                    user.isVerified ? (
                      <SellerProductsPage />
                    ) : (
                      <Navigate to="/verify-email" />
                    )
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              
          <Route
  path="/secret-dashboard"
  element={
    user ? (
      user.isVerified ? (
        <AdminPage />
      ) : (
        <Navigate to="/verify-email" />
      )
    ) : (
      <Navigate to="/login" />
    )
  }
/>



          
              <Route
                path="/signup"
                element={!user ? <SignupPage /> : <Navigate to="/" />}
              />

              <Route
                path="/login"
                element={!user ? <LoginPage /> : <Navigate to="/" />}
              />

              <Route
                path="/verify-email"
                element={
                  user ? (
                    !user.isVerified ? (
                      <VerifyEmailPage />
                    ) : (
                      <Navigate to="/" />
                    )
                  ) : (
                    <Navigate to="/signup" />
                  )
                }
              />

              <Route
                path="/set-password"
                element={
                  user ? (
                    !user.hasPassword ? (
                      <SetPasswordPage />
                    ) : (
                      <Navigate to="/" />
                    )
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />

            
              <Route
                path="/forgot-password"
                element={
                   <ForgotPasswordPage />
                }
              />
              <Route
                path="/reset-password/:token"
                element={
              <ResetPasswordPage />
                }
              />
              <Route
  path="/category/:category"
  element={
    user ? (
      user.isVerified ? (
        <CategoryPage />
      ) : (
        <Navigate to="/verify-email" />
      )
    ) : (
      <Navigate to="/login" />
    )
  }
/>
  <Route
  path="/cart"
  element={
    user ? (
      user.isVerified ? (
        <CartPage />
      ) : (
        <Navigate to="/verify-email" />
      )
    ) : (
      <Navigate to="/login" />
    )
  }
/>

  <Route
  path="/purchase-success"
  element={
    user ? (
      user.isVerified ? (
        <PurchaseSuccessPage />
      ) : (
        <Navigate to="/verify-email" />
      )
    ) : (
      <Navigate to="/login" />
    )
  }
/>

  <Route
  path="/purchase-cancel"
  element={
    user ? (
      user.isVerified ? (
        <PurchaseCancelPage />
      ) : (
        <Navigate to="/verify-email" />
      )
    ) : (
      <Navigate to="/login" />
    )
  }
/>

  <Route
  path="/product/:id"
  element={
    user ? (
      user.isVerified ? (
        <ProductPage/>
      ) : (
        <Navigate to="/verify-email" />
      )
    ) : (
      <Navigate to="/login" />
    )
  }
/>
  <Route
  path="seller/product/:id"
  element={
    user ? (
      user.isVerified ? (
        <SellerProductPage/>
      ) : (
        <Navigate to="/verify-email" />
      )
    ) : (
      <Navigate to="/login" />
    )
  }
/>
           
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </div>
      )}
    </div>


  );
};

export default App;
