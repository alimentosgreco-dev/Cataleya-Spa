export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: "spa" | "facial" | "nails" | "massage" | "before-after";
  tall?: boolean;
}

export const galleryImages: GalleryImage[] = [
  {
    id: "g1",
    src: "https://images.unsplash.com/photo-1540555700478-4be289fbbe23?w=600&q=80",
    alt: "Ambiente spa relajante",
    category: "spa",
    tall: true,
  },
  {
    id: "g2",
    src: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80",
    alt: "Tratamiento facial premium",
    category: "facial",
  },
  {
    id: "g3",
    src: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80",
    alt: "Manicure elegante",
    category: "nails",
  },
  {
    id: "g4",
    src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80",
    alt: "Masaje relajante",
    category: "massage",
    tall: true,
  },
  {
    id: "g5",
    src: "https://images.unsplash.com/photo-1515377903483-cce74a5db49e?w=600&q=80",
    alt: "Tratamiento de belleza",
    category: "facial",
  },
  {
    id: "g6",
    src: "https://images.unsplash.com/photo-1519415510236-718f1fc8742c?w=600&q=80",
    alt: "SPA de pies",
    category: "spa",
  },
  {
    id: "g7",
    src: "https://images.unsplash.com/photo-1560066984-138d983ef891?w=600&q=80",
    alt: "Salón de belleza",
    category: "nails",
    tall: true,
  },
  {
    id: "g8",
    src: "https://images.unsplash.com/photo-1512290923162-7a31e2b1aff0?w=600&q=80",
    alt: "Resultado tratamiento facial",
    category: "before-after",
  },
  {
    id: "g9",
    src: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=600&q=80",
    alt: "Wellness y relajación",
    category: "massage",
  },
  {
    id: "g10",
    src: "https://images.unsplash.com/photo-1487412944907-5ce7befe9b7b?w=600&q=80",
    alt: "Experiencia boutique spa",
    category: "spa",
  },
];
