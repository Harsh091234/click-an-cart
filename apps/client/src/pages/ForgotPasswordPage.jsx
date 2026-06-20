import React, { useRef, useState } from "react";
import { ArrowLeft, Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForgotPasswordSchema } from "@repo/shared";
import { useAnimatedFormErrors } from "../hooks/UseAnimatedFormErrors";

const ForgotPasswordPage = () => {
  
  
  const [otpSent, setOtpSent] = useState(false);



  const { forgotPassword, loading } = useUserStore();
 const inputRefs = useRef({});
  const errorRefs = useRef({})
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ForgotPasswordSchema),

  });

  const { ref: emailRef, ...emailField } = register("email");

  const email = watch("email"); 


  const onSubmit = async ({email}) => {
   
    const success = await forgotPassword(email); 
    if(success){
      setOtpSent(true)
    }
  };


    useAnimatedFormErrors({
      errors,
      inputRefs,
      errorRefs,
      fields: ["email"],
    });
  


  return (
    <div className="h-full flex justify-center items-center p-4">
      <div className="w-full sm:max-w-md bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        {/* Content Section */}
        <div className="px-6 py-7  text-center">
          <h1 className="text-2xl font-semibold text-gray-700 mb-7">
            Forgot Password
          </h1>

          {!otpSent ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <p className="text-gray-500 text-sm mb-4">
                Enter your email to receive a password reset code
              </p>

              <input
                type="text"
                placeholder="Enter your email"
                {...emailField}
                ref={(el) => {
                  emailRef(el); // RHF ref
                  inputRefs.current.email = el; // your ref
                }}
                className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 bg-gray-50 text-gray-700 focus:outline-none focus:ring-1 focus:ring-sky-500"
              />

              <p
                ref={(el) => (errorRefs.current.email = el)}
                className="text-red-500 text-sm mt-1 text-left"
              >
                {errors.email?.message}
              </p>

              <button
                type="submit"
                disabled={loading}
                className={`w-full mt-4 bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 text-sm rounded-lg shadow-md transition flex justify-center items-center gap-2 ${
                  loading ? "opacity-60 cursor-not-allowed" : ""
                }`}
              >
                {loading ? (
                  <>
                    <Loader className="animate-spin h-4 w-4" />
                    Sending...
                  </>
                ) : (
                  "Send Reset Code"
                )}
              </button>
            </form>
          ) : (
            <>
              <p className="text-base mt-6 text-gray-600">
                <span className="block font-medium text-green-600">
                  OTP sent successfully!
                </span>
                <span className="block mt-1">
                  Please check your inbox:{" "}
                  <span className="font-semibold text-gray-800">{email}</span>
                </span>
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-4 bg-sky-50 text-center border-t border-gray-200">
          <Link
            to="/login"
            className="inline-flex items-center text-sky-500 hover:text-sky-600 text-sm font-medium"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
