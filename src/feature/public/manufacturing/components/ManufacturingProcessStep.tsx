import { Check } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import type { TextItem } from "../types/manufacturing.types";
export default function ManufacturingProcessStep({
  item,
  active = false,
  onSelect,
}: {
  item: TextItem;
  active?: boolean;
  onSelect?: () => void;
}) {
  return (
    <li>
      <Button
        variant="ghost"
        aria-pressed={active}
        onClick={onSelect}
        className={
          "h-auto w-full justify-start gap-4 whitespace-normal rounded-[24px] border px-5 py-5 text-left shadow-[3px_5px_0_#100f0d] " +
          (active
            ? "border-[#e5ca95]/50 bg-gradient-to-br from-[#e9d5ac] to-[#b3955f] text-[#30271a] hover:bg-[#d2bb90] hover:text-[#30271a]"
            : "border-white/10 bg-[#302c25] text-[#e9dfcc] hover:bg-[#3c352a] hover:text-white")
        }
      >
        <span
          className={
            "flex size-11 shrink-0 items-center justify-center rounded-full border " +
            (active
              ? "border-white/50 bg-white/20"
              : "border-[#b99c65]/30 bg-[#c0a16a]/10")
          }
        >
          <Check className="size-5" aria-hidden="true" />
        </span>
        <span className="font-serif text-2xl leading-tight">{item.title}</span>
      </Button>
    </li>
  );
}
