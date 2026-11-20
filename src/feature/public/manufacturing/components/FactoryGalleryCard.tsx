import Image from "next/image";
import ManufacturingSurface from "./ManufacturingSurface";
import type { GalleryImage } from "../types/manufacturing.types";
export default function FactoryGalleryCard({ image }: { image: GalleryImage }) {
  return (
    <ManufacturingSurface className="group overflow-hidden">
      <figure>
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width:640px) 90vw,45vw"
            className="object-cover transition-transform duration-700 motion-safe:group-hover:scale-105"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"
          />
        </div>
        <figcaption className="border-t border-white/80 p-6 font-serif text-2xl leading-snug">
          {image.caption}
        </figcaption>
      </figure>
    </ManufacturingSurface>
  );
}
