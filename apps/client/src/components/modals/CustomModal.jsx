import React from "react";
import { X } from "lucide-react";

const CustomModal = ({
  open,
  onClose,
  title = "",
  children,
  className
}) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative  ${className} max-w-2xl w-full overflow-hidden rounded-xl bg-white shadow-xl`}
      >
        {/* Header */}
        <div className="flex items-center justify-between  px-6 py-4">
          <h2 className="text-2xl  font-semibold text-gray-700">{title}</h2>

          <button
            onClick={onClose}
            className="rounded-md p-1 transition hover:bg-gray-100"
          >
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto p-6">{children}</div>
      </div>
    </div>
  );
};

export default CustomModal;
