"use client";
import { useState } from "react";
import { useLanguage } from "@/src/providers";
import type {
  ManufacturingCopy,
  ManufacturingData,
} from "../types/manufacturing.types";
import ManufacturingHero from "./ManufacturingHero";
import ManufacturingOverview from "./ManufacturingOverview";
import ManufacturingStatistics from "./ManufacturingStatistics";
import ProductionCategories from "./ProductionCategories";
import ManufacturingProcess from "./ManufacturingProcess";
import MaterialPreparation from "./MaterialPreparation";
import CuttingAndForming from "./CuttingAndForming";
import SewingAndAssembly from "./SewingAndAssembly";
import BrandingAndFinishing from "./BrandingAndFinishing";
import QualityControl from "./QualityControl";
import PackagingAndDispatch from "./PackagingAndDispatch";
import ProductionCapacity from "./ProductionCapacity";
import EquipmentAndWorkstations from "./EquipmentAndWorkstations";
import FactoryGallery from "./FactoryGallery";
import CustomManufacturing from "./CustomManufacturing";
import ResponsibleManufacturing from "./ResponsibleManufacturing";
import ProductionPlanning from "./ProductionPlanning";
import FactoryVisitSection from "./FactoryVisitSection";
import ManufacturingFaq from "./ManufacturingFaq";
import ManufacturingInquiryCta from "./ManufacturingInquiryCta";
export default function ManufacturingSection({
  data,
  copy: providedCopy,
}: {
  data: ManufacturingData;
  copy?: ManufacturingCopy;
}) {
  const { t } = useLanguage();
  const copy = providedCopy ?? t.manufacturingPage;
  const [selected, setSelected] = useState(data.categories[0]?.id ?? "");
  return (
    <main className="w-full overflow-x-clip bg-background text-foreground">
      <ManufacturingHero copy={copy} data={data} />
      <ManufacturingOverview copy={copy} />
      <ManufacturingStatistics copy={copy} data={data} />
      <ProductionCategories
        copy={copy}
        data={data}
        selected={selected}
        onSelect={setSelected}
      />
      <ManufacturingProcess copy={copy} />
      <MaterialPreparation copy={copy} />
      <CuttingAndForming copy={copy} />
      <SewingAndAssembly copy={copy} />
      <BrandingAndFinishing copy={copy} />
      <QualityControl copy={copy} />
      <PackagingAndDispatch copy={copy} />
      <ProductionCapacity copy={copy} />
      <EquipmentAndWorkstations copy={copy} />
      <FactoryGallery copy={copy} images={data.gallery} />
      <CustomManufacturing copy={copy} href={data.oemOdmHref} />
      <ResponsibleManufacturing copy={copy} />
      <ProductionPlanning copy={copy} />
      <FactoryVisitSection copy={copy} href={data.contactHref} />
      <ManufacturingFaq copy={copy} />
      <ManufacturingInquiryCta
        copy={copy}
        data={data}
        selected={selected}
        onSelect={setSelected}
      />
    </main>
  );
}
