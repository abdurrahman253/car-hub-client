// src/Components/Product.jsx
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
      className="group relative bg-gradient-to-br from-slate-900/80 via-black/90 to-slate-900/80 backdrop-blur-xl rounded-3xl overflow-hidden border border-cyan-500/20 shadow-2xl hover:shadow-cyan-500/40 transition-all duration-500"
    >
      {/* Image */}
      <Link to={`/product/${_id}`} className="block relative overflow-hidden">
        <div className="aspect-[4/3] relative bg-gray-900">
          <img
            src={productImage}
            alt={productName}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            loading="lazy"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/600x400/1a1a1a/cccccc?text=Image+Not+Found";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80" />

          {/* Country Badge */}
          <div className="absolute top-4 left-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
            <FaMapMarkerAlt className="text-xs" />
            {originCountry}
          </div>

          {/* Low Stock */}
          {availableQuantity <= 3 && availableQuantity > 0 && (
            <div className="absolute top-4 right-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
              ONLY {availableQuantity} LEFT
            </div>
          )}

          {/* Sold Out */}
          {availableQuantity === 0 && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
              <span className="text-red-500 font-black text-xl tracking-widest">SOLD OUT</span>
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-6 space-y-4">
        <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 min-h-[3.5rem] flex items-center">
          {productName}
        </h3>

        <div className="flex items-center justify-between">
          <p className="text-3xl font-black text-cyan-400">
            ${price.toLocaleString()}
          </p>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={`text-sm ${i < Math.floor(rating) ? "text-yellow-400" : "text-gray-600"}`}
              />
            ))}
            <span className="ml-1 text-xs text-gray-400">({rating})</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-400">
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
              ? "bg-gray-700 text-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-cyan-500 to-blue-600 text-black hover:shadow-cyan-500/70"
          }`}
          onClick={(e) => availableQuantity === 0 && e.preventDefault()}
        >
          {availableQuantity === 0 ? "Sold Out" : "See Details"}
        </Link>
      </div>

      {/* Glow */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity blur-xl -z-10" />
    </motion.div>
  );
};

export default Product;