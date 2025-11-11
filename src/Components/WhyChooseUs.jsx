import React from "react";
import { motion } from "framer-motion";
import { 
  FaGlobe, 
  FaShieldAlt, 
  FaClock, 
  FaDollarSign, 
  FaHeadset, 
  FaTruck 
} from "react-icons/fa";

const reasons = [
  {
    icon: <FaGlobe className="text-4xl text-cyan-400" />,
    title: "Global Network",
    desc: "Direct partnerships with 47+ countries for seamless import/export."
  },
  {
    icon: <FaShieldAlt className="text-4xl text-emerald-400" />,
    title: "Verified Quality",
    desc: "Every vehicle undergoes 150+ point inspection before shipping."
  },
  {
    icon: <FaClock className="text-4xl text-amber-400" />,
    title: "Lightning Fast",
    desc: "Average delivery in 14 days – tracked in real-time, worldwide."
  },
  {
    icon: <FaDollarSign className="text-4xl text-purple-400" />,
    title: "Best Price Guarantee",
    desc: "We beat any verified competitor quote by 5% or more."
  },
  {
    icon: <FaHeadset className="text-4xl text-pink-400" />,
    title: "24/7 Elite Support",
    desc: "Dedicated account manager + live chat in 5 languages."
  },
  {
    icon: <FaTruck className="text-4xl text-indigo-400" />,
    title: "Door-to-Door Logistics",
    desc: "From Japan to your driveway – fully insured, zero hassle."
  }
];

// Real Brand Logos with Name
const brands = [
  { src: "https://boxcar-nextjs.vercel.app/_next/image?url=%2Fimages%2Fresource%2Fbrand-1.png&w=128&q=75", alt: "Toyota", name: "Toyota" },
  { src: "https://boxcar-nextjs.vercel.app/_next/image?url=%2Fimages%2Fresource%2Fbrand-2.png&w=96&q=75", alt: "Nissan", name: "Nissan" },
  { src: "https://boxcar-nextjs.vercel.app/_next/image?url=%2Fimages%2Fresource%2Fbrand-3.png&w=128&q=75", alt: "Honda", name: "Honda" },
  { src: "https://boxcar-nextjs.vercel.app/_next/image?url=%2Fimages%2Fresource%2Fbrand-4.png&w=128&q=75", alt: "Tesla", name: "Tesla" },
  { src: "https://boxcar-nextjs.vercel.app/_next/image?url=%2Fimages%2Fresource%2Fbrand-5.png&w=96&q=75", alt: "BMW", name: "BMW" },
  { src: "https://boxcar-nextjs.vercel.app/_next/image?url=%2Fimages%2Fresource%2Fbrand-6.png&w=96&q=75", alt: "Mercedes", name: "Mercedes-Benz" }
];

const WhyChooseUs = () => {
  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-slate-950 via-black to-slate-950">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-600/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-600/30 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-cyan-400 text-sm font-bold tracking-widest uppercase mb-2">
            Why Global Leaders Trust Us
          </p>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-300 to-white">
            Why Choose CARHUB?
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-lg">
            Not just a platform — a <span className="text-cyan-300 font-semibold">premium partnership</span> for elite EV trading.
          </p>
        </motion.div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -12, scale: 1.02 }}
              className="group relative p-8 bg-white/5 backdrop-blur-xl border border-cyan-500/20 rounded-3xl shadow-2xl hover:shadow-cyan-500/30 transition-all duration-500 overflow-hidden"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Icon Container */}
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 mb-6"
              >
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/10 group-hover:scale-110 transition-transform">
                  {reason.icon}
                </div>
              </motion.div>

              {/* Content */}
              <div className="relative z-10 text-center">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                  {reason.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {reason.desc}
                </p>
              </div>

              {/* Bottom Accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-b-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </motion.div>
          ))}
        </div>

        {/* Premium Brand Trust Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <div className="text-center mb-12">
            <p className="text-cyan-400 text-sm font-bold tracking-widest uppercase">
              Trusted by the World's Leading Brands
            </p>
            <h3 className="text-3xl sm:text-4xl font-black text-white mt-2">
              500+ Enterprises & Growing
            </h3>
          </div>

          {/* Brand Logos with Name */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 max-w-6xl mx-auto items-center justify-items-center">
            {brands.map((brand, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1 }}
                className="group relative flex flex-col items-center"
              >
                {/* Logo Card */}
                <div className="p-5 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-lg hover:shadow-cyan-500/40 transition-all duration-300 w-full flex justify-center">
                  <img
                    src={brand.src}
                    alt={brand.alt}
                    className="h-10 sm:h-12 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500"
                    loading="lazy"
                  />
                </div>

                {/* Brand Name */}
                <motion.p
                  initial={{ opacity: 0, y: 5 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
                  viewport={{ once: true }}
                  className="mt-3 text-xs sm:text-sm font-semibold text-gray-400 group-hover:text-cyan-300 transition-colors"
                >
                  {brand.name}
                </motion.p>

                {/* Subtle Glow */}
                <div className="absolute inset-x-0 -bottom-4 h-8 bg-gradient-to-t from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500"></div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Neon Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_30px_rgba(34,211,238,0.8)]"></div>
    </section>
  );
};

export default WhyChooseUs;