"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Gift, Sparkles, ArrowRight } from "lucide-react";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Promotions() {
  return (
    <section
      id="promociones"
      className="py-24 bg-gradient-to-b from-white via-[#faf9fc] to-white"
    >
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          eyebrow="Ofertas Especiales"
          title="Promociones del Mes"
          subtitle="Descubre experiencias exclusivas diseñadas para consentirte, relajarte y renovar tu bienestar."
        />

        {/* PROMOCIONES */}
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {/* PROMOCIÓN 1 */}
          <Reveal>
            <motion.article
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="
                overflow-hidden
                rounded-3xl
                bg-white
                border
                border-[#6F498C]/10
                shadow-lg
                hover:shadow-2xl
              "
            >
              <div className="relative aspect-[4/5]">
                <Image
                  src="/img/promo/promo1.jpg"
                  alt="Promoción Facial Premium"
                  fill
                  sizes="(max-width:768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              <div className="p-6">
                <div className="mb-3 flex items-center gap-2 text-[#A4B069]">
                  <Gift size={18} />
                  <span className="font-medium">
                    Promoción Especial
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-[#111111]">
                  Facial Premium
                </h3>

                <p className="mt-3 text-[#6B7280]">
                  Revitaliza, hidrata y devuelve luminosidad a tu piel con nuestro tratamiento facial premium.
                </p>

                <button
                  className="
                    mt-6
                    inline-flex
                    items-center
                    gap-2
                    font-semibold
                    text-[#6F498C]
                    hover:text-[#5a3c72]
                    transition-colors
                  "
                >
                  Reservar ahora
                  <ArrowRight size={18} />
                </button>
              </div>
            </motion.article>
          </Reveal>

          {/* PROMOCIÓN 2 */}
          <Reveal delay={0.1}>
            <motion.article
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="
                overflow-hidden
                rounded-3xl
                bg-white
                border
                border-[#A4B069]/20
                shadow-lg
                hover:shadow-2xl
              "
            >
              <div className="relative aspect-[4/5]">
                <Image
                  src="/img/promo/promo2.jpg"
                  alt="Promoción Masaje Relajante"
                  fill
                  sizes="(max-width:768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              <div className="p-6">
                <div className="mb-3 flex items-center gap-2 text-[#A4B069]">
                  <Gift size={18} />
                  <span className="font-medium">
                    Oferta Limitada
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-[#111111]">
                  Masaje Relajante
                </h3>

                <p className="mt-3 text-[#6B7280]">
                  Disfruta una experiencia de relajación profunda para liberar tensiones y renovar tu energía.
                </p>

                <button
                  className="
                    mt-6
                    inline-flex
                    items-center
                    gap-2
                    font-semibold
                    text-[#6F498C]
                    hover:text-[#5a3c72]
                    transition-colors
                  "
                >
                  Ver promoción
                  <ArrowRight size={18} />
                </button>
              </div>
            </motion.article>
          </Reveal>
        </div>

        {/* VIDEO COMPLETO ABAJO */}
        <Reveal delay={0.2}>
          <motion.article
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            className="
              mt-10
              overflow-hidden
              rounded-3xl
              bg-white
              border
              border-[#6F498C]/10
              shadow-xl
            "
          >
            <div className="relative">
              <video
                autoPlay
                muted
                loop
                playsInline
                controls
                className="w-full h-auto"
              >
                <source
                  src="/img/promo/promo2.mp4"
                  type="video/mp4"
                />
              </video>
            </div>

            <div className="p-8 text-center">
              <div className="flex items-center justify-center gap-2 text-[#6F498C]">
                <Sparkles size={20} />
                <span className="font-semibold">
                  Experiencia Cataleya
                </span>
              </div>

              <h3 className="mt-4 text-3xl font-bold text-[#111111]">
                Vive la Experiencia Spa
              </h3>

              <p className="mt-4 max-w-3xl mx-auto text-[#6B7280]">
                Un espacio diseñado para desconectarte del estrés, revitalizar tu energía y disfrutar de momentos de bienestar, relajación y belleza.
              </p>
            </div>
          </motion.article>
        </Reveal>
      </div>
    </section>
  );
}