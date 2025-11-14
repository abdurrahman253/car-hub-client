// src/Pages/Auth/Login.jsx
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaGoogle, FaLock, FaEnvelope, FaSpinner, FaCar, FaEye, FaEyeSlash } from "react-icons/fa";
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
    const email = form.email.value;
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
          padding: "16px",
          borderRadius: "12px",
        },
      });

      navigate(from, { replace: true });
    } catch (err) {
      if (err.code === "auth/user-not-found" || err.code === "auth/wrong-password") {
        setError("Invalid email or password. Please try again.");
      } else if (err.code === "auth/too-many-requests") {
        setError("Too many failed attempts. Try again later.");
      } else {
        setError("Login failed. Please check your connection.");
      }

      toast.error("Login failed!", {
        duration: 3000,
        position: "top-center",
      });
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
          padding: "16px",
          borderRadius: "12px",
        },
      });

      navigate(from, { replace: true });
    } catch (err) {
      setError("Google login failed. Please try again.");
      toast.error("Google login failed!", { duration: 3000 });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-black to-slate-950 px-4 py-20">
      {/* Animated Background Car */}
      <motion.div
        initial={{ x: "-100vw" }}
        animate={{ x: "100vw" }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-10 opacity-10"
      >
        <FaCar className="text-[40rem] text-cyan-500" />
      </motion.div>

      {/* Neon Glow Orbs */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-600 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-20 w-80 h-80 bg-blue-700 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="p-8 sm:p-10 backdrop-blur-2xl bg-white/10 border border-cyan-500/30 rounded-3xl shadow-2xl shadow-cyan-500/50">
          {/* Logo + Title */}
          <div className="flex flex-col items-center mb-8">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-xl shadow-cyan-500/70 mb-4"
            >
              <FaCar className="text-4xl text-white" />
            </motion.div>
            <h2 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              WELCOME BACK
            </h2>
            <p className="mt-2 text-gray-400 tracking-wider text-center">
              Login to Your Premium EV Account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-300">Email Address</label>
              <div className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-2xl focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-400/30 transition-all">
                <FaEnvelope className="text-cyan-400 text-xl" />
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full bg-transparent text-white placeholder-gray-500 outline-none"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-300">Password</label>
              <div className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-2xl focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-400/30 transition-all">
                <FaLock className="text-cyan-400 text-xl" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  className="w-full bg-transparent text-white placeholder-gray-500 outline-none"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-cyan-400 transition"
                >
                  {showPassword ? <FaEyeSlash className="text-xl" /> : <FaEye className="text-xl" />}
                </button>
              </div>
            </div>

            {/* Forget Password Link */}
            <div className="text-right">
              <Link
                to="/auth/forgot-password"
                className="text-sm text-cyan-400 hover:text-cyan-300 transition underline"
              >
                Forgot Password?
              </Link>
            </div>

            {/* General Error */}
            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 text-sm text-center text-red-400 bg-red-500/10 border border-red-500/30 rounded-xl backdrop-blur-xl"
              >
                {error}
              </motion.p>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={isEmailLoading}
              className="w-full py-5 mt-6 font-bold text-black bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl shadow-lg shadow-cyan-500/70 hover:shadow-cyan-500/90 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3"
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
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"></div>
            <span className="px-4 text-xs text-gray-500 uppercase tracking-widest">Or continue with</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"></div>
          </div>

          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            disabled={isGoogleLoading}
            className="w-full py-5 font-bold text-white bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl hover:bg-white/20 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/60 transition-all duration-300 flex items-center justify-center gap-4"
          >
            {isGoogleLoading ? (
              <FaSpinner className="animate-spin text-2xl" />
            ) : (
              <>
                <FaGoogle className="text-2xl text-cyan-400" />
                CONTINUE WITH GOOGLE
              </>
            )}
          </button>

          {/* Register Link */}
          <p className="mt-8 text-center text-gray-400">
            Don't have an account?{" "}
            <Link to="/auth/register" className="font-bold text-cyan-400 hover:text-cyan-300 transition">
              Register Here
            </Link>
          </p>
        </div>
      </motion.div>

      {/* Bottom Neon Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_30px_rgba(34,211,238,0.8)]"></div>
    </div>
  );
};

export default Login;