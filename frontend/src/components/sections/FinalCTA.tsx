"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { scrollToSection } from "@/lib/utils";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32" aria-label="Llamada a la acción">
      <Image
        src="/img/gallery/masaje1.jpg"
        alt=""
        fill
        loading="lazy"
        className="object-cover"
        sizes="100vw"
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-r from-purple/90 via-purple/70 to-olive/60" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/80">
            Tu momento te espera
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold text-white md:text-5xl lg:text-6xl">
            Regálate el lujo de sentirte increíble
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/90">
            Agenda hoy tu cita y descubre por qué somos el spa favorito en
            Colonia Guerrero, CDMX.
          </p>
          <Button
            size="lg"
            variant="secondary"
            shine
            className="mt-10"
            onClick={() => scrollToSection("reservar")}
          >
            <Calendar className="h-5 w-5" />
            Reservar mi cita ahora
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
