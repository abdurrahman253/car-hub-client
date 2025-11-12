// src/Pages/ProductDetails.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaStar, FaMapMarkerAlt, FaBoxOpen, FaTachometerAlt, FaCog, FaGasPump, FaCalendarAlt, FaChair, FaDoorClosed, FaCogs, FaPalette, FaUser, FaPhone, FaEnvelope, FaCheckCircle } from "react-icons/fa";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [importQty, setImportQty] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [importing, setImporting] = useState(false);


   useEffect(() => {
         window.scrollTo(0, 0);
       }, []);



  useEffect(() => {
    fetch(`http://localhost:5000/products/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setProduct(data.result);
        } else {
          toast.error(data.message);
        }
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load product");
        setLoading(false);
      });
  }, [id]);

  const handleImport = async () => {
    if (importQty > product.availableQuantity) return;

    setImporting(true);
    try {
      const res = await fetch("http://localhost:5000/import-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product._id,
          importQuantity: Number(importQty),
          userId: "user123" 
        })
      });

      const data = await res.json();
      if (data.success) {
        toast.success(`Imported ${importQty} unit(s)!`);
        setProduct(prev => ({
          ...prev,
          availableQuantity: prev.availableQuantity - importQty
        }));
        setShowModal(false);
        setImportQty(1);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Import failed");
    } finally {
      setImporting(false);
    }
  };

  if (loading) {
   return (
  <div className="min-h-screen bg-gradient-to-br from-slate-950 via-black to-slate-900 flex items-center justify-center">
    <div className="relative">
      {/* Outer Ring */}
      <div className="w-16 h-16 border-4 border-cyan-500/30 rounded-full animate-ping"></div>
      
      {/* Inner Spinner */}
      <div className="absolute top-0 left-0 w-16 h-16 border-4 border-t-cyan-400 border-r-cyan-300 border-b-cyan-500 border-l-cyan-600 rounded-full animate-spin"></div>
      
      {/* Center Glow */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-cyan-400 rounded-full animate-pulse shadow-lg shadow-cyan-400/50"></div>
    </div>
  </div>
);
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-black to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-red-400 mb-4">Product Not Found</h2>
          <Link to="/inventory" className="text-cyan-400 hover:underline">Back to Inventory</Link>
        </div>
      </div>
    );
  }

  const isImportDisabled = importQty > product.availableQuantity || importQty < 1;

  return (
    <>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-slate-950 via-black to-slate-900 text-white py-12 px-6"
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center mb-12"
          >
            <p className="text-cyan-400 text-sm font-bold tracking-widest uppercase mb-2">
              Premium Import • {product.originCountry}
            </p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-300 to-white">
              {product.productName}
            </h1>
            <div className="flex items-center justify-center gap-2 mt-4">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className={`text-lg ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-600"}`} />
              ))}
              <span className="ml-2 text-gray-400">({product.rating})</span>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-10">
            {/* Image + Quick Specs */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2 space-y-8"
            >
              {/* Main Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                <img
                  src={product.productImage}
                  alt={product.productName}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-70" />
                <div className="absolute bottom-6 left-6 text-white">
                  <p className="text-4xl font-black">${product.price.toLocaleString()}</p>
                  <p className="text-sm text-cyan-300">Ex-Factory Price</p>
                </div>
              </div>

              {/* Quick Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {[
                  { icon: <FaTachometerAlt />, label: "Mileage", value: product.mileage },
                  { icon: <FaCog />, label: "Transmission", value: product.transmission },
                  { icon: <FaGasPump />, label: "Fuel", value: product.fuelType },
                  { icon: <FaCalendarAlt />, label: "Year", value: product.year },
                  { icon: <FaCogs />, label: "Performance", value: product.performance },
                ].map((spec, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white/5 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-4 text-center"
                  >
                    <div className="text-cyan-400 text-xl mb-2">{spec.icon}</div>
                    <p className="text-xs text-gray-400">{spec.label}</p>
                    <p className="font-bold text-sm">{spec.value}</p>
                  </motion.div>
                ))}
              </div>

              {/* Description */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-slate-800/50 to-black/50 backdrop-blur-xl rounded-3xl p-8 border border-cyan-500/20"
              >
                <h3 className="text-2xl font-bold mb-4 text-cyan-300">Vehicle Overview</h3>
                <p className="text-gray-300 leading-relaxed">{product.description}</p>
              </motion.div>
            </motion.div>

            {/* Import Card */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-1"
            >
              <div className="bg-gradient-to-br from-slate-900/90 via-black/90 to-slate-900/90 backdrop-blur-2xl rounded-3xl p-8 border border-cyan-500/30 shadow-2xl sticky top-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-sm text-gray-400">Available Stock</p>
                    <p className="text-3xl font-black text-emerald-400">{product.availableQuantity}</p>
                  </div>
                  <FaBoxOpen className="text-4xl text-emerald-400" />
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Color</span>
                    <span className="font-bold flex items-center gap-2">
                      <FaPalette className="text-cyan-400" /> {product.color}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Seats / Doors</span>
                    <span className="font-bold flex items-center gap-2">
                      <FaChair className="text-cyan-400" /> {product.seats} / <FaDoorClosed className="text-cyan-400" /> {product.doors}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Engine</span>
                    <span className="font-bold">{product.engine}</span>
                  </div>
                </div>

                {/* Import Now Button */}
                <button
                  onClick={() => setShowModal(true)}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold text-lg py-4 rounded-xl shadow-lg hover:shadow-cyan-500/70 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <FaCheckCircle /> Import Now
                </button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  Secure global import • Duty calculation available
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Import Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gradient-to-br from-slate-900 via-black to-slate-900 rounded-3xl p-8 max-w-md w-full border border-cyan-500/30 shadow-2xl"
          >
            <h3 className="text-2xl font-bold text-cyan-300 mb-6 text-center">Import Quantity</h3>

            <div className="mb-6">
              <label className="block text-sm text-gray-400 mb-2">How many units to import?</label>
              <input
                type="number"
                min="1"
                max={product.availableQuantity}
                value={importQty}
                onChange={(e) => setImportQty(Math.max(1, Math.min(product.availableQuantity, Number(e.target.value))))}
                className="w-full bg-white/10 border border-cyan-500/30 rounded-xl px-4 py-3 text-white text-xl font-bold text-center focus:outline-none focus:border-cyan-400 transition"
              />
              <p className="text-xs text-gray-400 mt-2 text-center">
                Max: <span className="text-emerald-400 font-bold">{product.availableQuantity}</span> available
              </p>
            </div>

            {importQty > product.availableQuantity && (
              <p className="text-red-400 text-sm text-center mb-4">
                Cannot import more than available stock!
              </p>
            )}

            <div className="flex gap-4">
              <button
                onClick={() => {
                  setShowModal(false);
                  setImportQty(1);
                }}
                className="flex-1 bg-white/10 text-gray-400 font-bold py-3 rounded-xl hover:bg-white/20 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleImport}
                disabled={isImportDisabled || importing}
                className={`flex-1 font-bold py-3 rounded-xl transition ${
                  isImportDisabled || importing
                    ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-cyan-500 to-blue-600 text-black hover:shadow-lg transform hover:scale-105"
                }`}
              >
                {importing ? "Importing..." : `Import ${importQty} Unit${importQty > 1 ? "s" : ""}`}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;