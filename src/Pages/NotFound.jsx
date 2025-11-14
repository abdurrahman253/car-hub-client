import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCar, FaHome, FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => navigate("/", { replace: true });
  const handleGoBack = () => navigate(-1);

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-gray-100 dark:from-slate-950 via-white dark:via-black to-gray-100 dark:to-slate-950 px-4">
      {/* Animated Particle Background */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-60"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, -window.innerHeight],
              opacity: [0.6, 0],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Neon Glow Orbs */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-600 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-20 w-80 h-80 bg-blue-700 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-cyan-500/20 to-transparent rounded-full blur-3xl animate-ping"></div>
      </div>

      {/* Main Content - PUSHED DOWN ON MOBILE */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center justify-center text-center w-full max-w-5xl pt-24 pb-16 sm:pt-32 md:pt-20"
      >
        {/* 3D Tilt Car Icon */}
        <motion.div
          whileHover={{ rotateY: 180 }}
          transition={{ duration: 0.8 }}
          className="mb-8 perspective-1000"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="relative w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 rounded-3xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-2xl shadow-cyan-500/70 group">
            <FaCar className="text-7xl sm:text-9xl md:text-[10rem] text-white drop-shadow-2xl group-hover:drop-shadow-[0_0_50px_rgba(34,211,238,0.9)] transition-all duration-500" />
            <div className="absolute inset-0 rounded-3xl bg-gray-100/10 dark:bg-white/10 backdrop-blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        </motion.div>

        {/* 404 Text - Neon Glow */}
        <motion.h1
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-7xl sm:text-9xl md:text-[12rem] lg:text-[14rem] font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 drop-shadow-[0_0_60px_rgba(34,211,238,0.8)] animate-pulse leading-none"
        >
          404
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-4 text-2xl sm:text-3xl md:text-4xl font-bold text-gray-600 dark:text-gray-300"
        >
          ROUTE NOT FOUND
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="max-w-2xl mx-auto mt-6 text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed px-4"
        >
          Looks like this road leads to nowhere. <br className="sm:hidden" />
          <span className="text-cyan-400 font-bold">
            Shift back to the highway
          </span>{" "}
          and continue your premium EV journey.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-col sm:flex-row gap-5 mt-10 w-full sm:w-auto px-6 sm:px-0"
        >
          <button
            onClick={handleGoBack}
            className="group flex items-center justify-center gap-3 w-full px-10 py-5 bg-gray-100/10 dark:bg-white/10 backdrop-blur-3xl border border-gray-300/20 dark:border-white/20 rounded-2xl font-bold text-lg shadow-2xl hover:bg-gray-100/20 dark:hover:bg-white/20 hover:border-cyan-400/50 hover:shadow-cyan-500/60 transition-all duration-500 hover:scale-105"
          >
            <FaArrowLeft className="text-cyan-400 group-hover:-translate-x-1 transition" />
            Go Back
          </button>

          <button
            onClick={handleGoHome}
            className="group flex items-center justify-center gap-3 w-full px-12 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl font-bold text-lg shadow-2xl shadow-cyan-500/70 hover:shadow-cyan-500/90 hover:scale-105 transition-all duration-500"
          >
            <FaHome className="text-white group-hover:scale-110 transition" />
            Back to Home
          </button>
        </motion.div>

        {/* Fun Message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-12 text-sm sm:text-base text-gray-500 animate-pulse px-4"
        >
          🚗 Even supercars take wrong turns sometimes. Let's get you back on track! ⚡
        </motion.p>
      </motion.div>

      {/* Bottom Neon Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_30px_rgba(34,211,238,0.8)]"></div>
    </div>
  );
};

export default NotFound;