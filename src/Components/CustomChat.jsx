import React, { useState } from "react";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane, FaTimes, FaHeadset } from "react-icons/fa";

const CustomChat = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { text: "Welcome to CARHUB! How can we help you with EV import/export?", sender: "bot" }
  ]);

   // Hide Tawk.to widget on mount
  useEffect(() => {
  if (window.Tawk_API) {
    window.Tawk_API.hideWidget();
  }
}, []);



  const sendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { text: message, sender: "user" }]);
      setMessage("");
      setTimeout(() => {
        setMessages(prev => [...prev, { text: "Our team will contact you soon!", sender: "bot" }]);
      }, 1000);
    }
  };

  const openTawk = () => {
  if (window.Tawk_API) {
    window.Tawk_API.toggle();
  }
};

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={openTawk}
        className="fixed bottom-23 right-4 group flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold px-6 py-4 rounded-full shadow-2xl shadow-cyan-500/70 hover:shadow-cyan-500/90 transition-all duration-300 z-[9999]"
        style={{ pointerEvents: "auto" }}
      >
        <FaHeadset className="text-2xl group-hover:animate-pulse" />
        <span>Live Support</span>
        <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
      </button>

      {/* Chat Box */}
      {open && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="fixed bottom-43 left-1/2 -translate-x-1/2 sm:right-6 sm:translate-x-0
          w-96 h-96 bg-gray-100/95 dark:bg-slate-900/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-cyan-500/30 flex flex-col z-[9998]"
          style={{ pointerEvents: "auto" }}
        >
          <div className="flex items-center justify-between p-4 border-b border-cyan-500/30">
            <h3 className="font-bold text-black dark:text-white">CARHUB Support</h3>
            <button onClick={() => setOpen(false)} className="p-1 text-gray-400 hover:text-white">
              <FaTimes />
            </button>
          </div>
          <div className="flex-1 p-4 space-y-3 overflow-y-auto">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-xs px-4 py-2 rounded-2xl text-sm ${msg.sender === "user" ? "bg-cyan-500 text-black" : "bg-gray-200/10 dark:bg-white/10 text-gray-600 dark:text-gray-300"}`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2 p-4 border-t border-cyan-500/30">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 text-sm text-black placeholder-gray-500 bg-gray-200/10 dark:bg-white/10 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            <button onClick={sendMessage} className="p-3 text-black transition bg-cyan-500 rounded-xl hover:bg-cyan-400">
              <FaPaperPlane />
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default CustomChat;