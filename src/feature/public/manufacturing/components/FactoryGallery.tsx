import { ManufacturingBlock, ManufacturingHeading } from "./ManufacturingUi";
import FactoryGalleryCard from "./FactoryGalleryCard";
import type { CopyProps, GalleryImage } from "../types/manufacturing.types";
export default function FactoryGallery({
  copy,
  images,
}: CopyProps & { images: GalleryImage[] }) {
  if (!images.length) return null;
  return (
    <ManufacturingBlock>
      <ManufacturingHeading {...copy.gallery} />
      <div className="mt-12 grid gap-8 sm:grid-cols-2">
        {images.map((image, index) => {
          const caption = copy.photos.galleryCaptions[index] ?? image.caption;
          return (
            <FactoryGalleryCard
              key={image.src}
              image={{ ...image, alt: image.alt || caption, caption }}
            />
          );
        })}
      </div>
    </ManufacturingBlock>
  );
}
