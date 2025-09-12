import React from 'react'
import { ArrowLeft, CircleX, Frown } from "lucide-react";
import { Link } from "react-router-dom";

const PurchaseCancelPage = () => {
  return (
      <div className="h-full flex flex-col justify-center items-center">
      {/* Cancel Icon */}
      <CircleX className="text-red-500 h-20 w-20 mb-2" />

      {/* Title */}
      <h1 className="text-3xl font-semibold text-red-500 mb-2">
        Purchase Cancelled
      </h1>

      {/* Subtext */}
      <p className="text-gray-600 text-center text-sm">
        Your payment was not completed. Don’t worry—you can try again anytime.
      </p>
      <p className="text-red-600 text-sm text-center mb-6">
        If this was a mistake, simply return and finish your order.
      </p>

      {/* Info Box */}
      <div className="bg-white rounded-xl max-w-xs w-full shadow-sm px-6 py-4 mb-3 flex flex-col space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Order Status</span>
          <span className="font-medium text-red-600">Cancelled</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Action</span>
          <span className="font-medium text-red-600">Try Again</span>
        </div>
      </div>

      {/* Note */}
      <div className="flex items-center gap-2 text-gray-700 mb-5">
        <Frown className="w-5 h-5" />
        <p className="font-medium">We’d love to see you complete your order!</p>
      </div>

      {/* Back to Shop Button */}
      <Link
        to="/"
        className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white font-medium px-6 py-2 rounded-lg shadow transition"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Shopping
      </Link>
    </div>
  )
}

export default PurchaseCancelPage