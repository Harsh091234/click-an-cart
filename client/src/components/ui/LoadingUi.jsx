import React from "react";
import { motion } from "motion/react";
import { ShoppingCart, Sparkles } from "lucide-react";

export default function LoadingUi({ message = "Loading" }) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4 sm:p-6">
      <div
        role="status"
        aria-live="polite"
        className="
          relative w-full
          max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl
          rounded-xl border border-gray-200 
          bg-white shadow-md
          p-5 sm:p-7 md:p-9 lg:p-10
          overflow-hidden
        "
      >
        {/* Subtle blue glow */}
        <div className="pointer-events-none absolute -inset-24 opacity-15 blur-3xl bg-blue-300/20" />

        {/* Icon + title */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <motion.div
            initial={{ y: 0, scale: 1, filter: "drop-shadow(0 0 0 rgba(59,130,246,0))" }}
            animate={{
              y: [0, -4, 0],
              scale: [1, 1.03, 1],
              filter: [
                "drop-shadow(0 0 0 rgba(59,130,246,0))",
                "drop-shadow(0 0 6px rgba(59,130,246,0.6))",
                "drop-shadow(0 0 0 rgba(59,130,246,0))",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="grid place-items-center rounded-xl bg-blue-50 p-2.5 sm:p-3"
            aria-hidden
          >
            <ShoppingCart className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-blue-400" />
          </motion.div>

          <div className="flex flex-col pl-2 ">
            <div className="flex items-center gap-1.5">
              <h1 className="text-base sm:text-lg md:text-xl font-semibold tracking-tight text-gray-800">
                Click-n-Cart !!
              </h1>
             
            </div>
            <p className="text-[0.7rem] sm:text-sm md:text-base text-gray-500">
              Getting things ready…
            </p>
          </div>
        </div>

        {/* Spacer */}
        <div className="h-4 sm:h-6 " />

        {/* Loading text row */}
        <div className="flex items-baseline gap-0.5 sm:gap-1">
          <motion.span
            className="text-sm sm:text-base md:text-lg font-semibold text-blue-400"
            animate={{ opacity: [0.35, 1, 0.35] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          >
            {message}
          </motion.span>
          <AnimatedDots />
        </div>

        {/* Slimmer progress shimmer bar */}
        <div className="mt-3 h-1 sm:h-1.5 md:h-2  mx-auto  overflow-hidden w-full rounded-full bg-gray-200">
          <motion.div
            className="h-full w-1/3 rounded-full bg-blue-400"
            initial={{ x: "-100%" }}
            animate={{ x: ["-100%", "300%"] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Tiny helper text */}
        <p className="mt-2 text-[0.6rem] sm:text-xs md:text-sm text-gray-400">
          This won’t take long. You’re doing great...
        </p>
      </div>
    </div>
  );
}

function AnimatedDots() {
  const base =
    "inline-block rounded-full bg-blue-500 w-[2px] h-[2px] sm:w-[3px] sm:h-[3px] md:w-[4px] md:h-[4px]";
  return (
    <span className="ml-0.5 inline-flex items-end gap-[2px] sm:gap-[3px]" aria-hidden>
      <motion.span
        className={base}
        animate={{ y: [0, -1, 0], opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut", delay: 0 }}
      />
      <motion.span
        className={base}
        animate={{ y: [0, -1, 0], opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut", delay: 0.15 }}
      />
      <motion.span
        className={base}
        animate={{ y: [0, -1, 0], opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
      />
    </span>
  );
}
