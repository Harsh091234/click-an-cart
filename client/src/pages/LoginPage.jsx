import React, { useState } from 'react'
import { motion } from "motion/react"
import { Lock, Mail, ArrowRight, Loader, Eye, EyeOff, LogIn } from "lucide-react"
import { Link } from 'react-router-dom'
import { useUserStore } from '../store/useUserStore'


const LoginPage = () => {
  const {login, loading}  = useUserStore();
 
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData)
  }

  return (
    <div className='flex flex-col py-10 justify-center items-center px-2'> 
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h1 className='text-emerald-400 font-bold text-[1.8rem] md:text-[2rem] lg:text-[2.2rem]'>
          Login to your Account
        </h1>
      </motion.div>

      {/* Form */}
      <motion.div
        className='flex flex-col items-center w-full'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className='bg-gray-800 rounded-lg shadow py-7 px-7 w-full mt-6 
        sm:w-90 md:w-97 md:py-7.5 lg:w-[32rem] lg:px-11 lg:py-8'>
          <form onSubmit={handleSubmit}>

          
            <div className='flex flex-col gap-0.5 mb-3 md:gap-1.5 lg:gap-2'>
              <label className='text-sm md:text-base lg:text-lg'>Email address</label>
              <div className='flex bg-gray-700 items-center border border-gray-600 rounded-lg py-1 px-3 
              md:py-1.5 md:px-4 lg:py-2 lg:px-5'>
                <span className="text-gray-400">
                  <Mail className='w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6'/>
                </span>
                <input
                  placeholder='you@example.com'
                  required
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  type="text"
                  className='text-sm w-full outline-0 px-1.5 
                  md:text-base md:px-2 lg:text-lg lg:px-2.5'
                />
              </div>
            </div>

            <div className='flex flex-col gap-0.5 mb-3 md:gap-1.5 md:mb-4 lg:mb-5 lg:gap-2'>
              <label className='text-sm md:text-base lg:text-lg'>Password</label>
              <div className='flex bg-gray-700 items-center border border-gray-600 rounded-lg py-1 px-3 
              md:py-1.5 md:px-4 lg:py-2 lg:px-5 relative'>
                <span className="text-gray-400">
                  <Lock className='w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6'/>
                </span>
                <input
                  placeholder='••••••••'
                  required
                  value={formData.password}
                  onChange={e => setFormData({ ...formData, password: e.target.value })}
                  type={showPassword ? "text" : "password"}
                  className='text-sm w-full outline-0 px-1.5 
                  md:text-base md:px-2 lg:text-lg lg:px-2.5'
                />
                {formData.password && (
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1.5 text-gray-400 
                    md:top-2 lg:top-2.5"
                  >
                    {showPassword 
                      ? <EyeOff className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6"/> 
                      : <Eye className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6"/>}
                  </button>
                )}
              </div>
                <Link 
    to="/forgot-password" 
    className="text-emerald-400 text-right text-xs md:text-sm lg:text-base  hover:underline mt-0.5"
  >
    Forgot password?
  </Link> 
            </div>
       


       
            <button
              className='bg-emerald-600 flex gap-1.5 justify-center rounded-lg py-1.5 text-sm font-semibold w-full 
              md:text-base md:gap-2 md:py-2 
              lg:text-lg lg:gap-2.5 lg:py-2.5 disabled:opacity-65'
              type='submit'
              disabled={loading}
            >
              {!loading 
                ? <><LogIn  className="h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7"/>Login</> 
                : <><Loader className="h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 animate-spin"/> Loading...</>}
            </button>
          </form>
        </div>

 
        <div className='text-xs flex gap-1 mt-5 md:text-sm md:gap-1.5 lg:text-base lg:gap-2 '>
          <h1 className='text-gray-400'>Don't have an account?</h1>
          <Link to="/signup" className='text-emerald-400 flex items-end font-bold'>
            Sign up <ArrowRight className="h-3 w-3 md:h-4 md:w-4 lg:h-5 lg:w-5" />
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

export default LoginPage
