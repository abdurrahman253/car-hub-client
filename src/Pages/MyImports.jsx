// src/Pages/MyImports.jsx
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import {
  FaStar,
  FaMapMarkerAlt,
  FaBoxOpen,
  FaTrash,
  FaCar,
  FaSignInAlt,
} from "react-icons/fa";
import { AuthContext } from "../Provider/AuthProvider";

const MyImports = () => {
  const { user, myImports, setMyImports } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (user && myImports.length === 0) {
      fetchMyImports();
    }
  }, [user, myImports.length]);

  const fetchMyImports = async () => {
    try {
      const token = await user.getIdToken();
      const res = await fetch("https://car-hub-server-rlpm.vercel.app/my-imports", {
        headers: { authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setMyImports(data.result || []);
      } else {
        toast.error("No imports found");
      }
    } catch (err) {
      console.error("Fetch imports error:", err);
      toast.error("Failed to load your imports");
    }
  };

  const handleRemove = async (productId) => {
    if (!window.confirm("Remove one unit from your imports?\nStock will be restored.")) return;

    try {
      const token = await user.getIdToken();
      const res = await fetch(
        `https://car-hub-server-rlpm.vercel.app/my-imports/product/${productId}`,
        {
          method: "DELETE",
          headers: { authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();

      if (data.success) {
        setMyImports((prev) =>
          prev
            .map((item) =>
              item.productId === productId
                ? { ...item, importedQuantity: item.importedQuantity - 1 }
                : item
            )
            .filter((item) => item.importedQuantity > 0)
        );
        toast.success("1 unit removed successfully");
      } else {
        toast.error(data.message || "Failed to remove item");
      }
    } catch (err) {
      console.error("Remove error:", err);
      toast.error("Remove failed. Try again.");
    }
  };

  // ── Not logged in ─────────────────────────────────────
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md px-8"
        >
          <FaCar className="mx-auto text-8xl text-cyan-500 mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Login Required
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Please sign in to view and manage your imported vehicles
          </p>
          <button
            onClick={() => navigate("/auth/login")}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-cyan-500/50 hover:scale-105 transition transform"
          >
            <FaSignInAlt />
            Login Now
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-12 md:py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 leading-tight">
            My <span className="text-cyan-300">Imports</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Track and manage your premium electric vehicle imports from around the world
          </p>
        </motion.div>

        {/* Empty State */}
        {myImports.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-24"
          >
            <FaBoxOpen className="mx-auto text-9xl text-gray-300 dark:text-gray-700 mb-8" />
            <h3 className="text-4xl font-bold text-gray-700 dark:text-gray-300 mb-4">
              No Imports Yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-10 max-w-md mx-auto">
              Start building your premium EV collection from Japan, Germany, USA & Korea
            </p>
            <button
              onClick={() => navigate("/all-products")}
              className="px-12 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xl rounded-2xl shadow-2xl hover:shadow-cyan-500/60 hover:scale-110 transition-all duration-300 transform"
            >
              Explore Inventory
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {myImports.map((item, index) => (
              <ImportCard
                key={item.productId || item._id}
                item={item}
                index={index}
                onRemove={handleRemove}
                navigate={navigate}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ── Import Card Component ─────────────────────────────────────
const ImportCard = ({ item, index, onRemove, navigate }) => {
  const {
    productImage = "https://via.placeholder.com/600x400/0f172a/94a3b8?text=CarHub",
    productName = "Premium Electric Vehicle",
    price = 0,
    originCountry = "International",
    rating = 4.8,
    importedQuantity = 1,
    productId,
  } = item;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -16, scale: 1.04 }}
      className="group relative overflow-hidden rounded-3xl bg-white dark:bg-gray-800 backdrop-blur-xl border border-gray-200 dark:border-gray-700 shadow-2xl hover:shadow-cyan-500/40 transition-all duration-500"
    >
      {/* Image */}
      <div
        onClick={() => navigate(`/product-details/${productId}`)}
        className="cursor-pointer relative overflow-hidden"
      >
        <div className="aspect-[4/3] relative bg-gray-200 dark:bg-gray-700">
          <img
            src={productImage}
            alt={productName}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            loading="lazy"
            onError={(e) =>
              (e.target.src =
                "https://via.placeholder.com/600x400/0f172a/94a3b8?text=No+Image")
            }
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex items-center gap-2 px-4 py-2 bg-cyan-600 text-white text-sm font-bold rounded-full shadow-2xl">
            <FaMapMarkerAlt className="text-xs" />
            {originCountry}
          </div>
          <div className="absolute top-4 right-4 flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white text-sm font-bold rounded-full shadow-2xl">
            <FaBoxOpen className="text-xs" />
            Qty: {importedQuantity}
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 space-y-5">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-cyan-400 transition-colors duration-300">
          {productName}
        </h3>

        <div className="flex items-center justify-between">
          <p className="text-3xl font-black text-cyan-500">
            ${price.toLocaleString()}
          </p>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={`text-lg ${
                  i < Math.round(rating) ? "text-yellow-400 drop-shadow" : "text-gray-300 dark:text-gray-600"
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-400 font-medium">
              {rating}
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove(productId);
            }}
            className="flex-1 flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-xl shadow-lg hover:shadow-red-600/60 hover:scale-105 transition-all duration-300"
          >
            <FaTrash /> Remove
          </button>
          <button
            onClick={() => navigate(`/product-details/${productId}`)}
            className="flex-1 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl shadow-lg hover:shadow-cyan-500/70 hover:scale-105 transition-all duration-300"
          >
            View Details
          </button>
        </div>
      </div>

      {/* Glow */}
      <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-cyan-500/30 via-blue-500/20 to-purple-600/30 opacity-0 group-hover:opacity-100 blur-3xl transition-opacity duration-700" />
    </motion.div>
  );
};

export default MyImports;