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

const App = () => {
  const { user, checkAuth, checkingAuth, hasPassword } = useUserStore();
  const [delayDone, setDelayDone] = useState(false);


  useEffect(() => {
    checkAuth();

    const timer = setTimeout(() => setDelayDone(true), 1500);
    return () => clearTimeout(timer);
  }, [checkAuth]);

  return (
    <div className="h-screen bg-white  text-white relative  flex flex-col">
      {/* Background gradient */}

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

              {/* Auth related routes */}
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

              {/* Forgot/reset password */}
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

              {/* Catch-all */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
