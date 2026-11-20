import { ManufacturingStage } from "./ManufacturingUi";
import type { CopyProps } from "../types/manufacturing.types";
export default function QualityControl({ copy }: CopyProps) {
  return <ManufacturingStage content={copy.stages.quality} variant={4} dark={true} />;
}
