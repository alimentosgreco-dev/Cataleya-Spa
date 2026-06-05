"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { siteConfig } from "@/data/navigation";
import { Button } from "@/components/ui/Button";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { FloatingGradient } from "@/components/ui/FloatingGradient";
import { scrollToSection } from "@/lib/utils";

export function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.3]);

  return (
    <section
      id="inicio"
      className="relative min-h-screen overflow-hidden"
      aria-label="Inicio"
    >
      <motion.div style={{ y }} className="absolute inset-0">
        <Image
          src="/img/hero/image.png"
          alt="Spa de lujo Cataleya Beauty & Spa en CDMX"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black-soft/50 via-purple/30 to-background" />
      </motion.div>

      <FloatingGradient className="-top-20 -left-20" size="lg" />
      <FloatingGradient className="top-1/3 -right-10" color="olive" size="md" />

      <motion.div
        style={{ opacity }}
        className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 pb-32 pt-28 sm:px-6 lg:px-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-3xl"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm text-white">
            <Sparkles className="h-4 w-4 text-olive" aria-hidden />
            Spa boutique · CDMX
          </span>

          <h1 className="font-display text-4xl font-semibold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            {siteConfig.tagline}
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/90 md:text-xl">
            {siteConfig.description}
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button
              size="lg"
              shine
              onClick={() => scrollToSection("reservar")}
              className="group"
            >
              Agendar Cita
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/40 bg-white/10 text-white backdrop-blur hover:bg-white hover:text-purple"
              onClick={() => scrollToSection("servicios")}
            >
              Ver Servicios
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 grid grid-cols-3 gap-6 rounded-3xl glass-strong p-6 md:max-w-2xl md:p-8"
        >
          <AnimatedCounter
            end={siteConfig.stats.happyClients}
            label="Clientes felices"
          />
          <AnimatedCounter
            end={siteConfig.stats.treatments}
            label="Tratamientos realizados"
          />
          <AnimatedCounter
            end={siteConfig.stats.years}
            suffix=""
            label="Años de experiencia"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute right-4 top-1/3 hidden lg:block"
          aria-hidden
        >
          <div className="glass rounded-3xl p-4 glow-purple">
            <p className="text-xs uppercase tracking-wider text-olive">
              Tratamiento destacado
            </p>
            <p className="mt-1 font-display text-lg text-white">
              Facial Oro 24k
            </p>
            <p className="text-sm text-white/70">desde $700</p>
          </div>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/40 p-2"
          aria-hidden
        >
          <div className="h-2 w-1 rounded-full bg-white/80" />
        </motion.div>
      </div>
    </section>
  );
}
