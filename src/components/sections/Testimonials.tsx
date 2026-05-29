"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";

export function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const current = testimonials[index];

  return (
    <section
      id="resenas"
      className="relative py-20 md:py-28 bg-gray-light/50 dark:bg-black-soft/30 overflow-hidden"
      aria-labelledby="reviews-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Testimonios"
            title="Lo que dicen nuestras clientas"
            subtitle="Experiencias reales de quienes confían en Cataleya."
          />
        </Reveal>

        <Reveal delay={0.15}>
          <div className="relative mx-auto max-w-3xl">
            <GlassCard className="relative min-h-[280px] md:min-h-[240px]">
              <Quote
                className="absolute right-6 top-6 h-12 w-12 text-purple/10"
                aria-hidden
              />
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center text-center md:flex-row md:items-start md:text-left md:gap-8"
                >
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full ring-4 ring-purple/20">
                    <Image
                      src={current.avatar}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div>
                    <div className="flex justify-center gap-0.5 md:justify-start" aria-label={`${current.rating} de 5 estrellas`}>
                      {Array.from({ length: current.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-olive text-olive"
                          aria-hidden
                        />
                      ))}
                    </div>
                    <blockquote className="mt-4 text-lg leading-relaxed text-foreground md:text-xl">
                      &ldquo;{current.text}&rdquo;
                    </blockquote>
                    <footer className="mt-6">
                      <cite className="not-italic font-semibold text-purple dark:text-purple-light">
                        {current.name}
                      </cite>
                      <p className="text-sm text-gray-text">{current.role}</p>
                    </footer>
                  </div>
                </motion.div>
              </AnimatePresence>
            </GlassCard>

            <div className="mt-6 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() =>
                  setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)
                }
                className="flex h-10 w-10 items-center justify-center rounded-full glass hover:bg-purple/10 focus-visible:ring-2 focus-visible:ring-purple"
                aria-label="Testimonio anterior"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="flex gap-2" role="tablist" aria-label="Seleccionar testimonio">
                {testimonials.map((t, i) => (
                  <button
                    key={t.id}
                    type="button"
                    role="tab"
                    aria-selected={i === index}
                    onClick={() => setIndex(i)}
                    className={`h-2 rounded-full transition-all focus-visible:ring-2 focus-visible:ring-purple ${
                      i === index ? "w-8 bg-purple" : "w-2 bg-purple/30"
                    }`}
                    aria-label={`Testimonio ${i + 1}`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => setIndex((i) => (i + 1) % testimonials.length)}
                className="flex h-10 w-10 items-center justify-center rounded-full glass hover:bg-purple/10 focus-visible:ring-2 focus-visible:ring-purple"
                aria-label="Siguiente testimonio"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
