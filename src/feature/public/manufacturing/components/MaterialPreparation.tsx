import { ManufacturingStage } from "./ManufacturingUi";
import type { CopyProps } from "../types/manufacturing.types";
export default function MaterialPreparation({ copy }: CopyProps) {
  return <ManufacturingStage content={copy.stages.material} variant={0} dark={false} />;
}
