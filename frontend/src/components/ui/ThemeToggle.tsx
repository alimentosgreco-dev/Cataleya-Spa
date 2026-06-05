"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div
        className={cn("h-10 w-10 rounded-full skeleton", className)}
        aria-hidden
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-full glass transition-colors hover:bg-purple/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple",
        className
      )}
      aria-label={
        theme === "dark" ? "Activar modo claro" : "Activar modo oscuro"
      }
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-olive" />
      ) : (
        <Moon className="h-5 w-5 text-purple" />
      )}
    </button>
  );
}
