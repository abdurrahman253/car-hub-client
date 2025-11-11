import React, { forwardRef, useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaArrowRight } from "react-icons/fa";

const NewsLetter = forwardRef((_, ref) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setEmail("");
      }, 3000);
    }
  };

  return (
    <section
      ref={ref}
      className="relative py-20 overflow-hidden"
      style={{
        backgroundImage:
          "url('https://motorx-six.vercel.app/assets/images/page/car.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-slate-950/70 to-black/80 backdrop-blur-sm"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 blur-xl"></div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          <p className="text-cyan-400 text-sm font-bold tracking-wider uppercase mb-4">
            Exclusive EV Insights
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6">
            Join Our Premium Newsletter
          </h2>
          <p className="text-gray-400 text-lg mb-12">
            Get first access to rare EV imports, market trends, and exclusive
            deals delivered straight to your inbox.
          </p>

          <motion.form
            onSubmit={handleSubmit}
            className="relative max-w-md mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaEnvelope className="text-cyan-400 text-xl" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full pl-12 pr-12 py-6 text-lg bg-white/10 backdrop-blur-xl border border-cyan-500/30 rounded-3xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all duration-300"
                required
              />
              <button
                type="submit"
                className="absolute inset-y-0 right-0 pr-4 flex items-center justify-center group"
                disabled={!email.trim()}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 text-black px-6 py-6 rounded-3xl font-bold shadow-2xl shadow-cyan-500/50 group-hover:shadow-cyan-500/70 transition-all duration-300"
                >
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </motion.div>
              </button>
            </div>

            {submitted && (
              <motion.p
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-4 text-cyan-400 text-sm font-bold"
              >
                Successfully subscribed! Check your inbox.
              </motion.p>
            )}
          </motion.form>

          <p className="mt-6 text-xs text-gray-500">
            We respect your privacy. Unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
});

NewsLetter.displayName = "NewsLetter";
export default NewsLetter;
