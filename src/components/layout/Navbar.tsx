"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Flower2 } from "lucide-react";
import { navLinks, siteConfig } from "@/data/navigation";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { scrollToSection, cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Navbar() {
  const scrolled = useScrollPosition(40);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleNav = (href: string) => {
    const id = href.replace("#", "");
    scrollToSection(id);
    setMobileOpen(false);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "glass-strong py-3 shadow-lg shadow-purple/5"
          : "bg-transparent py-5"
      )}
      role="banner"
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Navegación principal"
      >
        <button
          type="button"
          onClick={() => handleNav("#inicio")}
          className="group flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple rounded-lg"
          aria-label={`${siteConfig.name} - Ir al inicio`}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-purple to-olive text-white shadow-lg shadow-purple/30 transition-transform group-hover:scale-105">
            <Flower2 className="h-5 w-5" aria-hidden />
          </span>
          <span className="hidden sm:block text-left">
            <span className="font-display text-lg font-semibold leading-tight text-foreground">
              Cataleya
            </span>
            <span className="block text-[10px] uppercase tracking-widest text-gray-text">
              Beauty & Spa
            </span>
          </span>
        </button>

        <ul className="hidden items-center gap-1 lg:flex" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <button
                type="button"
                onClick={() => handleNav(link.href)}
                className="rounded-full px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-purple hover:bg-purple/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle className="hidden sm:flex" />
          <Button
            size="sm"
            shine
            className="hidden md:inline-flex"
            onClick={() => handleNav("#reservar")}
          >
            Reservar Ahora
          </Button>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-xl glass lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="glass-strong border-t border-purple/10 lg:hidden overflow-hidden"
          >
            <ul className="flex flex-col gap-1 px-4 py-4" role="list">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <button
                    type="button"
                    onClick={() => handleNav(link.href)}
                    className="w-full rounded-2xl px-4 py-3 text-left text-base font-medium hover:bg-purple/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple"
                  >
                    {link.label}
                  </button>
                </motion.li>
              ))}
              <li className="pt-2 flex gap-3 items-center">
                <ThemeToggle />
                <Button
                  className="flex-1"
                  shine
                  onClick={() => handleNav("#reservar")}
                >
                  Reservar Ahora
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
