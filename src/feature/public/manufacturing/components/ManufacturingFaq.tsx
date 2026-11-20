"use client";
import { useId, useState } from "react";
import { Plus } from "lucide-react";
import { Search } from "@/src/components/ui/search";
import { Button } from "@/src/components/ui/button";
import { ManufacturingBlock, ManufacturingHeading } from "./ManufacturingUi";
import type { CopyProps } from "../types/manufacturing.types";
export default function ManufacturingFaq({ copy }: CopyProps) {
  const c = copy.faq;
  const id = useId();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<number | null>(null);
  const items = c.items
    .map((item, index) => ({ item, index }))
    .filter(({ item }) =>
      (item.question + " " + item.answer)
        .toLocaleLowerCase()
        .includes(query.trim().toLocaleLowerCase()),
    );
  return (
    <ManufacturingBlock>
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <ManufacturingHeading {...c} />
          <div className="mt-7">
            <Search
              value={query}
              onChange={setQuery}
              label={c.search}
              placeholder={c.search}
              clearLabel={copy.categories.clear}
              submitLabel={copy.categories.submit}
              showSubmit={false}
            />
          </div>
        </div>
        <div className="space-y-4">
          {items.map(({ item, index }) => (
            <article
              key={item.question}
              className="rounded-2xl border border-white bg-white shadow-[2px_3px_0_#f5ead5,6px_8px_0_#c5b391,0_20px_30px_-24px_#5d4928]"
            >
              <h3>
                <Button
                  id={id + "trigger" + index}
                  variant="ghost"
                  aria-expanded={open === index}
                  aria-controls={id + "panel" + index}
                  onClick={() => setOpen((value) => (value === index ? null : index))}
                  className="h-auto min-h-16 w-full justify-between gap-4 whitespace-normal rounded-2xl px-6 py-5 text-left text-base"
                >
                  <span>{item.question}</span>
                  <Plus
                    className={
                      "size-5 shrink-0 text-accent transition-transform motion-reduce:transition-none " +
                      (open === index ? "rotate-45" : "")
                    }
                    aria-hidden="true"
                  />
                </Button>
              </h3>
              <div
                id={id + "panel" + index}
                aria-labelledby={id + "trigger" + index}
                hidden={open !== index}
                className="px-6 pb-6 text-base leading-8 text-secondary"
              >
                {item.answer}
              </div>
            </article>
          ))}
          {!items.length && (
            <p
              role="status"
              className="rounded-2xl border border-border p-6 text-base leading-7 text-secondary"
            >
              {c.empty}
            </p>
          )}
        </div>
      </div>
    </ManufacturingBlock>
  );
}
