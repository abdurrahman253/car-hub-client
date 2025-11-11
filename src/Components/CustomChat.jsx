import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane, FaTimes, FaHeadset } from "react-icons/fa";

const CustomChat = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { text: "Welcome to CARHUB! How can we help you with EV import/export?", sender: "bot" }
  ]);

  const sendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { text: message, sender: "user" }]);
      setMessage("");
      setTimeout(() => {
        setMessages(prev => [...prev, { text: "Our team will contact you soon!", sender: "bot" }]);
      }, 1000);
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 group flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold px-6 py-4 rounded-full shadow-2xl shadow-cyan-500/70 hover:shadow-cyan-500/90 transition-all duration-300 z-[9999]"
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
          className="fixed bottom-24 right-6 w-96 h-96 bg-slate-900/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-cyan-500/30 flex flex-col z-[9998]"
          style={{ pointerEvents: "auto" }}
        >
          <div className="p-4 border-b border-cyan-500/30 flex justify-between items-center">
            <h3 className="font-bold text-white">CARHUB Support</h3>
            <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-white p-1">
              <FaTimes />
            </button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-xs px-4 py-2 rounded-2xl text-sm ${msg.sender === "user" ? "bg-cyan-500 text-black" : "bg-white/10 text-gray-300"}`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-cyan-500/30 flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message..."
              className="flex-1 bg-white/10 text-white placeholder-gray-500 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            <button onClick={sendMessage} className="bg-cyan-500 text-black p-3 rounded-xl hover:bg-cyan-400 transition">
              <FaPaperPlane />
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default CustomChat;