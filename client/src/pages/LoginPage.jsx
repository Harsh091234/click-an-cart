import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Lock,
  Mail,
  ArrowRight,
  Loader,
  Eye,
  EyeOff,
  LogIn,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";

const LoginPage = () => {
  const { login, loading } = useUserStore();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
 <div className="flex   h-full">
  <div className="flex flex-col w-full md:w-[50%] lg:[30%]  px-4 py-2 justify-center" >
        
  <div className="flex flex-col items-center w-full ">
    <h1 className="text-gray-700 font-semibold text-[1.8rem] md:text-[2rem] lg:text-[2.2rem] 
    w-full  md:w-[80%] lg:w-[70%] xl:w-[50%] text-left">
    Login Account
  </h1>

    <form onSubmit={handleSubmit} className="w-full flex flex-col items-center mt-10">

      {/* Email */}
      <div className="flex flex-col gap-0.5 mb-5 md:gap-1.5 lg:gap-2 w-full  md:w-[80%] lg:w-[70%] xl:w-[50%]">
        <label className="text-sm text-gray-600 font-bold mb-1">Email</label>
        <div
          className="flex items-center border border-gray-400 rounded-lg py-1 px-3 
          md:py-1.5 md:px-4 lg:py-2 lg:px-5 
          focus-within:ring-2 focus-within:ring-[#02c0ad]  transition"
        >
          <span className="text-gray-400">
            <Mail className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
          </span>
          <input
            placeholder="you@example.com"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            type="text"
            className="text-sm w-full outline-0 px-1.5 py-0.5 text-gray-700"
          />
        </div>
      </div>

      {/* Password */}
      <div className="flex flex-col gap-0.5 mb-1 md:gap-1.5 md:mb-4 lg:mb-5 lg:gap-2 w-full  md:w-[80%] lg:w-[70%] xl:w-[50%]">
        <label className="text-sm text-gray-600 mb-1 font-bold">Password</label>
        <div
          className="flex items-center border border-gray-400 rounded-lg py-1 px-3
          md:py-1.5 md:px-4 lg:py-2 lg:px-5 relative 
          focus-within:ring-2 focus-within:ring-[#02c0ad] transition"
        >
          <span className="text-gray-400">
            <Lock className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
          </span>
          <input
            placeholder="••••••••"
            required
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            type={showPassword ? "text" : "password"}
            className="text-sm w-full text-gray-700 outline-0 px-1.5 py-0.5"
          />
          {formData.password && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1.5 text-gray-400"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Forgot Password */}
      <div className="flex mb-13 w-full  md:w-[80%] lg:w-[70%] xl:w-[50%]">
        <Link
          to="/forgot-password"
          className="text-[#009c8d] font-bold ml-auto text-xs md:text-sm hover:underline"
        >
          Forgot password?
        </Link>
      </div>

      {/* Login Button */}
      <button
        className="bg-[#009688] hover:bg-[#00796B] text-white flex gap-1.5 justify-center rounded-lg py-2  text-sm font-semibold w-full 
        md:text-base md:gap-2 md:py-2  md:w-[80%] lg:w-[70%] xl:w-[50%]
        lg:text-lg lg:gap-2.5 lg:py-2.5 
        transition-colors duration-200 ease-in-out transform hover:scale-[1.01] active:scale-[0.99] shadow-sm hover:shadow-md"
        type="submit"
        disabled={loading}
      >
        {!loading ? (
          <>
            <LogIn className="h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7" />
            Login
          </>
        ) : (
          <>
            <Loader className="h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 animate-spin" />
            Loading...
          </>
        )}
      </button>
    </form>

    {/* Signup Link */}
    <div className="text-xs flex gap-1 mt-5 md:text-sm md:gap-1.5 lg:text-base lg:gap-2 w-full  md:w-[80%] lg:w-[70%] xl:w-[50%]">
      <h1 className="text-gray-500">Don't have an account?</h1>
      <Link
        to="/signup"
        className="text-[#008679] flex items-end font-bold"
      >
        Sign up{" "}
        <ArrowRight className="h-3 w-3 md:h-4 md:w-4 lg:h-5 lg:w-5" />
      </Link>
    </div>
  </div>
  </div>
 <div className="hidden md:block object-center w-[50%] lg:w-[70%] h-full overflow-hidden relative">
  <img
    src="https://bloomidea.com/sites/default/files/styles/og_image/public/blog/Tipos%20de%20come%CC%81rcio%20electro%CC%81nico_0.png?itok=jC9MlQZq"
    alt="E-commerce illustration"
    className="object-cover h-full w-full "  
  />
  {/* Overlay */}
  <div className="absolute inset-0 bg-[#008679] opacity-60"></div>
</div>

  

</div>

  );
};

export default LoginPage;
