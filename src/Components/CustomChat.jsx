import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaHeadset } from "react-icons/fa";

const CustomChat = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    // Tawk.to widget hide করুন
    const hideTawkBubble = () => {
      if (window.Tawk_API && typeof window.Tawk_API.hideWidget === 'function') {
        window.Tawk_API.hideWidget();
      }

      // DOM elements লুকান (শুধু bubble, chat panel নয়)
      const hideBubbleElements = () => {
        // শুধু bubble container লুকান
        const bubble = document.querySelector('#tawk-bubble-container');
        if (bubble) {
          bubble.style.display = 'none';
          bubble.style.visibility = 'hidden';
        }

        // Minimized button লুকান
        const minContainer = document.querySelector('.tawk-min-container');
        if (minContainer) {
          minContainer.style.display = 'none';
        }
      };

      hideBubbleElements();

      // Observer for continuous hiding
      const observer = new MutationObserver(() => {
        if (!isChatOpen) {
          hideBubbleElements();
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true
      });

      return () => observer.disconnect();
    };

    const cleanup = hideTawkBubble();

    // Tawk load হওয়ার পর hide করুন
    const checkInterval = setInterval(() => {
      if (window.Tawk_API) {
        hideTawkBubble();
        clearInterval(checkInterval);
      }
    }, 200);

    setTimeout(() => clearInterval(checkInterval), 10000);

    return () => {
      clearInterval(checkInterval);
      if (cleanup) cleanup();
    };
  }, [isChatOpen]);

  // Chat open/close করুন
  const toggleTawkChat = () => {
    if (window.Tawk_API) {
      if (isChatOpen) {
        // Close chat
        if (typeof window.Tawk_API.minimize === 'function') {
          window.Tawk_API.minimize();
        }
        setIsChatOpen(false);
        
        // Bubble আবার লুকান
        setTimeout(() => {
          const bubble = document.querySelector('#tawk-bubble-container');
          if (bubble) bubble.style.display = 'none';
        }, 100);
      } else {
        // Open chat
        if (typeof window.Tawk_API.maximize === 'function') {
          window.Tawk_API.maximize();
        }
        setIsChatOpen(true);
      }
    }
  };

  return (
    <>
      {/* Custom Support Button */}
      <motion.button
        onClick={toggleTawkChat}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 group flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold px-6 py-4 rounded-full shadow-2xl shadow-cyan-500/70 hover:shadow-cyan-500/90 transition-all duration-300 z-[9999]"
      >
        <FaHeadset className="text-2xl group-hover:animate-pulse" />
        <span className="hidden sm:inline">Live Support</span>
        <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
      </motion.button>

      {/* Hide Tawk.to bubble but allow chat panel */}
      <style>{`
        /* শুধু bubble/button লুকান */
        #tawk-bubble-container,
        .tawk-min-container,
        .tawk-button-circle {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
        }

        /* Chat panel দেখতে দিন */
        .tawk-chat-panel,
        div[id*="tawk"][class*="panel"],
        iframe[src*="tawk.to"][style*="visible"] {
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
        }
      `}</style>
    </>
  );
};

export default CustomChat;