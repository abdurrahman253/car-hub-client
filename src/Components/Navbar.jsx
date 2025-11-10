import React, { useState, useContext, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt, FaSignInAlt, FaBars, FaTimes, FaCar } from "react-icons/fa";
import { AuthContext } from "../Provider/AuthProvider";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { user, logOut } = useContext(AuthContext) || {};

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await logOut();
    navigate("/");
  };

  // Close mobile menu on link click
  const closeMenu = () => setOpen(false);

  const navLinks = (
    <>
      <NavLink to="/products" className="nav-item" onClick={closeMenu}>
        All Products
      </NavLink>
      {user && (
        <>
          <NavLink to="/my-exports" className="nav-item" onClick={closeMenu}>
            My Exports
          </NavLink>
          <NavLink to="/my-imports" className="nav-item" onClick={closeMenu}>
            My Imports
          </NavLink>
          <NavLink to="/add-export" className="nav-item" onClick={closeMenu}>
            Add Export
          </NavLink>
        </>
      )}
    </>
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-slate-950/90 backdrop-blur-2xl shadow-2xl shadow-black/50"
          : "bg-gradient-to-b from-black/70 to-transparent"
      } border-b ${scrolled ? "border-white/10" : "border-transparent"}`}
    >
      <div className="container mx-auto px-6">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-4 group">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-2xl shadow-cyan-500/50 group-hover:scale-110 transition">
              <FaCar className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                CARHUB
              </h1>
              <p className="text-xs text-cyan-400 tracking-widest">PREMIUM EV MARKETPLACE</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-10 font-medium">
            {navLinks}
          </div>

          {/* Auth & Mobile Toggle */}
          <div className="flex items-center gap-4">
            {/* Desktop Auth */}
            <div className="hidden md:flex items-center gap-4">
              {!user ? (
                <button
                  onClick={() => navigate("/auth/login")}
                  className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold shadow-xl shadow-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/70 transition-all hover:scale-105"
                >
                  Login
                </button>
              ) : (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3 bg-white/10 backdrop-blur-xl px-5 py-3 rounded-xl border border-white/20">
                    <FaUserCircle className="text-2xl text-cyan-400" />
                    <span className="font-medium">{user.displayName || user.email}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-6 py-3 bg-gradient-to-r from-rose-500 to-red-600 rounded-xl font-bold shadow-xl shadow-red-500/50 hover:scale-105 transition"
                  >
                    <FaSignOutAlt />
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button - Always Visible on Mobile */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden p-4 rounded-xl bg-white/10 backdrop-blur-xl hover:bg-white/20 transition-all duration-300 text-white text-2xl"
              aria-label="Toggle menu"
            >
              {open ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu - FULLY FIXED */}
      <div
        className={`lg:hidden fixed inset-x-0 top-20 bg-slate-950/95 backdrop-blur-3xl border-t border-white/10 shadow-2xl transition-all duration-500 ease-in-out ${
          open
            ? "translate-y-0 opacity-100 visible"
            : "-translate-y-full opacity-0 invisible"
        }`}
        style={{ zIndex: 49 }}
      >
        <div className="container mx-auto px-6 py-8 space-y-6">
          <div className="flex flex-col gap-4">
            {navLinks}
          </div>

          {/* Mobile Auth */}
          <div className="pt-6 border-t border-white/10">
            {!user ? (
              <button
                onClick={() => {
                  closeMenu();
                  navigate("/auth/login");
                }}
                className="w-full py-5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl font-bold text-lg shadow-xl shadow-cyan-500/50 hover:scale-105 transition"
              >
                Login / Register
              </button>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-4 bg-white/10 backdrop-blur-xl px-6 py-4 rounded-2xl border border-white/20">
                  <FaUserCircle className="text-3xl text-cyan-400" />
                  <div>
                    <p className="font-medium text-white">{user.displayName || user.email}</p>
                    <p className="text-sm text-gray-400">Logged in</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    closeMenu();
                    handleLogout();
                  }}
                  className="w-full py-5 bg-gradient-to-r from-rose-500 to-red-600 rounded-2xl font-bold text-lg shadow-xl shadow-red-500/50 hover:scale-105 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Animated Underline Style */}
      <style jsx>{`
        .nav-item {
          position: relative;
          padding: 0.75rem 1.5rem;
          transition: all 0.3s ease;
          border-radius: 12px;
          font-weight: 500;
        }
        .nav-item::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 3px;
          background: linear-gradient(to right, #06b6d4, #3b82f6);
          transition: all 0.4s ease;
          transform: translateX(-50%);
          border-radius: 2px;
        }
        .nav-item:hover::after,
        .nav-item[aria-current="page"]::after {
          width: 80%;
        }
        .nav-item:hover,
        .nav-item[aria-current="page"] {
          color: #67e8f9;
          background: rgba(6, 182, 212, 0.1);
        }
      `}</style>
    </header>
  );
};

export default Navbar;