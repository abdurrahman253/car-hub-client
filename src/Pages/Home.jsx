import React from "react";
import Banner from "../Components/Banner";

const Home = () => {
  return (
    <>
      <Banner />
      <div className="relative">
        {/* Floating Orbs */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-32 right-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        {/* Rest of your home content */}
        <section className="container mx-auto px-6 py-24">
          <h2 className="text-5xl font-black text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">
            Experience the Future of Driving
          </h2>
          {/* Add more sections */}
        </section>
      </div>
    </>
  );
};

export default Home;