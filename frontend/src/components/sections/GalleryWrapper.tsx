import { getGalleryImages } from "@/lib/gallery-images";
import { Gallery } from "./Gallery";

export function GalleryWrapper() {
  const images = getGalleryImages();
  return <Gallery images={images} />;
}
