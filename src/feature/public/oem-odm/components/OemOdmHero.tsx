



import Link from "next/link";
import { buttonVariants } from "@/src/components/ui/button";
import OemOdmHeroVisual from "./OemOdmHeroVisual";
import type { CopyProps } from "../types/oem-odm.types";

export default function OemOdmHero({ copy }: CopyProps) {
  return (
    <section className="overflow-hidden bg-background px-5 py-16 sm:px-8 lg:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-sm tracking-[0.15em] text-accent">
            {copy.hero.eyebrow}
          </p>
          <h1 className="mt-6 font-serif text-6xl leading-[1.02] tracking-tight text-primary sm:text-7xl xl:text-8xl">
            {copy.hero.title}
            <br />
            <em className="font-normal text-accent">{copy.hero.highlight}</em>
          </h1>
          <p className="mt-7 max-w-xl text-base leading-8 text-secondary">
            {copy.hero.description}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="#project-inquiry"
              className={buttonVariants({ size: "lg" })}
            >
              {copy.hero.primary}
            </Link>
            <Link
              href="#oem-odm-services"
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              {copy.hero.secondary}
            </Link>
          </div>
        </div>
        <div className="mx-auto w-full max-w-lg px-2 pb-4">
          <OemOdmHeroVisual copy={copy} color="#e2d4ad" />
        </div>
      </div>
    </section>
  );
}