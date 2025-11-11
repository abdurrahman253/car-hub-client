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

// Testimonial Data
const testimonials = [
  {
    id: 1,
    name: "Alex Morgan",
    role: "CEO, AutoLux",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    text: "CARHUB transformed our global export business. Seamless logistics, premium support, and lightning-fast delivery. Highly recommended!",
    verified: true,
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "Import Director, EV Elite",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 4,
    text: "The best platform for importing luxury EVs. Transparent pricing, real-time tracking, and zero hassle. Our fleet grew 300% in 6 months.",
    verified: true,
  },
  {
    id: 3,
    name: "Michael Ross",
    role: "Fleet Manager, DriveX",
    image: "https://randomuser.me/api/portraits/men/86.jpg",
    rating: 3,
    text: "From Japan to Dubai - CARHUB handled 50+ vehicles with perfection. Their inspection reports are gold. Trust earned, business won.",
    verified: true,
  },
];

// Custom Chat (Standalone)
const CustomChat = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { text: "Welcome to CARHUB! How can we help you with EV import/export?", sender: "bot" }
  ]);

  const sendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { text: message, sender: "user" }]);
      setMessage("");
      setTimeout(() => {
        setMessages(prev => [...prev, { text: "Our team will contact you soon!", sender: "bot" }]);
      }, 1000);
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 group flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold px-6 py-4 rounded-full shadow-2xl shadow-cyan-500/70 hover:shadow-cyan-500/90 transition-all duration-300 z-50"
      >
        <FaHeadset className="text-2xl group-hover:animate-pulse" />
        <span>Live Support</span>
        <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
      </button>

      {/* Chat Box */}
      {open && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-24 right-6 w-96 h-96 bg-slate-900/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-cyan-500/30 flex flex-col z-50"
        >
          <div className="p-4 border-b border-cyan-500/30 flex justify-between items-center">
            <h3 className="font-bold text-white">CARHUB Support</h3>
            <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-white">
              <FaTimes />
            </button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-xs px-4 py-2 rounded-2xl ${msg.sender === "user" ? "bg-cyan-500 text-black" : "bg-white/10 text-gray-300"}`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-cyan-500/30 flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message..."
              className="flex-1 bg-white/10 text-white placeholder-gray-500 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            <button onClick={sendMessage} className="bg-cyan-500 text-black p-3 rounded-xl hover:bg-cyan-400 transition">
              <FaPaperPlane />
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
};

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
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-slate-950 via-black to-slate-950">
      {/* Background Glow */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-20 w-96 h-96 bg-cyan-600 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-700 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-cyan-500/15 to-transparent rounded-full blur-3xl animate-ping"></div>
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
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-300 to-white mt-2">
            Client Success Stories
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
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
                  className="relative p-8 sm:p-12 backdrop-blur-2xl bg-white/10 border border-cyan-500/30 rounded-3xl shadow-2xl shadow-cyan-500/50"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <FaQuoteLeft className="absolute top-8 left-8 text-6xl text-cyan-400/20" />
                  <div className="flex justify-center mb-6">
                    {[...Array(testimonials[current].rating)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400 text-xl drop-shadow-lg" />
                    ))}
                  </div>
                  <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 text-center leading-relaxed italic mb-8 px-4">
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
                      <h4 className="text-xl font-bold text-white">{testimonials[current].name}</h4>
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
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 py-16 border-y border-cyan-500/20">
          <motion.div ref={liveRef} initial={{ opacity: 0, y: 50 }} animate={liveControls} className="text-center group">
            <div className="text-5xl sm:text-6xl font-black text-cyan-400 group-hover:text-cyan-300 transition">
              {liveClients}
              <span className="inline-block w-3 h-3 bg-green-400 rounded-full ml-2 animate-pulse"></span>
            </div>
            <div className="flex justify-center mt-2 text-3xl text-cyan-400"><FaUsers /></div>
            <p className="mt-2 text-sm sm:text-base text-gray-400">Live Clients Online</p>
          </motion.div>

          <motion.div ref={exportRef} initial={{ opacity: 0, y: 50 }} animate={exportControls} className="text-center group">
            <div className="text-5xl sm:text-6xl font-black text-cyan-400 group-hover:text-cyan-300 transition">
              {totalExports}+
            </div>
            <div className="flex justify-center mt-2 text-3xl text-cyan-400"><FaShippingFast /></div>
            <p className="mt-2 text-sm sm:text-base text-gray-400">Exports This Month</p>
          </motion.div>

          <motion.div ref={countryRef} initial={{ opacity: 0, y: 50 }} animate={countryControls} className="text-center group">
            <div className="text-5xl sm:text-6xl font-black text-cyan-400 group-hover:text-cyan-300 transition">
              {countries}
            </div>
            <div className="flex justify-center mt-2 text-3xl text-cyan-400"><FaGlobe /></div>
            <p className="mt-2 text-sm sm:text-base text-gray-400">Countries Served</p>
          </motion.div>

          <motion.div ref={satRef} initial={{ opacity: 0, y: 50 }} animate={satControls} className="text-center group">
            <div className="text-5xl sm:text-6xl font-black text-cyan-400 group-hover:text-cyan-300 transition">
              {satisfaction}%
            </div>
            <div className="flex justify-center mt-2 text-3xl text-cyan-400"><FaCheck /></div>
            <p className="mt-2 text-sm sm:text-base text-gray-400">Client Satisfaction</p>
          </motion.div>
        </div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-20 text-center"
        >
          <p className="text-white font-bold text-lg">Excellent!</p>
          <div className="flex gap-1">
            {[...Array(4)].map((_, i) => (
              <FaStar key={i} className="text-yellow-400 text-xl" />
            ))}
          </div>
          <p className="text-gray-400">
            4.0 Rating out of 5.0 based on <span className="text-cyan-400 font-bold">24,854</span> reviews
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