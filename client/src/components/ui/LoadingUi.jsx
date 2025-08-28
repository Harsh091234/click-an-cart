import React from "react";
import { motion } from "motion/react";
import { ShoppingCart, Sparkles } from "lucide-react";

/**
 * Responsive fullscreen emerald-themed loading screen for Click-an-Cart
 * - Responsive sizing for sm, md, lg breakpoints
 * - Blinking "Loading" text
 * - Floating cart icon with glow pulse
 * - Animated progress shimmer bar
 */
export default function LoadingUi({ message = "Loading" }) {
  return (
    <div className="min-h-screen w-full bg-gray-950 text-emerald-400 flex items-center justify-center p-4 sm:p-6">
      <div
        role="status"
        aria-live="polite"
        className="
          relative w-full
          max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl
          rounded-2xl border border-emerald-500/20 
          bg-gray-900/70 shadow-2xl backdrop-blur
          p-6 sm:p-8 md:p-10 lg:p-12
          overflow-hidden
        "
      >
        {/* Soft emerald glow */}
        <div className="pointer-events-none absolute -inset-24 opacity-20 blur-3xl bg-emerald-500/20" />

        {/* Icon + title row */}
        <div className="flex items-center gap-3 sm:gap-4">
          <motion.div
            initial={{ y: 0, scale: 1, filter: "drop-shadow(0 0 0 rgba(16,185,129,0))" }}
            animate={{
              y: [0, -6, 0],
              scale: [1, 1.05, 1],
              filter: [
                "drop-shadow(0 0 0 rgba(16,185,129,0))",
                "drop-shadow(0 0 10px rgba(16,185,129,0.7))",
                "drop-shadow(0 0 0 rgba(16,185,129,0))",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="grid place-items-center rounded-2xl bg-emerald-500/10 p-3 sm:p-4"
            aria-hidden
          >
            <ShoppingCart className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 lg:h-12 lg:w-12 text-emerald-400" />
          </motion.div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight text-emerald-300">
                Click-an-Cart
              </h1>
              <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-emerald-300/70" aria-hidden />
            </div>
            <p className="text-xs sm:text-sm md:text-base text-emerald-200/70">Getting things ready…</p>
          </div>
        </div>

        {/* Spacer */}
        <div className="h-6 sm:h-8" />

        {/* Blinking loading text */}
        <div className="flex items-baseline gap-1">
          <motion.span
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold"
            animate={{ opacity: [0.35, 1, 0.35] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          >
            {message}
          </motion.span>
          <AnimatedDots />
        </div>

        {/* Progress shimmer bar */}
        <div className="mt-6 h-2 sm:h-3 md:h-4 w-full overflow-hidden rounded-full bg-emerald-500/10">
          <motion.div
            className="h-full w-1/3 rounded-full bg-emerald-400"
            initial={{ x: "-100%" }}
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Tiny helper text */}
        <p className="mt-3 text-[0.65rem] sm:text-xs md:text-sm text-emerald-200/60">
          This won’t take long. You’re doing great ✨
        </p>
      </div>
    </div>
  );
}

function AnimatedDots() {
  const base = "inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 rounded-full bg-emerald-400";
  return (
    <span className="ml-1 inline-flex items-end gap-1 sm:gap-1.5 md:gap-2" aria-hidden>
      <motion.span
        className={base}
        animate={{ y: [0, -3, 0], opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut", delay: 0 }}
      />
      <motion.span
        className={base}
        animate={{ y: [0, -3, 0], opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut", delay: 0.15 }}
      />
      <motion.span
        className={base}
        animate={{ y: [0, -3, 0], opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
      />
    </span>
  );
}
