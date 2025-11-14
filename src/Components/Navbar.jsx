import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../Provider/AuthProvider";
import {
  ChevronDownIcon,
  DownloadIcon,
  GridIcon,
  HomeIcon,
  LogOutIcon,
  MailIcon,
  MenuIcon,
  MoonIcon,
  PackageIcon,
  SparklesIcon,
  SunIcon,
  UploadIcon,
  XIcon,
} from "lucide-react";

const CarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9L18 9.5l-1.5-4.5C16.2 4.4 15.6 4 15 4H9c-.6 0-1.2.4-1.5 1L6 9.5l-2.5 1.6C2.7 11.3 2 12.1 2 13v3c0 .6.4 1 1 1h2" />
    <circle cx="7" cy="17" r="2" />
    <circle cx="17" cy="17" r="2" />
  </svg>
);

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

  // Theme persistence
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(savedTheme || (prefersDark ? "dark" : "light"));
  }, []);

  useEffect(() => {
    if (theme) {
      document.documentElement.classList.toggle("dark", theme === "dark");
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  const handleThemeToggle = () => setTheme(prev => prev === "light" ? "dark" : "light");
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
        transition={{ duration: 0.6 }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
          scrolled
            ? "bg-white/80 dark:bg-slate-950/90 backdrop-blur-2xl shadow-2xl border-b border-cyan-500/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between h-20">

            {/* LOGO */}
            <motion.div
              onClick={() => navigate("/")}
              className="flex items-center gap-3 group cursor-pointer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
                className="p-3 rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 shadow-xl"
              >
                <CarIcon />
              </motion.div>
              <div>
                <h1 className="text-2xl font-black tracking-tighter">
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                    CARHUB
                  </span>
                </h1>
                <p className="text-[10px] tracking-widest text-cyan-400 font-bold uppercase">
                  Elite EV Trading
                </p>
              </div>
            </motion.div>

            {/* DESKTOP NAV */}
            <div className="hidden lg:flex items-center gap-4">
              {mainNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.path && location.pathname === item.path; // FIX: Only check isActive if item.path exists
                return (
                  <motion.div
                    key={item.name}
                    onClick={() => (item.onClick ? item.onClick() : navigate(item.path))}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative px-5 py-2.5 rounded-2xl font-medium flex items-center gap-2 cursor-pointer transition-all ${
                      isActive
                        ? "text-cyan-400 bg-cyan-500/10"
                        : "text-gray-600 dark:text-gray-400 hover:text-cyan-400"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.name}
                    {isActive && (
                      <motion.div
                        layoutId="desktopActive"
                        className="absolute inset-0 rounded-2xl bg-cyan-500/10 border border-cyan-400/30"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </motion.div>
                );
              })}

              {user && (
                <div className="relative" onMouseLeave={() => setDropdownOpen(false)}>
                  <motion.button
                    onMouseEnter={() => setDropdownOpen(true)}
                    whileHover={{ scale: 1.05 }}
                    className="px-5 py-2.5 rounded-2xl font-medium flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-cyan-400 transition-all"
                  >
                    <PackageIcon className="w-4 h-4" />
                    My Account
                    <ChevronDownIcon className={`w-4 h-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                  </motion.button>

                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full mt-3 w-64 bg-white/90 dark:bg-slate-900/95 backdrop-blur-2xl rounded-2xl border border-cyan-500/20 shadow-2xl overflow-hidden"
                      >
                        {userMenuItems.map((item) => {
                          const Icon = item.icon;
                          const isActive = location.pathname === item.path;
                          return (
                            <motion.div
                              key={item.name}
                              onClick={() => { navigate(item.path); setDropdownOpen(false); }}
                              whileHover={{ x: 6 }}
                              className={`px-5 py-4 flex items-center gap-3 cursor-pointer transition-all ${
                                isActive ? "bg-cyan-500/10 text-cyan-400" : "hover:bg-cyan-500/5"
                              }`}
                            >
                              <Icon className="w-5 h-5 text-cyan-400" />
                              <span className="font-medium text-gray-700 dark:text-gray-300">{item.name}</span>
                            </motion.div>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* RIGHT SIDE */}
            <div className="flex items-center gap-4">

              {/* Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleThemeToggle}
                className="hidden md:block p-3 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 hover:border-cyan-400/40 transition-all"
              >
                <AnimatePresence mode="wait">
                  {theme === "light" ? (
                    <motion.div key="moon" initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }}>
                      <MoonIcon className="w-5 h-5 text-cyan-400" />
                    </motion.div>
                  ) : (
                    <motion.div key="sun" initial={{ rotate: 90 }} animate={{ rotate: 0 }} exit={{ rotate: -90 }}>
                      <SunIcon className="w-5 h-5 text-yellow-400" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* User Actions */}
              {user ? (
                <div className="hidden md:flex items-center gap-3">
                  <img
                    src={user.photoURL || "/default-avatar.png"}
                    alt={user.displayName || "User"}
                    className="w-10 h-10 rounded-full ring-2 ring-cyan-400/60 object-cover shadow-lg"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    className="group relative px-6 py-2.5 rounded-2xl font-medium text-sm overflow-hidden transition-all duration-500 flex items-center gap-2.5"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-rose-500/20 to-red-600/20 blur-xl scale-0 group-hover:scale-150 transition-transform duration-700" />
                    <div className="relative flex items-center gap-2.5">
                      <LogOutIcon className="w-4 h-4 text-rose-400 group-hover:text-rose-300 transition-colors" />
                      <span className="bg-gradient-to-r from-rose-400 to-red-500 bg-clip-text text-transparent font-semibold">
                        Logout
                      </span>
                    </div>
                  </motion.button>
                </div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/auth/login")}
                  className="hidden md:flex relative group px-7 py-2.5 rounded-2xl font-bold text-sm overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 group-hover:scale-110 transition-transform duration-500" />
                  <span className="relative flex items-center gap-2 text-white">
                    <SparklesIcon className="w-4 h-4" />
                    Login / Register
                  </span>
                </motion.button>
              )}

              {/* MOBILE MENU TOGGLE */}
              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={() => setOpen(prev => !prev)}
                className="lg:hidden relative p-4 rounded-2xl bg-white/10 dark:bg-cyan-900/30 backdrop-blur-xl border border-cyan-500/50 hover:border-cyan-400 shadow-2xl transition-all duration-300 z-[9999] flex items-center justify-center"
              >
                <AnimatePresence mode="wait">
                  {open ? (
                    <motion.div
                      key="close"
                      initial={{ scale: 0, rotate: -90, opacity: 0 }}
                      animate={{ scale: 1, rotate: 0, opacity: 1 }}
                      exit={{ scale: 0, rotate: 90, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    >
                      <XIcon className="w-8 h-8 text-cyan-400" strokeWidth={3} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ scale: 0, rotate: 90, opacity: 0 }}
                      animate={{ scale: 1, rotate: 0, opacity: 1 }}
                      exit={{ scale: 0, rotate: -90, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    >
                      <MenuIcon className="w-8 h-8 text-cyan-400" strokeWidth={3} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 right-0 w-full max-w-md bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 z-50 shadow-2xl border-l border-cyan-500/20"
            >
              <div className="p-8 pt-24 space-y-6">
                {[...mainNavItems, ...(user ? userMenuItems : [])].map((item, i) => {
                  const Icon = item.icon;
                  const isActive = item.path && location.pathname === item.path; // FIX: Only check isActive if item.path exists
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      onClick={() => {
                        item.onClick ? item.onClick() : navigate(item.path);
                        setOpen(false);
                      }}
                      className={`p-5 rounded-2xl cursor-pointer transition-all ${
                        isActive
                          ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/40 text-cyan-400"
                          : "hover:bg-gray-100 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-4 text-lg font-semibold">
                        <Icon className="w-6 h-6" />
                        {item.name}
                      </div>
                    </motion.div>
                  );
                })}

                <div className="pt-8 mt-8 border-t border-cyan-500/20 space-y-6">
                  {user && (
                    <div className="flex flex-col items-center gap-6">
                      <div className="relative">
                        <img
                          src={user.photoURL || "/default-avatar.png"}
                          alt="User"
                          className="w-24 h-24 rounded-full ring-4 ring-cyan-400/60 object-cover shadow-2xl"
                        />
                        <div className="absolute bottom-0 right-0 w-6 h-6 bg-emerald-400 rounded-full border-4 border-white dark:border-slate-900 animate-pulse" />
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleLogout}
                        className="group relative w-full py-6 rounded-2xl font-bold text-lg overflow-hidden transition-all duration-500 flex items-center justify-center gap-3"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-rose-600/20 to-red-700/20 blur-xl scale-0 group-hover:scale-150 transition-transform duration-700" />
                        <div className="relative flex items-center gap-3">
                          <LogOutIcon className="w-7 h-7 text-rose-400 group-hover:text-rose-300 transition-colors" />
                          <span className="bg-gradient-to-r from-rose-400 to-red-500 bg-clip-text text-transparent">
                            LOGOUT
                          </span>
                        </div>
                      </motion.button>
                    </div>
                  )}

                  {!user && (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => { navigate("/auth/login"); setOpen(false); }}
                      className="w-full py-6 rounded-2xl font-bold text-lg bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 text-white shadow-2xl flex items-center justify-center gap-3"
                    >
                      <SparklesIcon className="w-6 h-6" />
                      LOGIN / REGISTER
                    </motion.button>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 180 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleThemeToggle}
                    className="mx-auto p-4 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30"
                  >
                    {theme === "light" ? (
                      <MoonIcon className="w-6 h-6 text-cyan-400" />
                    ) : (
                      <SunIcon className="w-6 h-6 text-yellow-400" />
                    )}
                  </motion.button>
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