import React, { useEffect, useRef, useState } from "react";
import { Loader, CheckCircle2, Eye, EyeOff } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";
import { ResetPasswordSchema } from "@repo/shared";
import { useAnimatedFormErrors } from "../hooks/UseAnimatedFormErrors";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const ResetPasswordFormSchema = ResetPasswordSchema.extend({
  confirmNewPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  path: ["confirmNewPassword"],
  message: "Passwords do not match",
});

const ResetPasswordPage = () => {
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const inputRefs = useRef({});
  const errorRefs = useRef({});

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ResetPasswordFormSchema),
  });

  const { token } = useParams();
  const navigate = useNavigate();
  const { loading, resetPassword, checkResetToken, validResetToken } =
    useUserStore();

  const onSubmit = async ({ newPassword}) => {
    const res = await resetPassword(token, newPassword);

    if (res?.success) {
      setSuccess(true);
      setTimeout(() => navigate("/"), 4000);
    }
  };
  const { ref: newPasswordRef, ...newPasswordRegister } =
    register("newPassword");

    const { ref: confirmPasswordRef, ...confirmPasswordRegister } =
      register("confirmNewPassword");

  useEffect(() => {
    checkResetToken(token);
  }, [token, checkResetToken]);

  useAnimatedFormErrors({
    errors,
    inputRefs,
    errorRefs,
    fields: ["newPassword", "confirmNewPassword"],
  });

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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* New Password */}
            <div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="New Password"
                  {...newPasswordRegister}
                  ref={(el) => {
                    newPasswordRef(el);
                    inputRefs.current.newPassword = el;
                  }}
                  className="w-full text-sm border border-gray-300 rounded-lg px-4 py-2.5 pr-11
        focus:ring-1 focus:ring-sky-500 focus:border-sky-500 outline-none
        text-gray-700 placeholder-gray-400 transition-colors"
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

              <p
                ref={(el) => (errorRefs.current.newPassword = el)}
                className="text-red-500 text-sm mt-1 overflow-hidden"
                style={{ opacity: 0, height: 0 }}
              >
                {errors.newPassword?.message}
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm New Password"
                  {...confirmPasswordRegister}
                  ref={(el) => {
                    confirmPasswordRef(el);
                    inputRefs.current.confirmNewPassword = el;
                  }}
                  className="w-full text-sm border border-gray-300 rounded-lg px-4 py-2.5 pr-11
        focus:ring-1 focus:ring-sky-500 focus:border-sky-500 outline-none
        text-gray-700 placeholder-gray-400 transition-colors"
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

              <p
                ref={(el) => (errorRefs.current.confirmNewPassword = el)}
                className="text-red-500 text-sm mt-1 overflow-hidden"
                style={{ opacity: 0, height: 0 }}
              >
                {errors.confirmNewPassword?.message}
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-sky-500 hover:bg-sky-600 disabled:bg-sky-400
    text-white font-semibold py-2.5 rounded-lg transition
    flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Resetting...
                </>
              ) : (
                "Reset Password"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordPage;
