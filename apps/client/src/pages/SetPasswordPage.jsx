import React, { useState } from "react";

import { ArrowRight, Loader, Lock, Eye, EyeOff } from "lucide-react";
import { useUserStore } from "../store/useUserStore";
import { useNavigate } from "react-router-dom";

const SetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { loading, setUserPassword } = useUserStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await setUserPassword(password);
    if (success) {
      navigate("/");
    }
  };

  return (
    <div className="flex justify-center items-center h-full px-4 py-6">
      <div className="w-full max-w-md">
        {/* Card */}
        <div
        
          className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 sm:p-8 space-y-6"
        >
          {/* Heading */}
          <h1 className="text-3xl font-bold text-center text-gray-700">
            Set Password
          </h1>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Password Field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-600">
                Password
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-gray-50">
                <Lock className="w-5 h-5 text-gray-400" />
                <input
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  className="w-full bg-transparent outline-0 px-2 text-sm text-gray-700 placeholder-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="ml-2 text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-1 bg-sky-500 text-white font-semibold py-2 rounded-lg hover:bg-sky-600 transition disabled:opacity-70 text-sm "
            >
              {loading ? (
                <>
                  <Loader className="animate-spin w-5 h-5" />
                  Loading...
                </>
              ) : (
                <>
                  Submit
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Set Later */}
            <p className="text-right">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="text-sky-700 font-semibold hover:underline text-sm"
              >
                Set Later
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SetPasswordPage;
