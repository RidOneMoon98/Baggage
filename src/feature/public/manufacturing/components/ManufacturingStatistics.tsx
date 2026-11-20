import { Factory, Users, Workflow, Layers3 } from "lucide-react";
import ManufacturingSurface from "./ManufacturingSurface";
import { ManufacturingBlock, ManufacturingHeading } from "./ManufacturingUi";
import type { CopyProps, ManufacturingData } from "../types/manufacturing.types";
export default function ManufacturingStatistics({
  copy,
  data,
}: CopyProps & { data: ManufacturingData }) {
  const c = copy.statistics;
  const items = [
    { label: c.employees, value: String(data.employees), Icon: Users },
    { label: c.area, value: data.floorArea, Icon: Factory },
    { label: c.regular, value: String(data.regularLines), Icon: Workflow },
    { label: c.reserve, value: String(data.reserveLines), Icon: Layers3 },
  ];
  return (
    <ManufacturingBlock dark>
      <ManufacturingHeading {...c} dark />
      <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ label, value, Icon }) => (
          <ManufacturingSurface key={label} dark className="overflow-hidden p-7">
            <div
              aria-hidden="true"
              className="absolute -right-5 -top-6 size-32 rounded-full border border-[#d4b982]/10"
            />
            <div className="mb-10 flex size-16 items-center justify-center rounded-[22px] border border-[#eddbb3]/60 bg-gradient-to-br from-[#efdfba] via-[#bfa06a] to-[#957139] text-[#574121] shadow-[4px_6px_0_#6b502b,inset_1px_1px_2px_#fff8] [transform:rotateY(-18deg)_rotateZ(-7deg)]">
              <Icon className="size-7" strokeWidth={1.2} />
            </div>
            <p className="relative break-words font-serif text-4xl tracking-tight text-[#f5e5c6]">
              {value}
            </p>
            <h3 className="mt-4 text-base leading-7 text-[#c7c1b6]">{label}</h3>
            <div
              aria-hidden="true"
              className="mt-7 h-px w-16 bg-gradient-to-r from-[#cbb079]/70 to-transparent"
            />
          </ManufacturingSurface>
        ))}
      </div>
    </ManufacturingBlock>
  );
}
