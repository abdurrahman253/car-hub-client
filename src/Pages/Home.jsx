// src/pages/Home.jsx
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
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Navbar */}
      <Navbar newsletterRef={newsletterRef} />

      {/* Hero Banner */}
      <Banner />

      {/* Floating Neon Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-32 right-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-cyan-500/10 to-transparent rounded-full blur-3xl"
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
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 leading-tight">
              Experience the Future of Driving
            </h2>
            <p className="mt-6 text-lg sm:text-xl text-gray-300 leading-relaxed">
              Import & Export Premium EVs Globally –{" "}
              <span className="text-cyan-400 font-bold">Seamless, Secure, Swift</span>
            </p>
          </motion.div>
        </section>

        {/* Latest Products */}
        <LatestProducts />

        {/* Why Choose Us */}
        <WhyChooseUs />

        {/* Testimonial */}
        <Testimonial />

        {/* Newsletter */}
        <div ref={newsletterRef}>
          <NewsLetter />
        </div>
      </main>

      {/* Bottom Neon Line */}
      <div className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_30px_rgba(34,211,238,0.8)] z-50 pointer-events-none" />
    </div>
  );
};

export default Home;