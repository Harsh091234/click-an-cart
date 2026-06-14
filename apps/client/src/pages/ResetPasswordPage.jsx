import React, { useEffect, useState } from "react";
import { Loader, CheckCircle2, Eye, EyeOff } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";

const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState(false);

  const { token } = useParams();
  const navigate = useNavigate();
  const { loading, resetPassword, checkResetToken, validResetToken } =
    useUserStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await resetPassword(token, newPassword, confirmNewPassword);
    if (res?.success) {
      setSuccess(true);
      setTimeout(() => navigate("/"), 4000); // redirect after 2s
    }
  };

  useEffect(() => {
    checkResetToken(token);
  }, [token, checkResetToken]);

  if (validResetToken === false) return navigate("/forgot-password");

  return (
    <div className="h-full flex justify-center items-center p-4">
      <div className="w-full sm:max-w-md   rounded-2xl shadow-xl bg-white py-6 px-10  border border-gray-200">
        {/* Heading */}
        <h1 className="text-3xl  font-bold text-center text-gray-700 mb-7">
          Reset Password
        </h1>

        {/* Success Message */}
        {success ? (
          <div className="flex flex-col items-center text-center space-y-1">
            <CheckCircle2 className="w-12 h-12 text-sky-500" />
            <p className="text-gray-600 text-lg font-medium">
              Password reset successfully
            </p>
            <p className="text-sm text-gray-500">Redirecting you to login...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-2.5">
            {/* New Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full text-sm border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:ring-1 focus:ring-sky-500 outline-none text-gray-700 placeholder-gray-400"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Confirm New Password */}
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm New Password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                className="w-full text-sm border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:ring-1 focus:ring-sky-500 outline-none text-gray-700 placeholder-gray-400"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-sky-500 mt-4 text-sm hover:bg-sky-600 text-white font-semibold py-2 rounded-lg transition flex items-center justify-center gap-2 disabled:bg-sky-600"
            >
              {loading ? (
                <>
                  <Loader className="h-5 w-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Submit"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordPage;
