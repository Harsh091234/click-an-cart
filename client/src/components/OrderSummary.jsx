import React, { useState } from "react";
import { useCartStore } from "../store/useCartStore";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import OrderSummarySkeleton from "./skeletons/OrderSummarySkeleton";
import axios from "../utils/axios"
import {loadStripe} from "@stripe/stripe-js"


const OrderSummary = () => {
  const stripePromise = loadStripe("pk_test_51RzZj1ByUgeXTDbnqF5Z64dJuQ3lUdJmBDUpOOTqTOnIKjJrL7p2MSsgYtUJv0CrSVu3nACtS4jmOLErf9qQXi0D009hIERMJZ")

  const { total, subTotal, coupon, isCouponApplied, loading, cart } = useCartStore();
  const savings = subTotal - total;

  const formattedSubTotal = subTotal.toFixed(2);
  const formattedTotal = total.toFixed(2);
  const formattedSavings = savings.toFixed(2);
  const handlePayment = async() => {
      const stripe = await stripePromise;
      const res = await axios.post("/payments/create-checkout-session", {
        products: cart,
       couponCode: coupon? coupon.code : null
      })
      console.log("res", res.data)
      const session = res.data;
      const result = await stripe.redirectToCheckout({
        sessionId: session.id
      })
      
      if(result.error){
        console.error("Error:", result.error);
      }
  }

  return (
    <div className="bg-white  rounded-xl shadow-md py-4 px-5 w-full">
      <h2 className="text-xl font-semibold text-sky-500 mb-2">Order Summary</h2>
      {loading ? (
        <OrderSummarySkeleton />
      ) : (
        <>
          {/* Original Price */}
          <div className="flex justify-between text-gray-600 text-sm mb-1">
            <p className=" text-gray-600 ">Original Price</p>
            <p className="text-gray-950 font-bold">${formattedSubTotal}</p>
          </div>

          {/* Savings */}
          {savings > 0 && (
            <div className="flex justify-between text-green-600 text-sm mb-1.5">
              <p>Savings</p>
              <p>- ${formattedSavings}</p>
            </div>
          )}

          {/* Coupon */}
          {coupon && isCouponApplied && (
            <div className="flex justify-between text-sky-600 text-sm mb-1.5">
              <p>Coupon: {coupon.code}</p>
              <p>-{coupon.discountPercentage}%</p>
            </div>
          )}

          {/* Divider */}
          <div className="border-t border-gray-200 my-1"></div>

          {/* Total */}
          <div className="flex justify-between mb-3  text-sm ">
            <p className="text-gray-950 font-semibold">Total</p>
            <p className="text-sky-500 font-bold">${formattedTotal}</p>
          </div>

          {/* Checkout button */}
          <button onClick={handlePayment} className="w-full bg-sky-500 text-white py-2 rounded-lg font-medium hover:bg-sky-600 transition text-sm">
            Proceed to Checkout
          </button>

          {/* Continue Shopping */}
          <div className="flex items-center justify-center gap-1 mt-3 text-xs text-gray-600">
            <span className="text-gray-600 mr-0.5">or</span>
            <Link
              to="/"
              className="flex items-center  text-sky-700 hover:underline"
            >
              Continue Shopping
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderSummary;
