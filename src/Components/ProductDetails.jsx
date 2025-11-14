import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaStar, FaMapMarkerAlt, FaBoxOpen, FaTachometerAlt, FaCog, FaGasPump, FaCalendarAlt, FaChair, FaDoorClosed, FaCogs, FaPalette, FaUser, FaPhone, FaEnvelope, FaCheckCircle } from "react-icons/fa";
import toast from "react-hot-toast";
import { AuthContext } from "../Provider/AuthProvider";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [importQty, setImportQty] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [importing, setImporting] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  useEffect(() => {
    const fetchProduct = async () => {
      if (!user) {
        setLoading(false);
        toast.error("Please login to view product details");
        return;
      }

      try {
        const token = await user.getIdToken();
        const res = await fetch(`https://car-hub-server-rlpm.vercel.app/products/${id}`, {
          headers: {
            authorization: `Bearer ${token}`
          }
        });


        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }

        const data = await res.json();

        if (data.success && data.result) {
          setProduct(data.result);
        } else {
          toast.error(data.message || "Failed to load product");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        toast.error("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, user]);


  const handleImport = async () => {
    if (!user) {
      toast.error("Please login to import");
      return;
    }

    if (importQty > product.availableQuantity) {
      toast.error("Not enough stock available");
      return;
    }

    setImporting(true);
    try {
      const token = await user.getIdToken();
      const res = await fetch("https://car-hub-server-rlpm.vercel.app/import-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          productId: product._id,
          importQuantity: Number(importQty)
        })
      });

      const data = await res.json();

      if (data.success) {
        toast.success(`Imported ${importQty} unit(s)!`);

        // Update Product UI
        setProduct(prev => ({
          ...prev,
          availableQuantity: prev.availableQuantity - importQty
        }));

        
        if (typeof window !== 'undefined') {
          const event = new CustomEvent('importAdded', {
            detail: {
              _id: data.importId,
              productImage: product.productImage,
              productName: product.productName,
              price: product.price,
              originCountry: product.originCountry,
              rating: product.rating,
              importedQuantity: importQty,
              productId: product._id
            }
          });
          window.dispatchEvent(event);
        }

        setShowModal(false);
        setImportQty(1);
      } else {
        toast.error(data.message || "Import failed");
      }
    } catch (err) {
      console.error("Import error:", err);
      toast.error("Import failed");
    } finally {
      setImporting(false);
    }
  };




  if (loading) {
   return (
  <div className="min-h-screen bg-gradient-to-br from-gray-100 dark:from-slate-950 via-white dark:via-black to-gray-100 dark:to-slate-900 flex items-center justify-center">
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
      <div className="min-h-screen bg-gradient-to-br from-gray-100 dark:from-slate-950 via-white dark:via-black to-gray-100 dark:to-slate-900 flex items-center justify-center">
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
        className="min-h-screen bg-gradient-to-br from-gray-100 dark:from-slate-950 via-white dark:via-black to-gray-100 dark:to-slate-900 text-black dark:text-white py-12 px-6"
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
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-black dark:from-white via-cyan-300 to-black dark:to-white">
              {product.productName}
            </h1>
            <div className="flex items-center justify-center gap-2 mt-4">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className={`text-lg ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-600"}`} />
              ))}
              <span className="ml-2 text-gray-600 dark:text-gray-400">({product.rating})</span>
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
                <div className="absolute inset-0 bg-gradient-to-t from-white/70 dark:from-black/70 via-transparent to-transparent opacity-70" />
                <div className="absolute bottom-6 left-6 text-black dark:text-white">
                  <p className="text-4xl font-black">${product.price.toLocaleString()}</p>
                  <p className="text-sm text-cyan-300">Ex-Factory Price</p>
                </div>
              </div>

              {/* Quick Specs Grid */}
              <div className="grid grid-cols-3 gap-5 md:gap-8 max-w-3xl">
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
                    className="bg-gray-100/5 dark:bg-white/5 backdrop-blur-2xl border border-gray-300/10 dark:border-white/10 rounded-3xl p-6 md:p-8 text-center hover:bg-gray-100/10 dark:hover:bg-white/10 hover:border-cyan-400/50 transition-all duration-500 hover:-translate-y-3 shadow-xl"
                  >
                    <div className="text-cyan-400 text-xl mb-2">{spec.icon}</div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{spec.label}</p>
                    <p className="font-bold text-sm text-black dark:text-white">{spec.value}</p>
                  </motion.div>
                ))}
              </div>

              {/* Description */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-gray-100/50 dark:from-slate-800/50 to-white/50 dark:to-black/50 backdrop-blur-xl rounded-3xl p-8 border border-cyan-500/20"
              >
                <h3 className="text-2xl font-bold mb-4 text-cyan-300">Vehicle Overview</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{product.description}</p>
              </motion.div>
            </motion.div>

            {/* Import Card */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-1"
            >
              <div className="bg-gradient-to-br from-gray-100/90 dark:from-slate-900/90 via-white/90 dark:via-black/90 to-gray-100/90 dark:to-slate-900/90 backdrop-blur-2xl rounded-3xl p-8 border border-cyan-500/30 shadow-2xl sticky top-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Available Stock</p>
                    <p className="text-3xl font-black text-emerald-400">{product.availableQuantity}</p>
                  </div>
                  <FaBoxOpen className="text-4xl text-emerald-400" />
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Color</span>
                    <span className="font-bold flex items-center gap-2">
                      <FaPalette className="text-cyan-400" /> {product.color}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Seats / Doors</span>
                    <span className="font-bold flex items-center gap-2">
                      <FaChair className="text-cyan-400" /> {product.seats} / <FaDoorClosed className="text-cyan-400" /> {product.doors}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Engine</span>
                    <span className="font-bold text-black dark:text-white">{product.engine}</span>
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
            className="bg-gradient-to-br from-gray-100 dark:from-slate-900 via-white dark:via-black to-gray-100 dark:to-slate-900 rounded-3xl p-8 max-w-md w-full border border-cyan-500/30 shadow-2xl"
          >
            <h3 className="text-2xl font-bold text-cyan-400 mb-4 text-center">Import Quantity</h3>
            <div className="mb-6">
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">How many units to import?</label>
              <input
                type="number"
                min="1"
                max={product.availableQuantity}
                value={importQty}
                onChange={(e) => setImportQty(Math.max(1, Math.min(product.availableQuantity, Number(e.target.value))))}
                className="w-full bg-gray-100/10 dark:bg-white/10 text-black dark:text-white placeholder-gray-500 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 text-center">
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
                className="flex-1 bg-gray-100/10 dark:bg-white/10 text-gray-600 dark:text-gray-400 font-bold py-3 rounded-xl hover:bg-gray-100/20 dark:hover:bg-white/20 transition"
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