import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { FaStar, FaMapMarkerAlt, FaBoxes, FaBoxOpen, FaTrash, FaEdit } from 'react-icons/fa';
import { AuthContext } from '../Provider/AuthProvider';

const MyExports = () => {
  const { user, myExports, setMyExports } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [updateModal, setUpdateModal] = useState(null);
  const navigate = useNavigate();


   useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  

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
      const res = await fetch('https://car-hub-server-rlpm.vercel.app/my-exports', {
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
      const res = await fetch(`https://car-hub-server-rlpm.vercel.app/products/${productId}`, {
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
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-base-200 dark:from-base-200 via-base-100 dark:via-base-100 to-base-200 dark:to-base-200">
        <p className="text-xl text-cyan-400">Login to view your exports</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-base-200 dark:from-base-200 via-base-100 dark:via-base-100 to-base-200 dark:to-base-200">
        <div className="w-16 h-16 border-4 rounded-full border-t-cyan-400 border-r-cyan-300 border-b-cyan-500 border-l-cyan-600 animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-12 bg-gradient-to-br from-base-200 dark:from-base-200 via-base-100 dark:via-base-100 to-base-200 dark:to-base-200 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-7xl"
      >
        <h1 className="mb-10 text-4xl font-black text-center text-transparent sm:text-5xl md:text-6xl sm:mb-12 md:mb-16 bg-clip-text bg-gradient-to-r from-base-content dark:from-base-content via-cyan-300 to-base-content dark:to-base-content">
          My <span className="text-primary">Exports</span>
        </h1>

        {myExports.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-20 text-center"
          >
            <p className="mb-6 text-2xl text-base-content/60 dark:text-base-content/60">No exports added yet.</p>
            <button
              onClick={() => navigate('/add-export')}
              className="px-8 py-3 font-bold transition transform bg-gradient-to-r from-cyan-500 to-blue-600 text-base-content rounded-xl hover:shadow-lg hover:shadow-cyan-500/50 hover:scale-105"
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
      className="relative overflow-hidden transition-all duration-500 border shadow-2xl group bg-gradient-to-br from-base-200/80 dark:from-base-200/80 via-base-100/90 dark:via-base-100/90 to-base-200/80 dark:to-base-200/80 backdrop-blur-xl rounded-3xl border-cyan-500/20 hover:shadow-cyan-500/40"
    >
      <div className="aspect-[4/3] relative overflow-hidden">
        <img
          src={productImage}
          alt={productName}
          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
          onError={(e) => e.target.src = "https://via.placeholder.com/600x400/1a1a1a/cccccc?text=No+Image"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-base-100/80 dark:from-base-content/80 via-transparent to-transparent opacity-60 group-hover:opacity-80" />

        <div className="absolute flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-full shadow-lg top-4 left-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-base-content">
          <FaMapMarkerAlt /> {originCountry}
        </div>

        <div className="absolute flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-full shadow-lg top-4 right-4 bg-emerald-600 text-base-content">
          <FaBoxes /> {availableQuantity}
        </div>
      </div>

      <div className="p-6 space-y-4">
        <h3 className="text-xl font-bold text-base-content dark:text-base-content group-hover:text-cyan-300 transition-colors line-clamp-2 min-h-[3.5rem] flex items-center">
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

        <div className="flex gap-3">
          <button
            onClick={() => onUpdate(product)}
            className="flex items-center justify-center flex-1 gap-2 py-3 font-bold transition-all duration-300 transform shadow-lg bg-gradient-to-r from-yellow-500 to-orange-600 text-base-content rounded-xl hover:shadow-yellow-500/50 hover:scale-105"
          >
            <FaEdit /> Update
          </button>
          <button
            onClick={() => onDelete(_id)}
            className="flex items-center justify-center flex-1 gap-2 py-3 font-bold transition-all duration-300 transform shadow-lg bg-gradient-to-r from-red-600 to-red-700 text-base-content rounded-xl hover:shadow-red-500/50 hover:scale-105"
          >
            <FaTrash /> Delete
          </button>
        </div>
      </div>

      <div className="absolute inset-0 transition-opacity opacity-0 rounded-3xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 group-hover:opacity-100 blur-xl -z-10" />
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
      const res = await fetch(`https://car-hub-server-rlpm.vercel.app/products/${product._id}`, {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-base-100/80 dark:bg-base-content/80 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-2xl p-8 border shadow-2xl bg-gradient-to-br from-base-200 dark:from-base-200 via-base-100 dark:via-base-100 to-base-200 dark:to-base-200 rounded-3xl border-cyan-500/30"
      >
        <h3 className="mb-4 text-2xl font-bold text-center text-cyan-300">Update Export</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          {['productName', 'productImage', 'price', 'originCountry', 'rating', 'availableQuantity'].map(field => (
            <div key={field}>
              <label className="block mb-1 text-sm font-bold capitalize text-cyan-300">
                {field.replace(/([A-Z])/g, ' $1').trim()}
              </label>
              <input
                type={field.includes('price') || field.includes('Quantity') || field === 'rating' ? 'number' : 'text'}
                name={field}
                defaultValue={product[field]}
                required
                className="w-full px-4 py-3 transition border bg-base-content/60 dark:bg-base-content/60 border-cyan-500/30 rounded-xl text-base-content dark:text-base-content focus:outline-none focus:border-cyan-400"
              />
            </div>
          ))}
          <div className="flex gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 transition bg-base-content/60 dark:bg-base-content/60 text-base-content/60 dark:text-base-content/60 rounded-xl hover:bg-base-content/60 dark:hover:bg-base-content/60"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 font-bold transition transform bg-gradient-to-r from-cyan-500 to-blue-600 text-base-content rounded-xl hover:shadow-lg hover:scale-105 disabled:opacity-70"
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