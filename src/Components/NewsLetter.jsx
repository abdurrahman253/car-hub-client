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
      className="relative py-20 overflow-hidden bg-gradient-to-b from-base-content via-base-content to-base-content"
      style={{
        backgroundImage:
          "url('https://motorx-six.vercel.app/assets/images/page/car.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-base-100/80 dark:from-base-content/80 via-base-200/70 dark:via-base-content/60 to-base-100/80 dark:to-base-content/80 backdrop-blur-sm"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 blur-xl"></div>

      <div className="container relative z-10 px-6 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <p className="mb-4 text-sm font-bold tracking-wider uppercase text-cyan-400">
            Exclusive EV Insights
          </p>
          <h2 className="mb-6 text-4xl font-black sm:text-5xl lg:text-6xl text-base-content dark:text-base-content">
            Join Our Premium Newsletter
          </h2>
          <p className="mb-12 text-lg text-base-content/60 dark:text-base-content/60">
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
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <FaEnvelope className="text-xl text-cyan-400" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full py-6 pl-12 pr-12 text-lg transition-all duration-300 border bg-base-content/60 dark:bg-base-content/60 backdrop-blur-xl border-cyan-500/30 rounded-3xl text-base-content dark:text-base-content placeholder-base-content/60 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50"
                required
              />
              <button
                type="submit"
                className="absolute inset-y-0 right-0 flex items-center justify-center pr-4 group"
                disabled={!email.trim()}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-6 font-bold transition-all duration-300 shadow-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-base-content rounded-3xl shadow-cyan-500/50 group-hover:shadow-cyan-500/70"
                >
                  <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                </motion.div>
              </button>
            </div>

            {submitted && (
              <motion.p
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-4 text-sm font-bold text-cyan-400"
              >
                Successfully subscribed! Check your inbox.
              </motion.p>
            )}
          </motion.form>

          <p className="mt-6 text-xs text-base-content/60">
            We respect your privacy. Unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
});

NewsLetter.displayName = "NewsLetter";
export default NewsLetter;