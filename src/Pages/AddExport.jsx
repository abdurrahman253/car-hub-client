// src/pages/AddExport.jsx
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { FaCar, FaDollarSign, FaStar, FaGlobe, FaBoxes, FaPlus } from 'react-icons/fa';

const AddExport = () => {
  const { user, setMyExports } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login to add export");
      return;
    }

    const form = e.target;
    const productName = form.productName.value.trim();
    const productImage = form.productImage.value.trim();
    const price = parseInt(form.price.value);
    const originCountry = form.originCountry.value.trim();
    const rating = parseFloat(form.rating.value);
    const availableQuantity = parseInt(form.availableQuantity.value);

    // Validation
    if (!productName || !productImage || !price || !originCountry || !rating || !availableQuantity) {
      toast.error("All fields are required");
      return;
    }
    if (price < 0 || availableQuantity < 0 || rating < 0 || rating > 5) {
      toast.error("Invalid values");
      return;
    }

    const newProduct = {
      productName,
      productImage,
      price,
      originCountry,
      rating,
      availableQuantity,
      mileage: form.mileage.value || "N/A",
      transmission: form.transmission.value || "Automatic",
      fuelType: form.fuelType.value || "Gasoline",
      year: parseInt(form.year.value) || new Date().getFullYear(),
      performance: form.performance.value || "N/A",
      color: form.color.value || "N/A",
      seats: parseInt(form.seats.value) || 5,
      doors: parseInt(form.doors.value) || 4,
      engine: form.engine.value || "N/A",
      description: form.description.value || "Premium export vehicle.",
      createdAt: new Date().toISOString(),
      createdBy: user.email
    };

    setLoading(true);
    try {
      const token = await user.getIdToken();
      const res = await fetch('http://localhost:5000/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newProduct)
      });

      const data = await res.json();
      if (data.success) {
        // Real-time update
        const addedProduct = { ...newProduct, _id: data.insertedId };
        setMyExports(prev => [...prev, addedProduct]);

        toast.success("Export added successfully!");
        form.reset();
        navigate('/my-exports');
      } else {
        toast.error(data.message || "Failed to add");
      }
    } catch (err) {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-black to-slate-900">
        <p className="text-xl text-cyan-400">Login required to add export</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-black to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: -0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-300 to-white">
            Add <span className="text-primary">Export</span>
          </h1>
          <p className="mt-3 text-gray-400">List your premium vehicle for global export</p>
        </div>

        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          className="bg-gradient-to-br from-slate-900/90 via-black/90 to-slate-900/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 md:p-10 border border-cyan-500/30 shadow-2xl"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Name */}
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-cyan-300 mb-2">
                <FaCar /> Product Name
              </label>
              <input
                type="text"
                name="productName"
                required
                className="w-full px-4 py-3 bg-white/10 border border-cyan-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition"
                placeholder="e.g., Mercedes-Benz S-Class"
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-cyan-300 mb-2">
                Product Image URL
              </label>
              <input
                type="url"
                name="productImage"
                required
                className="w-full px-4 py-3 bg-white/10 border border-cyan-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition"
                placeholder="https://example.com/car.jpg"
              />
            </div>

            {/* Price & Origin */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-cyan-300 mb-2">
                  <FaDollarSign /> Price (USD)
                </label>
                <input
                  type="number"
                  name="price"
                  required
                  min="0"
                  className="w-full px-4 py-3 bg-white/10 border border-cyan-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition"
                  placeholder="142500"
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-cyan-300 mb-2">
                  <FaGlobe /> Origin Country
                </label>
                <input
                  type="text"
                  name="originCountry"
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-cyan-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition"
                  placeholder="Germany"
                />
              </div>
            </div>

            {/* Rating & Quantity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-cyan-300 mb-2">
                  <FaStar /> Rating (0-5)
                </label>
                <input
                  type="number"
                  name="rating"
                  required
                  min="0"
                  max="5"
                  step="0.1"
                  className="w-full px-4 py-3 bg-white/10 border border-cyan-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition"
                  placeholder="5.0"
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-cyan-300 mb-2">
                  <FaBoxes /> Available Quantity
                </label>
                <input
                  type="number"
                  name="availableQuantity"
                  required
                  min="1"
                  className="w-full px-4 py-3 bg-white/10 border border-cyan-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition"
                  placeholder="7"
                />
              </div>
            </div>

            {/* Optional Specs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="mileage"
                placeholder="Mileage (e.g., 18 mpg)"
                className="w-full px-4 py-3 bg-white/10 border border-cyan-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition"
              />
              <input
                type="text"
                name="transmission"
                placeholder="Transmission"
                className="w-full px-4 py-3 bg-white/10 border border-cyan-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition"
              />
              <input
                type="text"
                name="fuelType"
                placeholder="Fuel Type"
                className="w-full px-4 py-3 bg-white/10 border border-cyan-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition"
              />
              <input
                type="number"
                name="year"
                placeholder="Year"
                className="w-full px-4 py-3 bg-white/10 border border-cyan-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition"
              />
              <input
                type="text"
                name="performance"
                placeholder="Performance"
                className="w-full px-4 py-3 bg-white/10 border border-cyan-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition"
              />
              <input
                type="text"
                name="color"
                placeholder="Color"
                className="w-full px-4 py-3 bg-white/10 border border-cyan-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition"
              />
              <input
                type="number"
                name="seats"
                placeholder="Seats"
                className="w-full px-4 py-3 bg-white/10 border border-cyan-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition"
              />
              <input
                type="number"
                name="doors"
                placeholder="Doors"
                className="w-full px-4 py-3 bg-white/10 border border-cyan-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition"
              />
              <input
                type="text"
                name="engine"
                placeholder="Engine"
                className="w-full px-4 py-3 bg-white/10 border border-cyan-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition"
              />
            </div>

            {/* Description */}
            <div>
              <label className="text-sm font-bold text-cyan-300 mb-2 block">Description</label>
              <textarea
                name="description"
                rows={4}
                className="w-full px-4 py-3 bg-white/10 border border-cyan-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition resize-none"
                placeholder="Luxury sedan with advanced MBUX..."
              />
            </div>

            {/* Submit */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold text-lg py-4 rounded-xl shadow-lg hover:shadow-cyan-500/70 transform transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <FaPlus className="text-xl" />
              {loading ? "Adding Export..." : "Add Export/Product"}
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AddExport;