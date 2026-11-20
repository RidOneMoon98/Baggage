import {
  ManufacturingBlock,
  ManufacturingHeading,
  WorkstationIllustration,
} from "./ManufacturingUi";
import type { CopyProps, TextItem } from "../types/manufacturing.types";
export default function EquipmentAndWorkstations({ copy }: CopyProps) {
  return (
    <ManufacturingBlock dark>
      <ManufacturingHeading {...copy.equipment} dark />
      <div className="mt-10 grid gap-8 md:grid-cols-3">
        {copy.equipment.items.map((item: TextItem, index: number) => (
          <article
            key={item.title}
            className="overflow-hidden rounded-t-[120px] rounded-b-[28px] border border-[#d1b77f]/20 bg-gradient-to-br from-[#393329] to-[#24211b] shadow-[2px_3px_0_#8b734b,8px_11px_0_#11100e,0_25px_40px_-20px_black]"
          >
            <WorkstationIllustration variant={index} />
            <div className="px-7 pb-8">
              <h3 className="font-serif text-2xl">{item.title}</h3>
              <p className="mt-4 text-base leading-7 text-[#c8c2b6]">
                {item.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </ManufacturingBlock>
  );
}
