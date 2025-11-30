import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaStar, FaMapMarkerAlt, FaBoxOpen } from "react-icons/fa";

const Product = ({ product }) => {
  const {
    _id,
    productImage = "https://via.placeholder.com/600x400/1a1a1a/cccccc?text=No+Image",
    productName = "Unnamed Vehicle",
    price = 0,
    originCountry = "Unknown",
    rating = 0,
    availableQuantity = 0,
  } = product;

  return (
    <motion.div
      whileHover={{ y: -12, scale: 1.02 }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="relative overflow-hidden transition-all duration-500 border shadow-2xl group bg-gradient-to-br from-base-200/80 dark:from-base-200/80 via-base-100/90 dark:via-base-100/90 to-base-200/80 dark:to-base-200/80 backdrop-blur-xl rounded-3xl border-cyan-500/20 hover:shadow-cyan-500/40"
    >
      {/* Image */}
      <Link to={`/product/${_id}`} className="relative block overflow-hidden">
        <div className="aspect-[4/3] relative bg-base-content/60 dark:bg-base-content/60">
          <img
            src={productImage}
            alt={productName}
            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/600x400/1a1a1a/cccccc?text=Image+Not+Found";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-base-100/80 dark:from-base-content/80 via-transparent to-transparent opacity-60 group-hover:opacity-80" />

          {/* Country Badge */}
          <div className="absolute flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-full shadow-lg top-4 left-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-base-content">
            <FaMapMarkerAlt className="text-xs" />
            {originCountry}
          </div>

          {/* Low Stock */}
          {availableQuantity <= 3 && availableQuantity > 0 && (
            <div className="absolute px-3 py-1 text-xs font-bold bg-red-600 rounded-full shadow-lg top-4 right-4 text-base-content animate-pulse">
              ONLY {availableQuantity} LEFT
            </div>
          )}

          {/* Sold Out */}
          {availableQuantity === 0 && (
            <div className="absolute inset-0 flex items-center justify-center bg-base-content/70">
              <span className="text-xl font-black tracking-widest text-red-500">SOLD OUT</span>
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-6 space-y-4">
        <h3 className="text-xl font-bold text-base-content dark:text-base-content group-hover:text-cyan-300 transition line-clamp-2 min-h-[3.5rem] flex items-center">
          {productName}
        </h3>

        <div className="flex items-center justify-between">
          <p className="text-3xl font-black text-cyan-400">${price.toLocaleString()}</p>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={`text-sm ${i < Math.floor(rating) ? "text-yellow-400" : "text-base-content/60"}`}
              />
            ))}
            <span className="ml-1 text-xs text-base-content/60 dark:text-base-content/60">({rating})</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-base-content/60 dark:text-base-content/60">
          <div className="flex items-center gap-2">
            <FaBoxOpen className="text-emerald-400" />
            <span>{availableQuantity} in stock</span>
          </div>
        </div>

        {/* See Details */}
        <Link
          to={`/product-Details/${_id}`}
          className={`block w-full mt-4 text-center font-bold py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 ${
            availableQuantity === 0
              ? "bg-base-content/60 text-base-content/60 cursor-not-allowed"
              : "bg-gradient-to-r from-cyan-500 to-blue-600 text-base-content hover:shadow-cyan-500/70"
          }`}
          onClick={(e) => availableQuantity === 0 && e.preventDefault()}
        >
          {availableQuantity === 0 ? "Sold Out" : "See Details"}
        </Link>
      </div>

      {/* Glow */}
      <div className="absolute inset-0 transition-opacity opacity-0 rounded-3xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 group-hover:opacity-100 blur-xl -z-10" />
    </motion.div>
  );
};

export default Product;