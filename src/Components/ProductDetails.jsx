// src/Pages/ProductDetails.jsx
import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaStar,
  FaMapMarkerAlt,
  FaBoxOpen,
  FaTachometerAlt,
  FaCog,
  FaGasPump,
  FaCalendarAlt,
  FaChair,
  FaDoorClosed,
  FaCogs,
  FaPalette,
  FaCheckCircle,
  FaCar,
  FaBatteryFull,
  FaBolt, 
  FaCarBattery
} from "react-icons/fa";
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
          headers: { authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch product");

        const data = await res.json();

        if (data.success && data.result) {
          setProduct(data.result);
        } else {
          toast.error(data.message || "Product not found");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        toast.error("Failed to load product details");
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
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: product._id,
          importQuantity: Number(importQty),
        }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success(`Successfully imported ${importQty} unit(s)!`);

        setProduct((prev) => ({
          ...prev,
          availableQuantity: prev.availableQuantity - importQty,
        }));

        // Trigger global import update
        window.dispatchEvent(
          new CustomEvent("importAdded", {
            detail: {
              _id: data.importId,
              productImage: product.productImage,
              productName: product.productName,
              price: product.price,
              originCountry: product.originCountry,
              rating: product.rating,
              importedQuantity: importQty,
              productId: product._id,
            },
          })
        );

        setShowModal(false);
        setImportQty(1);
      } else {
        toast.error(data.message || "Import failed");
      }
    } catch (err) {
      console.error("Import error:", err);
      toast.error("Import failed. Try again.");
    } finally {
      setImporting(false);
    }
  };

  // Loading State
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-base-200">
        <div className="relative">
          <div className="w-20 h-20 border-8 rounded-full border-cyan-500/20 animate-ping"></div>
          <div className="absolute top-0 w-20 h-20 border-8 rounded-full border-t-cyan-400 border-r-blue-500 border-b-purple-500 border-l-cyan-600 animate-spin"></div>
          <FaCar className="absolute text-4xl -translate-x-1/2 -translate-y-1/2 text-cyan-400 top-1/2 left-1/2 animate-pulse" />
        </div>
      </div>
    );
  }

  // Not Found
  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-base-200">
        <div className="text-center">
          <h2 className="mb-6 text-4xl font-bold text-red-400">Product Not Found</h2>
          <Link
            to="/inventory"
            className="inline-block px-8 py-4 text-lg font-bold text-white transition transform bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl hover:shadow-xl hover:shadow-cyan-500/50 hover:scale-105"
          >
            Back to Inventory
          </Link>
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
        className="min-h-screen px-4 py-12 md:py-20 bg-base-200"
      >
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <motion.div
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <p className="mb-3 text-sm font-bold tracking-widest uppercase text-cyan-400">
              Premium Import • {product.originCountry}
            </p>
            <h1 className="text-5xl font-black leading-tight text-transparent md:text-7xl bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
              {product.productName}
            </h1>
            <div className="flex items-center justify-center gap-2 mt-6">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`text-2xl ${
                    i < Math.floor(product.rating)
                      ? "text-yellow-400 drop-shadow-lg"
                      : "text-base-content/30"
                  }`}
                />
              ))}
              <span className="ml-3 text-lg font-medium text-base-content/70">
                {product.rating} / 5.0
              </span>
            </div>
          </motion.div>

          <div className="grid gap-10 lg:grid-cols-3">
            {/* Main Image + Specs */}
            <motion.div
              initial={{ x: -60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-10 lg:col-span-2"
            >
              {/* Hero Image */}
              <div className="relative overflow-hidden shadow-2xl rounded-3xl group">
                <img
                  src={product.productImage}
                  alt={product.productName}
                  className="object-cover w-full transition-transform duration-1000 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute text-white bottom-8 left-8">
                  <p className="text-5xl font-black drop-shadow-2xl">
                    ${product.price.toLocaleString()}
                  </p>
                  <p className="text-lg font-medium text-cyan-300">Ex-Factory Price</p>
                </div>
              </div>

              {/* Quick Specs */}
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
  {[
    { icon: <FaTachometerAlt className="text-2xl" />, label: "Mileage", value: product.mileage || "N/A" },
    { icon: <FaCog className="text-2xl" />, label: "Transmission", value: product.transmission || "Auto" },
    { icon: <FaGasPump className="text-2xl" />, label: "Fuel Type", value: product.fuelType || "Electric" },
    { icon: <FaCalendarAlt className="text-2xl" />, label: "Model Year", value: product.year || "2025" },
    { icon: <FaCogs className="text-2xl" />, label: "Performance", value: product.performance || "0-100 in 3.2s" },
    { icon: <FaBatteryFull className="text-2xl" />, label: "Range", value: product.range || "520 km" },
    { icon: <FaBolt className="text-2xl" />, label: "Power", value: product.power || "800 HP" },
    { icon: <FaCarBattery className="text-2xl" />, label: "Battery", value: product.battery || "100 kWh" },
  ].map((spec, i) => (
    <motion.div
      key={i}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: i * 0.08 }}
      viewport={{ once: true }}
      whileHover={{ 
        scale: 1.08, 
        y: -12,
        rotate: [0, -3, 3, 0],
        transition: { duration: 0.4 }
      }}
      className="relative p-6 overflow-hidden text-center transition-all duration-500 border shadow-2xl group rounded-3xl bg-gradient-to-br from-base-100/90 via-base-200/80 to-base-100/90 dark:from-base-300/80 dark:via-base-200/90 dark:to-base-300/80 backdrop-blur-2xl border-base-300/40 dark:border-base-700/50 hover:shadow-3xl hover:shadow-cyan-500/40"
    >
      {/* Glow Background on Hover */}
      <div className="absolute inset-0 transition-opacity duration-700 opacity-0 -z-10 bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-purple-600/20 group-hover:opacity-100 blur-3xl" />

      {/* Icon with Gradient */}
      <div className="relative flex justify-center mb-4">
        <div className="p-4 transition-transform duration-300 border rounded-full shadow-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/20 dark:from-cyan-400/20 dark:to-purple-600/20 backdrop-blur-md border-cyan-500/30 dark:border-cyan-400/30 group-hover:scale-110">
          <div className="text-cyan-500 dark:text-cyan-300 group-hover:text-cyan-400">
            {spec.icon}
          </div>
        </div>
      </div>

      {/* Label */}
      <p className="text-xs font-medium tracking-wider uppercase text-base-content/60 dark:text-base-content/50">
        {spec.label}
      </p>

      {/* Value */}
      <p className="mt-2 text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-base-content to-cyan-600 dark:from-white dark:to-cyan-400">
        {spec.value}
      </p>
    </motion.div>
  ))}
