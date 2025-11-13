// src/pages/MyImports.jsx
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { FaStar, FaMapMarkerAlt, FaBoxOpen, FaTrash } from 'react-icons/fa';

const MyImports = () => {
  const { user, myImports, setMyImports } = useContext(AuthContext);
  const navigate = useNavigate();

  // Fetch imports on mount
  useEffect(() => {
    if (user && myImports.length === 0) {
      fetchMyImports();
    }
  }, [user]);

  const fetchMyImports = async () => {
    try {
      const token = await user.getIdToken();
      const res = await fetch('http://localhost:5000/my-imports', {
        headers: { authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setMyImports(data.result);
      }
    } catch (err) {
      toast.error("Failed to load imports");
    }
  };

  const handleRemove = async (productId) => {
  if (!confirm("Remove one unit? Stock will be restored.")) return;

  try {
    const token = await user.getIdToken();
    const res = await fetch(`http://localhost:5000/my-imports/product/${productId}`, {
      method: 'DELETE',
      headers: { authorization: `Bearer ${token}` }
    });
    const data = await res.json();

    if (data.success) {
      setMyImports(prev => {
        const updated = prev.map(item => {
          if (item.productId === productId) {
            const newQty = item.importedQuantity - 1;
            return newQty > 0 ? { ...item, importedQuantity: newQty } : null;
          }
          return item;
        }).filter(Boolean);
        return updated;
      });

      toast.success("1 unit removed");
    } else {
      toast.error(data.message || "Remove failed");
    }
  } catch (err) {
    toast.error("Remove failed");
  }
};

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-black to-slate-900">
        <p className="text-xl text-cyan-400">Please login to view your imports</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl sm:text-5xl md:text-6xl font-black text-center mb-10 sm:mb-12 md:mb-16 bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-300 to-white"
      >
        My <span className="text-primary">Imports</span>
      </motion.h2>

      {myImports.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <p className="text-2xl text-gray-400 mb-6">You haven't imported any vehicles yet.</p>
          <button
            onClick={() => navigate('/inventory')}
            className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold rounded-xl hover:shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105 transition"
          >
            Browse Inventory
          </button>
        </motion.div>
      ) : (
        <div className="grid gap-6 sm:gap-8 md:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {myImports.map((item, index) => (
            <ImportCard
              key={item.productId}
              item={item}
              index={index}
              onRemove={handleRemove}
              navigate={navigate}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Reusable Import Card Component
const ImportCard = ({ item, index, onRemove, navigate }) => {
  const {
    _id,
    productImage = "https://via.placeholder.com/600x400/1a1a1a/cccccc?text=No+Image",
    productName = "Unnamed Vehicle",
    price = 0,
    originCountry = "Unknown",
    rating = 0,
    importedQuantity = 1,
    productId
  } = item;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -12, scale: 1.02 }}
      className="group relative bg-gradient-to-br from-slate-900/80 via-black/90 to-slate-900/80 backdrop-blur-xl rounded-3xl overflow-hidden border border-cyan-500/20 shadow-2xl hover:shadow-cyan-500/40 transition-all duration-500"
    >
      {/* Image */}
      <div
        className="relative overflow-hidden cursor-pointer"
        onClick={() => navigate(`/product-Details/${productId}`)}
      >
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

          {/* Imported Qty Badge */}
          <div className="absolute top-4 right-4 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
            <FaBoxOpen className="text-xs" />
            Qty: {importedQuantity}
          </div>
        </div>
      </div>

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

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => onRemove(productId)}
            className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-red-500/50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <FaTrash /> Remove
          </button>
          <button
            onClick={() => navigate(`/product-Details/${productId}`)}
            className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold py-3 rounded-xl shadow-lg hover:shadow-cyan-500/70 transform hover:scale-105 transition-all duration-300"
          >
            See Details
          </button>
        </div>
      </div>

      {/* Glow Effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity blur-xl -z-10" />
    </motion.div>
  );
};

export default MyImports;