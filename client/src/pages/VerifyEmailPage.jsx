import React, { useRef, useState } from "react";
import { useUserStore } from "../store/useUserStore";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";


const VerifyEmailPage = () => {
    const [otp, setOtp] = useState(new Array(6).fill(""))
     const inputRefs = useRef([]);
     const navigate = useNavigate();
     const {verifyEmail, resendVerificationCode, user, loading} = useUserStore();

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
  await resendVerificationCode(user.email);
};
  const handleVerify = async() => {
    const code = otp.join("");
   const success = await verifyEmail(code);
   

      if(success.authProvider === "google"){
        console.log("helo")
        navigate("/set-password");
      }
      else{
        navigate("/");
      }
      
         
     
    }
  
 



  return (
    <div className="flex justify-center items-center h-full">
      <div className="bg-gray-800 py-8 px-10 flex flex-col gap-5 w-fit items-center rounded-2xl shadow-lg max-w-md text-center">
        {/* Title */}
        <h1 className="text-emerald-500 text-2xl font-bold">
          Verify your email
        </h1>

        {/* Subtitle */}
        <p className="text-gray-400 text-sm leading-relaxed">
          Enter the 6 digit code sent to your email address
          
        </p>

        {/* OTP Inputs (placeholder for now) */}
        <div className="flex gap-3">
           {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => (inputRefs.current[i] = el)}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              className="w-10 h-10 text-center text-lg font-semibold rounded-lg border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          ))}
        </div>

        {/* Button */}
     <button
  onClick={handleVerify}
  disabled={loading}
  className={`bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition w-full flex items-center justify-center gap-2
    ${loading ? "opacity-50 cursor-not-allowed" : ""}
  `}
>
  {loading ? (
    <>
      <Loader className="animate-spin h-5 w-5" />
      Loading...
    </>
  ) : (
    "Verify Email"
  )}
</button>

        {/* Resend link */}
        <p className="text-sm text-gray-400">
          Didn’t get the code?{" "}
          <button onClick={handleResend} className="text-emerald-400 hover:underline font-medium">
            Resend
          </button>
        </p>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
