import React from 'react'

const OrderSummarySkeleton = () => {
  return (
    <div className="  py-4 px-5 w-full animate-pulse">
    
      <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
      <div className="border-t border-gray-200 my-2"></div>
      <div className="h-5 bg-gray-300 rounded w-1/2 mb-3"></div>
      <div className="h-10 bg-gray-300 rounded w-full mb-2"></div>
    </div>
  );
  
}

export default OrderSummarySkeleton