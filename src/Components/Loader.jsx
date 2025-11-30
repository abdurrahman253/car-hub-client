import React from "react";
import { motion } from "framer-motion";
import { FaCar } from "react-icons/fa";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-base-200 dark:from-base-200 via-base-100 dark:via-base-100 to-base-200 dark:to-base-200">
      {/* Glow Orbs */}
      <div className="absolute inset-0">
        <div className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 left-1/2 w-80 h-80 bg-cyan-400/30 blur-3xl animate-pulse"></div>
      </div>

      {/* Main Spinner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center"
      >
        {/* Rotating Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full border-8 border-cyan-500/30 shadow-[0_0_25px_rgba(34,211,238,0.5)] flex items-center justify-center"
        >
          {/* Inner Circle */}
          <div className="absolute flex items-center justify-center rounded-full shadow-inner inset-4 bg-gradient-to-br from-cyan-500 to-blue-600 shadow-base-content/40">
            <FaCar className="text-5xl text-base-content drop-shadow-2xl" />
          </div>
          {/* Glow Pulse */}
          <motion.div
            className="absolute rounded-full inset-6 bg-cyan-400/40 blur-xl"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

      </motion.div>
    </div>
  );
};

export default Loader;