"use client";
import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ManufacturingSurface from "./ManufacturingSurface";
import {
  ManufacturingBlock,
  ManufacturingHeading,
  WorkstationIllustration,
} from "./ManufacturingUi";
import ManufacturingProcessStep from "./ManufacturingProcessStep";
import type { CopyProps } from "../types/manufacturing.types";
export default function ManufacturingProcess({ copy }: CopyProps) {
  const [active, setActive] = useState(0);
  const items = copy.process.items;
  const current = items[active];
  return (
    <ManufacturingBlock id="manufacturing-process" dark>
      <ManufacturingHeading {...copy.process} dark />
      <div className="mt-12 grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <ol className="space-y-4">
          {items.map((item, index) => (
            <ManufacturingProcessStep
              key={item.title}
              item={item}
              active={active === index}
              onSelect={() => setActive(index)}
            />
          ))}
        </ol>
        {current && (
          <ManufacturingSurface dark className="flex flex-col p-7 sm:p-9">
            <WorkstationIllustration variant={active} />
            <div className="mt-auto">
              <h3 className="font-serif text-3xl">{current.title}</h3>
              <p className="mt-5 text-base leading-8 text-[#c7c1b6]">
                {current.description}
              </p>
              <div className="mt-7 flex justify-between gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  disabled={active === 0}
                  aria-label={copy.process.previous}
                  onClick={() => setActive((value) => Math.max(0, value - 1))}
                >
                  <ChevronLeft />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  disabled={active === items.length - 1}
                  aria-label={copy.process.next}
                  onClick={() =>
                    setActive((value) => Math.min(items.length - 1, value + 1))
                  }
                >
                  <ChevronRight />
                </Button>
              </div>
            </div>
          </ManufacturingSurface>
        )}
      </div>
    </ManufacturingBlock>
  );
}
