# Base de datos — Cataleya Beauty & Spa

PostgreSQL local con Docker.

## Iniciar

```bash
cd database
docker compose up -d
```

## Conexión

```
postgresql://cataleya:cataleya_dev@localhost:5433/cataleya_spa
```

Configura `DATABASE_URL` en `backend/.env` con esta URL.
