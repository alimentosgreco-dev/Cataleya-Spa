"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { scrollToSection } from "@/lib/utils";

export function Services() {
  return (
    <section
      id="servicios"
      className="relative py-20 md:py-28"
      aria-labelledby="services-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Nuestros servicios"
            title="Experiencias de belleza"
            subtitle="Cada servicio está diseñado para brindarte resultados visibles y momentos de puro bienestar."
          />
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.id} delay={index * 0.08}>
                <motion.article
                  whileHover={{ y: -8 }}
                  className="group relative overflow-hidden rounded-3xl bg-gray-light dark:bg-black-soft/40"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      loading="lazy"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black-soft/90 via-black-soft/30 to-transparent" />
                    <div className="absolute left-4 top-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md">
                      <Icon className="h-6 w-6 text-white" aria-hidden />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="font-display text-xl font-semibold text-white">
                      {service.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-white/80">
                      {service.description}
                    </p>
                    <button
                      type="button"
                      onClick={() => scrollToSection("tratamientos")}
                      className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-olive transition-colors hover:text-olive-light focus-visible:outline-none focus-visible:underline"
                    >
                      Ver tratamientos
                      <ArrowUpRight className="h-4 w-4" aria-hidden />
                    </button>
                  </div>
                </motion.article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
