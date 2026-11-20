import { MapPin } from "lucide-react";
import {
  ManufacturingBlock,
  ManufacturingHeading,
  ManufacturingCards,
} from "./ManufacturingUi";
import type { CopyProps } from "../types/manufacturing.types";
export default function ManufacturingOverview({ copy }: CopyProps) {
  return (
    <ManufacturingBlock>
      <div className="grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
        <ManufacturingHeading {...copy.overview} />
        <aside className="self-start rounded-[26px] border border-white bg-gradient-to-br from-white to-[#e6dbc4] p-7 shadow-[2px_3px_0_#fff2d7,8px_10px_0_#bdab89,0_25px_40px_-25px_#68512f]">
          <MapPin className="size-7 text-accent" strokeWidth={1.3} />
          <h3 className="mt-5 font-serif text-2xl">{copy.company.name}</h3>
          <p className="mt-4 text-base leading-7 text-secondary">
            {copy.company.location}
          </p>
          <p className="mt-5 border-t border-accent/20 pt-4 text-sm text-accent">
            {copy.company.founded}
          </p>
        </aside>
      </div>
      <ManufacturingCards items={copy.overview.items} />
    </ManufacturingBlock>
  );
}
