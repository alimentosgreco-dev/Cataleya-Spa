"use client";

import { motion } from "framer-motion";
import { whyUsItems } from "@/data/why-us";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";

export function WhyChooseUs() {
  return (
    <section
      className="relative py-20 md:py-28"
      aria-labelledby="why-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Por qué elegirnos"
            title="La diferencia Cataleya"
            subtitle="Cada detalle está pensado para que vivas una experiencia inolvidable."
          />
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {whyUsItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.id} delay={index * 0.08}>
                <GlassCard className="h-full text-center lg:text-left">
                  <motion.div
                    whileHover={{ rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.4 }}
                    className="mx-auto lg:mx-0 mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple/15 to-olive/15"
                  >
                    <Icon className="h-7 w-7 text-purple" aria-hidden />
                  </motion.div>
                  <h3 className="font-display text-lg font-semibold">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-text">
                    {item.description}
                  </p>
                </GlassCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
