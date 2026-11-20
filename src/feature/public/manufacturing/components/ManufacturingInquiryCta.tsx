"use client";
import { useId, useState, type FormEvent } from "react";
import Link from "next/link";
import { Copy, Check, ChevronDown } from "lucide-react";
import { Button, buttonVariants } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Checkbox } from "@/src/components/ui/checkbox";
import {
  ManufacturingBlock,
  ManufacturingHeading,
  WorkstationIllustration,
} from "./ManufacturingUi";
import type {
  CopyProps,
  ManufacturingData,
  ProductionCategory,
} from "../types/manufacturing.types";
const options = ["logo", "sample", "packaging"] as const;
type DiscussionOption = (typeof options)[number];
export default function ManufacturingInquiryCta({
  copy,
  data,
  selected,
  onSelect,
}: CopyProps & {
  data: ManufacturingData;
  selected: string;
  onSelect: (id: string) => void;
}) {
  const c = copy.inquiry,
    id = useId();
  const [extras, setExtras] = useState<DiscussionOption[]>([]),
    [summary, setSummary] = useState(""),
    [message, setMessage] = useState("");
  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    setSummary(
      [
        copy.company.name,
        c.name + ": " + String(fields.get("name") ?? "").trim(),
        c.email + ": " + String(fields.get("email") ?? "").trim(),
        c.product + ": " + (copy.categories.items[selected]?.name ?? selected),
        c.quantity + ": " + fields.get("quantity"),
        c.options + ": " + extras.map((option) => c[option]).join(", "),
        c.requirements + ": " + String(fields.get("requirements") ?? "").trim(),
      ].join("\n"),
    );
    setMessage("");
  }
  async function copyBrief() {
    try {
      await navigator.clipboard.writeText(summary);
      setMessage(c.copied);
    } catch {
      setMessage(c.failed);
    }
  }
  return (
    <ManufacturingBlock id="manufacturing-inquiry" dark>
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <ManufacturingHeading {...c} dark />
          <WorkstationIllustration variant={2} />
        </div>
        <div className="rounded-[32px] border border-white bg-background p-6 text-foreground shadow-[9px_11px_0_#8d754a,0_30px_45px_-25px_black] sm:p-8">
          <form onSubmit={prepare} className="space-y-6">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor={id + "name"} className="mb-2 block text-sm font-medium">
                  {c.name} *
                </label>
                <Input
                  id={id + "name"}
                  name="name"
                  autoComplete="name"
                  required
                  maxLength={120}
                />
              </div>
              <div>
                <label
                  htmlFor={id + "email"}
                  className="mb-2 block text-sm font-medium"
                >
                  {c.email} *
                </label>
                <Input
                  id={id + "email"}
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={180}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor={id + "product"}
                className="mb-2 block text-sm font-medium"
              >
                {c.product}
              </label>
              <div className="relative">
                <select
                  id={id + "product"}
                  value={selected}
                  onChange={(event) => onSelect(event.target.value)}
                  className="h-12 w-full appearance-none rounded-md border border-input bg-surface pl-3 pr-10 text-base outline-none focus-visible:ring-2 focus-visible:ring-ring/30"
                >
                  {data.categories.map((item: ProductionCategory) => (
                    <option key={item.id} value={item.id}>
                      {copy.categories.items[item.id]?.name ?? item.id}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  aria-hidden="true"
                  className="pointer-events-none absolute right-3 top-4 size-4 text-accent"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor={id + "quantity"}
                className="mb-2 block text-sm font-medium"
              >
                {c.quantity} *
              </label>
              <Input
                id={id + "quantity"}
                name="quantity"
                type="number"
                min={1}
                step={1}
                required
              />
            </div>
            <div>
              <label
                htmlFor={id + "requirements"}
                className="mb-2 block text-sm font-medium"
              >
                {c.requirements} *
              </label>
              <textarea
                id={id + "requirements"}
                name="requirements"
                required
                maxLength={4000}
                rows={5}
                placeholder={c.placeholder}
                className="w-full rounded-md border border-input bg-surface p-3 text-base leading-7 outline-none focus-visible:ring-2 focus-visible:ring-ring/30"
              />
            </div>
            <fieldset>
              <legend className="mb-3 text-base font-medium">{c.options}</legend>
              <div className="space-y-3">
                {options.map((option: DiscussionOption) => (
                  <label
                    key={option}
                    className="flex cursor-pointer items-center gap-3 text-sm"
                  >
                    <Checkbox
                      checked={extras.includes(option)}
                      onCheckedChange={(checked) =>
                        setExtras((values) =>
                          checked
                            ? values.includes(option)
                              ? values
                              : [...values, option]
                            : values.filter((value) => value !== option),
                        )
                      }
                    />
                    {c[option]}
                  </label>
                ))}
              </div>
            </fieldset>
            <Button type="submit" size="lg" className="w-full">
              {c.prepare}
            </Button>
            <p className="text-sm leading-7 text-secondary">{c.note}</p>
          </form>
          {summary && (
            <div className="mt-7 border-t border-border pt-6">
              <h3 className="font-serif text-2xl">{c.summary}</h3>
              <pre className="my-4 whitespace-pre-wrap break-words rounded-xl bg-white p-4 font-sans text-sm leading-7">
                {summary}
              </pre>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" onClick={copyBrief}>
                  {message === c.copied ? <Check /> : <Copy />}
                  {c.copy}
                </Button>
                <Link href={data.contactHref} className={buttonVariants()}>
                  {c.contact}
                </Link>
              </div>
            </div>
          )}
          <p role="status" aria-live="polite" className="mt-3 text-sm text-secondary">
            {message}
          </p>
        </div>
      </div>
    </ManufacturingBlock>
  );
}
