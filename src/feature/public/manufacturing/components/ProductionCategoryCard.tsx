"use client";
import Image from "next/image";
import { useState } from "react";
import { ImageOff } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import ManufacturingSurface from "./ManufacturingSurface";
import type { ProductPhoto } from "../types/manufacturing.types";
export default function ProductionCategoryCard({
  photo,
  label,
  action,
  selected,
  onSelect,
  unavailable,
}: {
  photo: ProductPhoto;
  label: string;
  action: string;
  selected: boolean;
  onSelect: () => void;
  unavailable: string;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <ManufacturingSurface
      className={
        "group flex flex-col overflow-hidden !rounded-t-[130px] !rounded-b-[28px] " +
        (selected ? "ring-2 ring-accent/60" : "")
      }
    >
      <div className="relative h-[290px] overflow-hidden bg-[radial-gradient(ellipse_at_40%_25%,#fffdf8_0%,#eee6d7_60%,#d9cbb2_100%)] [perspective:800px]">
        <div
          aria-hidden="true"
          className="absolute inset-x-[20%] bottom-7 h-8 rounded-[50%] bg-[#5b4930]/25 blur-xl"
        />
        <div
          aria-hidden="true"
          className="absolute inset-[18%] rounded-[50%] border border-accent/20 [transform:rotateX(60deg)]"
        />
        {!failed ? (
          <Image
            src={photo.src}
            alt={photo.name}
            fill
            unoptimized={photo.kind === "local"}
            sizes="(max-width:640px) 90vw,(max-width:1024px) 45vw,30vw"
            onError={() => setFailed(true)}
            className="select-none object-contain p-8 drop-shadow-[10px_18px_12px_rgba(0,0,0,0.25)] transition-transform duration-500 [transform:translateZ(25px)_rotate(-5deg)] motion-safe:group-hover:[transform:translateY(-18px)_rotate(6deg)_scale(1.10)]"
          />
        ) : (
          <div
            role="status"
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-8 text-center text-secondary"
          >
            <ImageOff className="size-9" />
            {unavailable}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col border-t border-white/70 bg-white/80 p-6">
        <p className="text-xs tracking-wide text-accent">{label}</p>
        <h3 className="mt-3 break-words font-serif text-2xl">{photo.name}</h3>
        <div className="mt-6">
          <Button
            variant={selected ? "default" : "outline"}
            className="w-full transition-[background-color,color,box-shadow] duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-[0_7px_18px_-10px_#0008]"
            aria-pressed={selected}
            onClick={onSelect}
          >
            {action}
          </Button>
        </div>
      </div>
    </ManufacturingSurface>
  );
}
