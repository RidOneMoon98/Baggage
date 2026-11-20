import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "@/src/components/ui/button";
import { ManufacturingBlock, ManufacturingHeading } from "./ManufacturingUi";
import ManufacturingSurface from "./ManufacturingSurface";
import type { CopyProps } from "../types/manufacturing.types";
export default function CustomManufacturing({
  copy,
  href,
}: CopyProps & { href: string }) {
  return (
    <ManufacturingBlock>
      <ManufacturingSurface className="overflow-hidden p-7 sm:p-10">
        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <ManufacturingHeading {...copy.custom} />
            <Link
              href={href}
              className={buttonVariants({ className: "mt-8", size: "lg" })}
            >
              {copy.custom.button}
            </Link>
          </div>
          <div className="relative h-[360px] [perspective:900px]">
            <div
              aria-hidden="true"
              className="absolute inset-x-[20%] bottom-3 h-10 rounded-full bg-[#6c5633]/25 blur-xl"
            />
            <Image
              src="/cream-wristlet-3d.png"
              alt={copy.photos.names["photo-11"]}
              fill
              sizes="(max-width:1024px) 80vw,35vw"
              className="object-contain p-4 drop-shadow-[12px_18px_16px_#0004] [transform:rotateY(-15deg)_rotateZ(-7deg)]"
            />
          </div>
        </div>
      </ManufacturingSurface>
    </ManufacturingBlock>
  );
}
