import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Zap, Gauge, BatteryCharging, Users, Timer } from "lucide-react";

const slides = [
  {
    id: 1,
    image: "https://motors.stylemixthemes.com/ev-dealership/wp-content/uploads/sites/21/2021/11/porsche_slide.jpg",
    title: "Porsche Taycan 4S",
    subtitle: "Electric performance & timeless design",
    price: "$123,800",
    badge: "Premium",
    specs: [
      { icon: BatteryCharging, label: "73 kWh", name: "Battery" },
      { icon: Gauge, label: "388 mi", name: "Range" },
      { icon: Zap, label: "4.3s", name: "0-60mph" }
    ]
  },
  {
    id: 2,
    image: "https://motors.stylemixthemes.com/ev-dealership/wp-content/uploads/sites/21/2021/11/vw_slide.jpg",
    title: "Volkswagen ID.4",
    subtitle: "Practical family EV with efficiency",
    price: "$45,900",
    badge: "Best Value",
    specs: [
      { icon: BatteryCharging, label: "77 kWh", name: "Battery" },
      { icon: Gauge, label: "250 mi", name: "Range" },
      { icon: Users, label: "5 Seats", name: "Capacity" }
    ]
  },
  {
    id: 3,
    image: "https://motors.stylemixthemes.com/ev-dealership/wp-content/uploads/sites/21/2021/11/jaguar_slide.jpg",
    title: "Jaguar I-PACE",
    subtitle: "Luxury electric SUV with agile handling",
    price: "$69,850",
    badge: "Sport",
    specs: [
      { icon: Zap, label: "400 hp", name: "Power" },
      { icon: Gauge, label: "234 mi", name: "Range" },
      { icon: Zap, label: "AWD", name: "Drive" }
    ]
  },
  {
    id: 4,
    image: "https://motors.stylemixthemes.com/ev-dealership/wp-content/uploads/sites/21/2021/11/mb_eqe_350.jpg",
    title: "Mercedes EQE 350",
    subtitle: "Comfort and cutting-edge technology",
    price: "$74,900",
    badge: "Luxury",
    specs: [
      { icon: BatteryCharging, label: "90.6 kWh", name: "Battery" },
      { icon: Gauge, label: "300 mi", name: "Range" },
      { icon: Users, label: "5 Seats", name: "Capacity" }
    ]
  },
  {
    id: 5,
    image: "https://motors.stylemixthemes.com/ev-dealership/wp-content/uploads/sites/21/2021/11/audi_slide.jpg",
    title: "Audi e-tron GT",
    subtitle: "Sporty electric grand tourer",
    price: "$99,900",
    badge: "Performance",
    specs: [
      { icon: Zap, label: "522 hp", name: "Power" },
      { icon: Gauge, label: "238 mi", name: "Range" },
      { icon: Timer, label: "3.1s", name: "0-60mph" }
    ]
  },
  {
    id: 6,
    image: "https://wgl-dsites.net/genesisauto/wp-content/uploads/2024/05/h3-1.webp",
    title: "Genesis Electrified",
    subtitle: "Executive EV with supreme comfort",
    price: "$79,900",
    badge: "Executive",
    specs: [
      { icon: BatteryCharging, label: "87.2 kWh", name: "Battery" },
      { icon: Gauge, label: "270 mi", name: "Range" },
      { icon: Timer, label: "5 Year", name: "Warranty" }
    ]
  }
];

