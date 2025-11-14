import React from "react";
import { FaCar } from "react-icons/fa";
import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 dark:from-slate-950 via-white dark:via-black to-gray-100 dark:to-slate-950 z-50">
      {/* Glow Orbs */}
      <div className="absolute inset-0 opacity-50">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-600/30 rounded-full blur-3xl animate-pulse"></div>
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
          <div className="absolute inset-4 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-inner shadow-black/40">
            <FaCar className="text-5xl text-white drop-shadow-2xl" />
          </div>
          {/* Glow Pulse */}
          <motion.div
            className="absolute inset-6 rounded-full bg-cyan-400/40 blur-xl"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        {/* Brand Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-10 text-3xl sm:text-4xl font-extrabold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 animate-pulse"
        >
          CARHUB
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400 tracking-widest uppercase"
        >
          Shifting Into the Future ⚡
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Loader;