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
    <section className="relative py-24 overflow-hidden bg-base-200">
      {/* Subtle Background Glows */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute rounded-full top-20 left-20 w-96 h-96 bg-cyan-600 blur-3xl animate-pulse"></div>
        <div className="absolute delay-700 bg-purple-600 rounded-full bottom-20 right-20 w-80 h-80 blur-3xl animate-pulse"></div>
      </div>

      <div className="container relative z-10 px-6 mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="mb-2 text-sm font-bold tracking-widest uppercase text-cyan-400">
            Why Global Leaders Trust Us
          </p>
          <h2 className="text-4xl font-black text-transparent sm:text-5xl lg:text-6xl bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600">
            Why Choose CARHUB?
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-lg leading-relaxed text-base-content/70">
            Not just a platform — a <span className="font-bold text-cyan-300">premium partnership</span> for elite EV trading.
          </p>
        </motion.div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 gap-8 mx-auto md:grid-cols-2 lg:grid-cols-3 max-w-7xl">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.03 }}
              className="relative p-8 overflow-hidden transition-all duration-500 border shadow-xl group bg-base-100/50 dark:bg-base-100/30 backdrop-blur-xl border-base-300 dark:border-base-700 rounded-3xl hover:shadow-2xl hover:shadow-cyan-500/30"
            >
              {/* Hover Glow Background */}
              <div className="absolute inset-0 transition-opacity duration-500 opacity-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 group-hover:opacity-100 rounded-3xl"></div>

              {/* Icon */}
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 flex justify-center mb-6"
              >
                <div className="flex items-center justify-center w-20 h-20 transition-transform duration-300 border rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border-base-300 dark:border-base-600 group-hover:scale-110">
                  {reason.icon}
                </div>
              </motion.div>

              {/* Content */}
              <div className="relative z-10 text-center">
                <h3 className="mb-3 text-xl font-bold transition-colors duration-300 text-base-content group-hover:text-cyan-400">
                  {reason.title}
                </h3>
                <p className="text-sm leading-relaxed text-base-content/70">
                  {reason.desc}
                </p>
              </div>

              {/* Bottom Accent Line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 transition-opacity duration-500 opacity-0 bg-gradient-to-r from-cyan-500 to-purple-600 group-hover:opacity-100 rounded-b-3xl"></div>
            </motion.div>
          ))}
        </div>

        {/* Trusted Brands Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-24 text-center"
        >
          <p className="mb-2 text-sm font-bold tracking-widest uppercase text-cyan-400">
            Trusted by the World's Leading Brands
          </p>
          <h3 className="mb-12 text-3xl font-black sm:text-4xl text-base-content">
            500+ Enterprises & Growing
          </h3>

          <div className="grid max-w-6xl grid-cols-2 gap-8 mx-auto sm:grid-cols-3 lg:grid-cols-6">
            {brands.map((brand, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.15 }}
                className="flex flex-col items-center group"
              >
                <div className="p-6 transition-all border shadow-lg bg-base-100 dark:bg-base-200 rounded-2xl border-base-300 dark:border-base-600 hover:shadow-xl hover:shadow-cyan-500/30 duration-400">
                  <img
                    src={brand.src}
                    alt={brand.alt}
                    className="object-contain h-10 transition-all duration-500 sm:h-12 filter grayscale group-hover:grayscale-0 brightness-75 group-hover:brightness-100"
                    loading="lazy"
                  />
                </div>
                <p className="mt-4 text-xs font-semibold transition-colors duration-300 sm:text-sm text-base-content/70 group-hover:text-cyan-400">
                  {brand.name}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Neon Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_30px_rgba(34,211,238,0.6)]"></div>
    </section>
  );
};

export default WhyChooseUs;