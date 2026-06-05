export type TreatmentCategory =
  | "faciales"
  | "corporales"
  | "exfoliacion"
  | "manicure"
  | "depilacion";

export interface Treatment {
  id: string;
  name: string;
  price: number | null;
  priceLabel: string;
  category: TreatmentCategory;
  keywords?: string[];
}

export const treatmentCategories: {
  id: TreatmentCategory;
  label: string;
}[] = [
  { id: "faciales", label: "Faciales" },
  { id: "corporales", label: "Corporales" },
  { id: "exfoliacion", label: "Exfoliación y SPA" },
  { id: "manicure", label: "Manicure y Pedicure" },
  { id: "depilacion", label: "Depilación" },
];

export const treatments: Treatment[] = [
  // Faciales
  { id: "f1", name: "Primera limpieza facial", price: 10, priceLabel: "$450", category: "faciales" },
  { id: "f2", name: "Limpieza profunda", price: 550, priceLabel: "$550", category: "faciales" },
  { id: "f3", name: "Hidratación y nutrición", price: 650, priceLabel: "$650", category: "faciales" },
  { id: "f4", name: "Antioxidante", price: 650, priceLabel: "$650", category: "faciales" },
  { id: "f5", name: "Despigmentante", price: 650, priceLabel: "$650", category: "faciales" },
  { id: "f6", name: "Antienvejecimiento", price: 650, priceLabel: "$650", category: "faciales" },
  {
    id: "f7",
    name: "Antienvejecimiento con mascarilla de oro 24k o caviar negro/rojo",
    price: 700,
    priceLabel: "$700",
    category: "faciales",
  },
  { id: "f8", name: "Acné", price: 650, priceLabel: "$650", category: "faciales" },
  { id: "f9", name: "Facial para pieles grasas", price: 650, priceLabel: "$650", category: "faciales" },
  { id: "f10", name: "Facial para pieles sensibles", price: 650, priceLabel: "$650", category: "faciales" },
  { id: "f11", name: "Delineado permanente de ojos", price: 1900, priceLabel: "$1,900", category: "faciales" },
  { id: "f12", name: "Dermapen para labios", price: 400, priceLabel: "$400", category: "faciales" },
  { id: "f13", name: "Dermapen para rostro", price: 700, priceLabel: "$700", category: "faciales" },
  // Corporales
  { id: "c1", name: "Primer masaje", price: 550, priceLabel: "$550", category: "corporales" },
  { id: "c2", name: "Masaje reductivo", price: 650, priceLabel: "$650", category: "corporales" },
  {
    id: "c3",
    name: "Masaje reductivo cuerpo completo (90 minutos)",
    price: 1200,
    priceLabel: "$1,200",
    category: "corporales",
  },
  { id: "c4", name: "Levantamiento de glúteos", price: 650, priceLabel: "$650", category: "corporales" },
  { id: "c5", name: "Masaje de piernas cansadas", price: 550, priceLabel: "$550", category: "corporales" },
  { id: "c6", name: "Limpieza de espalda", price: 550, priceLabel: "$550", category: "corporales" },
  {
    id: "c7",
    name: "Aclaramiento axilas o zonas íntimas",
    price: 490,
    priceLabel: "$490",
    category: "corporales",
  },
  { id: "c8", name: "Masaje relajante", price: 600, priceLabel: "$600", category: "corporales" },
  { id: "c9", name: "Masaje descontracturante", price: 700, priceLabel: "$700", category: "corporales" },
  { id: "c10", name: "Masaje con piedras calientes", price: 700, priceLabel: "$700", category: "corporales" },
  { id: "c11", name: "Masaje de espalda", price: 350, priceLabel: "$350", category: "corporales" },
  { id: "c12", name: "Masaje Lomi Lomi o hawaiano", price: 700, priceLabel: "$700", category: "corporales" },
  { id: "c13", name: "Masaje holístico", price: 800, priceLabel: "$800", category: "corporales" },
  { id: "c14", name: "Masaje Ayurveda", price: 700, priceLabel: "$700", category: "corporales" },
  { id: "c15", name: "Masaje sueco", price: 650, priceLabel: "$650", category: "corporales" },
  { id: "c16", name: "Masaje ancestral con rebozo", price: 700, priceLabel: "$700", category: "corporales" },
  { id: "c17", name: "Masaje con pindas", price: 700, priceLabel: "$700", category: "corporales" },
  { id: "c18", name: "Masaje Maya emocional", price: 600, priceLabel: "$600", category: "corporales" },
  { id: "c19", name: "Envoltura corporal", price: 1100, priceLabel: "$1,100", category: "corporales" },
  { id: "c20", name: "Reflexología podal", price: 450, priceLabel: "$450", category: "corporales" },
  { id: "c21", name: "Masaje en pareja", price: 1450, priceLabel: "$1,450", category: "corporales" },
  // Exfoliación y SPA
  {
    id: "e1",
    name: "Pies: exfoliación, envoltura y masaje",
    price: 450,
    priceLabel: "$450",
    category: "exfoliacion",
  },
  { id: "e2", name: "SPA de pies", price: 550, priceLabel: "$550", category: "exfoliacion" },
  {
    id: "e3",
    name: "Manos: exfoliación, envoltura y masaje",
    price: 350,
    priceLabel: "$350",
    category: "exfoliacion",
  },
  { id: "e4", name: "SPA de manos", price: 450, priceLabel: "$450", category: "exfoliacion" },
  { id: "e5", name: "SPA Capilar", price: 350, priceLabel: "$350", category: "exfoliacion" },
  { id: "e6", name: "SPA Capilar y Facial", price: 550, priceLabel: "$550", category: "exfoliacion" },
  // Manicure y Pedicure
  { id: "m1", name: "Manicure con gelish", price: 350, priceLabel: "$350", category: "manicure" },
  { id: "m2", name: "Pedicure con gelish", price: 500, priceLabel: "$500", category: "manicure" },
  { id: "m3", name: "Retiro de Gelish", price: 60, priceLabel: "desde $60", category: "manicure" },
  { id: "m4", name: "Manicure express sin esmalte", price: 200, priceLabel: "$200", category: "manicure" },
  { id: "m5", name: "Pedicure sin esmalte", price: 400, priceLabel: "$400", category: "manicure" },
  { id: "m6", name: "Gelish Francés", price: 280, priceLabel: "$280", category: "manicure" },
  { id: "m7", name: "Manicure y Pedicure", price: 850, priceLabel: "$850", category: "manicure" },
  { id: "m8", name: "Retoque de acrigel", price: 350, priceLabel: "$350", category: "manicure" },
  { id: "m9", name: "Baño de acrigel", price: 350, priceLabel: "$350", category: "manicure" },
  { id: "m10", name: "Calcio", price: 120, priceLabel: "$120", category: "manicure" },
  { id: "m11", name: "Calcio con gel", price: 320, priceLabel: "$320", category: "manicure" },
  { id: "m12", name: "Retiro de acrílico", price: null, priceLabel: "$100-$150", category: "manicure" },
  { id: "m13", name: "Rubber", price: 200, priceLabel: "$200", category: "manicure" },
  { id: "m14", name: "Pedrería", price: null, priceLabel: "$5-$10", category: "manicure" },
  // Depilación
  { id: "d1", name: "Zonas pequeñas", price: 300, priceLabel: "$300", category: "depilacion" },
  { id: "d2", name: "Zonas medianas", price: 500, priceLabel: "$500", category: "depilacion" },
  { id: "d3", name: "Zonas grandes", price: 700, priceLabel: "$700", category: "depilacion" },
  { id: "d4", name: "Cuerpo completo", price: 1100, priceLabel: "$1,100", category: "depilacion" },
];

export const allTreatmentOptions = treatments.map((t) => ({
  value: t.id,
  label: `${t.name} — ${t.priceLabel}`,
  category: t.category,
}));
