import React from 'react';
import { Link } from 'react-router-dom';
import { FaCar } from 'react-icons/fa';
import { Mail, Linkedin, Facebook, ChevronUp } from 'lucide-react';

// Official X Logo (2025)
const XLogo = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: XLogo, label: 'X', href: 'https://x.com/carhub' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/company/carhub' },
    { icon: Facebook, label: 'Facebook', href: 'https://facebook.com/carhub' }
  ];

  const quickLinks = [
    { label: 'All Products', href: '/products' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' }
  ];

  const services = [
    'Import/Export Worldwide',
    'Custom Clearance',
    'Logistics & Shipping',
    'Vehicle Inspection',
    'Insurance & Financing'
  ];

  return (
    <>
      {/* Mobile Floating Back to Top - Super Glass Effect */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-4 z-50 md:hidden group flex items-center justify-center w-16 h-16 rounded-full bg-white/10 backdrop-blur-3xl border border-white/30 shadow-2xl shadow-cyan-500/60 hover:shadow-cyan-500/90 hover:scale-110 transition-all duration-500 ring-4 ring-cyan-400/20"
        aria-label="Back to Top"
      >
        <ChevronUp className="w-9 h-9 text-cyan-300 group-hover:-translate-y-2 transition" />
      </button>

      <footer className="relative bg-gradient-to-b from-slate-950 via-black to-slate-950 border-t border-cyan-900/30 overflow-hidden">
        {/* Background Glow */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-cyan-600 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-32 right-1/3 w-80 h-80 bg-blue-700 rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
            {/* Brand Section - SAME AS NAVBAR */}
            <div className="space-y-6">
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
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                Global leader in luxury electric & hybrid vehicle import/export. Experience the future of automotive excellence.
              </p>
              <div className="flex items-center gap-4 text-gray-500 text-xs">
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>support@carhub.io</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-xl font-bold text-white mb-6 relative inline-block">
                Quick Links
                <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full"></span>
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-cyan-300 transition-all duration-300 flex items-center gap-2 group text-sm"
                    >
                      <span className="w-1.5 h-1.5 bg-cyan-500/50 rounded-full group-hover:bg-cyan-400 transition"></span>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-xl font-bold text-white mb-6 relative inline-block">
                Our Services
                <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full"></span>
              </h4>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service} className="flex items-start gap-3 group">
                    <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full mt-1.5 group-hover:scale-150 transition-transform"></div>
                    <span className="text-gray-400 group-hover:text-gray-200 transition text-sm">{service}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect & Newsletter */}
            <div className="space-y-8">
              <div>
                <h4 className="text-xl font-bold text-white mb-6 relative inline-block">
                  Stay Connected
                  <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full"></span>
                </h4>
                <div className="flex gap-4 mb-8">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-2xl bg-white/5 backdrop-blur-2xl border border-white/10 flex items-center justify-center hover:bg-cyan-500/20 hover:border-cyan-400 hover:scale-110 transition-all duration-500 shadow-xl hover:shadow-cyan-500/50 group"
                      >
                        <Icon className="text-gray-400 group-hover:text-cyan-300 transition" />
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Newsletter */}
              <div className="w-full">
                <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 shadow-2xl">
                  <h5 className="text-white font-bold mb-2 text-lg">Exclusive Deals</h5>
                  <p className="text-gray-400 text-xs mb-5 leading-relaxed">
                    Get first access to new arrivals & premium offers
                  </p>
                  <form className="flex flex-col gap-3">
                    <input
                      type="email"
                      placeholder="your@email.com"
                      required
                      className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition text-sm"
                    />
                    <button
                      type="submit"
                      className="w-full px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-cyan-500/60 hover:scale-[1.02] transition-all duration-300"
                    >
                      Subscribe Now
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Bottom Bar */}
          <div className="hidden md:flex justify-between items-center mt-16 pt-8 border-t border-white/10">
            <p className="text-gray-500 text-xs">
              Made with <span className="text-red-500">❤️</span> for the future of driving
            </p>
            {/* Desktop Back to Top with ULTRA GLASS EFFECT */}
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-3xl border border-white/30 rounded-full hover:bg-white/20 hover:border-cyan-400 transition-all duration-500 shadow-2xl shadow-cyan-500/60 hover:shadow-cyan-500/90 ring-4 ring-cyan-400/20"
            >
              <span className="text-sm font-medium text-gray-300 group-hover:text-cyan-300">Back to Top</span>
              <ChevronUp className="w-6 h-6 text-cyan-400 group-hover:-translate-y-2 transition" />
            </button>
          </div>
        </div>

        {/* MOBILE COPYRIGHT - STICKY AT VERY BOTTOM */}
        <div className="md:hidden bg-gradient-to-t from-black via-slate-950 to-transparent border-t border-white/10 backdrop-blur-2xl z-40">
          <div className="container mx-auto px-6 py-4 text-center">
            <p className="text-gray-500 text-xs">
              Made with <span className="text-red-500">❤️</span> for the future of driving
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;