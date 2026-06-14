
import {Lock, Mail,  UserPlus, ArrowRight, Loader, Eye, EyeOff, User} from "lucide-react"
import { Link, useNavigate } from 'react-router-dom'
import { useUserStore } from '../store/useUserStore'
import GoogleLoginButton from '../components/ui/GoogleLoginButton'
import { useState } from "react"

const SignupPage = () => {
  const {signup, loading}  = useUserStore();
 const navigate = useNavigate();
  const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
    const [showPassword, setShowPassword] = useState(false);
 

  const handleSubmit = async(e) => {
      e.preventDefault();
      const success = await signup(formData);
      if (success) navigate("/verify-email");
     
  }

  return (
<div className="flex h-full ">
  <div className="flex flex-col h-full items-center justify-center w-full md:w-[50%] lg:w-[35%] px-3 py-2">
    <div className="w-full  flex flex-col md:w-[70%] lg:w-[60%] xl:w-[45%]">
      {/* Title */}
      <h1 className="text-gray-700 font-semibold text-[1.1rem] md:text-[1.3rem] lg:text-[1.5rem] text-left">
        Register Account
      </h1>

      {/* Form */}
    <form onSubmit={handleSubmit} className="flex flex-col items-center mt-3 md:mt-9 w-full">
  {/* Full Name */}
  <div className="flex flex-col gap-1 mb-2 w-full">
    <label className="text-xs text-gray-600 font-semibold">Full Name</label>
    <div className="flex items-center border border-gray-300 rounded-md py-1.5 px-2.5 focus-within:ring-1 focus-within:ring-sky-400 hover:border-sky-300 transition">
      <User className="w-4 h-4 text-gray-400" />
      <input
        placeholder="John Doe"
        required
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        type="text"
        className="ml-2 text-xs w-full outline-0 text-gray-700"
      />
    </div>
  </div>

  {/* Email */}
  <div className="flex flex-col gap-1 mb-2 w-full">
    <label className="text-xs text-gray-600 font-semibold">Email</label>
    <div className="flex items-center border border-gray-300 rounded-md py-1.5 px-2.5 focus-within:ring-1 focus-within:ring-sky-400 hover:border-sky-300 transition">
      <Mail className="w-4 h-4 text-gray-400" />
      <input
        placeholder="you@example.com"
        required
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        type="text"
        className="ml-2 text-xs w-full outline-0 text-gray-700"
      />
    </div>
  </div>

  {/* Password */}
  <div className="flex flex-col gap-1 mb-2 w-full">
    <label className="text-xs text-gray-600 font-semibold">Password</label>
    <div className="flex items-center border border-gray-300 rounded-md py-1.5 px-2.5 relative focus-within:ring-1 focus-within:ring-sky-400 hover:border-sky-300 transition">
      <Lock className="w-4 h-4 text-gray-400" />
      <input
        placeholder="••••••••"
        required
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        type={showPassword ? "text" : "password"}
        className="ml-2 text-xs w-full text-gray-700 outline-0"
      />
      {formData.password && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-sky-500 transition"
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

  {/* Confirm Password */}
  <div className="flex flex-col gap-1 mb-4 w-full">
    <label className="text-xs text-gray-600 font-semibold">Confirm Password</label>
    <div className="flex items-center border border-gray-300 rounded-md py-1.5 px-2.5 relative focus-within:ring-1 focus-within:ring-sky-400 hover:border-sky-300 transition">
      <Lock className="w-4 h-4 text-gray-400" />
      <input
        placeholder="••••••••"
        required
        value={formData.confirmPassword}
        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
        type={showPassword ? "text" : "password"}
        className="ml-2 text-xs w-full text-gray-700 outline-0"
      />
    </div>
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
        <Link to="/login" className="text-sky-600 flex items-end font-medium">
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

  )
}

export default SignupPage