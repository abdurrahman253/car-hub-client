// src/Components/AllProducts.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Product from "./Product";
import { FaSearch } from "react-icons/fa";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  // Fetch all products
  useEffect(() => {
    fetch("http://localhost:5000/products") // বা /all-products
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load products");
        return res.json();
      })
      .then((data) => {
        setProducts(Array.isArray(data) ? data : data.result || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Search with debounce
  useEffect(() => {
    if (!searchText.trim()) return;

    const timer = setTimeout(() => {
      setLoading(true);
      fetch(`http://localhost:5000/search?search=${encodeURIComponent(searchText)}`)
        .then((res) => res.json())
        .then((data) => {
          setProducts(Array.isArray(data) ? data : []);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }, 600);

    return () => clearTimeout(timer);
  }, [searchText]);

  return (
    <section className="container mx-auto px-6 py-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="text-cyan-400 text-sm font-bold tracking-widest uppercase mb-2">
          Full Inventory
        </p>
        <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-300 to-white">
          All Premium EVs
        </h2>
        <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-lg">
          Global import & export – Japan, Germany, USA, Korea
        </p>
      </motion.div>

      {/* Elegant Search Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="max-w-2xl mx-auto mb-12"
      >
        <div className="relative group">
          <FaSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-cyan-400 text-xl group-focus-within:text-cyan-300 transition" />
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search by model name..."
            className="w-full pl-14 pr-6 py-5 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full text-white placeholder-gray-400 text-lg focus:outline-none focus:border-cyan-400/50 focus:bg-white/10 transition-all duration-300 shadow-xl"
          />
          {searchText && (
            <button
              onClick={() => setSearchText("")}
              className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition text-xl"
            >
              ×
            </button>
          )}
        </div>
      </motion.div>

      {/* Loading */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-slate-800/50 backdrop-blur-xl rounded-3xl h-96 animate-pulse" />
          ))}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="text-center py-20">
          <p className="text-red-400 text-xl font-bold">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-red-600 text-white px-6 py-3 rounded-full"
          >
            Retry
          </button>
        </div>
      )}

      {/* No Results */}
      {!loading && !error && products.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-20"
        >
          <h3 className="text-3xl font-bold text-cyan-400 mb-4">No Products Found</h3>
          <p className="text-gray-400">Try searching for "Tesla", "Porsche", or "BMW"</p>
        </motion.div>
      )}

      {/* Products Grid – Product কম্পোনেন্টে পাঠানো */}
      {!loading && products.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {products.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Product product={product} />
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

export default AllProducts;