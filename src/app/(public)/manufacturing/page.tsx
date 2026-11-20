import ManufacturingSection from "@/src/feature/public/manufacturing/components/ManufacturingSection";
import { manufacturingData } from "@/src/feature/public/manufacturing/data/manufacturing.data";
export default function ManufacturingPage() {
  return <ManufacturingSection data={manufacturingData} />;
}
