import {
  ManufacturingBlock,
  ManufacturingHeading,
  ManufacturingCards,
} from "./ManufacturingUi";
import type { CopyProps } from "../types/manufacturing.types";
export default function ProductionPlanning({ copy }: CopyProps) {
  return (
    <ManufacturingBlock dark={false}>
      <ManufacturingHeading {...copy.planning} dark={false} />
      <ManufacturingCards items={copy.planning.items} dark={false} />
    </ManufacturingBlock>
  );
}