</div>

              {/* Description */}
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="p-8 border bg-base-100/70 dark:bg-base-200/60 backdrop-blur-xl rounded-3xl border-base-300/50"
              >
                <h3 className="mb-5 text-2xl font-bold text-cyan-400">Vehicle Overview</h3>
                <p className="leading-relaxed text-base-content/80">
                  {product.description || "Premium electric vehicle with cutting-edge technology and exceptional performance."}
                </p>
              </motion.div>
            </motion.div>

            {/* Import Card */}
             <motion.div
  initial={{ x: 80, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
  className="lg:col-span-1"
>
  <div className="sticky top-6 p-8 md:p-10 space-y-8 border-2 shadow-2xl bg-base-100/95 dark:bg-base-200/95 backdrop-blur-2xl rounded-3xl border-cyan-500/40 dark:border-cyan-400/50 hover:border-cyan-500 dark:hover:border-cyan-300 transition-all duration-500">
    
    {/* Stock Header */}
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium tracking-wider text-base-content/60 uppercase">
          Available Stock
        </p>
        <p className="text-5xl md:text-6xl font-black bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent drop-shadow-lg">
          {product.availableQuantity}
        </p>
      </div>
      <div className="p-4 rounded-full bg-emerald-500/10 dark:bg-emerald-400/20 border border-emerald-500/30 dark:border-emerald-400/40">
        <FaBoxOpen className="text-5xl text-emerald-500 dark:text-emerald-400" />
      </div>
    </div>

    {/* Key Details */}
    <div className="space-y-6 py-4">
      <div className="flex items-center justify-between group">
        <span className="text-base-content/70 dark:text-base-content/60 font-medium">Exterior Color</span>
        <span className="flex items-center gap-3 font-bold text-base-content dark:text-base-content group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition">
          <FaPalette className="text-xl text-cyan-500 dark:text-cyan-400" />
          {product.color || "Premium Metallic"}
        </span>
      </div>

      <div className="flex items-center justify-between group">
        <span className="text-base-content/70 dark:text-base-content/60 font-medium">Seating / Doors</span>
        <span className="flex items-center gap-3 font-bold text-base-content dark:text-base-content group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition">
          <FaChair className="text-xl text-cyan-500 dark:text-cyan-400" />
          {product.seats || "5"}
          <span className="text-base-content/50 mx-1">/</span>
          <FaDoorClosed className="text-xl text-cyan-500 dark:text-cyan-400" />
          {product.doors || "4"}
        </span>
      </div>

      <div className="flex items-center justify-between group">
        <span className="text-base-content/70 dark:text-base-content/60 font-medium">Powertrain</span>
        <span className="font-bold text-base-content dark:text-base-content group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition">
          {product.engine || "Dual Electric Motors"}
        </span>
      </div>
    </div>

    {/* Import Button */}
    <button
      onClick={() => setShowModal(true)}
      className="relative w-full overflow-hidden group/btn py-6 text-2xl font-bold text-white rounded-2xl shadow-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:shadow-cyan-500/60 transform hover:scale-105 transition-all duration-500"
    >
      <span className="relative z-10 flex items-center justify-center gap-3">
        <FaCheckCircle className="text-3xl" />
        Import Now
      </span>
      {/* Animated Shine */}
      <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full bg-white/20 transition-transform duration-1000 skew-x-12" />
    </button>

    {/* Footer Note */}
    <div className="pt-6 text-center border-t border-base-300/50 dark:border-base-700/50">
      <p className="text-xs font-medium text-base-content/60 dark:text-base-content/50 tracking-wider">
        Secure Global Import • Real-Time Inventory • Duty Assistance Available
      </p>
    </div>
  </div>
</motion.div>
          </div>
        </div>
      </motion.section>

      {/* Import Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/70 backdrop-blur-md">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-md p-8 border shadow-2xl bg-base-200 dark:bg-base-300 rounded-3xl border-cyan-500/50"
          >
            <h3 className="mb-6 text-3xl font-bold text-center text-cyan-400">
              Import Quantity
            </h3>

            <div className="mb-8">
              <label className="block mb-3 text-lg font-medium text-base-content/80">
                How many units?
              </label>
              <input
                type="number"
                min="1"
                max={product.availableQuantity}
                value={importQty}
                onChange={(e) =>
                  setImportQty(
                    Math.max(1, Math.min(product.availableQuantity, Number(e.target.value) || 1))
                  )
                }
                className="w-full px-6 py-4 text-xl text-center transition border-2 bg-base-100 dark:bg-base-200 border-base-300 rounded-2xl focus:border-cyan-500 focus:outline-none"
              />
              <p className="mt-4 text-sm text-center text-base-content/60">
                Maximum available: <strong className="text-emerald-500">{product.availableQuantity}</strong>
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  setShowModal(false);
                  setImportQty(1);
                }}
                className="flex-1 py-4 font-bold transition bg-base-300/70 hover:bg-base-300 rounded-2xl"
              >
                Cancel
              </button>
              <button
                onClick={handleImport}
                disabled={isImportDisabled || importing}
                className={`flex-1 py-4 font-bold text-white rounded-2xl transition-all ${
                  isImportDisabled || importing
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-cyan-500 to-blue-600 hover:shadow-xl hover:shadow-cyan-500/50 hover:scale-105"
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