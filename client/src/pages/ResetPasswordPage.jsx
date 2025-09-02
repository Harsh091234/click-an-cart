import React, { useEffect, useState,  } from "react";
import {Loader} from "lucide-react";
import {useParams, useNavigate} from "react-router-dom"
import { useUserStore } from "../store/useUserStore";
const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState("");
  const {token} = useParams();
  const navigate = useNavigate();
  const [valid, setValid] = useState(null);
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const {loading, resetPassword, checkResetToken, validResetToken} = useUserStore();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res =  await resetPassword(token, newPassword, confirmNewPassword)
    if(res?.success){
      navigate("/")
    }
  };

  useEffect(() => {
  
  checkResetToken(token);

}, [token, checkResetToken]);
   
  if (validResetToken === false) return navigate("/forgot-password") ;
  
  return (
    <div className="min-h-screen flex justify-center items-center p-4">
      <div
        className="
          w-full
          sm:max-w-md md:max-w-lg lg:max-w-xl 2xl:max-w-2xl
          rounded-2xl shadow-xl  bg-gray-800 p-6 sm:p-8
        "
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-emerald-400 mb-6">
          Reset Password
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* New Password */}
          <div>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 outline-none "
              required
            />
          </div>

          {/* Confirm New Password */}
          <div>
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              className="w-full border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 rounded-lg transition" disabled={loading}
          >{!loading
            ? <>Submit</>
            : <div className="flex items-center justify-center gap-2"><Loader className="h-5 w-5 animate-spin" /> Loading...</div>}
            
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
