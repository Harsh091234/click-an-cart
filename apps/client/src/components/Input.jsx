import React, { forwardRef } from "react";


const Input = forwardRef(({ className = "", ...props }, ref) => {
  const handleFocus = (e) => {
    if (!e.target.dataset.error) {
      gsap.to(e.target, {
        boxShadow: "0 0 0 4px rgba(14,165,233,.15)",
        duration: 0.2,
      });
    }
  };

  const handleBlur = (e) => {
    if (!e.target.dataset.error) {
      gsap.to(e.target, {
        boxShadow: "0 0 0 0 rgba(14,165,233,0)",
        duration: 0.2,
      });
    }
  };

  return (
    <input
      ref={ref}
      
      {...props}
      className={`w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-700 focus:outline-none ${className}`}
    />
  );
});

Input.displayName = "Input";

export default Input;
