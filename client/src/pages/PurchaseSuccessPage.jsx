import { ArrowRight, CircleCheckBig, Heart } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCartStore } from '../store/useCartStore';
import axios from '../utils/axios';

const PurchaseSuccessPage = () => {
 const [isProcessing, setIsProcessing] = useState(true);
 const {clearCart} = useCartStore();
 const [error, setError] = useState(null)

 useEffect(() => {
    const handleCheckoutSuccess = async(sessionId) => {
        try {
            await axios.post("/payments/checkout-success", {
                sessionId
            });
           await clearCart();
        } catch (error) {
            console.log("error in handleCheckoutSuccess: ", error);

        }
        finally{
            setIsProcessing(false)
        }
    }
         const sessionId = new URLSearchParams(window.location.search).get("session_id");

        if(sessionId){
            handleCheckoutSuccess(sessionId);
        }
        else{
            setIsProcessing(false);
           setError("No session found in the URL")
        }
    
 }, [clearCart])

 if(isProcessing) return "Processing...";

 if(error) return `Error: ${error}`
  return (
    <div className='h-full flex flex-col justify-center items-center'>
        <CircleCheckBig className="text-sky-500 h-20 w-20 mb-2"/>
        <h1 className="text-3xl font-semibold text-sky-500 mb-2">
        Purchase Successful!
      </h1>

      {/* Subtext */}
      <p className="text-gray-600 text-center text-sm" >
        Thank you for your order. We’re processing it now.
      </p>
      <p className="text-sky-600 text-sm text-center mb-6">
        Check your email for order details and updates.
      </p>

      {/* Delivery Estimate */}
      <div className="bg-sky-50 rounded-xl max-w-xs w-full shadow-sm px-6 py-4 mb-3 flex flex-col space-y-3">
  <div className="flex justify-between items-center">
    <span className="text-sm text-gray-500">Order No</span>
    <span className="font-medium text-sky-600">#341223</span>
  </div>

  <div className="flex justify-between items-center ">
    <span className="text-sm text-gray-500">Estimated Delivery</span>
    <span className="font-medium text-sky-600">3–5 Business Days</span>
  </div>
</div>

      {/* Thank You Note */}
      <div className="flex items-center gap-2 text-sky-500 mb-5">
        <Heart className="w-5 h-5" />
        <p className="font-medium">Thanks for trusting us!</p>
      </div>

      {/* Continue Shopping Button */}
      <Link
        to="/"
        className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-medium px-6 py-2 rounded-lg shadow transition"
      >
        Continue Shopping
        <ArrowRight className="w-5 h-5" />
      </Link>
      
    </div>
  )
}

export default PurchaseSuccessPage