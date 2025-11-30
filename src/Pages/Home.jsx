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
    <div className="relative min-h-screen overflow-hidden bg-base-100 dark:bg-base-content">
      {/* Navbar */}
      <Navbar newsletterRef={newsletterRef} />

      {/* Hero Banner */}
      <Banner />

      {/* Floating Neon Orbs */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute rounded-full top-20 left-10 w-72 h-72 bg-cyan-500/20 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute rounded-full bottom-32 right-20 w-96 h-96 bg-blue-600/20 blur-3xl"
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
        <section className="container px-6 py-20 mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-black leading-tight text-transparent sm:text-5xl lg:text-6xl bg-clip-text bg-gradient-to-r from-base-content dark:from-base-content via-blue-500 to-base-content dark:to-base-content">
              Experience the Future of Driving
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-base-content/60 sm:text-xl dark:text-base-content/60">
              Import & Export Premium EVs Globally –{" "}
              <span className="font-bold text-cyan-400">Seamless, Secure, Swift</span>
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