export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  text: string;
  avatar: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Mariana López",
    role: "Cliente frecuente",
    rating: 5,
    text: "El ambiente es increíblemente relajante y el facial antienvejecimiento dejó mi piel radiante. Sin duda el mejor spa de la zona.",
    avatar: "/img/gallery/facialeze1.jpg",
  },
  {
    id: "2",
    name: "Valeria Hernández",
    role: "Primera visita",
    rating: 5,
    text: "Reservé por WhatsApp y la atención fue impecable. El masaje con piedras calientes superó todas mis expectativas.",
    avatar: "/img/gallery/masajepiedras2.jpg",
  },
  {
    id: "3",
    name: "Sofía Ramírez",
    role: "Cliente VIP",
    rating: 5,
    text: "Llevo años viniendo a Cataleya. La manicure con gelish dura semanas y el personal siempre es muy profesional y cálido.",
    avatar: "/img/gallery/material4.jpg",
  },
  {
    id: "4",
    name: "Daniela Morales",
    role: "Cliente",
    rating: 5,
    text: "El catálogo de tratamientos es amplísimo y los precios son justos para la calidad que ofrecen. 100% recomendado.",
    avatar: "/img/gallery/material5.jpg",
  },
  {
    id: "5",
    name: "Camila Torres",
    role: "Cliente",
    rating: 5,
    text: "Fui con mi pareja al masaje en pareja y fue una experiencia mágica. El lugar huele delicioso y todo está impecable.",
    avatar: "/img/gallery/muestra.jpg",
  },
];
