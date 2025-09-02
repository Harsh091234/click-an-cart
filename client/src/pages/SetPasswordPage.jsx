import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Loader, Lock } from "lucide-react";
import { useUserStore } from "../store/useUserStore";
import { useNavigate } from "react-router-dom";

const SetPasswordPage = () => {
  const [password, setPassword] = useState("");
 const navigate = useNavigate();
    const {loading, setUserPassword}  = useUserStore();
  const handleSubmit = async(e) => {
    e.preventDefault();
    const success = await setUserPassword(password);
    if(success){
         navigate("/"); 
    }
   
    
  };

  return (
    <div className="flex justify-center items-center h-full px-4">
      <div className="w-full max-w-md space-y-6">
        {/* Heading */}
        <motion.h1
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-3xl font-bold text-center text-emerald-400"
        >
          Set Password
        </motion.h1>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="bg-gray-800 rounded-lg shadow p-6 space-y-4"
        >
          <div className="flex flex-col gap-0.5 mb-3 md:gap-1.5 lg:gap-2">
            <label className="text-sm md:text-base lg:text-lg text-white">
              Password
            </label>
            <div className="flex bg-gray-700 items-center border border-gray-600 rounded-lg py-1 px-3 
              md:py-1.5 md:px-4 lg:py-2 lg:px-5">
              <span className="text-gray-400">
               
                <Lock className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
              </span>
              <input
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="text-sm w-full bg-transparent outline-0 px-1.5 text-white
                  md:text-base md:px-2 lg:text-lg lg:px-2.5 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Submit button */}
       
<button
  type="submit"
  disabled={loading}
  className="mt-4 w-full flex justify-center items-center gap-2 
             bg-emerald-500 text-white font-medium 
             py-2 rounded-lg hover:bg-emerald-600 transition disabled:opacity-70
             text-sm md:text-base lg:text-lg
             md:py-2.5 lg:py-3"
>
  {loading ? (
    <>
      <Loader className="animate-spin w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
      Loading...
    </>
  ) : (
    <>
      Submit
      <ArrowRight className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
    </>
  )}
</button>
<p className="mt-4 text-right">
  <button
    type="button"
    onClick={() => navigate("/")}
    className="text-emerald-400 hover:underline text-xs md:text-sm lg:text-base"
  >
    Set Later
  </button>
</p>

        </motion.form>
      </div>
    </div>
  );
};

export default SetPasswordPage;
