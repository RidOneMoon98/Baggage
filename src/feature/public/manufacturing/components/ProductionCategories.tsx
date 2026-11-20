"use client";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Images, Plus, Trash2 } from "lucide-react";
import { Search } from "@/src/components/ui/search";
import { Button, buttonVariants } from "@/src/components/ui/button";
import { Checkbox } from "@/src/components/ui/checkbox";
import { ManufacturingBlock, ManufacturingHeading } from "./ManufacturingUi";
import ManufacturingSurface from "./ManufacturingSurface";
import ProductionCategoryCard from "./ProductionCategoryCard";
import type {
  CopyProps,
  ManufacturingData,
  ProductPhoto,
  ProductionGroup,
} from "../types/manufacturing.types";
const groups: ProductionGroup[] = ["bags", "cases", "pet"];
export default function ProductionCategories({
  copy,
  data,
  selected,
  onSelect,
}: CopyProps & {
  data: ManufacturingData;
  selected: string;
  onSelect: (id: string) => void;
}) {
  const c = copy.categories,
    p = copy.photos;
  const picker = useRef<HTMLInputElement>(null),
    urls = useRef<string[]>([]),
    detail = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState(""),
    [filters, setFilters] = useState<ProductionGroup[]>([]),
    [direction, setDirection] = useState("all"),
    [local, setLocal] = useState<ProductPhoto[]>([]),
    [focus, setFocus] = useState<ProductPhoto | null>(null),
    [limit, setLimit] = useState(Number.MAX_SAFE_INTEGER),
    [notice, setNotice] = useState("");
  useEffect(
    () => () => {
      urls.current.forEach((url) => URL.revokeObjectURL(url));
    },
    [],
  );
  const photos = [...(data.photos ?? []), ...local];
  const visible = photos.filter((photo) => {
    const tags = photo.categoryIds
      .map((id) => data.categories.find((cat) => cat.id === id))
      .filter(Boolean);
    const text =
      (p.names[photo.id] ?? photo.name) +
      " " +
      photo.categoryIds.map((id) => c.items[id]?.name ?? id).join(" ");
    return (
      (direction === "all" || photo.categoryIds.includes(direction)) &&
      (!filters.length || tags.some((cat) => cat && filters.includes(cat.group))) &&
      text.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase())
    );
  });
  function addPhotos(files: FileList | null) {
    if (!files) return;
    const supported = Array.from(files)
      .filter((file) => /^image\/(png|jpeg|webp|avif|gif)$/.test(file.type))
      .slice(0, 40);
    if (!supported.length) {
      setNotice(p.noFiles);
      return;
    }
    urls.current.forEach((url) => URL.revokeObjectURL(url));
    urls.current = [];
    const next = supported.map((file, index): ProductPhoto => {
      const src = URL.createObjectURL(file);
      urls.current.push(src);
      return {
        id: "local-" + index,
        src,
        categoryIds: [],
        kind: "local",
        name: file.name.replace(/\.[^.]+$/, ""),
      };
    });
    setLocal(next);
    setFocus(null);
    setDirection("all");
    setFilters([]);
    setQuery("");
    setLimit(photos.length + 40);
    setNotice(files.length > 40 ? p.limit : p.previewNote);
  }
  function selectPhoto(photo: ProductPhoto) {
    setFocus(photo);
    if (photo.categoryIds[0]) onSelect(photo.categoryIds[0]);
    requestAnimationFrame(() =>
      detail.current?.scrollIntoView({
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
        block: "nearest",
      }),
    );
  }
  return (
    <ManufacturingBlock id="production-categories">
      <ManufacturingHeading
        eyebrow={p.eyebrow}
        title={p.title}
        description={p.description}
      />
      <div className="mt-10 grid gap-5 lg:grid-cols-[1fr_auto]">
        <Search
          value={query}
          onChange={(value) => {
            setQuery(value);
            setLimit(Number.MAX_SAFE_INTEGER);
          }}
          label={c.search}
          placeholder={c.search}
          clearLabel={c.clear}
          submitLabel={c.submit}
          showSubmit={false}
        />
        {data.allowLocalPreview && (
          <div>
            <input
              ref={picker}
              type="file"
              accept="image/png,image/jpeg,image/webp,image/avif,image/gif"
              multiple
              className="hidden"
              onChange={(event) => addPhotos(event.currentTarget.files)}
              aria-label={p.preview}
            />
            <Button variant="outline" size="lg" onClick={() => picker.current?.click()}>
              <Plus className="size-4" />
              {p.preview}
            </Button>
          </div>
        )}
      </div>
      {data.allowLocalPreview && (
        <p className="mt-3 text-sm leading-7 text-secondary">{p.previewNote}</p>
      )}
      <fieldset className="mt-6 flex flex-wrap gap-5">
        <legend className="sr-only">{c.filter}</legend>
        {groups.map((group) => (
          <label key={group} className="flex cursor-pointer items-center gap-2 text-sm">
            <Checkbox
              checked={filters.includes(group)}
              onCheckedChange={(checked) => {
                setFilters((values) =>
                  checked
                    ? [...new Set([...values, group])]
                    : values.filter((value) => value !== group),
                );
                setLimit(Number.MAX_SAFE_INTEGER);
              }}
            />
            {c.groups[group]}
          </label>
        ))}
      </fieldset>
      <div className="mt-7 flex gap-2 overflow-x-auto pb-3">
        <Button
          variant={direction === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => {
            setDirection("all");
            setLimit(Number.MAX_SAFE_INTEGER);
          }}
        >
          {p.all}
        </Button>
        {data.categories.map((cat) => (
          <Button
            key={cat.id}
            size="sm"
            variant={direction === cat.id ? "default" : "outline"}
            onClick={() => {
              setDirection(cat.id);
              onSelect(cat.id);
              setLimit(Number.MAX_SAFE_INTEGER);
            }}
          >
            {c.items[cat.id]?.name ?? cat.id}
          </Button>
        ))}
      </div>
      <div className="my-7 flex flex-wrap items-center justify-between gap-3">
        <p role="status" className="text-sm text-secondary">
          {p.counter}: {visible.length}
        </p>
        <div className="flex flex-wrap gap-2">
          {!!local.length && (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                urls.current.forEach((url) => URL.revokeObjectURL(url));
                urls.current = [];
                setLocal([]);
                setFocus(null);
                setNotice("");
              }}
            >
              <Trash2 className="size-4" />
              {p.clearPreview}
            </Button>
          )}
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              setQuery("");
              setFilters([]);
              setDirection("all");
              setLimit(Number.MAX_SAFE_INTEGER);
            }}
          >
            {c.reset}
          </Button>
        </div>
      </div>
      <p role="status" className="mb-4 text-sm text-secondary">
        {notice}
      </p>
      <div className="grid gap-9 sm:grid-cols-2 lg:grid-cols-3">
        {visible.slice(0, limit).map((photo) => (
          <ProductionCategoryCard
            key={photo.id}
            photo={{ ...photo, name: p.names[photo.id] ?? photo.name }}
            label={
              photo.kind === "local"
                ? p.local
                : photo.kind === "visualization"
                  ? p.render
                  : p.reference
            }
            action={p.select}
            unavailable={p.unavailable}
            selected={focus?.id === photo.id}
            onSelect={() => selectPhoto(photo)}
          />
        ))}
      </div>
      {!visible.length && (
        <ManufacturingSurface className="mt-5 p-8">
          <Images className="mb-5 size-10 text-accent" strokeWidth={1} />
          <h3 className="font-serif text-3xl">
            {direction !== "all" ? c.items[direction]?.name : p.photos}
          </h3>
          <p className="mt-4 max-w-2xl text-base leading-8 text-secondary">{p.empty}</p>
          <Link
            href="#manufacturing-inquiry"
            className={buttonVariants({ className: "mt-6" })}
          >
            {c.contact}
          </Link>
        </ManufacturingSurface>
      )}
      {visible.length > limit && (
        <div className="mt-12 text-center">
          <Button variant="outline" size="lg" onClick={() => setLimit(visible.length)}>
            {p.show} ({visible.length})
          </Button>
        </div>
      )}
      <div ref={detail} className="scroll-mt-24">
        {focus && (
          <ManufacturingSurface className="mt-12 p-7 sm:p-9">
            <div className="grid items-center gap-9 md:grid-cols-2">
              <div className="relative h-80 rounded-[30px] bg-gradient-to-br from-[#f7f1e4] to-[#e2d5bb]">
                <Image
                  src={focus.src}
                  alt={p.names[focus.id] ?? focus.name}
                  fill
                  unoptimized={focus.kind === "local"}
                  sizes="(max-width:768px) 85vw,40vw"
                  className="object-contain p-7 drop-shadow-[10px_20px_15px_#0004]"
                />
              </div>
              <div>
                <p className="text-sm tracking-wide text-accent">{p.photos}</p>
                <h3 className="mt-4 break-words font-serif text-4xl">
                  {p.names[focus.id] ?? focus.name}
                </h3>
                <p className="mt-5 text-base leading-8 text-secondary">
                  {focus.categoryIds[0]
                    ? c.items[focus.categoryIds[0]]?.description
                    : p.description}
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link href="#manufacturing-inquiry" className={buttonVariants()}>
                    {p.request}
                  </Link>
                  <Button variant="outline" onClick={() => setFocus(null)}>
                    {p.close}
                  </Button>
                </div>
              </div>
            </div>
          </ManufacturingSurface>
        )}
      </div>
    </ManufacturingBlock>
  );
}
