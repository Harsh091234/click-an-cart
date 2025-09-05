import React, { useRef, useState } from "react";
import { ArrowLeft, Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";

const VerifyEmailPage = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const { verifyEmail, resendVerificationCode, resending, user, loading } = useUserStore();

  const handleChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < otp.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleResend = async () => {
    if (!user.email) return;
      setOtp(new Array(6).fill(""));
    await resendVerificationCode(user.email);
  };

  const handleVerify = async () => {
    const code = otp.join("");
    const success = await verifyEmail(code);

    if (success.authProvider === "google") {
      navigate("/set-password");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="h-full flex justify-center items-center p-4">
      <div className="w-full max-w-md rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        {/* Content Section */}
        <div className="px-6 py-7 flex flex-col gap-3 text-center">
          <h1 className="text-3xl font-semibold text-gray-700 mb-5">
            Verify Email
          </h1>
          <p className="text-gray-500 text-sm">
            Enter the 6-digit code sent to your email address
          </p>

          {/* OTP Inputs */}
         <div className="flex justify-center gap-1.5 sm:gap-2">
  {otp.map((digit, i) => (
    <input
      key={i}
      ref={(el) => (inputRefs.current[i] = el)}
      type="text"
      maxLength={1}
      value={digit}
      onChange={(e) => handleChange(e.target.value, i)}
      onKeyDown={(e) => handleKeyDown(e, i)}
      className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 text-center text-sm sm:text-base font-semibold rounded-md border border-gray-300 bg-gray-50 text-gray-700 focus:outline-none focus:ring-1 focus:ring-sky-500"
    />
  ))}
</div>


          {/* Verify Button */}
          <button
  onClick={handleVerify}
  disabled={loading || resending} // disable in both cases
  className={`w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 mt-2 text-sm rounded-lg shadow-md transition flex justify-center items-center gap-2 ${
    loading || resending ? "opacity-60 cursor-not-allowed" : ""
  }`}
>
  {resending ? (
    <>
      <Loader className="animate-spin h-4 w-4" />
      Resending...
    </>
  ) : loading ? (
    <>
      <Loader className="animate-spin h-4 w-4" />
      Verifying...
    </>
  ) : (
    "Verify Email"
  )}
</button>


          {/* Resend link */}
          <p className="text-sm text-gray-500">
            Didn’t get the code?{" "}
            <button
              onClick={handleResend}
              className="text-sky-500 hover:text-sky-600 font-medium"
            >
              Resend
            </button>
          </p>
        </div>

        {/* Footer
        <div className="px-4 py-4 bg-sky-50 text-center border-t border-gray-200">
          <Link
            to="/login"
            className="inline-flex items-center text-sky-500 hover:text-sky-600 text-sm font-medium"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to login
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default VerifyEmailPage;
