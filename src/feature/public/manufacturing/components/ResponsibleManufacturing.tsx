import {
  ManufacturingBlock,
  ManufacturingHeading,
  ManufacturingCards,
} from "./ManufacturingUi";
import type { CopyProps } from "../types/manufacturing.types";
export default function ResponsibleManufacturing({ copy }: CopyProps) {
  return (
    <ManufacturingBlock dark={true}>
      <ManufacturingHeading {...copy.responsible} dark={true} />
      <ManufacturingCards items={copy.responsible.items} dark={true} />
    </ManufacturingBlock>
  );
}
