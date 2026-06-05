import { ShieldCheck, Sparkles, Award, Leaf, HeartHandshake } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface WhyUsItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const whyUsItems: WhyUsItem[] = [
  {
    id: "hygiene",
    title: "Higiene profesional",
    description:
      "Protocolos estrictos de sanitización en cada estación y herramienta.",
    icon: ShieldCheck,
  },
  {
    id: "products",
    title: "Productos premium",
    description:
      "Marcas de alta gama seleccionadas para resultados visibles y duraderos.",
    icon: Sparkles,
  },
  {
    id: "certified",
    title: "Personal certificado",
    description:
      "Especialistas capacitados con experiencia en estética y wellness.",
    icon: Award,
  },
  {
    id: "ambience",
    title: "Ambiente relajante",
    description:
      "Espacios diseñados para tu desconexión total y bienestar integral.",
    icon: Leaf,
  },
  {
    id: "personalized",
    title: "Atención personalizada",
    description:
      "Cada tratamiento se adapta a tus necesidades y tipo de piel.",
    icon: HeartHandshake,
  },
];
