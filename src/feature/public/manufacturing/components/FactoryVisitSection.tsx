import Link from "next/link";
import { MapPin } from "lucide-react";
import { buttonVariants } from "@/src/components/ui/button";
import { ManufacturingBlock, ManufacturingHeading } from "./ManufacturingUi";
import type { CopyProps, TextItem } from "../types/manufacturing.types";
export default function FactoryVisitSection({
  copy,
  href,
}: CopyProps & {
  href: string;
}) {
  return (
    <ManufacturingBlock dark>
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <ManufacturingHeading {...copy.visit} dark />
          <div className="mt-7 flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-5">
            <MapPin className="mt-1 size-5 shrink-0 text-[#d2b781]" />
            <div>
              <h3 className="text-sm text-[#d2b781]">{copy.visit.addressLabel}</h3>
              <p className="mt-2 text-base leading-7 text-[#c8c2b6]">
                {copy.company.location}
              </p>
            </div>
          </div>
          <Link
            href={href}
            className={buttonVariants({
              variant: "accent",
              className: "mt-7",
              size: "lg",
            })}
          >
            {copy.visit.button}
          </Link>
        </div>
        <ol className="space-y-6">
          {copy.visit.steps.map((item: TextItem) => (
            <li
              key={item.title}
              className="rounded-[26px] border border-[#c4a875]/20 bg-gradient-to-br from-[#383229] to-[#25221c] p-7 shadow-[2px_3px_0_#8e754a,7px_9px_0_#100f0d,0_20px_30px_-20px_black]"
            >
              <h3 className="font-serif text-2xl">{item.title}</h3>
              <p className="mt-3 text-base leading-7 text-[#c8c2b6]">
                {item.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </ManufacturingBlock>
  );
}
