import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { AuthContext } from "../Provider/AuthProvider";

const Footer = () => (
  <footer className="bg-slate-950/90 backdrop-blur-2xl border-t border-white/5 py-16 mt-24">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <h3 className="text-3xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Carhub
          </h3>
          <p className="text-gray-400 mt-3 text-sm leading-relaxed">
            Global leader in premium electric & hybrid vehicle import/export marketplace.
          </p>
          <p className="text-xs text-gray-500 mt-4">
            © {new Date().getFullYear()} Carhub. All rights reserved.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-white mb-4">Quick Links</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><a href="/products" className="hover:text-cyan-400 transition">All Products</a></li>
            <li><a href="/about" className="hover:text-cyan-400 transition">About Us</a></li>
            <li><a href="/contact" className="hover:text-cyan-400 transition">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-white mb-4">Services</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>Import/Export</li>
            <li>Custom Clearance</li>
            <li>Logistics & Shipping</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-white mb-4">Connect</h4>
          <p className="text-sm text-gray-400">support@carhub.io</p>
          <div className="flex gap-4 mt-4">
            {['X', 'LinkedIn', 'Facebook'].map(s => (
              <div key={s} className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-cyan-500/20 hover:border-cyan-400 transition">
                {s}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </footer>
);

const MainLayout = () => {
  const auth = useContext(AuthContext) || {};

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white overflow-x-hidden">
      <Navbar />
      <main className="flex-1 pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;