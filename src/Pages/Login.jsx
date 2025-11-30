// src/Pages/Auth/Login.jsx
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaGoogle,
  FaLock,
  FaEnvelope,
  FaSpinner,
  FaCar,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { AuthContext } from "../Provider/AuthProvider";
import app from "../Utils/Firebase.config";

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailLoading, setIsEmailLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value.trim();
    const password = form.password.value;

    setError("");
    setIsEmailLoading(true);

    try {
      await signIn(email, password);

      toast.success("Welcome back to CarHub!", {
        duration: 4000,
        position: "top-center",
        style: {
          background: "#0e7490",
          color: "#fff",
          borderRadius: "12px",
          padding: "16px",
          fontWeight: "bold",
        },
      });

      navigate(from, { replace: true });
    } catch (err) {
      let msg = "Login failed. Please try again.";

      if (err.code === "auth/user-not-found" || err.code === "auth/wrong-password") {
        msg = "Invalid email or password.";
      } else if (err.code === "auth/too-many-requests") {
        msg = "Too many failed attempts. Try again later.";
      } else if (err.code === "auth/invalid-credential") {
        msg = "Invalid credentials. Please check and try again.";
      }

      setError(msg);
      toast.error("Login failed!", { duration: 3000 });
    } finally {
      setIsEmailLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    try {
      await signInWithPopup(auth, provider);

      toast.success("Welcome to CarHub!", {
        duration: 4000,
        position: "top-center",
        style: {
          background: "#0e7490",
          color: "#fff",
          borderRadius: "12px",
          padding: "16px",
        },
      });

      navigate(from, { replace: true });
    } catch (err) {
      setError("Google login failed. Try again.");
      toast.error("Google login failed!");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen px-4 py-20 overflow-hidden bg-base-200">
      {/* Background Glow Orbs */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-600 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-32 right-20 w-80 h-80 bg-blue-700 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Floating Car Animation */}
      <motion.div
        initial={{ x: "-100vw" }}
        animate={{ x: "100vw" }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-10 opacity-5 select-none pointer-events-none"
      >
        <FaCar className="text-[40rem] text-cyan-500" />
      </motion.div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 120 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="p-8 sm:p-10 rounded-3xl border border-base-300/50 bg-base-100/70 dark:bg-base-200/80 backdrop-blur-2xl shadow-2xl shadow-cyan-500/20">
          {/* Header */}
          <div className="flex flex-col items-center mb-10 text-center">
            <motion.div
              whileHover={{ scale: 1.15, rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-2xl flex items-center justify-center mb-5"
            >
              <FaCar className="text-4xl text-white" />
            </motion.div>
            <h2 className="text-4xl sm:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600">
              WELCOME BACK
            </h2>
            <p className="mt-3 text-base-content/70">Login to your premium EV trading account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block mb-2 text-sm font-medium text-base-content/70">Email Address</label>
              <div className="flex items-center gap-3 p-4 rounded-2xl border border-base-300 bg-base-200/50 focus-within:border-cyan-500 focus-within:ring-4 focus-within:ring-cyan-500/20 transition-all">
                <FaEnvelope className="text-xl text-cyan-400" />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="your@email.com"
                  className="w-full bg-transparent outline-none text-base-content placeholder-base-content/50"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block mb-2 text-sm font-medium text-base-content/70">Password</label>
              <div className="flex items-center gap-3 p-4 rounded-2xl border border-base-300 bg-base-200/50 focus-within:border-cyan-500 focus-within:ring-4 focus-within:ring-cyan-500/20 transition-all">
                <FaLock className="text-xl text-cyan-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  placeholder="••••••••"
                  className="w-full bg-transparent outline-none text-base-content placeholder-base-content/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-base-content/50 hover:text-cyan-400 transition-colors"
                >
                  {showPassword ? <FaEyeSlash className="text-xl" /> : <FaEye className="text-xl" />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <Link
                to="/auth/forgot-password"
                className="text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center font-medium"
              >
                {error}
              </motion.div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isEmailLoading}
              className="w-full py-5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg shadow-2xl shadow-cyan-600/50 hover:shadow-cyan-600/70 hover:scale-[1.02] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {isEmailLoading ? (
                <FaSpinner className="animate-spin text-2xl" />
              ) : (
                "LOGIN NOW"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-8">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-base-300 to-transparent" />
            <span className="px-4 text-xs uppercase tracking-widest text-base-content/50">
              Or continue with
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-base-300 to-transparent" />
          </div>

          {/* Google Login */}
       <button
  onClick={handleGoogleLogin}
  disabled={isGoogleLoading}
  className="w-full py-5 rounded-2xl border border-base-300 bg-base-200/60 hover:bg-base-300/70 backdrop-blur-xl transition-all duration-300 flex items-center justify-center gap-4 font-semibold text-base-content disabled:opacity-70"
>
  {isGoogleLoading ? (
    <FaSpinner className="text-2xl text-cyan-400 animate-spin" />
  ) : (
    <>
      <FaGoogle className="text-2xl text-cyan-400" />
      <span>CONTINUE WITH GOOGLE</span>
    </>
  )}
</button>

          {/* Register Link */}
          <p className="mt-8 text-center text-base-content/70">
            Don't have an account?{" "}
            <Link
              to="/auth/register"
              className

className="font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              Register Here
            </Link>
          </p>
        </div>
      </motion.div>

      {/* Bottom Neon Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_40px_rgba(34,211,238,0.8)]" />
    </div>
  );
};

export default Login;