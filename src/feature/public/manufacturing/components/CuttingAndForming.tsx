import { ManufacturingStage } from "./ManufacturingUi";
import type { CopyProps } from "../types/manufacturing.types";
export default function CuttingAndForming({ copy }: CopyProps) {
  return <ManufacturingStage content={copy.stages.cutting} variant={1} dark={true} />;
}
