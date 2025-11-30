import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Zap, Gauge, BatteryCharging, Users, Timer, ArrowRight, Calendar } from "lucide-react";

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
      { icon: Zap, label: "4.3s", name: "0-60mph" },
    ],
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
      { icon: Users, label: "5 Seats", name: "Capacity" },
    ],
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
      { icon: Zap, label: "AWD", name: "Drive" },
    ],
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
      { icon: Users, label: "5 Seats", name: "Capacity" },
    ],
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
      { icon: Timer, label: "3.1s", name: "0-60mph" },
    ],
  },
  {
    id: 6,
    image: "https://wgl-dsites.net/genesisauto/wp-content/uploads/2024/05/h3-1.webp",
    title: "Genesis Electrified G80",
    subtitle: "Executive EV with supreme comfort",
    price: "$79,900",
    badge: "Executive",
    specs: [
      { icon: BatteryCharging, label: "87.2 kWh", name: "Battery" },
      { icon: Gauge, label: "270 mi", name: "Range" },
      { icon: Timer, label: "5 Year", name: "Warranty" },
    ],
  },
];

export default function Banner({ autoplay = true, interval = 6000 }) {
  const [index, setIndex] = useState(0);
  const [showArrows, setShowArrows] = useState(false);
  const timeoutRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const safeIndex = slides.length > 0 ? (index % slides.length + slides.length) % slides.length : 0;
  const current = slides[safeIndex] || { title: "Car Hub", subtitle: "Premium Electric Vehicles", price: "$--,--", badge: "Premium", specs: [] };

  const next = () => setIndex((i) => i + 1);
  const prev = () => setIndex((i) => i - 1);
  const goTo = (i) => setIndex(i);

  useEffect(() => {
    if (!autoplay || slides.length === 0) return;
    timeoutRef.current = setInterval(next, interval);
    return () => clearInterval(timeoutRef.current);
  }, [autoplay, interval, index]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    setShowArrows(true);
  };
  const handleTouchMove = (e) => (touchEndX.current = e.touches[0].clientX);
  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
    setTimeout(() => setShowArrows(false), 2000);
  };

  return (
    <section
      className="relative w-full h-screen min-h-[700px] max-h-[1100px] overflow-hidden bg-gray-100 dark:bg-black cursor-grab active:cursor-grabbing select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}
    >
      {/* Overlay градиенты для light/dark mode */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-200/70 via-gray-300/50 to-gray-400/60 dark:from-black/60 dark:via-black dark:to-black/60" />
      
      {/* Image slides */}
      <div className="absolute inset-0">
        {slides.map((slide, i) => (
          <div key={slide.id} className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${i === safeIndex ? "opacity-100" : "opacity-0"}`}>
            <img src={slide.image} alt={slide.title} className="object-cover w-full h-full" style={{ objectPosition: 'center 35%' }} loading="lazy" />
          </div>
        ))}
        
        {/* Side gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/25 to-transparent dark:from-black/90 dark:via-black/30" />
        
        {/* Bottom gradient */}
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-white via-white/60 to-transparent dark:from-black dark:via-black/70 md:h-96" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center h-full px-4 pb-32 sm:px-6 lg:px-8 md:pb-0">
        <div className="container mx-auto max-w-7xl">
          <div className="max-w-4xl space-y-3 sm:space-y-5 md:space-y-10">
            {/* Badge */}
            <span key={current.badge} className="inline-block px-3 py-1.5 sm:px-5 sm:py-2.5 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/40 rounded-full text-cyan-600 dark:text-cyan-300 font-bold text-[10px] sm:text-xs md:text-sm tracking-widest backdrop-blur-2xl shadow-lg">
              {current.badge}
            </span>

            {/* Title */}
            <h1 key={current.title} className="text-2xl font-black leading-tight sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 dark:from-white dark:via-white/80 dark:to-white/60">
                {current.title}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="max-w-2xl text-xs font-light leading-relaxed sm:text-base md:text-xl lg:text-2xl text-gray-700 dark:text-gray-300">
              {current.subtitle}
            </p>

            {/* Price */}
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="text-2xl font-black text-transparent sm:text-4xl md:text-5xl bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">
                {current.price}
              </div>
              <span className="text-[10px] sm:text-xs md:text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wider">Starting Price</span>
            </div>

            {/* Specs Cards */}
            <div className="grid grid-cols-3 gap-1.5 sm:gap-3 md:gap-5">
              {(current.specs || []).map((spec, i) => {
                const Icon = spec.icon || Zap;
                return (
                  <div key={i} className="p-2 text-center transition-all duration-500 border rounded-lg shadow-xl group bg-white/80 dark:bg-gray-800/30 backdrop-blur-2xl border-gray-300 dark:border-gray-600/20 sm:rounded-xl md:rounded-2xl sm:p-4 md:p-6 hover:bg-white/95 dark:hover:bg-gray-700/40 hover:border-cyan-400 dark:hover:border-cyan-500/50 hover:-translate-y-1">
                    <Icon className="w-4 h-4 mx-auto mb-1 transition sm:w-8 sm:h-8 md:w-10 md:h-10 sm:mb-2 text-cyan-500 dark:text-cyan-400 group-hover:scale-110" />
                    <div className="text-sm font-black text-gray-900 dark:text-white sm:text-xl md:text-2xl">{spec.label}</div>
                    <div className="text-[9px] sm:text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-0.5">{spec.name}</div>
                  </div>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-row gap-2 pt-2 sm:gap-3 md:gap-4 sm:pt-4">
              <button className="group flex-1 px-4 py-2.5 sm:px-6 sm:py-3.5 md:px-10 md:py-5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg sm:rounded-xl md:rounded-2xl font-bold text-xs sm:text-sm md:text-xl text-white shadow-2xl shadow-cyan-500/60 hover:shadow-cyan-500/80 transition-all hover:scale-105 flex items-center justify-center gap-2">
                <span className="hidden sm:inline">Explore Now</span>
                <span className="sm:hidden">Explore</span>
                <ArrowRight className="w-3 h-3 transition sm:w-4 sm:h-4 md:w-6 md:h-6 group-hover:translate-x-1" />
              </button>
              <button className="flex-1 px-4 py-2.5 sm:px-6 sm:py-3.5 md:px-10 md:py-5 bg-white/70 dark:bg-gray-800/30 backdrop-blur-2xl border border-gray-400 dark:border-gray-600/30 rounded-lg sm:rounded-xl md:rounded-2xl font-bold text-xs sm:text-sm md:text-xl text-gray-900 dark:text-white hover:bg-white/90 dark:hover:bg-gray-700/40 hover:border-cyan-500 dark:hover:border-cyan-500/50 transition-all hover:scale-105 flex items-center justify-center gap-2">
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                <span className="hidden sm:inline">Test Drive</span>
                <span className="sm:hidden">Book</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-16 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2.5 z-20">
          {slides.map((_, i) => (
            <button 
              key={i} 
              onClick={() => goTo(i)} 
              className={`transition-all duration-300 rounded-full ${
                i === safeIndex 
                  ? "w-6 sm:w-10 md:w-14 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg" 
                  : "w-4 sm:w-6 md:w-8 h-1 bg-gray-400 dark:bg-gray-500/40 hover:bg-gray-600 dark:hover:bg-gray-400/70"
              }`} 
            />
          ))}
        </div>
      )}

      {/* Navigation Arrows */}
      <div className={`absolute inset-y-0 left-0 flex items-center transition-opacity duration-500 ${showArrows || window.innerWidth >= 768 ? "opacity-100" : "opacity-0"} pointer-events-none`}>
        <button 
          onClick={prev} 
          className="p-2 ml-2 transition-all border rounded-full pointer-events-auto sm:ml-4 md:ml-8 sm:p-3 md:p-4 bg-white/80 dark:bg-gray-800/30 backdrop-blur-2xl border-gray-300 dark:border-gray-600/20 hover:bg-white dark:hover:bg-gray-700/40 hover:scale-110"
        >
          <ChevronLeft className="w-5 h-5 text-gray-900 dark:text-white sm:w-6 sm:h-6 md:w-8 md:h-8" />
        </button>
      </div>

      <div className={`absolute inset-y-0 right-0 flex items-center transition-opacity duration-500 ${showArrows || window.innerWidth >= 768 ? "opacity-100" : "opacity-0"} pointer-events-none`}>
        <button 
          onClick={next} 
          className="p-2 mr-2 transition-all border rounded-full pointer-events-auto sm:mr-4 md:mr-8 sm:p-3 md:p-4 bg-white/80 dark:bg-gray-800/30 backdrop-blur-2xl border-gray-300 dark:border-gray-600/20 hover:bg-white dark:hover:bg-gray-700/40 hover:scale-110"
        >
          <ChevronRight className="w-5 h-5 text-gray-900 dark:text-white sm:w-6 sm:h-6 md:w-8 md:h-8" />
        </button>
      </div>
    </section>
  );
}