"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Calendar } from "lucide-react";
import { scrollToSection } from "@/lib/utils";

export function StickyMobileCTA() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [300, 500], [0, 1]);
  const y = useTransform(scrollY, [300, 500], [20, 0]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="fixed bottom-0 left-0 right-0 z-40 p-4 md:hidden pointer-events-none"
      aria-hidden={false}
    >
      <button
        type="button"
        onClick={() => scrollToSection("reservar")}
        className="pointer-events-auto flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-purple to-purple-dark py-4 text-base font-semibold text-white shadow-2xl shadow-purple/40 shine-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-olive focus-visible:ring-offset-2"
        aria-label="Reservar cita ahora"
      >
        <Calendar className="h-5 w-5" aria-hidden />
        Reservar Ahora
      </button>
    </motion.div>
  );
}
