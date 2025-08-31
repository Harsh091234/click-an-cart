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

const App = () => {
  const { user, checkAuth, checkingAuth } = useUserStore();
   const [delayDone, setDelayDone] = useState(false);

  useEffect(() => {
    checkAuth();
    
    const timer = setTimeout(() => setDelayDone(true), 1500); 
    return () => clearTimeout(timer);
  }, [checkAuth]);
  
  return (
    <div className="h-screen bg-gray-800 text-white relative overflow-hidden flex flex-col">
      {/* Background gradient */}
      <div className="absolute inset-0 overflow-hidden h-full ">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.3)_0%,rgba(10,80,60,0.2)_45%,rgba(0,0,0,0.1)_100%)]" />
        </div>
      </div>
      {checkingAuth || !delayDone ?  <LoadingUi />:

        <div className="relative z-50 h-full flex flex-col ">
          <Navbar />
            <div className="flex-1  ">
                  <Routes>
            <Route
              path="/"
              element={user? user.isVerified? <HomePage /> : <Navigate to="/verify-email" /> : <Navigate to="/login" />}
            />
            <Route
              path="/signup"
              element={!user ? <SignupPage /> : user.isVerified ? <Navigate to="/" /> : <Navigate to="/verify-email" />}
            />
            <Route
              path="/login"
              element={!user ? <LoginPage /> : <Navigate to="/" />}
            />
             <Route
              path="/verify-email"
              element={user && !user.isVerified ? <VerifyEmailPage /> : <Navigate to="/" />}
            />
              <Route path="*" element={<NotFoundPage />} />
          </Routes>
            </div>
      
        </div>
      }
    </div>
  );
};

export default App;
