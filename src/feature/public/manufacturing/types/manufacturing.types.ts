export type ProductionGroup = "bags" | "cases" | "pet";
export type ModelKind = "wristlet" | "handbag" | "backpack" | "duffel" | "pet";
export interface TextItem {
  title: string;
  description: string;
}
export interface HeadingCopy {
  eyebrow: string;
  title: string;
  description: string;
}
export interface ContentCopy extends HeadingCopy {
  items: TextItem[];
}
export interface ProductionCategory {
  id: string;
  group: ProductionGroup;
  kind: ModelKind;
  color: string;
  image?: string;
}
export interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
}
export interface ProductPhoto {
  conveyor?: boolean;
  id: string;
  src: string;
  categoryIds: string[];
  kind: "reference" | "visualization" | "local";
  name: string;
}
export interface ManufacturingData {
  photos: ProductPhoto[];
  allowLocalPreview?: boolean;
  founded: string;
  employees: number;
  floorArea: string;
  regularLines: number;
  reserveLines: number;
  categories: ProductionCategory[];
  gallery: GalleryImage[];
  contactHref: string;
  oemOdmHref: string;
}
export type StageKey =
  | "material"
  | "cutting"
  | "sewing"
  | "branding"
  | "quality"
  | "packaging";
export interface PhotoCopy {
  eyebrow: string;
  title: string;
  description: string;
  all: string;
  photos: string;
  previous: string;
  next: string;
  select: string;
  preview: string;
  previewNote: string;
  clearPreview: string;
  local: string;
  reference: string;
  render: string;
  empty: string;
  unavailable: string;
  show: string;
  counter: string;
  close: string;
  scene: string;
  sceneText: string;
  request: string;
  noFiles: string;
  limit: string;
  galleryCaptions: string[];
  names: Record<string, string>;
}
export interface ManufacturingCopy {
  photos: PhotoCopy;
  company: {
    name: string;
    location: string;
    founded: string;
  };
  hero: HeadingCopy & {
    highlight: string;
    primary: string;
    secondary: string;
    sceneTitle: string;
    sceneDescription: string;
    sceneLabel: string;
    loading: string;
    fallback: string;
    pause: string;
    play: string;
    left: string;
    right: string;
    stages: string[];
    drag: string;
  };
  overview: ContentCopy;
  statistics: HeadingCopy & {
    employees: string;
    area: string;
    regular: string;
    reserve: string;
  };
  categories: HeadingCopy & {
    search: string;
    clear: string;
    submit: string;
    groups: Record<ProductionGroup, string>;
    filter: string;
    results: string;
    empty: string;
    reset: string;
    showAll: string;
    view: string;
    selected: string;
    contact: string;
    imageNote: string;
    items: Record<
      string,
      {
        name: string;
        description: string;
      }
    >;
  };
  process: ContentCopy & { previous: string; next: string };
  stages: Record<StageKey, ContentCopy>;
  capacity: ContentCopy;
  equipment: ContentCopy;
  gallery: HeadingCopy;
  custom: HeadingCopy & {
    button: string;
  };
  responsible: ContentCopy;
  planning: ContentCopy;
  visit: HeadingCopy & {
    button: string;
    addressLabel: string;
    steps: TextItem[];
  };
  faq: HeadingCopy & {
    search: string;
    items: {
      question: string;
      answer: string;
    }[];
    empty: string;
  };
  inquiry: HeadingCopy & {
    name: string;
    email: string;
    product: string;
    quantity: string;
    requirements: string;
    placeholder: string;
    prepare: string;
    summary: string;
    copy: string;
    copied: string;
    failed: string;
    contact: string;
    note: string;
    options: string;
    logo: string;
    sample: string;
    packaging: string;
  };
}
export interface CopyProps {
  copy: ManufacturingCopy;
}
