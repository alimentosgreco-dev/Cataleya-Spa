import { PrismaClient } from "@prisma/client";
import { seedTreatments } from "./seed-data.js";

const prisma = new PrismaClient();

async function main() {
  for (const t of seedTreatments) {
    await prisma.tratamiento.upsert({
      where: { id: t.id },
      create: {
        id: t.id,
        nombre: t.nombre,
        descripcion: t.descripcion ?? null,
        precio: t.precio,
        duracion: t.duracion,
      },
      update: {
        nombre: t.nombre,
        descripcion: t.descripcion ?? null,
        precio: t.precio,
        duracion: t.duracion,
      },
    });
  }
  console.log(`Seeded ${seedTreatments.length} tratamientos`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
