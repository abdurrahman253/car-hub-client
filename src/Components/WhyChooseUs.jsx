import React from "react";
import { motion } from "framer-motion";
import {
  FaGlobe,
  FaShieldAlt,
  FaClock,
  FaDollarSign,
  FaHeadset,
  FaTruck,
} from "react-icons/fa";

// ──────────────────────────────────────────────────────────────
// Reasons Data
// ──────────────────────────────────────────────────────────────
const reasons = [
  {
    icon: <FaGlobe className="w-10 h-10 text-cyan-400" />,
    title: "Global Reach",
    desc: "Operate in 150+ countries with seamless cross-border trading and logistics support.",
  },
  {
    icon: <FaShieldAlt className="w-10 h-10 text-cyan-400" />,
    title: "100% Secure Transactions",
    desc: "Bank-grade encryption and escrow protection for every deal.",
  },
  {
    icon: <FaClock className="w-10 h-10 text-cyan-400" />,
    title: "Lightning Fast Deals",
    desc: "Close high-value EV trades in as little as 24 hours.",
  },
  {
    icon: <FaDollarSign className="w-10 h-10 text-cyan-400" />,
    title: "Best Market Prices",
    desc: "Real-time pricing engine ensures you always get the highest value.",
  },
  {
    icon: <FaHeadset className="w-10 h-10 text-cyan-400" />,
    title: "24/7 VIP Support",
    desc: "Dedicated account managers available round the clock.",
  },
  {
    icon: <FaTruck className="w-10 h-10 text-cyan-400" />,
    title: "End-to-End Logistics",
    desc: "From inspection to delivery — we handle everything worldwide.",
  },
];

// ──────────────────────────────────────────────────────────────
// Trusted Brands Data (you can replace src with real logo URLs later)
// ──────────────────────────────────────────────────────────────
const brands = [
  { src: "/logos/tesla.svg", alt: "Tesla", name: "Tesla" },
  { src: "/logos/bmw.svg", alt: "BMW", name: "BMW" },
  { src: "/logos/mercedes.svg", alt: "Mercedes-Benz", name: "Mercedes" },
  { src: "/logos/porsche.svg", alt: "Porsche", name: "Porsche" },
  { src: "/logos/audi.svg", alt: "Audi", name: "Audi" },
  { src: "/logos/rivian.svg", alt: "Rivian", name: "Rivian" },
  { src: "/logos/lucid.svg", alt: "Lucid Motors", name: "Lucid" },
  { src: "/logos/nio.svg", alt: "NIO", name: "NIO" },
  { src: "/logos/byd.svg", alt: "BYD", name: "BYD" },
  { src: "/logos/volvo.svg", alt: "Volvo", name: "Volvo" },
  { src: "/logos/jaguar.svg", alt: "Jaguar", name: "Jaguar" },
  { src: "/logos/polestar.svg", alt: "Polestar", name: "Polestar" },
];

const WhyChooseUs = () => {
  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-gray-100 dark:from-slate-950 via-white dark:via-black to-gray-100 dark:to-slate-950 border-t border-cyan-900/30">
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
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-black dark:from-white via-cyan-300 to-black dark:to-white">
            Why Choose CARHUB?
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            Not just a platform — a{" "}
            <span className="text-cyan-300 font-semibold">premium partnership</span> for elite EV trading.
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
              className="group relative p-8 bg-gray-100/5 dark:bg-white/5 backdrop-blur-xl border border-cyan-500/20 rounded-3xl shadow-2xl hover:shadow-cyan-500/30 transition-all duration-500 overflow-hidden"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Icon Container */}
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 mb-6"
              >
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-gray-300/10 dark:border-white/10 group-hover:scale-110 transition-transform">
                  {reason.icon}
                </div>
              </motion.div>

              {/* Content */}
              <div className="relative z-10 text-center">
                <h3 className="text-xl font-bold text-black dark:text-white mb-3 group-hover:text-cyan-300 transition-colors">
                  {reason.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
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
            <h3 className="text-3xl sm:text-4xl font-black text-black dark:text-white mt-2">
              500+ Enterprises & Growing
            </h3>
          </div>

          {/* Brand Logos */}
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
                <div className="p-5 bg-gray-100/5 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-gray-300/10 dark:border-white/10 shadow-lg hover:shadow-cyan-500/40 transition-all duration-300 w-full flex justify-center">
                  <img
                    src={brand.src}
                    alt={brand.alt}
                    className="h-10 sm:h-12 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500"
                    loading="lazy"
                  />
                </div>

                <motion.p
                  initial={{ opacity: 0, y: 5 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
                  viewport={{ once: true }}
                  className="mt-3 text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-400 group-hover:text-cyan-300 transition-colors"
                >
                  {brand.name}
                </motion.p>

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