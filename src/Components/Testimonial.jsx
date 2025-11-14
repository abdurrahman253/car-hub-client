import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { FaQuoteLeft, FaStar, FaHeadset, FaCheck, FaShippingFast, FaGlobe, FaUsers, FaPaperPlane, FaTimes } from "react-icons/fa";
import { useInView } from "react-intersection-observer";

// Live Counter Hook
const useCounter = (end, duration = 3000) => {
  const [count, setCount] = useState(0);
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
      let start = 0;
      const increment = end / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [inView, end, duration, controls]);

  return [count, ref, controls];
};


const testimonials = [
  {
    rating: 5,
    text: "CARHUB transformed our EV export business. Deals that used to take weeks now close in days. Incredible platform!",
    name: "Alexander Chen",
    role: "CEO, Horizon Motors – Dubai",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    verified: true,
  },
  {
    rating: 5,
    text: "The most professional and secure B2B EV marketplace I've ever used. Their team handled everything from inspection to shipping.",
    name: "Maria Rodriguez",
    role: "Procurement Director, ElectraGroup – Spain",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
    verified: true,
  },
  {
    rating: 5,
    text: "Outstanding service! We exported 47 Tesla Model Ys to Germany in under 20 days. Highly recommend CARHUB.",
    name: "James Mitchell",
    role: "Fleet Manager, GreenDrive UK",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    verified: true,
  },
  {
    rating: 5,
    text: "Best prices, fastest logistics, and 24/7 support. CARHUB is now our only platform for luxury EV trading.",
    name: "Aisha Al-Mansoori",
    role: "Managing Director, EliteAuto – Qatar",
    image: "https://images.unsplash.com/photo-1580489940920-9caaad8c4c36?w=400&h=400&fit=crop&crop=face",
    verified: true,
  },
];

const Testimonial = () => {
  const [current, setCurrent] = useState(0);

  // Live Counters
  const [liveClients, liveRef, liveControls] = useCounter(842, 4000);
  const [totalExports, exportRef, exportControls] = useCounter(1250, 3500);
  const [countries, countryRef, countryControls] = useCounter(47, 3000);
  const [satisfaction, satRef, satControls] = useCounter(98, 2800);

  // Auto Slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-gray-100 dark:from-slate-950 via-white dark:via-black to-gray-100 dark:to-slate-950">
      {/* Background Glow */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-20 w-96 h-96 bg-cyan-600 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-700 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-cyan-400 text-sm tracking-widest font-bold uppercase">Trusted Worldwide</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-black dark:from-white via-cyan-300 to-black dark:to-white mt-2">
            Client Success Stories
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Join <span className="text-cyan-400 font-bold">500+ global businesses</span> who trust CARHUB
          </p>
        </motion.div>

        {/* Testimonial Slider */}
        <div className="relative max-w-6xl mx-auto mb-20">
          <div className="overflow-hidden">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center"
            >
              <motion.div
                whileHover={{ y: -10 }}
                className="relative w-full max-w-4xl"
                style={{ perspective: 1000 }}
              >
                <motion.div
                  animate={{ rotateY: current % 2 === 0 ? -5 : 5 }}
                  transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
                  className="relative p-8 sm:p-12 backdrop-blur-2xl bg-gray-100/10 dark:bg-white/10 border border-cyan-500/30 rounded-3xl shadow-2xl shadow-cyan-500/50"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <FaQuoteLeft className="absolute top-8 left-8 text-6xl text-cyan-400/20" />
                  <div className="flex justify-center mb-6">
                    {[...Array(testimonials[current].rating)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400 text-xl drop-shadow-lg" />
                    ))}
                  </div>
                  <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 text-center leading-relaxed italic mb-8 px-4">
                    "{testimonials[current].text}"
                  </p>
                  <div className="flex flex-col sm:flex-row items-center gap-6 mt-10">
                    <div className="relative">
                      <img
                        src={testimonials[current].image}
                        alt={testimonials[current].name}
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-full ring-4 ring-cyan-400/50 shadow-xl object-cover"
                      />
                      {testimonials[current].verified && (
                        <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-green-400 rounded-full border-2 border-black flex items-center justify-center">
                          <FaCheck className="text-white text-xs" />
                        </div>
                      )}
                    </div>
                    <div className="text-center sm:text-left">
                      <h4 className="text-xl font-bold text-black dark:text-white">{testimonials[current].name}</h4>
                      <p className="text-cyan-400 text-sm">{testimonials[current].role}</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-3 mt-10">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  i === current
                    ? "bg-cyan-400 w-10 shadow-lg shadow-cyan-400/70"
                    : "bg-gray-600 hover:bg-gray-500"
                }`}
              />
            ))}
          </div>
        </div>

        {/* LIVE Animated Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 sm:gap-8 py-16 border-y border-cyan-500/20">
          <motion.div ref={liveRef} initial={{ opacity: 0, y: 50 }} animate={liveControls} className="text-center group">
            <div className="text-5xl sm:text-6xl font-black text-cyan-400 group-hover:text-cyan-300 transition">
              {liveClients}
              <span className="inline-block w-3 h-3 bg-green-400 rounded-full ml-2 animate-pulse"></span>
            </div>
            <div className="flex justify-center mt-2 text-3xl text-cyan-400"><FaUsers /></div>
            <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">Live Clients Online</p>
          </motion.div>

          <motion.div ref={exportRef} initial={{ opacity: 0, y: 50 }} animate={exportControls} className="text-center group">
            <div className="text-5xl sm:text-6xl font-black text-cyan-400 group-hover:text-cyan-300 transition">
              {totalExports}+
            </div>
            <div className="flex justify-center mt-2 text-3xl text-cyan-400"><FaShippingFast /></div>
            <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">Exports This Month</p>
          </motion.div>

          <motion.div ref={countryRef} initial={{ opacity: 0, y: 50 }} animate={countryControls} className="text-center group">
            <div className="text-5xl sm:text-6xl font-black text-cyan-400 group-hover:text-cyan-300 transition">
              {countries}
            </div>
            <div className="flex justify-center mt-2 text-3xl text-cyan-400"><FaGlobe /></div>
            <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">Countries Served</p>
          </motion.div>

          <motion.div ref={satRef} initial={{ opacity: 0, y: 50 }} animate={satControls} className="text-center group">
            <div className="text-5xl sm:text-6xl font-black text-cyan-400 group-hover:text-cyan-300 transition">
              {satisfaction}%
            </div>
            <div className="flex justify-center mt-2 text-3xl text-cyan-400"><FaCheck /></div>
            <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">Client Satisfaction</p>
          </motion.div>
        </div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-20 text-center"
        >
          <p className="text-black dark:text-white font-bold text-lg">Excellent!</p>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="text-yellow-400 text-xl" />
            ))}
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            4.9 Rating out of 5.0 based on <span className="text-cyan-400 font-bold">24,854</span> reviews
          </p>
          <span className="text-green-400 font-bold">Trustpilot</span>
        </motion.div>
      </div>

      {/* Bottom Neon Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_30px_rgba(34,211,238,0.8)]"></div>
    </section>
  );
};

export default Testimonial;