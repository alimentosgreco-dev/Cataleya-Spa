import {
  Sparkles,
  Hand,
  Footprints,
  Scissors,
  UserRound,
  Flower2,
  Waves,
  Zap,
  type LucideIcon,
} from "lucide-react";

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  image: string;
  href: string;
}

export const services: Service[] = [
  {
    id: "manicura",
    title: "Manicura",
    description:
      "Uñas impecables con técnicas premium, gelish y acabados de lujo.",
    icon: Hand,
    image:
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80",
    href: "#tratamientos",
  },
  {
    id: "pedicura",
    title: "Pedicura",
    description:
      "Cuidado integral de pies con exfoliación, spa y relajación profunda.",
    icon: Footprints,
    image:
      "https://images.unsplash.com/photo-1519415510236-718f1fc8742c?w=800&q=80",
    href: "#tratamientos",
  },
  {
    id: "peluqueria",
    title: "Peluquería",
    description:
      "Cortes, color y estilizado con productos profesionales de alta gama.",
    icon: Scissors,
    image:
      "https://images.unsplash.com/photo-1560066984-138d983ef891?w=800&q=80",
    href: "#tratamientos",
  },
  {
    id: "barberia",
    title: "Barbería",
    description:
      "Estilo masculino refinado con atención personalizada y detalle.",
    icon: UserRound,
    image:
      "https://images.unsplash.com/photo-1503951914875-452162b0f3d1?w=800&q=80",
    href: "#tratamientos",
  },
  {
    id: "faciales",
    title: "Faciales",
    description:
      "Tratamientos faciales avanzados para luminosidad y rejuvenecimiento.",
    icon: Sparkles,
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80",
    href: "#tratamientos",
  },
  {
    id: "masajes",
    title: "Masajes",
    description:
      "Terapias corporales relajantes, reductivas y holísticas a tu medida.",
    icon: Waves,
    image:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80",
    href: "#tratamientos",
  },
  {
    id: "depilacion",
    title: "Depilación Láser",
    description:
      "Tecnología láser segura para una piel suave y libre de vello.",
    icon: Zap,
    image:
      "https://images.unsplash.com/photo-1515377903483-cce74a5db49e?w=800&q=80",
    href: "#tratamientos",
  },
  {
    id: "spa",
    title: "SPA & Wellness",
    description:
      "Rituales de bienestar, exfoliación y envolturas de lujo total.",
    icon: Flower2,
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbbe23?w=800&q=80",
    href: "#tratamientos",
  },
];
