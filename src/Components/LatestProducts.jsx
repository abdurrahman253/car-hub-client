import React, { useState, useEffect } from "react";
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
      <section className="container px-6 py-20 mx-auto">
        <div className="mb-16 text-center">
          <div className="w-48 h-8 mx-auto rounded bg-cyan-400/20 animate-pulse"></div>
          <div className="h-12 mx-auto mt-4 rounded bg-base-content/60 dark:bg-base-content/60 w-96 animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-base-content/60 dark:bg-base-content/60 backdrop-blur-xl rounded-3xl h-96 animate-pulse" />
          ))}
        </div>
      </section>
    );
  }

  // Error State
  if (error) {
    return (
      <section className="container px-6 py-20 mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto"
        >
          <h3 className="mb-4 text-2xl font-bold text-red-400">Failed to Load Products</h3>
          <p className="mb-6 text-base-content/60 dark:text-base-content/60">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 font-bold transition transform rounded-full bg-gradient-to-r from-red-600 to-orange-600 text-base-content hover:shadow-lg hover:scale-105"
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
      <section className="container px-6 py-20 mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto"
        >
          <h3 className="mb-4 text-3xl font-bold text-cyan-400">No Products Available</h3>
          <p className="text-base-content/60 dark:text-base-content/60">Check back later for fresh arrivals!</p>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="container px-6 py-20 mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mb-16 text-center"
      >
        <p className="mb-2 text-sm font-bold tracking-widest uppercase text-cyan-400">
          Fresh Arrivals
        </p>
        <h2 className="text-3xl font-black text-transparent sm:text-6xl lg:text-7xl bg-clip-text bg-gradient-to-r from-base-content dark:from-base-content via-cyan-300 to-base-content dark:to-base-content">
          Latest Premium EVs
        </h2>
        <p className="max-w-2xl mx-auto mt-4 text-lg text-base-content/60 dark:text-base-content/60">
          Handpicked from Japan, Germany, USA – ready for global delivery
        </p>
      </motion.div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 gap-8 mx-auto sm:grid-cols-2 lg:grid-cols-3 max-w-7xl">
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
      <div className="mt-12 text-center">
        <Link
          to="/inventory"
          className="inline-flex items-center gap-3 px-8 py-4 font-bold transition-all duration-300 border rounded-full bg-base-content/60 dark:bg-base-content/60 backdrop-blur-xl border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-400"
        >
          View All Inventory
        </Link>
      </div>
    </section>
  );
};

export default LatestProducts;