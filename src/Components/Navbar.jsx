import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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
import { AuthContext } from "../Provider/AuthProvider";
import { ThemeContext } from "../Provider/ThemeProvider";

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
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { user, logOut } = useContext(AuthContext) || {};
  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
          scrolled
            ? "bg-white/80 dark:bg-gray-900/90 backdrop-blur-2xl shadow-2xl border-b border-gray-200 dark:border-gray-700"
            : "bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-lg"
        }`}
      >
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between h-20">
            <motion.div
              onClick={() => navigate("/")}
              className="flex items-center gap-3 cursor-pointer group"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
                className="p-3 shadow-xl rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600"
              >
                <CarIcon />
              </motion.div>
              <div>
                <h1 className="text-2xl font-black tracking-tighter">
                  <span className="text-transparent bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text">
                    CARHUB
                  </span>
                </h1>
                <p className="text-[10px] tracking-widest text-cyan-400 font-bold uppercase">
                  Elite EV Trading
                </p>
              </div>
            </motion.div>

            <div className="items-center hidden gap-4 lg:flex">
              {mainNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.path && location.pathname === item.path;
                return (
                  <motion.div
                    key={item.name}
                    onClick={() => (item.onClick ? item.onClick() : navigate(item.path))}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative px-5 py-2.5 rounded-2xl font-medium flex items-center gap-2 cursor-pointer transition-all ${
                      isActive
                        ? "text-cyan-400 bg-cyan-500/10"
                        : "text-gray-700 dark:text-gray-300 hover:text-cyan-400"
                    }`}
                  >
                    {Icon && <Icon className="w-4 h-4" />}
                    {item.name}
                    {isActive && (
                      <motion.div
                        layoutId="desktopActive"
                        className="absolute inset-0 border rounded-2xl bg-cyan-500/10 border-cyan-400/30"
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
                    className="px-5 py-2.5 rounded-2xl font-medium flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-cyan-400 transition-all"
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
                        className="absolute w-64 mt-3 overflow-hidden border border-gray-200 shadow-2xl top-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-2xl dark:border-gray-600"
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
                                isActive ? "bg-cyan-500/10 text-cyan-400" : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                              }`}
                            >
                              <Icon className="w-5 h-5 text-cyan-400" />
                              <span className="font-medium">{item.name}</span>
                            </motion.div>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>

            <div className="flex items-center gap-4">
              <label className="swap swap-rotate">
                <input
                  type="checkbox"
                  className="theme-controller"
                  checked={theme === "dark"}
                  onChange={toggleTheme}
                />
                <SunIcon className="w-5 h-5 text-yellow-500 swap-on" />
                <MoonIcon className="w-5 h-5 text-blue-600 swap-off" />
              </label>

              {user ? (
                <div className="items-center hidden gap-3 md:flex">
                  <img
                    src={user.photoURL || "/default-avatar.png"}
                    alt={user.displayName || "User"}
                    className="object-cover w-10 h-10 rounded-full shadow-lg ring-2 ring-cyan-400/60"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    className="group relative px-6 py-2.5 rounded-2xl font-medium text-sm overflow-hidden transition-all duration-500 flex items-center gap-2.5"
                  >
                    <div className="absolute inset-0 transition-transform duration-700 scale-0 bg-gradient-to-r from-rose-500/20 to-red-600/20 blur-xl group-hover:scale-150" />
                    <div className="relative flex items-center gap-2.5">
                      <LogOutIcon className="w-4 h-4 text-rose-400 group-hover:text-rose-300" />
                      <span className="font-semibold text-transparent bg-gradient-to-r from-rose-400 to-red-500 bg-clip-text">
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
                  <div className="absolute inset-0 transition-transform duration-500 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 group-hover:scale-110" />
                  <span className="relative flex items-center gap-2 text-white">
                    <SparklesIcon className="w-4 h-4" />
                    Login / Register
                  </span>
                </motion.button>
              )}

              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={() => setOpen(prev => !prev)}
                className="lg:hidden relative p-4 rounded-2xl bg-gray-100 dark:bg-gray-800 backdrop-blur-xl border border-gray-300 dark:border-gray-600 hover:border-cyan-400 shadow-2xl transition-all duration-300 z-[9999]"
              >
                <AnimatePresence mode="wait">
                  {open ? (
                    <motion.div key="close" initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: 90 }}>
                      <XIcon className="w-6 h-6 text-cyan-400" strokeWidth={3} />
                    </motion.div>
                  ) : (
                    <motion.div key="menu" initial={{ scale: 0, rotate: 90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: -90 }}>
                      <MenuIcon className="w-6 h-6 text-cyan-400" strokeWidth={3} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/30 dark:bg-black/60 backdrop-blur-sm lg:hidden"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 right-0 z-50 w-full max-w-md overflow-y-auto bg-white border-l border-gray-200 shadow-2xl dark:bg-gray-900 dark:border-gray-700"
            >
              <div className="absolute z-50 top-4 right-4">
                <motion.button whileTap={{ scale: 0.9 }} onClick={() => setOpen(false)} className="p-3 bg-gray-100 border border-gray-300 shadow-2xl rounded-2xl dark:bg-gray-800 dark:border-gray-600 hover:border-cyan-400">
                  <XIcon className="w-6 h-6 text-cyan-400" strokeWidth={3} />
                </motion.button>
              </div>

              <div className="p-8 pt-24 space-y-6">
                {[...mainNavItems, ...(user ? userMenuItems : [])].map((item, i) => {
                  const Icon = item.icon;
                  const isActive = item.path && location.pathname === item.path;
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
                      className={`p-5 rounded-2xl cursor-pointer transition-all flex items-center gap-4 text-lg font-semibold ${
                        isActive
                          ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/40 text-cyan-400"
                          : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100"
                      }`}
                    >
                      {Icon && <Icon className="w-6 h-6" />}
                      {item.name}
                    </motion.div>
                  );
                })}

                <div className="pt-8 mt-8 space-y-8 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex justify-center">
                    <label className="swap swap-rotate">
                      <input
                        type="checkbox"
                        className="theme-controller"
                        checked={theme === "dark"}
                        onChange={toggleTheme}
                      />
                      <SunIcon className="w-8 h-8 text-yellow-500 swap-on" />
                      <MoonIcon className="w-8 h-8 text-blue-600 swap-off" />
                    </label>
                  </div>

                  {user ? (
                    <motion.div className="flex flex-col items-center gap-6 text-center">
                      <div className="relative">
                        <img src={user.photoURL || "/default-avatar.png"} alt="User" className="object-cover w-24 h-24 rounded-full shadow-2xl ring-4 ring-cyan-400/60" />
                        <div className="absolute bottom-0 right-0 w-6 h-6 border-4 border-white rounded-full bg-emerald-400 dark:border-gray-900 animate-pulse" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{user.displayName || "User"}</h3>
                        <p className="text-sm text-gray-600 opacity-70 dark:text-gray-400">{user.email}</p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleLogout}
                        className="flex items-center justify-center w-full gap-3 py-4 font-bold border rounded-2xl bg-rose-500/10 border-rose-500/30 text-rose-400"
                      >
                        <LogOutIcon className="w-6 h-6" />
                        LOGOUT
                      </motion.button>
                    </motion.div>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => { navigate("/auth/login"); setOpen(false); }}
                      className="flex items-center justify-center w-full gap-3 py-4 font-bold text-white rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600"
                    >
                      <SparklesIcon className="w-6 h-6" />
                      LOGIN / REGISTER
                    </motion.button>
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