const Banner = ({ autoplay = true, interval = 6000 }) => {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  const safeIndex = slides.length > 0 ? (index % slides.length + slides.length) % slides.length : 0;
  const current = slides[safeIndex] || {
    title: "Loading Luxury...",
    subtitle: "The future of electric driving awaits",
    price: "$--,--",
    badge: "Coming Soon",
    specs: []
  };

  const next = () => setIndex(i => i + 1);
  const prev = () => setIndex(i => i - 1);
  const goTo = (i) => setIndex(i);

  useEffect(() => {
    if (!autoplay || slides.length === 0) return;
    timeoutRef.current = setInterval(next, interval);
    return () => clearInterval(timeoutRef.current);
  }, [autoplay, interval]);

  return (
    <section className="relative w-full h-screen min-h-[700px] max-h-[1100px] overflow-hidden bg-black">
      {/* Fallback Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-black to-slate-900" />

      {/* Background Images */}
      <div className="absolute inset-0">
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-2000 ease-in-out ${
              i === safeIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => e.target.style.display = "none"}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
      </div>

      {/* Main Content - FIXED BOTTOM CUTTING */}
      <div className="relative z-10 h-full flex flex-col justify-center px-6 py-20 md:py-24 lg:py-28">
        <div className="container mx-auto max-w-7xl">
          <div className="max-w-4xl space-y-10 md:space-y-12 animate-fade-in">
            {/* Badge */}
            <span className="inline-block px-6 py-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/40 rounded-full text-cyan-300 font-bold text-sm md:text-base tracking-widest backdrop-blur-2xl shadow-lg">
              ★ {current.badge}
            </span>

            {/* Title */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-none md:leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-gray-300">
                {current.title}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-2xl font-light leading-relaxed">
              {current.subtitle}
            </p>

            {/* Price */}
            <div className="flex items-center gap-6">
              <div className="text-5xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                {current.price}
              </div>
              <span className="text-sm md:text-base text-gray-400 uppercase tracking-wider">Starting Price</span>
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-3 gap-5 md:gap-8 max-w-3xl">
              {current.specs.map((spec, i) => {
                const Icon = spec.icon || Zap;
                return (
                  <div
                    key={i}
                    className="group bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 md:p-8 text-center hover:bg-white/10 hover:border-cyan-400/50 transition-all duration-500 hover:-translate-y-3 shadow-xl"
                  >
                    <Icon className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 text-cyan-400 group-hover:scale-110 transition" />
                    <div className="text-2xl md:text-3xl font-black text-white">{spec.label}</div>
                    <div className="text-sm md:text-base text-gray-400 mt-1">{spec.name}</div>
                  </div>
                );
              })}
            </div>

            {/* CTA Buttons - NOW FULLY VISIBLE */}
            <div className="flex flex-col sm:flex-row gap-5 pt-8 pb-10">
              <button className="group px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl font-bold text-lg md:text-xl shadow-2xl shadow-cyan-500/60 hover:shadow-cyan-500/80 transition-all hover:scale-105 flex items-center justify-center gap-3">
                Explore Now
                <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition" />
              </button>
              <button className="px-10 py-5 bg-white/10 backdrop-blur-2xl border-2 border-white/30 rounded-2xl font-bold text-lg md:text-xl hover:bg-white/20 hover:border-cyan-400/50 transition-all hover:scale-105">
                Schedule Test Drive
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Dots */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`transition-all duration-300 rounded-full ${
                i === safeIndex
                  ? "w-16 h-1.5 bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg"
                  : "w-10 h-1.5 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      )}

      {/* Arrow Buttons */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-2xl border border-white/20 hover:bg-white/20 transition-all hover:scale-110 z-20"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-8 h-8 md:w-10 md:h-10 mx-auto" />
          </button>
          <button
            onClick={next}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-2xl border border-white/20 hover:bg-white/20 transition-all hover:scale-110 z-20"
            aria-label="Next slide"
          >
            <ChevronRight className="w-8 h-8 md:w-10 md:h-10 mx-auto" />
          </button>
        </>
      )}

      {/* Smooth Fade-In Animation */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in > * {
          opacity: 0;
          animation: fade-in 1s ease-out forwards;
        }
        .animate-fade-in > *:nth-child(1) { animation-delay: 0.1s; }
        .animate-fade-in > *:nth-child(2) { animation-delay: 0.2s; }
        .animate-fade-in > *:nth-child(3) { animation-delay: 0.3s; }
        .animate-fade-in > *:nth-child(4) { animation-delay: 0.4s; }
        .animate-fade-in > *:nth-child(5) { animation-delay: 0.5s; }
        .animate-fade-in > *:nth-child(6) { animation-delay: 0.6s; }
      `}</style>
    </section>
  );
};

export default Banner;