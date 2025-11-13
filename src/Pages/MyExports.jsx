import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { FaStar, FaMapMarkerAlt, FaBoxes, FaTrash, FaEdit } from 'react-icons/fa';

const MyExports = () => {
  const { user, myExports, setMyExports } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [updateModal, setUpdateModal] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && myExports.length === 0) {
      fetchMyExports();
    } else {
      setLoading(false);
    }
  }, [user, myExports]);

  const fetchMyExports = async () => {
    try {
      const token = await user.getIdToken();
      const res = await fetch('http://localhost:5000/my-exports', {
        headers: { authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setMyExports(data.result);
      }
    } catch (err) {
      toast.error("Failed to load exports");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    if (!confirm("Delete this export?")) return;

    try {
      const token = await user.getIdToken();
      const res = await fetch(`http://localhost:5000/products/${productId}`, {
        method: 'DELETE',
        headers: { authorization: `Bearer ${token}` }
      });
      const data = await res.json();

      if (data.success) {
        setMyExports(prev => prev.filter(p => p._id !== productId));
        toast.success("Export deleted");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const handleUpdate = (product) => {
    setUpdateModal(product);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-black to-slate-900">
        <p className="text-xl text-cyan-400">Login to view your exports</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-black to-slate-900">
        <div className="w-16 h-16 border-4 border-t-cyan-400 border-r-cyan-300 border-b-cyan-500 border-l-cyan-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-black to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-300 to-white">
          My <span className="text-primary">Exports</span>
        </h1>

        {myExports.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-2xl text-gray-400 mb-6">No exports added yet.</p>
            <button
              onClick={() => navigate('/add-export')}
              className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold rounded-xl hover:shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105 transition"
            >
              Add Export
            </button>
          </motion.div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {myExports.map((product, index) => (
              <ExportCard
                key={product._id}
                product={product}
                index={index}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
              />
            ))}
          </div>
        )}
      </motion.div>

      {/* Update Modal */}
      {updateModal && (
        <UpdateModal
          product={updateModal}
          onClose={() => setUpdateModal(null)}
          onUpdate={(updated) => {
            setMyExports(prev => prev.map(p => p._id === updated._id ? updated : p));
            setUpdateModal(null);
          }}
        />
      )}
    </div>
  );
};

// Export Card
const ExportCard = ({ product, index, onDelete, onUpdate }) => {
  const {
    _id,
    productImage,
    productName,
    price,
    originCountry,
    rating,
    availableQuantity
  } = product;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -12, scale: 1.02 }}
      className="group relative bg-gradient-to-br from-slate-900/80 via-black/90 to-slate-900/80 backdrop-blur-xl rounded-3xl overflow-hidden border border-cyan-500/20 shadow-2xl hover:shadow-cyan-500/40 transition-all duration-500"
    >
      <div className="aspect-[4/3] relative overflow-hidden">
        <img
          src={productImage}
          alt={productName}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          onError={(e) => e.target.src = "https://via.placeholder.com/600x400/1a1a1a/cccccc?text=No+Image"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80" />

        <div className="absolute top-4 left-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
          <FaMapMarkerAlt /> {originCountry}
        </div>

        <div className="absolute top-4 right-4 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
          <FaBoxes /> {availableQuantity}
        </div>
      </div>

      <div className="p-6 space-y-4">
        <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2">
          {productName}
        </h3>

        <div className="flex items-center justify-between">
          <p className="text-3xl font-black text-cyan-400">${price.toLocaleString()}</p>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className={`text-sm ${i < Math.floor(rating) ? "text-yellow-400" : "text-gray-600"}`} />
            ))}
            <span className="ml-1 text-xs text-gray-400">({rating})</span>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => onUpdate(product)}
            className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-600 text-black font-bold py-3 rounded-xl shadow-lg hover:shadow-yellow-500/50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <FaEdit /> Update
          </button>
          <button
            onClick={() => onDelete(_id)}
            className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-red-500/50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <FaTrash /> Delete
          </button>
        </div>
      </div>

      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity blur-xl -z-10" />
    </motion.div>
  );
};

// Update Modal
const UpdateModal = ({ product, onClose, onUpdate }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const updated = {
      productName: e.target.productName.value,
      productImage: e.target.productImage.value,
      price: parseInt(e.target.price.value),
      originCountry: e.target.originCountry.value,
      rating: parseFloat(e.target.rating.value),
      availableQuantity: parseInt(e.target.availableQuantity.value),
    };

    try {
      const token = await user.getIdToken();
      const res = await fetch(`http://localhost:5000/products/${product._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updated)
      });
      const data = await res.json();

      if (data.success) {
        onUpdate({ ...product, ...updated });
        toast.success("Updated successfully");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gradient-to-br from-slate-900 via-black to-slate-900 rounded-3xl p-8 max-w-2xl w-full border border-cyan-500/30 shadow-2xl"
      >
        <h3 className="text-2xl font-bold text-cyan-300 mb-6 text-center">Update Export</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          {['productName', 'productImage', 'price', 'originCountry', 'rating', 'availableQuantity'].map(field => (
            <div key={field}>
              <label className="block text-sm font-bold text-cyan-300 mb-1 capitalize">
                {field.replace(/([A-Z])/g, ' $1').trim()}
              </label>
              <input
                type={field.includes('price') || field.includes('Quantity') || field === 'rating' ? 'number' : 'text'}
                name={field}
                defaultValue={product[field]}
                required
                className="w-full px-4 py-3 bg-white/10 border border-cyan-500/30 rounded-xl text-white focus:outline-none focus:border-cyan-400 transition"
              />
            </div>
          ))}
          <div className="flex gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-white/10 text-gray-400 py-3 rounded-xl hover:bg-white/20 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition disabled:opacity-70"
            >
              {loading ? "Updating..." : "Submit"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default MyExports;