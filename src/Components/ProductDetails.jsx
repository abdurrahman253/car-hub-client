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

        // Dispatch event for real-time update
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
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-base-200 dark:from-base-200 via-base-100 dark:via-base-100 to-base-200 dark:to-base-200">
    <div className="relative">
      {/* Outer Ring */}
      <div className="w-16 h-16 border-4 rounded-full border-cyan-500/30 animate-ping"></div>
      
      {/* Inner Spinner */}
      <div className="absolute top-0 left-0 w-16 h-16 border-4 rounded-full border-t-cyan-400 border-r-cyan-300 border-b-cyan-500 border-l-cyan-600 animate-spin"></div>
      
      {/* Center Glow */}
      <div className="absolute w-4 h-4 transform -translate-x-1/2 -translate-y-1/2 rounded-full shadow-lg top-1/2 left-1/2 bg-cyan-400 animate-pulse shadow-cyan-400/50"></div>
    </div>
  </div>
);
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-base-200 dark:from-base-200 via-base-100 dark:via-base-100 to-base-200 dark:to-base-200">
        <div className="text-center">
          <h2 className="mb-4 text-3xl font-bold text-red-400">Product Not Found</h2>
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
        className="min-h-screen px-6 py-12 bg-gradient-to-br from-base-200 dark:from-base-200 via-base-100 dark:via-base-100 to-base-200 dark:to-base-200 text-base-content dark:text-base-content"
      >
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-12 text-center"
          >
            <p className="mb-2 text-sm font-bold tracking-widest uppercase text-cyan-400">
              Premium Import • {product.originCountry}
            </p>
            <h1 className="text-5xl font-black text-transparent sm:text-6xl lg:text-7xl bg-clip-text bg-gradient-to-r from-base-content dark:from-base-content via-cyan-300 to-base-content dark:to-base-content">
              {product.productName}
            </h1>
            <div className="flex items-center justify-center gap-2 mt-4">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className={`text-lg ${i < Math.floor(rating) ? "text-yellow-400" : "text-base-content/60"}`} />
              ))}
              <span className="ml-2 text-base-content/60 dark:text-base-content/60">({product.rating})</span>
            </div>
          </motion.div>

          <div className="grid gap-10 lg:grid-cols-3">
            {/* Image + Quick Specs */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-8 lg:col-span-2"
            >
              {/* Main Image */}
              <div className="relative overflow-hidden shadow-2xl rounded-3xl group">
                <img
                  src={product.productImage}
                  alt={product.productName}
                  className="object-cover w-full h-auto transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-base-100/70 dark:from-base-content/70 via-transparent to-transparent opacity-70" />
                <div className="absolute bottom-6 left-6 text-base-content dark:text-base-content">
                  <p className="text-4xl font-black">${product.price.toLocaleString()}</p>
                  <p className="text-sm text-cyan-300">Ex-Factory Price</p>
                </div>
              </div>

              {/* Quick Specs Grid */}
              <div className="grid max-w-3xl grid-cols-3 gap-5 md:gap-8">
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
                    className="p-6 text-center transition-all duration-500 border shadow-xl bg-base-content/60 dark:bg-base-content/60 backdrop-blur-2xl border-base-content/60 dark:border-base-content/60 rounded-3xl md:p-8 hover:bg-base-content/60 dark:hover:bg-base-content/60 hover:border-cyan-400/50 hover:-translate-y-3"
                  >
                    <div className="mb-2 text-xl text-cyan-400">{spec.icon}</div>
                    <p className="text-xs text-base-content/60 dark:text-base-content/60">{spec.label}</p>
                    <p className="text-sm font-bold text-base-content dark:text-base-content">{spec.value}</p>
                  </motion.div>
                ))}
              </div>

              {/* Description */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="p-8 border bg-gradient-to-br from-base-200/50 dark:from-base-200/50 to-base-100/50 dark:to-base-content/50 backdrop-blur-xl rounded-3xl border-cyan-500/20"
              >
                <h3 className="mb-4 text-2xl font-bold text-cyan-300">Vehicle Overview</h3>
                <p className="leading-relaxed text-base-content/60 dark:text-base-content/60">{product.description}</p>
              </motion.div>
            </motion.div>

            {/* Import Card */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-1"
            >
              <div className="sticky p-8 border shadow-2xl bg-gradient-to-br from-base-200/90 dark:from-base-200/90 via-base-100/90 dark:via-base-100/90 to-base-200/90 dark:to-base-200/90 backdrop-blur-2xl rounded-3xl border-cyan-500/30 top-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-sm text-base-content/60 dark:text-base-content/60">Available Stock</p>
                    <p className="text-3xl font-black text-emerald-400">{product.availableQuantity}</p>
                  </div>
                  <FaBoxOpen className="text-4xl text-emerald-400" />
                </div>

                <div className="mb-8 space-y-4">
                  <div className="flex justify-between">
                    <span className="text-base-content/60 dark:text-base-content/60">Color</span>
                    <span className="flex items-center gap-2 font-bold">
                      <FaPalette className="text-cyan-400" /> {product.color}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-base-content/60 dark:text-base-content/60">Seats / Doors</span>
                    <span className="flex items-center gap-2 font-bold">
                      <FaChair className="text-cyan-400" /> {product.seats} / <FaDoorClosed className="text-cyan-400" /> {product.doors}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-base-content/60 dark:text-base-content/60">Engine</span>
                    <span className="font-bold text-base-content dark:text-base-content">{product.engine}</span>
                  </div>
                </div>

                {/* Import Now Button */}
                <button
                  onClick={() => setShowModal(true)}
                  className="flex items-center justify-center w-full gap-3 py-4 text-lg font-bold transition-all duration-300 transform shadow-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-base-content rounded-xl hover:shadow-cyan-500/70 hover:scale-105"
                >
                  <FaCheckCircle /> Import Now
                </button>

                <p className="mt-4 text-xs text-center text-base-content/60">
                  Secure global import • Duty calculation available
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Import Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-base-content/80 backdrop-blur-md">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-md p-8 border shadow-2xl bg-gradient-to-br from-base-200 dark:from-base-200 via-base-100 dark:via-base-100 to-base-200 dark:to-base-200 rounded-3xl border-cyan-500/30"
          >
            <h3 className="mb-4 text-2xl font-bold text-center text-cyan-400">Import Quantity</h3>
            <div className="mb-6">
              <label className="block mb-2 text-sm text-base-content/60 dark:text-base-content/60">How many units to import?</label>
              <input
                type="number"
                min="1"
                max={product.availableQuantity}
                value={importQty}
                onChange={(e) => setImportQty(Math.max(1, Math.min(product.availableQuantity, Number(e.target.value))))}
                className="w-full px-4 py-2 text-sm bg-base-content/60 dark:bg-base-content/60 text-base-content dark:text-base-content placeholder-base-content/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              <p className="mt-2 text-xs text-center text-base-content/60 dark:text-base-content/60">
                Max: <span className="font-bold text-emerald-400">{product.availableQuantity}</span> available
              </p>
            </div>

            {importQty > product.availableQuantity && (
              <p className="mb-4 text-sm text-center text-red-400">
                Cannot import more than available stock!
              </p>
            )}

            <div className="flex gap-4">
              <button
                onClick={() => {
                  setShowModal(false);
                  setImportQty(1);
                }}
                className="flex-1 py-3 transition bg-base-content/60 dark:bg-base-content/60 text-base-content/60 dark:text-base-content/60 rounded-xl hover:bg-base-content/60 dark:hover:bg-base-content/60"
              >
                Cancel
              </button>
              <button
                onClick={handleImport}
                disabled={isImportDisabled || importing}
                className={`flex-1 font-bold py-3 rounded-xl transition ${
                  isImportDisabled || importing
                    ? "bg-base-content/60 text-base-content/60 cursor-not-allowed"
                    : "bg-gradient-to-r from-cyan-500 to-blue-600 text-base-content hover:shadow-lg transform hover:scale-105"
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