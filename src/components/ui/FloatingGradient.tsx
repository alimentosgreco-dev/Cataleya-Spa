"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FloatingGradientProps {
  className?: string;
  color?: "purple" | "olive" | "mixed";
  size?: "sm" | "md" | "lg";
}

export function FloatingGradient({
  className,
  color = "mixed",
  size = "md",
}: FloatingGradientProps) {
  const sizes = { sm: "w-48 h-48", md: "w-72 h-72", lg: "w-96 h-96" };
  const gradients = {
    purple: "from-purple/30 to-transparent",
    olive: "from-olive/25 to-transparent",
    mixed: "from-purple/25 via-olive/15 to-transparent",
  };

  return (
    <motion.div
      aria-hidden
      className={cn(
        "pointer-events-none absolute rounded-full blur-3xl",
        sizes[size],
        `bg-gradient-radial ${gradients[color]}`,
        className
      )}
      animate={{
        y: [0, -20, 0],
        x: [0, 10, 0],
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}
