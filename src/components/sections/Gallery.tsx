"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { galleryImages } from "@/data/gallery";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export function Gallery() {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const active = galleryImages.find((g) => g.id === lightbox);

  return (
    <section
      id="galeria"
      className="relative py-20 md:py-28"
      aria-labelledby="gallery-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Galería"
            title="Momentos de bienestar"
            subtitle="Descubre la atmósfera boutique y los resultados que nos distinguen."
          />
        </Reveal>

        <div className="columns-2 gap-4 md:columns-3 lg:columns-4 lg:gap-5">
          {galleryImages.map((img, index) => (
            <Reveal key={img.id} delay={index * 0.05}>
              <motion.button
                type="button"
                onClick={() => setLightbox(img.id)}
                className={cn(
                  "group relative mb-4 w-full overflow-hidden rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple",
                  img.tall && "md:mb-5"
                )}
                aria-label={`Ver imagen: ${img.alt}`}
              >
                <div
                  className={cn(
                    "relative w-full",
                    img.tall ? "aspect-[3/4]" : "aspect-square"
                  )}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    loading="lazy"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-purple/0 transition-colors group-hover:bg-purple/20" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-purple shadow-lg">
                      <ZoomIn className="h-5 w-5" aria-hidden />
                    </span>
                  </div>
                  {img.category === "before-after" && (
                    <span className="absolute left-3 top-3 rounded-full bg-olive px-3 py-1 text-xs font-semibold text-white">
                      Antes / Después
                    </span>
                  )}
                </div>
              </motion.button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black-soft/95 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal
            aria-label="Vista ampliada de imagen"
            onClick={() => setLightbox(null)}
          >
            <button
              type="button"
              onClick={() => setLightbox(null)}
              className="absolute right-4 top-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-olive"
              aria-label="Cerrar galería"
            >
              <X className="h-6 w-6" />
            </button>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-h-[90vh] max-w-5xl w-full aspect-[4/3]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={active.src.replace("w=600", "w=1200")}
                alt={active.alt}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
