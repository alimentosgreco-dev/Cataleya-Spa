# Cataleya Beauty & Spa

Sistema completo de reservas con pago en línea (Mercado Pago Checkout Pro), API REST y sitio web premium.

## Estructura del proyecto

```
Cataleya-Spa/
├── frontend/          # Next.js 16 + React 19 + Tailwind
├── backend/           # Express + Prisma + Mercado Pago
└── database/          # Docker PostgreSQL local
```

## Requisitos

- Node.js 20+
- Docker y Docker Compose
- Cuenta Mercado Pago (Access Token de prueba o producción)

## Instalación rápida

### 1. Base de datos

```bash
cd database
docker compose up -d
```

### 2. Backend

```bash
cd backend
cp .env.example .env
# Editar .env: MP_ACCESS_TOKEN, DATABASE_URL, FRONTEND_URL, BACKEND_URL
npm install
npx prisma generate
npx prisma migrate deploy
npm run db:seed
npm run dev
```

API disponible en `http://localhost:4000`

### 3. Frontend

```bash
cd frontend
cp .env.example .env.local
# NEXT_PUBLIC_API_URL=http://localhost:4000/api
npm install
npm run dev
```

Sitio en `http://localhost:3000`

### Desde la raíz (recomendado)

Ejecuta siempre desde la carpeta `Cataleya-Spa/` (no mezcles `cd database` y luego `cd backend` en la misma línea).

```bash
# Una sola vez: instalar + BD + migraciones + seed
npm install
npm run setup

# Terminal 1 — API (puerto 4000)
npm run dev:api

# Terminal 2 — sitio web (puerto 3000)
npm run dev
```

> **`npm run dev` en la raíz solo inicia el frontend.** El backend es `npm run dev:api`.

## Variables de entorno

### Backend (`backend/.env`)

| Variable | Descripción |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `MP_ACCESS_TOKEN` | Token de Mercado Pago |
| `FRONTEND_URL` | URL del sitio (redirects MP) |
| `BACKEND_URL` | URL pública del API (webhooks) |
| `CORS_ORIGIN` | Origen permitido del frontend |
| `JWT_SECRET` | Secreto JWT (uso futuro admin) |

### Frontend (`frontend/.env.local`)

| Variable | Descripción |
|----------|-------------|
| `NEXT_PUBLIC_API_URL` | Base URL del API (`http://localhost:4000/api`) |
| `NEXT_PUBLIC_SITE_URL` | URL del sitio |

## API REST

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/treatments` | Lista tratamientos |
| GET | `/api/availability?fecha=YYYY-MM-DD` | Horarios libres |
| POST | `/api/reservations` | Crear reserva + preferencia MP |
| GET | `/api/reservations/:id` | Detalle reserva |
| POST | `/api/payments/create-preference` | Preferencia MP por IDs |
| POST | `/api/payments/webhook` | Webhook Mercado Pago |

### Crear reserva

```json
POST /api/reservations
{
  "nombre": "María López",
  "correo": "maria@email.com",
  "telefono": "5512345678",
  "tratamientoId": "f1",
  "fecha": "2026-06-15",
  "hora": "11:00",
  "comentarios": "Primera visita"
}
```

Respuesta incluye `payment.init_point` para redirigir a Mercado Pago.

## Horarios

Disponibles de **10:00 a 17:00** (cada hora). Los horarios con reserva **pagada** quedan bloqueados.

## Problemas frecuentes

### `cd backend: No such file or directory`

Ocurre si hiciste `cd database` antes: desde ahí no existe `backend/`. Vuelve a la raíz:

```bash
cd ~/Documents/projects/cataleya/website/Cataleya-Spa
npm run db:migrate
npm run dev:api
```

### `P1010` / acceso denegado a PostgreSQL

Arch Linux suele tener Postgres en el puerto **5432**. El Docker del proyecto usa el **5433**:

```env
DATABASE_URL=postgresql://cataleya:cataleya_dev@localhost:5433/cataleya_spa
```

### El sitio abre en el puerto 3001

Otro proceso usa el 3000. Opciones:

- Cerrar ese proceso y usar `http://localhost:3000`
- O usar `http://localhost:3001` y en `backend/.env` agregar ambos orígenes CORS:

```env
CORS_ORIGIN=http://localhost:3000,http://localhost:3001
FRONTEND_URL=http://localhost:3001
```

### Las reservas fallan (fetch error)

El **backend debe estar corriendo** en otra terminal con `npm run dev:api` → `http://localhost:4000/api/health` debe responder `{"status":"ok"}`.

### CPU al 100 % con muchos procesos `postcss.js`

Turbopack + Tailwind 4 puede lanzar **decenas de workers** en la primera compilación.

1. Detén el servidor (`Ctrl+C`).
2. Mata procesos huérfanos:

```bash
pkill -f "next dev" 2>/dev/null
pkill -f "postcss.js" 2>/dev/null
```

3. Limpia caché y arranca en modo ligero (webpack, por defecto):

```bash
cd frontend
rm -rf .next
npm run dev
```

Solo usa Turbopack si lo necesitas: `npm run dev:turbo` (más CPU).

## Imágenes locales

Todas las imágenes viven en `frontend/public/img/`:

- `hero/` — portada
- `services/` — tarjetas de servicios
- `gallery/` — galería (lectura automática desde carpeta)
- `treatments/` — tratamientos (opcional)

## Mercado Pago — Webhook en desarrollo

Usa [ngrok](https://ngrok.com) o similar para exponer el backend:

```bash
ngrok http 4000
```

Configura en Mercado Pago la URL de notificación:

```
https://tu-dominio.ngrok.io/api/payments/webhook
```

Actualiza `BACKEND_URL` en `.env` con la URL pública.

## Despliegue sugerido

| Componente | Plataforma sugerida |
|------------|---------------------|
| Frontend | Vercel / Netlify |
| Backend | Railway / Render / Fly.io |
| PostgreSQL | Neon / Supabase / Railway |

1. Desplegar PostgreSQL y ejecutar migraciones + seed.
2. Desplegar backend con variables de entorno de producción.
3. Desplegar frontend con `NEXT_PUBLIC_API_URL` apuntando al API.
4. Configurar webhook de Mercado Pago con la URL de producción del backend.
5. Usar credenciales de **producción** de Mercado Pago en producción.

## Seguridad implementada

- Validación Zod en todos los endpoints de escritura
- Sanitización HTML en body
- Helmet, CORS configurado
- Rate limiting en reservas y webhooks

## Páginas del frontend

- `/` — Landing con reservas
- `/success?reserva={id}` — Confirmación de pago
- `/error` — Pago fallido
