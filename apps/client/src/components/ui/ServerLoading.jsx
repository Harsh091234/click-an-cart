import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShoppingCart } from "lucide-react";

const statusMessages = [
  "Waking up the server",
  "Connecting to the backend",
  "Preparing your shopping experience",
  "Almost ready",
];

const helperMessages = [
  "Our server goes to sleep after a period of inactivity to save resources.",
  "This usually takes 20–40 seconds on the first visit.",
  "Everything is happening automatically. No action is required.",
  "You'll be redirected as soon as the server responds.",
];

export default function ServerLoading() {
  const [seconds, setSeconds] = useState(0);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const secondTimer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    const messageTimer = setInterval(() => {
      setIndex((prev) => (prev + 1) % statusMessages.length);
    }, 3500);

    return () => {
      clearInterval(secondTimer);
      clearInterval(messageTimer);
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="mx-auto flex h-25 w-25 items-center justify-center rounded-full bg-sky-100"
        >
          <ShoppingCart className="h-12 w-12 text-sky-500" />
        </motion.div>

        {/* Brand */}
        <h1 className="mt-6 text-center text-3xl font-semibold text-gray-800">
          Click-n-Cart
        </h1>

        {/* Status */}
        <div className="mt-8 flex items-center justify-center text-sky-500 font-medium text-xl">
          <AnimatePresence mode="wait">
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
            >
              {statusMessages[index]}
            </motion.span>
          </AnimatePresence>

          <AnimatedDots />
        </div>

        {/* Progress */}
        <div className="mt-5 h-1 overflow-hidden rounded-full bg-gray-200">
          <motion.div
            className="h-full w-1/3 rounded-full bg-sky-500"
            initial={{ x: "-100%" }}
            animate={{
              x: ["-100%", "300%"],
            }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Helper Message */}
        <div className="mt-5 h-14">
          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="text-center  leading-6 text-gray-500"
            >
              {helperMessages[index]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="mt-8 flex items-center justify-center gap-2 text-gray-400">
          <span>{seconds}s elapsed</span>

          <span>•</span>

          <motion.div
            animate={{
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
            }}
            className="flex items-center gap-2"
          >
            <div className="h-2 w-2 rounded-full bg-sky-500" />
            <span>Waiting for server</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function AnimatedDots() {
  return (
    <span className="ml-1 inline-flex gap-1">
      {[0, 0.2, 0.4].map((delay, index) => (
        <motion.span
          key={index}
          className="h-1.5 w-1.5 rounded-full bg-sky-500"
          animate={{
            y: [0, -3, 0],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay,
          }}
        />
      ))}
    </span>
  );
}
