import { ManufacturingStage } from "./ManufacturingUi";
import type { CopyProps } from "../types/manufacturing.types";
export default function PackagingAndDispatch({ copy }: CopyProps) {
  return (
    <ManufacturingStage content={copy.stages.packaging} variant={5} dark={false} />
  );
}
