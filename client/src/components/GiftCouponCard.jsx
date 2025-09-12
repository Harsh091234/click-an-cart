import React, { useEffect, useState } from 'react'
import { useCartStore } from '../store/useCartStore';
import { Loader, Loader2 } from 'lucide-react';

const GiftCouponCard = () => {
  const [userInputCode, setUserInputCode] = useState(""); 
const {coupon, isCouponApplied, removeCoupon,  applyCoupon, getMyCoupon} = useCartStore();
 const [loading, setLoading] = useState(false);

  useEffect(() => {
    getMyCoupon();
  }, [getMyCoupon])

  useEffect(() => {
    if(coupon) setUserInputCode(coupon.code);
  }, [coupon])
 const handleApplyCoupon = () => {
    if(!userInputCode) return;
    applyCoupon(userInputCode);
 }

 const handleRemoveCoupon = async() => {
    await removeCoupon();
    setUserInputCode("")
 }

  return (
  <div className="bg-white shadow-md rounded-xl p-4 mt-4">
      <h1 className="text-base font-semibold text-sky-500 mb-2">
        Do you have a voucher or gift card?
      </h1>

      <input
        type="text"
        placeholder="Enter coupon code"
        value={userInputCode}
        onChange={(e) => setUserInputCode(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-sky-500"
      />

      <button
  onClick={handleApplyCoupon}
  disabled={loading}
  className={`w-full px-4 py-2 rounded-lg mt-3 transition text-sm font-medium flex items-center justify-center gap-2 
    ${loading 
      ? "bg-sky-700 text-white opacity-90" 
      : "bg-sky-500 hover:bg-sky-600 text-white"}`}
>
  {loading ? (
    <>
      <Loader className="w-4 h-4 animate-spin" />
      Applying…
    </>
  ) : (
    "Apply"
  )}
</button>

      {isCouponApplied && coupon && (
        <div className="mt-4 bg-green-50 border border-green-200 rounded-md p-3 text-green-700 text-sm">
          <p>
            Applied Coupon:{" "}
            <span className="font-semibold">{coupon.code}</span> -{" "}
            {coupon.discountPercentage}% off
          </p>
          <button
            onClick={handleRemoveCoupon}
            className="mt-2 text-xs text-red-500 hover:underline"
          >
            Remove
          </button>
        </div>
      )}

      {!isCouponApplied && coupon && (
        <div className="mt-4 bg-gray-50 border border-gray-200 rounded-md p-3 text-gray-700 text-sm">
          <p>
            Available Coupon:{" "}
            <span className="font-semibold">{coupon.code}</span> -{" "}
            {coupon.discountPercentage}% off
          </p>
        </div>
      )}
    </div>
  )
}

export default GiftCouponCard