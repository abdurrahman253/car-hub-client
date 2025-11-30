// src/Pages/AllProducts.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaCar } from "react-icons/fa";
import toast from "react-hot-toast";
import Product from "./Product";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Unified fetch function
  const fetchProducts = async (query = "") => {
    setLoading(true);
    try {
      const url = query
        ? `https://car-hub-server-rlpm.vercel.app/search?search=${encodeURIComponent(query.trim())}`
        : "https://car-hub-server-rlpm.vercel.app/products";

      const res = await fetch(url);
      const data = await res.json();

      let productList = [];

      if (data.success && Array.isArray(data.data)) {
        productList = data.data;
      } else if (Array.isArray(data)) {
        productList = data;
      }

      setProducts(productList);
    } catch (err) {
      console.error("Fetch error:", err);
      setProducts([]);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchProducts();
  }, []);

  // Search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchText.trim()) {
        fetchProducts(searchText);
      } else {
        fetchProducts(); // reset to all products
      }
    }, 600);

    return () => clearTimeout(timer);
  }, [searchText]);

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-16 md:py-24">
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, type: "spring", stiffness: 100 }}
          className="text-center mb-16"
        >
          <p className="text-cyan-400 font-bold tracking-widest uppercase text-sm mb-4">
            Premium Electric Vehicles
          </p>
          <h1 className="text-5xl md:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 mb-6 leading-tight">
            All Premium EVs
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto">
            Import luxury electric vehicles directly from Japan • Germany • USA • Korea
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-3xl mx-auto mb-16"
        >
          <div className="relative group">
            <FaSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-cyan-400 text-xl transition group-focus-within:text-cyan-300" />
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search by model: Tesla, Porsche Taycan, BMW i7, Kia EV9..."
              className="w-full pl-16 pr-14 py-5 bg-white dark:bg-gray-800 backdrop-blur-2xl border border-gray-300 dark:border-gray-700 rounded-3xl text-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20 transition-all duration-300 shadow-2xl"
            />
            {searchText && (
              <button
                onClick={() => setSearchText("")}
                className="absolute right-6 top-1/2 -translate-y-1/2 text-3xl text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition hover:scale-110"
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>
        </motion.div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-200 dark:bg-gray-800 backdrop-blur rounded-3xl h-96 animate-pulse shadow-xl"
              />
            ))}
          </div>
        )}

        {/* No Results State */}
        {!loading && products.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-24"
          >
            <FaCar className="mx-auto text-9xl text-gray-300 dark:text-gray-700 mb-8" />
            <h3 className="text-4xl font-bold text-gray-700 dark:text-gray-300 mb-4">
              No Vehicles Found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-lg mx-auto">
              Try searching for <strong>Tesla</strong>, <strong>Porsche Taycan</strong>,{" "}
              <strong>BMW i7</strong>, or <strong>Kia EV6</strong>
            </p>
          </motion.div>
        )}

        {/* Products Grid */}
        {!loading && products.length > 0 && (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            initial="hidden"
            animate="show"
          >
            {products.map((product, index) => (
              <motion.div
                key={product._id}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                }}
              >
                <Product product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default AllProducts;