import React, { useEffect, useState } from "react";
import Product from "./Product";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const LatestProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://car-hub-server-rlpm.vercel.app/products")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((response) => {
        console.log("Latest Products Response:", response);
        
      
        if (response.success && Array.isArray(response.data)) {
          // Get latest 6 products
          const latest = response.data.slice(0, 6);
          setProducts(latest);
        } else if (Array.isArray(response)) {
          // Fallback: if direct array
          setProducts(response.slice(0, 6));
        } else {
          throw new Error("Invalid response format");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Loading State
  if (loading) {
    return (
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <div className="h-8 bg-cyan-400/20 rounded w-48 mx-auto animate-pulse"></div>
          <div className="h-12 bg-gray-100/10 dark:bg-white/10 rounded w-96 mx-auto mt-4 animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-gray-200 dark:bg-slate-800/50 backdrop-blur-xl rounded-3xl h-96 animate-pulse" />
          ))}
        </div>
      </section>
    );
  }

  // Error State
  if (error) {
    return (
      <section className="container mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto"
        >
          <h3 className="text-2xl font-bold text-red-400 mb-4">Failed to Load Products</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-6 py-3 rounded-full font-bold hover:shadow-lg transform hover:scale-105 transition"
          >
            Try Again
          </button>
        </motion.div>
      </section>
    );
  }

  // Empty State
  if (products.length === 0) {
    return (
      <section className="container mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto"
        >
          <h3 className="text-3xl font-bold text-cyan-400 mb-4">No Products Available</h3>
          <p className="text-gray-600 dark:text-gray-400">Check back later for fresh arrivals!</p>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-6 py-20">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="text-cyan-400 text-sm font-bold tracking-widest uppercase mb-2">
          Fresh Arrivals
        </p>
        <h2 className="text-3xl sm:text-6xl lg:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-black dark:from-white via-cyan-300 to-black dark:to-white">
          Latest Premium EVs
        </h2>
        <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
          Handpicked from Japan, Germany, USA – ready for global delivery
        </p>
      </motion.div>

      {/* Products Grid */}
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

      {/* View All Button */}
      <div className="text-center mt-12">
        <Link
          to="/inventory"
          className="inline-flex items-center gap-3 bg-gray-100/10 dark:bg-white/10 backdrop-blur-xl border border-cyan-500/30 text-cyan-400 font-bold px-8 py-4 rounded-full hover:bg-cyan-500/20 hover:border-cyan-400 transition-all duration-300"
        >
          View All Inventory
        </Link>
      </div>
    </section>
  );
};

export default LatestProducts;