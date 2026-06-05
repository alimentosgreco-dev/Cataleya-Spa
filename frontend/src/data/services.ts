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
    image: "/img/services/manicura.jpg",
    href: "#tratamientos",
  },
  {
    id: "pedicura",
    title: "Pedicura",
    description:
      "Cuidado integral de pies con exfoliación, spa y relajación profunda.",
    icon: Footprints,
    image: "/img/services/pedicure.jpg",
    href: "#tratamientos",
  },
  {
    id: "peluqueria",
    title: "Peluquería",
    description:
      "Cortes, color y estilizado con productos profesionales de alta gama.",
    icon: Scissors,
    image: "/img/services/peluqueria.jpg",
    href: "#tratamientos",
  },
  {
    id: "barberia",
    title: "Barbería",
    description:
      "Estilo masculino refinado con atención personalizada y detalle.",
    icon: UserRound,
    image: "/img/services/facialAlfred.jpg",
    href: "#tratamientos",
  },
  {
    id: "faciales",
    title: "Faciales",
    description:
      "Tratamientos faciales avanzados para luminosidad y rejuvenecimiento.",
    icon: Sparkles,
    image: "/img/services/facialeze1.jpg",
    href: "#tratamientos",
  },
  {
    id: "masajes",
    title: "Masajes",
    description:
      "Terapias corporales relajantes, reductivas y holísticas a tu medida.",
    icon: Waves,
    image: "/img/services/masaje1.jpg",
    href: "#tratamientos",
  },
  {
    id: "depilacion",
    title: "Depilación Láser",
    description:
      "Tecnología láser segura para una piel suave y libre de vello.",
    icon: Zap,
    image: "/img/services/depilacion.jpg",
    href: "#tratamientos",
  },
  {
    id: "spa",
    title: "SPA & Wellness",
    description:
      "Rituales de bienestar, exfoliación y envolturas de lujo total.",
    icon: Flower2,
    image: "/img/services/masaje5.jpg",
    href: "#tratamientos",
  },
];
