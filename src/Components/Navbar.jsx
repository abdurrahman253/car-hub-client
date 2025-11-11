import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Car,
  Menu,
  X,
  LogOut,
  Package,
  Upload,
  Grid3x3,
  Sparkles,
  Mail,
  House,
} from "lucide-react";
import { AuthContext } from "../Provider/AuthProvider";

const Navbar = ({ newsletterRef }) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logOut } = useContext(AuthContext) || {};

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogin = () => navigate("/auth/login");

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
    newsletterRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  const navItems = [
    { name: "Home", path: "/", icon: House, show: true },
    { name: "All Products", path: "/products", icon: Grid3x3, show: true },
    { name: "News Letter", icon: Mail, show: true, onClick: scrollToNewsletter },
    { name: "My Exports", path: "/my-exports", icon: Package, show: !!user },
    { name: "My Imports", path: "/my-imports", icon: Package, show: !!user },
    { name: "Add Export", path: "/add-export", icon: Upload, show: !!user },
  ];

  return (
    <>
      {/* ==== MAIN NAVBAR ==== */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-gradient-to-r from-slate-900/95 via-slate-950/95 to-slate-900/95 backdrop-blur-xl shadow-2xl border-b border-cyan-500/20"
            : "bg-gradient-to-b from-black/90 via-black/60 to-transparent backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between h-20">
            {/* LOGO + MENU */}
            <div className="flex items-center gap-4 lg:gap-12">
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
                    <Car className="w-7 h-7 lg:w-8 lg:h-8 text-white" strokeWidth={2.5} />
                  </div>
                </motion.div>

                <div>
                  <h1 className="text-xl lg:text-2xl xl:text-3xl font-black tracking-tight">
                    <span className="bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent">
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
                {navItems.map(
                  (item) =>
                    item.show && (
                      <motion.div
                        key={item.name}
                        onClick={() => (item.onClick ? item.onClick() : navigate(item.path))}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`relative px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                          location.pathname === item.path
                            ? "text-cyan-300 bg-cyan-500/10"
                            : "text-gray-400 hover:text-cyan-300"
                        }`}
                      >
                        <item.icon className="w-4 h-4" />
                        {item.name}
                        {location.pathname === item.path && (
                          <motion.div
                            layoutId="activeTab"
                            className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl border border-cyan-400/30"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                          />
                        )}
                      </motion.div>
                    )
                )}
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex items-center gap-3 lg:gap-4">
              {/* DESKTOP AUTH */}
              <div className="hidden md:flex items-center gap-3 lg:gap-4">
                {!user ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogin}
                    className="relative group px-6 lg:px-8 py-2.5 rounded-xl font-bold text-sm overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 group-hover:scale-110 transition-transform duration-300"></div>
                    <span className="relative flex items-center gap-2 text-white">
                      <Sparkles className="w-4 h-4" />
                      Login / Register
                    </span>
                  </motion.button>
                ) : (
                  <div className="flex items-center gap-3">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="relative">
                      <img
                        src={user.photoURL}
                        alt={user.displayName || "User"}
                        className="w-10 h-10 rounded-full ring-2 ring-cyan-400/60 object-cover shadow-lg"
                      />
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-900 animate-pulse"></div>
                    </motion.div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleLogout}
                      className="px-5 py-2.5 bg-gradient-to-r from-rose-500 to-red-600 rounded-xl font-semibold text-sm text-white shadow-lg shadow-red-500/30 hover:shadow-red-500/50 transition-all duration-300 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </motion.button>
                  </div>
                )}
              </div>

              {/* MOBILE TOGGLE */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setOpen(!open)}
                className="lg:hidden p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 transition-all duration-300"
              >
                {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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

      {/* ==== MOBILE MENU ==== */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-30 lg:hidden"
            />

            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-full sm:w-96 bg-gradient-to-b from-slate-900 via-slate-950 to-black z-40 lg:hidden border-l border-cyan-500/20 shadow-2xl"
            >
              <div className="flex flex-col h-full p-6 pt-24">
                <div className="space-y-3 flex-1">
                  {navItems.map(
                    (item, idx) =>
                      item.show && (
                        <motion.div
                          key={item.name}
                          onClick={() => {
                            item.onClick?.();
                            if (!item.onClick) navigate(item.path);
                            setOpen(false);
                          }}
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.08 }}
                          className={`block px-6 py-4 rounded-xl font-semibold text-lg transition-all duration-300 cursor-pointer ${
                            location.pathname === item.path
                              ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-400/30"
                              : "text-gray-400 hover:bg-white/5 hover:text-cyan-300"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <item.icon className="w-5 h-5" />
                            {item.name}
                          </div>
                        </motion.div>
                      )
                  )}
                </div>

                <div className="pt-6 border-t border-cyan-500/20">
                  {!user ? (
                    <button
                      onClick={handleLogin}
                      className="w-full py-5 rounded-2xl font-black text-lg bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 text-white shadow-2xl shadow-cyan-500/40 hover:shadow-cyan-500/60 transition-all duration-300 flex items-center justify-center gap-3"
                    >
                      <Sparkles className="w-5 h-5" />
                      LOGIN / REGISTER
                    </button>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex justify-center p-4 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30">
                        <div className="relative">
                          <img
                            src={user.photoURL}
                            alt={user.displayName || "User"}
                            className="w-20 h-20 rounded-full ring-2 ring-cyan-400 object-cover"
                          />
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-400 rounded-full border-2 border-slate-900"></div>
                        </div>
                      </div>

                      <button
                        onClick={handleLogout}
                        className="w-full py-5 rounded-2xl font-black text-lg bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-2xl shadow-red-500/40 hover:shadow-red-500/60 transition-all duration-300 flex items-center justify-center gap-3"
                      >
                        <LogOut className="w-5 h-5" />
                        LOGOUT
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-cyan-500/10 to-transparent pointer-events-none"></div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
