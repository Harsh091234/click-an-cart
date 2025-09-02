import React, { useState } from "react";
import { Mail, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const { forgotPassword } = useUserStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await forgotPassword(email);
    if (res?.success) {
      
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-4 sm:p-6 md:p-8 lg:p-12">
      <div
        className="
          w-full 
          bg-gray-800 rounded-2xl shadow-xl overflow-hidden
          sm:max-w-md md:max-w-lg lg:max-w-xl 2xl:max-w-2xl
        "
      >
        {/* Form Section */}
        <div className="px-6 py-10 sm:px-8 sm:py-10 md:px-10 md:py-12 lg:px-12 lg:py-14  space-y-6 md:space-y-8">
          <div className="text-center">
            {emailSent ? (
              <h1 className="text-base sm:text-lg md:text-xl font-bold text-emerald-500">
                Email Sent Successfully. <br />
                 Check your inbox.
              </h1>
            ) : (
              <>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-emerald-500 mb-2">
                  Forgot Password
                </h1>
                <p className="text-gray-400 text-sm sm:text-base md:text-lg">
                  Enter your email address and we'll send you a link to reset your
                  password
                </p>
              </>
            )}
          </div>

          {!emailSent && (
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div className="flex items-center border border-gray-600 rounded-lg px-3 py-2 md:px-4 md:py-3 focus-within:ring-2 focus-within:ring-emerald-500">
                <Mail className="text-emerald-500 mr-2 h-5 w-5 md:h-6 md:w-6" />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full outline-none text-gray-200 bg-gray-800 placeholder-gray-400 text-sm sm:text-base md:text-lg"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold 
                  py-2 sm:py-2.5 md:py-3 lg:py-3.5 
                  text-sm sm:text-base md:text-lg
                  rounded-lg shadow-md transition flex justify-center items-center gap-2
                  ${loading ? "opacity-50 cursor-not-allowed" : ""}
                `}
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 sm:px-6 py-4 bg-gray-900 text-center border-t border-gray-700">
          <Link
            to="/login"
            className="inline-flex items-center 
              text-emerald-500 hover:text-emerald-400 
              text-sm sm:text-base md:text-lg font-medium
            "
          >
            <ArrowLeft className="mr-1 h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
