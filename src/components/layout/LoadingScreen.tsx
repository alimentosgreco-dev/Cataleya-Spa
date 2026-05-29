"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { siteConfig } from "@/data/navigation";

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          role="status"
          aria-label="Cargando sitio"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="relative mb-6">
              <div className="h-20 w-20 rounded-full border-2 border-purple/20" />
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-transparent border-t-purple border-r-olive"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </div>
            <p className="font-display text-2xl font-semibold gradient-text">
              {siteConfig.shortName}
            </p>
            <p className="mt-2 text-sm text-gray-text">Beauty & Spa</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
