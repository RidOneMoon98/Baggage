import type { ReactNode } from "react";
import {
  Check,
  Layers3,
  Search,
  PackageCheck,
  Scissors,
  PenTool,
  ShieldCheck,
} from "lucide-react";
import ManufacturingSurface from "./ManufacturingSurface";
import type { ContentCopy, HeadingCopy, ModelKind } from "../types/manufacturing.types";
export function ManufacturingBlock({
  children,
  id,
  dark = false,
}: {
  children: ReactNode;
  id?: string;
  dark?: boolean;
}) {
  return (
    <section
      id={id}
      className={
        "relative isolate scroll-mt-24 overflow-hidden px-5 py-20 sm:px-8 lg:py-28 " +
        (dark ? "bg-[#1b1a17] text-[#f2eadb]" : "bg-background text-foreground")
      }
    >
      <div
        aria-hidden="true"
        className={
          "pointer-events-none absolute inset-0 -z-10 " +
          (dark
            ? "bg-[radial-gradient(ellipse_at_100%_0%,rgba(183,146,81,0.11),transparent_65%)]"
            : "bg-[radial-gradient(ellipse_at_0%_0%,rgba(255,255,255,0.8),transparent_65%)]")
        }
      />
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}
export function ManufacturingHeading({
  eyebrow,
  title,
  description,
  dark = false,
}: HeadingCopy & { dark?: boolean }) {
  return (
    <div className="max-w-3xl">
      <p
        className={
          "flex items-center gap-3 text-sm font-medium tracking-[0.13em] " +
          (dark ? "text-[#d5ba85]" : "text-accent")
        }
      >
        <span aria-hidden="true" className="h-px w-8 bg-current opacity-50" />
        {eyebrow}
      </p>
      <h2 className="mt-5 font-serif text-4xl leading-[1.12] tracking-tight sm:text-5xl">
        {title}
      </h2>
      <p
        className={
          "mt-6 text-base leading-8 " + (dark ? "text-[#c7c1b6]" : "text-secondary")
        }
      >
        {description}
      </p>
    </div>
  );
}
export function ManufacturingCards({
  items,
  dark = false,
}: {
  items: ContentCopy["items"];
  dark?: boolean;
}) {
  return (
    <div className="mt-12 grid gap-8 md:grid-cols-3">
      {items.map((item, index) => (
        <ManufacturingSurface key={item.title} dark={dark} className="p-7 sm:p-8">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex size-14 items-center justify-center rounded-[19px] border border-[#f6e6c2] bg-gradient-to-br from-[#f7e8c5] via-[#ccb079] to-[#9c793f] text-[#5c4523] shadow-[3px_4px_0_#8a6b39,inset_1px_1px_2px_#fff9] [transform:rotateY(-15deg)_rotateZ(-6deg)]">
              <Check className="size-6" strokeWidth={1.4} />
            </div>
            <span
              aria-hidden="true"
              className={"h-px w-12 " + (dark ? "bg-[#c2a26a]/30" : "bg-accent/30")}
            />
          </div>
          <h3 className="font-serif text-2xl leading-tight">{item.title}</h3>
          <p
            className={
              "mt-4 text-base leading-8 " + (dark ? "text-[#c7c1b6]" : "text-secondary")
            }
          >
            {item.description}
          </p>
        </ManufacturingSurface>
      ))}
    </div>
  );
}
export function ProductionObject({ kind, color }: { kind: ModelKind; color: string }) {
  return (
    <div
      aria-hidden="true"
      className="relative flex h-64 items-center justify-center [perspective:800px]"
    >
      <div className="absolute bottom-7 h-8 w-36 rounded-full bg-black/20 blur-xl" />
      <div
        style={{ backgroundColor: color }}
        className="relative flex h-32 w-40 items-center justify-center rounded-[28px] border border-white/30 text-white/70 shadow-[12px_12px_0_#7f6a47,20px_30px_30px_-15px_#0006] [transform:rotateY(-25deg)_rotateZ(-8deg)]"
      >
        <div className="absolute -top-9 h-12 w-16 rounded-t-full border-[7px] border-current" />
        <Layers3 className="size-10" strokeWidth={1} />
      </div>
    </div>
  );
}
const icons = [Layers3, Scissors, PenTool, PackageCheck, ShieldCheck, PackageCheck];
export function WorkstationIllustration({ variant = 0 }: { variant?: number }) {
  const Icon = icons[variant % icons.length];
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto flex aspect-[4/3] w-full max-w-[390px] items-center justify-center [perspective:900px]"
    >
      <div className="absolute bottom-[10%] h-10 w-[65%] rounded-[50%] bg-black/20 blur-xl" />
      <div className="absolute bottom-[11%] h-12 w-[75%] rounded-[50%] border border-[#d6b982]/70 bg-gradient-to-r from-[#c3a56b] via-[#f0ddb7] to-[#8a6c3c] [transform:rotateX(65deg)]" />
      {variant % 6 === 0 ? (
        <div className="relative h-40 w-48 [transform-style:preserve-3d]">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                backgroundColor: ["#ded1b4", "#ae7f85", "#64705c", "#c2a36a"][i],
                transform:
                  "translate(" +
                  (i - 1) * 16 +
                  "px," +
                  (i - 1) * -8 +
                  "px) rotate(" +
                  (i - 1) * 14 +
                  "deg) rotateY(-24deg)",
              }}
              className="absolute inset-0 rounded-[25px] border border-white/40 shadow-[4px_7px_0_#79664b,0_18px_25px_-15px_#0008]"
            />
          ))}
        </div>
      ) : variant % 6 === 1 ? (
        <div className="relative h-48 w-52 [transform:rotateY(-24deg)_rotateX(10deg)]">
          <div className="absolute bottom-0 h-9 w-full rounded-xl border border-[#ead9b2] bg-gradient-to-r from-[#97753d] to-[#e4ca91] shadow-[8px_10px_0_#75603d]" />
          <div className="absolute right-4 top-0 h-40 w-8 rounded-xl bg-[#ad8f58] shadow-[7px_4px_0_#705731]" />
          <div className="absolute left-4 right-4 top-0 h-8 rounded-xl border border-[#f2e3c1] bg-[#cbb17b] shadow-[5px_6px_0_#7c6135]" />
          <div className="absolute left-12 top-8 h-20 w-4 bg-[#b4aaa0]" />
          <div className="absolute bottom-12 left-7 h-7 w-28 rounded-xl bg-[#c8989b] shadow-[4px_6px_0_#89676a]" />
        </div>
      ) : variant % 6 === 5 ? (
        <div className="relative flex size-40 items-center justify-center rounded-xl border border-[#f0d6a3] bg-gradient-to-br from-[#d3b77d] to-[#ad8a4d] shadow-[14px_14px_0_#806338] [transform:rotateY(-28deg)_rotateX(10deg)]">
          <div className="absolute inset-y-0 left-[43%] w-7 bg-[#ecdbb9]/60" />
          <div className="absolute -top-10 left-0 h-12 w-full origin-bottom -skew-x-12 border border-[#e9d2a0] bg-[#c3a569] [transform:rotateX(45deg)]" />
          <Icon className="relative size-14 text-[#73552b]" strokeWidth={1} />
        </div>
      ) : (
        <div className="relative flex h-40 w-48 items-center justify-center rounded-[30px] border border-[#f3dfb8] bg-gradient-to-br from-[#f0dfb5] via-[#c5a466] to-[#9b773e] shadow-[12px_13px_0_#806438,20px_28px_35px_-20px_#0008] [transform:rotateY(-25deg)_rotateX(14deg)_rotateZ(-6deg)]">
          <div className="absolute inset-3 rounded-[22px] border border-white/30" />
          <Icon className="relative size-16 text-[#66502c]" strokeWidth={1} />
          {variant % 6 === 4 && (
            <div className="absolute -right-4 -top-6 size-20 rounded-full border-[9px] border-[#ead5a7] bg-white/20 shadow-[4px_6px_0_#887046] backdrop-blur-sm" />
          )}
        </div>
      )}
    </div>
  );
}
export function ManufacturingStage({
  content,
  variant,
  dark = false,
}: {
  content: ContentCopy;
  variant: number;
  dark?: boolean;
}) {
  return (
    <ManufacturingBlock dark={dark}>
      <div
        className={
          "grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr] " +
          (variant % 2 ? "lg:[&>div:first-child]:order-2" : "")
        }
      >
        <ManufacturingHeading {...content} dark={dark} />
        <WorkstationIllustration variant={variant} />
      </div>
      <ManufacturingCards items={content.items} dark={dark} />
    </ManufacturingBlock>
  );
}
