"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SplashAnimation({ children }: { children: React.ReactNode }) {
  const [showIntro, setShowIntro] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const hasSeenIntro = sessionStorage.getItem("introSeen");
    if (hasSeenIntro) {
      setShowIntro(false);
    } else {
      // Hide intro after animation finishes (2.2 seconds)
      const timer = setTimeout(() => {
        setShowIntro(false);
      }, 2200);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!isClient) return null; // Prevent hydration mismatch

  return (
    <>
      <AnimatePresence onExitComplete={() => sessionStorage.setItem("introSeen", "true")}>
        {showIntro && (
          <motion.div
            key="splash"
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center pointer-events-none"
            style={{ background: "#080B12" }}
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.03 }}
            transition={{ duration: 0.5, ease: "easeIn", delay: 1.6 }}
          >
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-4">
                {/* Logo Mark */}
                <motion.img
                  src="/logo.png"
                  alt="DAL Logo"
                  className="w-12 h-12 rounded-[10px]"
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", duration: 0.4, delay: 0.2 }}
                />
                
                {/* Wordmark */}
                <motion.div
                  className="text-2xl font-semibold"
                  style={{ fontFamily: "Outfit, sans-serif", color: "#F1EEE8" }}
                  initial={{ x: -12, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ ease: "easeOut", duration: 0.38, delay: 0.5 }}
                >
                  Data Analyst Launchpad
                </motion.div>
              </div>

              {/* Tagline */}
              <motion.div
                className="mt-4 text-[14px]"
                style={{ color: "#7A8499" }}
                initial={{ y: 8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.32, delay: 0.9 }}
              >
                Your roadmap to a data career.
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={showIntro ? { opacity: 0 } : { opacity: 1 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: showIntro ? 2.1 : 0 }}
      >
        {children}
      </motion.div>
    </>
  );
}
