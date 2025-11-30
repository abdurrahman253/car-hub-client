import React from 'react';
import { Link } from 'react-router-dom';
import { FaCar } from 'react-icons/fa';
import { Mail, Linkedin, Facebook, ChevronUp } from 'lucide-react';

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
    { label: 'Home', path: '/' } ,
    { label: 'All Products', path: '/all-products'},
    { label: 'My Exports', path: '/my-exports' },
    { label: 'My Imports', path: '/my-imports' },
    { label: 'Add Export', path: '/add-export' },
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
      {/* Mobile Floating Back to Top */}
      <button
        onClick={scrollToTop}
        className="fixed z-50 flex items-center justify-center w-16 h-16 transition-all duration-500 border rounded-full shadow-2xl bottom-4 right-4 md:hidden group bg-base-200 backdrop-blur-3xl border-base-300 shadow-cyan-500/60 hover:shadow-cyan-500/90 ring-4 ring-cyan-400/20"
        aria-label="Back to Top"
      >
        <ChevronUp className="transition w-9 h-9 text-cyan-300 group-hover:-translate-y-2" />
      </button>

      <footer className="relative overflow-hidden border-t bg-base-200 border-cyan-900/30">
        {/* Background Glow */}
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="absolute rounded-full top-20 left-1/4 w-96 h-96 bg-cyan-600 blur-3xl animate-pulse"></div>
          <div className="absolute delay-700 bg-blue-700 rounded-full bottom-32 right-1/3 w-80 h-80 blur-3xl animate-pulse"></div>
        </div>

        <div className="container relative z-10 px-6 py-20 mx-auto">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-16">
            {/* Brand Section  */}
            <div className="space-y-6">
              <Link to="/" className="flex items-center gap-4 group">
                <div className="flex items-center justify-center transition shadow-2xl w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 shadow-cyan-500/50 group-hover:scale-110">
                  <FaCar className="w-8 h-8 text-base-content" />
                </div>
                <div>
                  <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-base-content to-base-content/70">
                    CARHUB
                  </h1>
                  <p className="text-xs tracking-widest text-cyan-400">PREMIUM EV MARKETPLACE</p>
                </div>
              </Link>
              <p className="max-w-xs text-sm leading-relaxed text-base-content/70">
                Global leader in luxury electric & hybrid vehicle import/export. Experience the future of automotive excellence.
              </p>
              <div className="flex items-center gap-4 text-xs text-base-content/70">
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>support@carhub.io</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="relative inline-block mb-6 text-xl font-bold text-base-content">
                Quick Links
                <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full"></span>
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="flex items-center gap-2 text-sm transition-all duration-300 text-base-content/70 hover:text-cyan-300 group"
                    >
                      <span className="w-1.5 h-1.5 bg-cyan-500/50 rounded-full group-hover:bg-cyan-400 transition"></span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="relative inline-block mb-6 text-xl font-bold text-base-content">
                Our Services
                <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full"></span>
              </h4>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service} className="flex items-start gap-3 group">
                    <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full mt-1.5 group-hover:scale-150 transition-transform"></div>
                    <span className="text-sm transition text-base-content/70 group-hover:text-base-content">{service}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect & Newsletter */}
            <div className="space-y-8">
              <div>
                <h4 className="relative inline-block mb-6 text-xl font-bold text-base-content">
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
                        className="flex items-center justify-center w-12 h-12 text-gray-800 transition-all duration-500 border shadow-xl rounded-2xl bg-base-200 backdrop-blur-2xl border-base-300 hover:bg-cyan-500/20 hover:border-cyan-400 hover:scale-110 hover:shadow-cyan-500/50 group dark:text-white"

                      >
                        <Icon className="transition text-base-content group-hover:text-cyan-300" />
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Newsletter */}
              <div className="w-full">
                <div className="p-6 border shadow-2xl bg-base-200 backdrop-blur-2xl border-base-300 rounded-2xl">
                  <h5 className="mb-2 text-lg font-bold text-base-content">Exclusive Deals</h5>
                  <p className="mb-5 text-xs leading-relaxed text-base-content/70">
                    Get first access to new arrivals & premium offers
                  </p>
                  <form className="flex flex-col gap-3">
                    <input
                      type="email"
                      placeholder="your@email.com"
                      required
                      className="w-full px-5 py-4 text-sm transition border bg-base-100 border-base-300 rounded-xl text-base-content placeholder-base-content/70 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                    />
                    <button
                      type="submit"
                      className="w-full px-6 py-4 text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-cyan-500/60 hover:scale-[1.02] transition-all duration-300"
                    >
                      Subscribe Now
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Bottom Bar */}
          <div className="items-center justify-between hidden pt-8 mt-16 border-t md:flex border-base-300">
            <p className="text-xs text-base-content/70">
              Made with <span className="text-red-500">❤️</span> for the future of driving
            </p>
            {/* Desktop Back to Top */}
            <button
              onClick={scrollToTop}
              className="flex items-center gap-3 px-8 py-4 transition-all duration-500 border rounded-full shadow-2xl group bg-base-200 backdrop-blur-3xl border-base-300 hover:bg-base-200 hover:border-cyan-400 shadow-cyan-500/60 hover:shadow-cyan-500/90 ring-4 ring-cyan-400/20"
            >
              <span className="text-sm font-medium text-base-content/70 group-hover:text-cyan-300">Back to Top</span>
              <ChevronUp className="w-6 h-6 transition text-cyan-400 group-hover:-translate-y-2" />
            </button>
          </div>
        </div>

        {/* MOBILE COPYRIGHT */}
        <div className="z-40 border-t md:hidden bg-gradient-to-t from-base-100 via-base-200 to-transparent border-base-300 backdrop-blur-2xl">
          <div className="container px-6 py-4 mx-auto text-center">
            <p className="text-xs text-base-content/70">
              Made with <span className="text-red-500">❤️</span> for the future of driving
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;