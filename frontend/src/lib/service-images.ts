import { readdirSync, existsSync } from "fs";
import path from "path";

const SERVICE_IMAGE_MAP: Record<string, string[]> = {
  manicura: ["manicura"],
  pedicura: ["pedicure", "pedicura"],
  peluqueria: ["peluqueria"],
  barberia: ["barberia", "facialAlfred", "peluqueria"],
  faciales: ["facial", "facialeze"],
  masajes: ["masaje"],
  depilacion: ["depilacion"],
  spa: ["spa", "material", "masaje", "muestra"],
};

function findServiceImage(serviceId: string): string {
  const dir = path.join(process.cwd(), "public/img/services");
  if (!existsSync(dir)) return `/img/services/muestra.jpg`;

  const files = readdirSync(dir).filter((f) =>
    /\.(jpe?g|png|webp|avif)$/i.test(f)
  );

  const keywords = SERVICE_IMAGE_MAP[serviceId] ?? [serviceId];

  for (const keyword of keywords) {
    const match = files.find((f) =>
      f.toLowerCase().includes(keyword.toLowerCase())
    );
    if (match) return `/img/services/${match}`;
  }

  return files[0] ? `/img/services/${files[0]}` : "/img/hero/muestra.jpg";
}

export function getServiceImagePath(serviceId: string): string {
  return findServiceImage(serviceId);
}
