import Link from "next/link";
import { buttonVariants } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";
import ManufacturingHeroScene from "./ManufacturingHeroScene";
import type { CopyProps, ManufacturingData } from "../types/manufacturing.types";
export default function ManufacturingHero({
  copy,
  data,
}: CopyProps & { data: ManufacturingData }) {
  return (
    <section className="relative isolate overflow-hidden bg-[#1b1a17] px-3 pb-16 pt-14 text-[#f2eadb] sm:px-5 lg:px-6 lg:pb-24 lg:pt-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_50%,rgba(194,158,94,0.14),transparent_70%)]"
      />
      <div className="mx-auto w-full max-w-none">
        <div className="grid items-end gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-sm tracking-[0.14em] text-[#d4b980]">
              {copy.hero.eyebrow}
            </p>
            <h1 className="mt-5 font-serif text-5xl leading-[1.06] tracking-tight sm:text-6xl xl:text-7xl">
              {copy.hero.title}
              <br />
              <em className="font-normal text-[#d3ba8a]">{copy.hero.highlight}</em>
            </h1>
          </div>
          <div>
            <p className="text-base leading-8 text-[#c8c1b5]">
              {copy.hero.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="#manufacturing-inquiry"
                className={buttonVariants({ variant: "accent", size: "lg" })}
              >
                {copy.hero.primary}
              </Link>
              <Link
                href="#production-categories"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "border-white/20 bg-transparent text-[#f2eadb] hover:bg-white/10 hover:text-white",
                )}
              >
                {copy.photos.photos}
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-12 w-full pr-2 pb-3">
          <ManufacturingHeroScene copy={copy} photos={data.photos} />
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#ccb17b]/15 pt-6 text-sm text-[#bfae8c]">
          <p>{copy.company.name}</p>
          <p>
            {copy.hero.sceneTitle} · {data.photos.length} {copy.photos.photos}
          </p>
        </div>
      </div>
    </section>
  );
}
