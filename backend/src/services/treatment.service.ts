import { prisma } from "../config/prisma.js";

export async function listTreatments() {
  const items = await prisma.tratamiento.findMany({
    orderBy: { nombre: "asc" },
  });

  return items.map((t) => ({
    id: t.id,
    nombre: t.nombre,
    descripcion: t.descripcion,
    precio: Number(t.precio),
    duracion: t.duracion,
  }));
}
