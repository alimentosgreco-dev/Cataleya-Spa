"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles } from "lucide-react";
import {
  treatments,
  treatmentCategories,
  type TreatmentCategory,
} from "@/data/treatments";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export function Treatments() {
  const [category, setCategory] = useState<TreatmentCategory | "all">("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return treatments.filter((t) => {
      const matchCat = category === "all" || t.category === category;
      const matchSearch =
        !search.trim() ||
        t.name.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [category, search]);

  return (
    <section
      id="tratamientos"
      className="relative py-20 md:py-28 bg-gray-light/50 dark:bg-black-soft/30 overflow-hidden"
      aria-labelledby="treatments-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Catálogo oficial"
            title="Tratamientos y precios"
            subtitle="Transparencia total. Encuentra el ritual perfecto para ti."
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div
              className="flex flex-wrap gap-2"
              role="tablist"
              aria-label="Categorías de tratamientos"
            >
              <CategoryTab
                active={category === "all"}
                onClick={() => setCategory("all")}
              >
                Todos
              </CategoryTab>
              {treatmentCategories.map((cat) => (
                <CategoryTab
                  key={cat.id}
                  active={category === cat.id}
                  onClick={() => setCategory(cat.id)}
                >
                  {cat.label}
                </CategoryTab>
              ))}
            </div>

            <div className="relative max-w-md flex-1">
              <Search
                className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-text"
                aria-hidden
              />
              <input
                type="search"
                placeholder="Buscar tratamiento..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-2xl border border-purple/15 bg-background py-3 pl-11 pr-4 text-sm focus:border-purple focus:outline-none focus:ring-2 focus:ring-purple/20"
                aria-label="Buscar tratamientos"
              />
            </div>
          </div>
        </Reveal>

        <div className="overflow-hidden rounded-3xl glass-strong">
          <div className="hidden md:grid md:grid-cols-[1fr_auto] gap-4 border-b border-purple/10 px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-text">
            <span>Tratamiento</span>
            <span className="text-right w-28">Precio</span>
          </div>

          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-12 text-center text-gray-text"
              >
                No se encontraron tratamientos
              </motion.p>
            ) : (
              <ul role="list" className="treatments-scroll">
                {filtered.map((treatment, i) => (
                  <motion.li
                    key={treatment.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: i * 0.02 }}
                    className="group flex items-center justify-between gap-4 border-b border-purple/5 px-4 py-4 transition-colors hover:bg-purple/5 md:px-6"
                  >
                    <div className="flex min-w-0 items-start gap-3">
                      <Sparkles
                        className="mt-1 h-4 w-4 shrink-0 text-olive opacity-0 transition-opacity group-hover:opacity-100"
                        aria-hidden
                      />
                      <span className="text-sm md:text-base">{treatment.name}</span>
                    </div>
                    <span className="shrink-0 rounded-full bg-purple/10 px-4 py-1.5 text-sm font-semibold text-purple dark:text-purple-light">
                      {treatment.priceLabel}
                    </span>
                  </motion.li>
                ))}
              </ul>
            )}
          </AnimatePresence>

          <p className="border-t border-purple/10 px-6 py-4 text-center text-xs text-gray-text">
            {filtered.length} tratamiento{filtered.length !== 1 ? "s" : ""} ·
            Precios en MXN
          </p>
        </div>
      </div>
    </section>
  );
}

function CategoryTab({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        "rounded-full px-4 py-2 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple",
        active
          ? "bg-purple text-white shadow-lg shadow-purple/25"
          : "glass hover:bg-purple/10"
      )}
    >
      {children}
    </button>
  );
}
