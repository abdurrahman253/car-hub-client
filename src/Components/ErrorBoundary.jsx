import React from "react";
import { motion } from "framer-motion";
import { FaExclamationTriangle, FaHome, FaRedo } from "react-icons/fa";
import { Link } from "react-router-dom";

class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null, errorInfo: null };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 dark:from-slate-950 via-white dark:via-black to-gray-100 dark:to-slate-950 flex items-center justify-center px-6 relative overflow-hidden">
          {/* Background Glow */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-20 w-96 h-96 bg-red-600/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-80 h-80 bg-orange-600/30 rounded-full blur-3xl animate-pulse delay-700"></div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 max-w-2xl w-full text-center"
          >
            {/* Icon */}
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex items-center justify-center w-28 h-28 bg-gradient-to-br from-red-600/20 to-orange-600/20 rounded-full border border-red-500/30 backdrop-blur-xl mb-8"
            >
              <FaExclamationTriangle className="text-5xl text-red-400" />
            </motion.div>

            {/* Title */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-orange-400 to-red-400 mb-4">
              Oops! Something Went Wrong
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              We encountered an unexpected error while loading this page. Our team has been notified.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={this.handleReload}
                className="group inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold px-8 py-4 rounded-full shadow-2xl hover:shadow-red-600/70 transform hover:scale-105 transition-all duration-300"
              >
                <FaRedo className="group-hover:rotate-180 transition-transform duration-500" />
                Try Again
              </button>

              <Link
                to="/"
                className="group inline-flex items-center gap-3 bg-gray-100/10 dark:bg-white/10 backdrop-blur-xl border border-red-500/30 text-red-400 font-bold px-8 py-4 rounded-full hover:bg-red-500/20 hover:border-red-400 transition-all duration-300"
              >
                <FaHome />
                Back to Home
              </Link>
            </div>

      
            {process.env.NODE_ENV === "development" && this.state.error && (
              <motion.details
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-12 p-6 bg-gray-100/5 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-red-500/20 text-left text-xs text-gray-600 dark:text-gray-400"
              >
                <summary className="cursor-pointer font-bold text-red-400 mb-2">
                  Technical Details (Dev Only)
                </summary>
                <pre className="overflow-auto max-h-48">
                  {this.state.error.toString()}
                  {"\n"}
                  {this.state.errorInfo.componentStack}
                </pre>
              </motion.details>
            )}
          </motion.div>

        
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-400 to-transparent shadow-[0_0_30px_rgba(239,68,68,0.8)]" />
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;