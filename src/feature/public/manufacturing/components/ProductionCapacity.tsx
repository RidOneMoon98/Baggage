import {
  ManufacturingBlock,
  ManufacturingHeading,
  ManufacturingCards,
} from "./ManufacturingUi";
import type { CopyProps } from "../types/manufacturing.types";
export default function ProductionCapacity({ copy }: CopyProps) {
  return (
    <ManufacturingBlock dark={false}>
      <ManufacturingHeading {...copy.capacity} dark={false} />
      <ManufacturingCards items={copy.capacity.items} dark={false} />
    </ManufacturingBlock>
  );
}
