import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({ children, className, hover = true }: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass rounded-3xl p-6 transition-all duration-300",
        hover &&
          "hover:-translate-y-1 hover:shadow-xl hover:shadow-purple/10 dark:hover:shadow-purple/5",
        className
      )}
    >
      {children}
    </div>
  );
}
