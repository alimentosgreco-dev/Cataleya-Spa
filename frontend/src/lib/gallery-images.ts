import { readdirSync } from "fs";
import path from "path";

const IMAGE_EXT = /\.(jpe?g|png|webp|avif|gif)$/i;

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  tall?: boolean;
}

function titleFromFilename(filename: string): string {
  const base = filename.replace(/\.[^.]+$/, "");
  return base
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function getGalleryImages(): GalleryImage[] {
  const dir = path.join(process.cwd(), "public/img/gallery");

  let files: string[] = [];
  try {
    files = readdirSync(dir).filter((f) => IMAGE_EXT.test(f)).sort();
  } catch {
    return [];
  }

  return files.map((file, index) => ({
    id: `gallery-${index}-${file}`,
    src: `/img/gallery/${file}`,
    alt: `Cataleya Beauty & Spa — ${titleFromFilename(file)}`,
    tall: index % 3 === 0,
  }));
}
