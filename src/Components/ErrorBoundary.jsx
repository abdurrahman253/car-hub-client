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
        <div className="relative flex items-center justify-center min-h-screen px-6 overflow-hidden bg-gradient-to-br from-base-200 dark:from-base-200 via-base-100 dark:via-base-100 to-base-200 dark:to-base-200">
          {/* Background Glow */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute rounded-full top-20 left-20 w-96 h-96 bg-red-600/30 blur-3xl animate-pulse"></div>
            <div className="absolute delay-700 rounded-full bottom-20 right-20 w-80 h-80 bg-orange-600/30 blur-3xl animate-pulse"></div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 w-full max-w-2xl text-center"
          >
            {/* Icon */}
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex items-center justify-center mb-8 border rounded-full w-28 h-28 bg-gradient-to-br from-red-600/20 to-orange-600/20 border-red-500/30 backdrop-blur-xl"
            >
              <FaExclamationTriangle className="text-5xl text-red-400" />
            </motion.div>

            {/* Title */}
            <h1 className="mb-4 text-5xl font-black text-transparent sm:text-6xl md:text-7xl bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-red-400">
              Oops! Something Went Wrong
            </h1>

            <p className="mb-8 text-lg leading-relaxed sm:text-xl text-base-content/60 dark:text-base-content/60">
              We encountered an unexpected error while loading this page. Our team has been notified.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button
                onClick={this.handleReload}
                className="inline-flex items-center gap-3 px-8 py-4 transition-all duration-300 transform rounded-full shadow-2xl group bg-gradient-to-r from-red-600 to-orange-600 text-base-content hover:shadow-red-600/70 hover:scale-105"
              >
                <FaRedo className="transition-transform duration-500 group-hover:rotate-180" />
                Try Again
              </button>

              <Link
                to="/"
                className="inline-flex items-center gap-3 px-8 py-4 transition-all duration-300 border rounded-full group bg-base-content/60 dark:bg-base-content/60 backdrop-blur-xl border-base-content/60 hover:bg-base-content/60 hover:border-base-content/60"
              >
                <FaHome />
                Back to Home
              </Link>
            </div>

      
            {process.env.NODE_ENV === "development" && this.state.error && (
              <motion.details
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="p-6 mt-12 text-xs text-left border bg-base-content/60 dark:bg-base-content/60 backdrop-blur-xl rounded-2xl border-base-content/60 text-base-content/60 dark:text-base-content/60"
              >
                <summary className="mb-2 font-bold text-red-400 cursor-pointer">
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