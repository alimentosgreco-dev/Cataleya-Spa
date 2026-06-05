export const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#servicios", label: "Servicios" },
  { href: "#tratamientos", label: "Tratamientos" },
  { href: "#galeria", label: "Galería" },
  { href: "#resenas", label: "Reseñas" },
  { href: "#reservar", label: "Agenda tu cita" },
  { href: "#contacto", label: "Contacto" },
] as const;

export const siteConfig = {
  name: "Cataleya Beauty & Spa",
  shortName: "Cataleya",
  tagline: "Renueva tu belleza y bienestar",
  description:
    "Experiencias de spa premium, tratamientos faciales y relajación total en CDMX.",
  email: "cataleyabeautynspa@gmail.com",
  phone: "5515065237",
  phoneFormatted: "+52 55 1506 5237",
  whatsapp: "525515065237",
  address: "Calle Mina 93A, Colonia Guerrero, CDMX",
  instagram: "Cataleya Beauty and Spa",
  facebook: "Cataleya Beauty & Spa",
  facebookUrl:
    "https://www.facebook.com/profile.php?id=61557933662433",
  stats: {
    happyClients: 2500,
    treatments: 15000,
    years: 8,
  },
} as const;
