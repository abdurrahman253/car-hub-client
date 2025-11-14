import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../Provider/AuthProvider";
import { ChevronDownIcon, DownloadIcon, GridIcon, HomeIcon, LogOutIcon, MailIcon, MenuIcon, MoonIcon, PackageIcon, SparklesIcon, SunIcon, UploadIcon, XIcon } from "lucide-react";

// Lucide Icons (SVG)
const CarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9L18 9.5l-1.5-4.5C16.2 4.4 15.6 4 15 4H9c-.6 0-1.2.4-1.5 1L6 9.5l-2.5 1.6C2.7 11.3 2 12.1 2 13v3c0 .6.4 1 1 1h2" />
    <circle cx="7" cy="17" r="2" />
    <circle cx="17" cy="17" r="2" />
  </svg>
);
// ... (other icons same)

const Navbar = ({ newsletterRef }) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [theme, setTheme] = useState("light");

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { user, logOut } = useContext(AuthContext) || {};

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Theme toggle function
  useEffect(() => {
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
  
  setTheme(initialTheme);
}, []);

// Theme apply effect
useEffect(() => {
  if (theme) {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }
}, [theme]);

const handleThemeToggle = () => {
  setTheme(theme === "light" ? "dark" : "light");
};



  const handleLogout = async () => {
    try {
      await logOut?.();
      setOpen(false);
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  const scrollToNewsletter = () => {
    setOpen(false);
    setDropdownOpen(false);
    newsletterRef?.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const mainNavItems = [
    { name: "Home", path: "/", icon: HomeIcon },
    { name: "All Products", path: "/all-products", icon: GridIcon },
    { name: "News Letter", icon: MailIcon, onClick: scrollToNewsletter },
  ];

  const userMenuItems = [
    { name: "My Exports", path: "/my-exports", icon: UploadIcon },
    { name: "My Imports", path: "/my-imports", icon: DownloadIcon },
    { name: "Add Export", path: "/add-export", icon: PackageIcon },
  ];

  return (
    <>
      {/* MAIN NAVBAR */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-gradient-to-r from-gray-100/95 dark:from-slate-900/95 via-white/95 dark:via-slate-950/95 to-gray-100/95 dark:to-slate-900/95 backdrop-blur-xl shadow-2xl border-b border-cyan-500/20"
            : "bg-gradient-to-b from-white/90 dark:from-black/90 via-white/60 dark:via-black/60 to-transparent backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between h-20">
            {/* LOGO + MENU */}
            <div className="flex items-center gap-4 lg:gap-8">
              <motion.div
                onClick={() => navigate("/")}
                className="flex items-center gap-2 lg:gap-3 group cursor-pointer"
                whileHover={{ scale: 1.02 }}
              >
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                    <CarIcon />
                  </div>
                </motion.div>
                <div>
                  <h1 className="text-xl lg:text-2xl xl:text-3xl font-black tracking-tight">
                    <span className="bg-gradient-to-r from-black dark:from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent">
                      CARHUB
                    </span>
                  </h1>
                  <p className="text-[9px] lg:text-xs text-cyan-400 tracking-[0.2em] font-bold uppercase">
                    Elite EV Trading
                  </p>
                </div>
              </motion.div>

              {/* DESKTOP NAV */}
              <div className="hidden lg:flex items-center gap-2">
                {mainNavItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <motion.div
                      key={item.name}
                      onClick={() => item.onClick ? item.onClick() : navigate(item.path)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`relative px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                        isActive ? "text-cyan-300 bg-cyan-500/10" : "text-gray-600 dark:text-gray-400 hover:text-cyan-300"
                      }`}
                    >
                      <Icon />
                      {item.name}
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl border border-cyan-400/30"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </motion.div>
                  );
                })}

                {/* User Dropdown */}
                {user && (
                  <div className="relative" onMouseLeave={() => setDropdownOpen(false)}>
                    <motion.button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      onMouseEnter={() => setDropdownOpen(true)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`relative px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center gap-2 ${
                        userMenuItems.some(i => location.pathname === i.path)
                          ? "text-cyan-300 bg-cyan-500/10"
                          : "text-gray-600 dark:text-gray-400 hover:text-cyan-300"
                      }`}
                    >
                      <PackageIcon />
                      My Account
                      <div className={`transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`}>
                        <ChevronDownIcon />
                      </div>
                      {userMenuItems.some(i => location.pathname === i.path) && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl border border-cyan-400/30"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </motion.button>

                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute top-full mt-2 right-0 w-56 bg-gradient-to-br from-gray-100/95 dark:from-slate-900/95 via-white/95 dark:via-slate-950/95 to-gray-100/95 dark:to-slate-900/95 backdrop-blur-xl rounded-2xl border border-cyan-500/20 shadow-2xl overflow-hidden"
                        >
                          {userMenuItems.map((item, idx) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.path;
                            return (
                              <motion.div
                                key={item.name}
                                onClick={() => { navigate(item.path); setDropdownOpen(false); }}
                                whileHover={{ x: 4 }}
                                className={`px-4 py-3 flex items-center gap-3 cursor-pointer transition-all duration-300 ${
                                  isActive ? "bg-cyan-500/20 text-cyan-300" : "text-gray-600 dark:text-gray-400 hover:bg-cyan-500/10 hover:text-cyan-300"
                                } ${idx !== userMenuItems.length - 1 ? "border-b border-cyan-500/10" : ""}`}
                              >
                                <Icon />
                                <span className="font-semibold text-sm">{item.name}</span>
                              </motion.div>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex items-center gap-3 lg:gap-4">
              {/* Theme Toggle - Desktop */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleThemeToggle}
                className="hidden md:flex p-3 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300 overflow-hidden group"
              >
                <AnimatePresence mode="wait">
                  {theme === "light" ? (
                    <motion.div key="moon" initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }} className="text-cyan-400">
                      <MoonIcon />
                    </motion.div>
                  ) : (
                    <motion.div key="sun" initial={{ rotate: 90 }} animate={{ rotate: 0 }} exit={{ rotate: -90 }} className="text-yellow-400">
                      <SunIcon />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* User Profile */}
              {user ? (
                <div className="hidden md:flex items-center gap-3">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="relative">
                    <img src={user.photoURL} alt={user.displayName || "User"} className="w-10 h-10 rounded-full ring-2 ring-cyan-400/60 object-cover shadow-lg" />
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-900 animate-pulse"></div>
                  </motion.div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    className="px-5 py-2.5 bg-gradient-to-r from-rose-500 to-red-600 rounded-xl font-semibold text-sm text-white shadow-lg shadow-red-500/30 hover:shadow-red-500/50 transition-all duration-300 flex items-center gap-2"
                  >
                    <LogOutIcon />
                    Logout
                  </motion.button>
                </div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/auth/login")}
                  className="hidden md:flex relative group px-6 lg:px-8 py-2.5 rounded-xl font-bold text-sm overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-5 00 to-indigo-600 group-hover:scale-110 transition-transform duration-300"></div>
                  <span className="relative flex items-center gap-2 text-white">
                    <SparklesIcon />
                    Login / Register
                  </span>
                </motion.button>
              )}

              {/* MOBILE TOGGLE */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setOpen(!open)}
                className="lg:hidden p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 transition-all duration-300"
              >
                {open ? <XIcon /> : <MenuIcon />}
              </motion.button>
            </div>
          </nav>
        </div>
        {scrolled && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            className="h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
          />
        )}
      </motion.header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-white/80 dark:bg-black/80 backdrop-blur-sm z-30 lg:hidden"
            />
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-full sm:w-96 bg-gradient-to-b from-gray-100 dark:from-slate-900 via-white dark:via-slate-950 to-gray-100 dark:to-black z-40 lg:hidden border-l border-cyan-500/20 shadow-2xl overflow-y-auto"
            >
              <div className="flex flex-col min-h-full p-6 pt-24">
                <div className="space-y-3 flex-1">
                  {[...mainNavItems, ...(user ? userMenuItems : [])].map((item, idx) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                      <motion.div
                        key={item.name}
                        onClick={() => { item.onClick ? item.onClick() : navigate(item.path); setOpen(false); }}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.08 }}
                        className={`block px-6 py-4 rounded-xl font-semibold text-lg transition-all duration-300 cursor-pointer ${
                          isActive
                            ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-400/30"
                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-100/5 dark:hover:bg-white/5 hover:text-cyan-300"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon />
                          {item.name}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="pt-6 mt-6 border-t border-cyan-500/20 space-y-4">
                  {/* Theme Toggle - Mobile */}
                  <div className="flex justify-center">
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 180 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleThemeToggle}
                      className="p-3 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-5 00/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 transition-all duration-300"
                    >
                      <AnimatePresence mode="wait">
                        {theme === "light" ? (
                          <motion.div key="moon" initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }}>
                            <MoonIcon />
                          </motion.div>
                        ) : (
                          <motion.div key="sun" initial={{ rotate: 90 }} animate={{ rotate: 0 }} exit={{ rotate: -90 }} className="text-yellow-400">
                            <SunIcon />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  </div>

                  {/* Logout / Login */}
                  {user ? (
                    <>
                      <div className="flex justify-center p-4 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30">
                        <div className="relative">
                          <img src={user.photoURL} alt={user.displayName || "User"} className="w-20 h-20 rounded-full ring-2 ring-cyan-400 object-cover" />
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-400 rounded-full border-2 border-slate-900"></div>
                        </div>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full py-5 rounded-2xl font-black text-lg bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-2xl shadow-red-500/40 hover:shadow-red-500/60 transition-all duration-300 flex items-center justify-center gap-3"
                      >
                        <LogOutIcon />
                        LOGOUT
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => { navigate("/auth/login"); setOpen(false); }}
                      className="w-full py-5 rounded-2xl font-black text-lg bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 text-white shadow-2xl shadow-cyan-500/40 hover:shadow-cyan-500/60 transition-all duration-300 flex items-center justify-center gap-3"
                    >
                      <SparklesIcon />
                      LOGIN / REGISTER
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;