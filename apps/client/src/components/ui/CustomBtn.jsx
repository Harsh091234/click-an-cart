import React from "react";
import { Loader2 } from "lucide-react";

const CustomBtn = ({
  text,
  onClick,
  loading = false,
  disabled = false,
  Icon,
  className = "",
  iconClassName = "",
  type = "button",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
      className={`flex  items-center justify-center gap-2 rounded-xl bg-sky-500 px-5 py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-sky-600 hover:shadow-lg active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 ${className} w-50`}
    >
      {loading ? (
        <>
          <Loader2 className="h-5 w-5 animate-spin" />
          Loading...
        </>
      ) : (
        <>
          {Icon && <Icon className={`h-5 w-5 ${iconClassName}`} />}
          {text}
        </>
      )}
    </button>
  );
};

export default CustomBtn;