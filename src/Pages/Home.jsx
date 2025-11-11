import React from "react";
import Banner from "../Components/Banner";
import Testimonial from "../Components/Testimonial";
import { motion } from "framer-motion"; 

const Home = () => {
  return (
    <>
      {/* Hero Banner */}
      <Banner />

      {/* Floating Neon Orbs - Background Effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-32 right-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-cyan-500/10 to-transparent rounded-full blur-3xl animate-ping" />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Intro Section */}
        <section className="container mx-auto px-6 py-20 sm:py-24 lg:py-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 leading-tight">
              Experience the Future of Driving
            </h2>
            <p className="mt-6 max-w-3xl mx-auto text-lg sm:text-xl text-gray-300 leading-relaxed">
              Import & Export Premium EVs Globally – <span className="text-cyan-400 font-bold">Seamless, Secure, Swift</span>
            </p>
          </motion.div>
        </section>

        {/* Testimonial Section - ADDED HERE */}
        <Testimonial />

        {/* Optional: More Sections Below */}
        {/* <section className="container mx-auto px-6 py-24">
          <h2 className="text-4xl font-bold text-center text-white">More Features Coming Soon</h2>
        </section> */}
      </div>

      {/* Bottom Neon Line */}
      <div className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_30px_rgba(34,211,238,0.8)] z-20" />
    </>
  );
};

export default Home;