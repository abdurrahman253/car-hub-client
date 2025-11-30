import React, { useRef } from "react";
import Banner from "../Components/Banner";
import LatestProducts from "../Components/LatestProducts";
import WhyChooseUs from "../Components/WhyChooseUs";
import Testimonial from "../Components/Testimonial";
import NewsLetter from "../Components/NewsLetter";
import Navbar from "../Components/Navbar";
import { motion } from "framer-motion";

const Home = () => {
  const newsletterRef = useRef(null);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      {/* Navbar */}
      <Navbar newsletterRef={newsletterRef} />

      {/* Hero Banner */}
      <Banner />

      {/* Floating Neon Orbs */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-10 w-72 h-72 rounded-full bg-cyan-500/10 dark:bg-cyan-500/20 blur-3xl"
        />

        <motion.div
          animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-32 right-20 w-96 h-96 rounded-full bg-blue-600/10 dark:bg-blue-600/20 blur-3xl"
        />

        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-radial from-cyan-500/5 dark:from-cyan-500/10 to-transparent blur-3xl"
        />
      </div>

      {/* Main Content */}
      <main className="relative z-10">
        {/* Intro */}
        <section className="container mx-auto px-6 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mx-auto max-w-4xl"
          >
            <h2 className="bg-gradient-to-r from-gray-900 via-blue-500 to-gray-900 bg-clip-text text-4xl font-black leading-tight text-transparent dark:from-white dark:to-white sm:text-5xl lg:text-6xl">
              Experience the Future of Driving
            </h2>

            <p className="mt-6 text-lg leading-relaxed text-gray-600 dark:text-gray-400 sm:text-xl">
              Import & Export Premium EVs Globally –{" "}
              <span className="font-bold text-cyan-500 dark:text-cyan-400">
                Seamless, Secure, Swift
              </span>
            </p>
          </motion.div>
        </section>

        {/* Sections */}
        <LatestProducts />
        <WhyChooseUs />
        <Testimonial />

        {/* Newsletter */}
        <div ref={newsletterRef}>
          <NewsLetter />
        </div>
      </main>

      {/* Bottom Neon Line */}
      <div className="fixed bottom-0 left-0 right-0 z-50 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_30px_rgba(34,211,238,0.8)] pointer-events-none" />
    </div>
  );
};

export default Home;
