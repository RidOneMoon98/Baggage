import { ManufacturingStage } from "./ManufacturingUi";
import type { CopyProps } from "../types/manufacturing.types";
export default function SewingAndAssembly({ copy }: CopyProps) {
  return <ManufacturingStage content={copy.stages.sewing} variant={2} dark={false} />;
}
