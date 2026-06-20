
import {Lock, Mail,  UserPlus, ArrowRight, Loader, Eye, EyeOff, User} from "lucide-react"
import { Link, useNavigate } from 'react-router-dom'
import { useUserStore } from '../store/useUserStore'
import GoogleLoginButton from '../components/ui/GoogleLoginButton'
import { useEffect, useRef, useState } from "react"
import {useAnimatedFormErrors} from "../hooks/UseAnimatedFormErrors"
  import { useForm } from "react-hook-form";
  import { zodResolver } from "@hookform/resolvers/zod";
  import {RegisterSchema} from "@repo/shared"
import z from "zod"
import gsap from "gsap"
const RegisterFormSchema = RegisterSchema.extend({
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const SignupPage = () => {
  const {signup, loading}  = useUserStore();
 const navigate = useNavigate();
   const [showPassword, setShowPassword] = useState(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
    const inputRefs = useRef({});
  const errorRefs = useRef({});

    const {
      register,
      handleSubmit,
    
      formState: { errors },
    } = useForm({
      resolver: zodResolver(RegisterFormSchema),
    
    });


    const onSubmit = async (data) => {
      const success = await signup(data);

      if (success) {
        navigate("/verify-email");
      }
    };


    useAnimatedFormErrors({
      errors,
      inputRefs,
      errorRefs,
      fields: ["name", "email", "password", "confirmPassword"],
    });

  return (
    <div className="flex h-full ">
      <div className="flex flex-col h-full items-center justify-center w-full md:w-[50%] lg:w-[35%] px-3 py-2">
        <div className="w-full  flex flex-col md:w-[70%] lg:w-[60%] xl:w-[45%]">
          {/* Title */}
          <h1 className="text-gray-700 font-semibold text-[1.1rem] md:text-[1.3rem] lg:text-[1.5rem] text-left">
            Register Account
          </h1>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center mt-3 md:mt-9 w-full"
          >
            {/* Full Name */}
            <div className="flex flex-col gap-1 mb-2.5 w-full">
              <label className="text-xs text-gray-600 font-semibold">
                Full Name
              </label>
              <div
                ref={(el) => (inputRefs.current.name = el)}
                className={`flex items-center rounded-md py-1.5 px-2.5  border
  
        border-gray-300 hover:border-sky-300 focus-within:ring-1 focus-within:ring-sky-400
    `}
              >
                <User className="w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="John Doe"
                  {...register("name")}
                  className="ml-2 text-xs w-full outline-none text-gray-700"
                />
              </div>
              <p
                ref={(el) => (errorRefs.current.name = el)}
                className="text-red-500 text-xs overflow-hidden"
              >
                {errors.name?.message}
              </p>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1 mb-2.5 w-full">
              <label className="text-xs text-gray-600 font-semibold">
                Email
              </label>
              <div
                ref={(el) => (inputRefs.current.email = el)}
                className={`flex items-center rounded-md py-1.5 px-2.5 transition-all duration-200 border
    ${
      errors.email
        ? "border-red-500 ring-1 ring-red-300"
        : "border-gray-300 hover:border-sky-300 focus-within:ring-1 focus-within:ring-sky-400"
    }`}
              >
                <Mail className="w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="you@example.com"
                  {...register("email")}
                  className="ml-2 text-xs w-full outline-none text-gray-700"
                />
              </div>
              <p
                ref={(el) => (errorRefs.current.email = el)}
                className="text-red-500 text-xs overflow-hidden"
              >
                {errors.email?.message}
              </p>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1 mb-2.5 w-full">
              <label className="text-xs text-gray-600 font-semibold">
                Password
              </label>
              <div
                ref={(el) => (inputRefs.current.password = el)}
                className={`flex relative  items-center rounded-md py-1.5 px-2.5 transition-all duration-200 border
    ${
      errors.password
        ? "border-red-500 ring-1 ring-red-300"
        : "border-gray-300 hover:border-sky-300 focus-within:ring-1 focus-within:ring-sky-400"
    }`}
              >
                <Lock className="w-4 h-4 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password")}
                  className="ml-2 text-xs w-full outline-none text-gray-700"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-sky-500 transition"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              <p
                ref={(el) => (errorRefs.current.password = el)}
                className="text-red-500 text-xs overflow-hidden "
              >
                {errors.password?.message}
              </p>
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-1 mb-4.5 w-full">
              <label className="text-xs text-gray-600 font-semibold">
                Confirm Password
              </label>
              <div
                ref={(el) => (inputRefs.current.confirmPassword = el)}
                className={`flex relative items-center rounded-md py-1.5 px-2.5 transition-all duration-200 border
    ${
      errors.confirmPassword
        ? "border-red-500 ring-1 ring-red-300"
        : "border-gray-300 hover:border-sky-300 focus-within:ring-1 focus-within:ring-sky-400"
    }`}
              >
                <Lock className="w-4 h-4 text-gray-400" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("confirmPassword")}
                  className="ml-2 text-xs w-full outline-none text-gray-700"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-sky-500 transition"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              <p
                ref={(el) => (errorRefs.current.confirmPassword = el)}
                className="text-red-500 text-xs overflow-hidden "
              >
                {errors.confirmPassword?.message}
              </p>
            </div>

            {/* Login/Register Button */}
            <button
              className="bg-sky-500 hover:bg-sky-600 text-white flex gap-1 justify-center items-center rounded-md py-1.5 font-semibold w-full 
    text-xs md:gap-1.5 md:py-2 
    lg:text-xs lg:gap-1.5 lg:py-2 
    transition-colors duration-200 ease-in-out transform hover:scale-[1.01] active:scale-[0.99] shadow-sm hover:shadow-md"
              type="submit"
              disabled={loading}
            >
              {!loading ? (
                <>
                  <UserPlus className="h-4 w-4  lg:h-4 lg:w-4" />
                  Register
                </>
              ) : (
                <>
                  <Loader className="h-4 w-4  lg:h-4 lg:w-4 animate-spin" />
                  Loading...
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          {/* <div className="flex items-center w-full gap-2 my-1 md:my-2.5
      
      
      ">
      
      <div className="flex-grow h-[1px] bg-gray-200"></div>
        <span className="text-gray-500 text-xs font-medium">or</span>
        <div className="flex-grow h-[1px] bg-gray-200"></div>
      </div> */}

          {/* Google Login Button */}
          {/* <GoogleLoginButton
        styles={
          "flex items-center gap-3 justify-center text-sky-600 font-medium bg-white border border-gray-300 px-4 py-2 rounded-md shadow-sm hover:bg-sky-50 hover:border-sky-400 hover:shadow-md transition text-xs" 
        } imageStyles={"h-4 w-4"}
      /> */}

          {/* Signup Link */}
          <div className="text-xs flex justify-center gap-1 mt-2 md:mt-3 md:text-sm lg:text-[0.7rem] w-full">
            <h1 className="text-gray-500">Already have an account?</h1>
            <Link
              to="/login"
              className="text-sky-600 flex items-end font-medium"
            >
              Login
              <ArrowRight className="h-3 w-3 md:h-4 md:w-4 lg:h-3 lg:w-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Right Image */}
      <div className="hidden md:block object-center w-[50%] lg:w-[65%] h-full relative ">
        <img
          src="/e-commerce ui.png"
          alt="E-commerce illustration"
          className="object-cover h-full w-full"
        />
      </div>
    </div>
  );
}

export default SignupPage