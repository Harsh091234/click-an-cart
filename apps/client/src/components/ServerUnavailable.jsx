import React from "react";
import { ServerCrash, RefreshCw, WifiOff } from "lucide-react";
import { motion } from "motion/react";

export default function ServerUnavailable() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="w-full max-w-xl text-center">
        {/* Animated Icon */}
        <motion.div
          animate={{
            y: [0, -6, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-red-50"
        >
          <ServerCrash className="h-12 w-12 text-red-500" />
        </motion.div>

        {/* Title */}
        <h1 className="mt-8 text-4xl font-bold tracking-tight text-gray-900">
          Unable to reach the server
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-lg leading-8 text-gray-500">
          We couldn't establish a connection to the backend within the expected
          time.
        </p>

        {/* Information Card */}
        <div className="mt-10 rounded-2xl border border-gray-200 bg-gray-50 p-6 text-left">
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-sky-100 p-2">
              <WifiOff className="h-5 w-5 text-sky-500" />
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">What happened?</h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Our server may still be waking up after inactivity, or it may be
                temporarily unavailable due to maintenance or high traffic.
              </p>
            </div>
          </div>
        </div>

        {/* Retry */}
        <motion.button
          whileHover={{
            scale: 1.03,
          }}
          whileTap={{
            scale: 0.98,
          }}
          onClick={() => window.location.reload()}
          className="mt-10 inline-flex items-center gap-3 rounded-xl bg-sky-500 px-7 py-3.5 text-white font-medium shadow-sm transition-colors hover:bg-sky-600"
        >
          <RefreshCw className="h-5 w-5" />
          Try Again
        </motion.button>

        {/* Footer */}
        <p className="mt-8 text-sm text-gray-400">
          If the issue continues, please try again in a few minutes.
        </p>
      </div>
    </div>
  );
}
