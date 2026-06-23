import React, { forwardRef } from "react";

const Input = forwardRef(({ className = "", ...props }, ref) => {
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
