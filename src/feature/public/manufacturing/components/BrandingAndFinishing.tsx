import { ManufacturingStage } from "./ManufacturingUi";
import type { CopyProps } from "../types/manufacturing.types";
export default function BrandingAndFinishing({ copy }: CopyProps) {
  return <ManufacturingStage content={copy.stages.branding} variant={3} dark={false} />;
}
