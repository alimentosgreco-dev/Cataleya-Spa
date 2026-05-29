# Cataleya Beauty & Spa

Sitio web premium para spa boutique en CDMX. Construido con Next.js (App Router), React, TypeScript, Tailwind CSS v4, Framer Motion y Lucide React.

## Inicio rápido

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Estructura del proyecto

```
src/
├── app/                 # App Router, layout, metadata SEO
├── components/
│   ├── layout/          # Navbar, Footer, Loading, Sticky CTA
│   ├── sections/        # Hero, Booking, Services, Treatments...
│   ├── ui/              # Button, Reveal, GlassCard, ThemeToggle...
│   └── providers/       # Theme + Toasts
├── data/                # Servicios, tratamientos, testimonios, galería
├── hooks/               # useScrollPosition, useBookingForm
├── lib/                 # utils, schema.org
└── providers/           # next-themes
```

## Características

- Diseño mobile-first y responsive
- Sistema de reservas con calendario, horarios y validación
- Catálogo completo de tratamientos con filtros y búsqueda
- Dark mode elegante
- SEO local (Schema.org BeautySalon)
- Animaciones Framer Motion
- Lazy loading de secciones
- Accesibilidad ARIA

## Integraciones futuras

- API backend para citas
- WhatsApp Business API
- Google Calendar
- Pasarela de pagos

## Scripts

| Comando       | Descripción          |
|---------------|----------------------|
| `npm run dev` | Servidor desarrollo  |
| `npm run build` | Build producción   |
| `npm run start` | Servidor producción |

## Colores de marca

| Color    | Hex       |
|----------|-----------|
| Morado   | `#7C529C` |
| Oliva    | `#94B415` |
| Blanco   | `#FFFFFF` |
| Negro    | `#111111` |
| Gris claro | `#F5F5F5` |
