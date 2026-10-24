"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import type { ResearchMeta } from "@/types/content";
import { formatMonth, isActive } from "@/lib/research-status";
import StatusPill from "./StatusPill";

type Props = {
  items: ResearchMeta[];
  featuredSlug?: string;
};

export default function ResearchList({ items, featuredSlug }: Props) {
  const [field, setField] = useState("All");
  const [activeOnly, setActiveOnly] = useState(false);

  const fields = useMemo(
    () => ["All", ...Array.from(new Set(items.map((i) => i.field)))],
    [items],
  );

  const shown = items.filter(
    (i) =>
      (field === "All" || i.field === field) &&
      (!activeOnly || isActive(i.status)),
  );

  return (
    <div>
      {/* filters */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
          {fields.map((f) => {
            const on = f === field;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setField(f)}
                aria-pressed={on}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm transition-colors ${
                  on
                    ? "border-accent bg-accent font-semibold text-forest-deep"
                    : "border-line text-fg-muted hover:border-fg/40 hover:text-fg active:border-fg/40 active:text-fg"
                }`}
              >
                {f}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={activeOnly}
          onClick={() => setActiveOnly((v) => !v)}
          className="flex items-center gap-3 font-mono text-xs tracking-[0.12em] text-fg-muted uppercase"
        >
          Active only
          <span
            className={`relative h-6 w-11 rounded-full border transition-colors ${
              activeOnly ? "border-accent bg-accent" : "border-line bg-surface"
            }`}
          >
            <span
              className={`absolute top-1/2 left-1 size-4 -translate-y-1/2 rounded-full transition-transform duration-300 ${
                activeOnly ? "translate-x-5 bg-ink" : "bg-fg-muted"
              }`}
            />
          </span>
        </button>
      </div>

      {/* list */}
      <ul className="mt-8 border-t border-line">
        <AnimatePresence mode="popLayout" initial={false}>
          {shown.map((item) => (
            <motion.li
              key={item.slug}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              className="border-b border-line"
            >
              <Link
                href={`/research/${item.slug}`}
                className="group grid gap-4 py-7 sm:grid-cols-[10rem_1fr_auto] sm:items-start sm:gap-8"
              >
                <div className="flex items-center gap-3 sm:flex-col sm:items-start">
                  <StatusPill status={item.status} />
                  <span className="font-mono text-xs text-fg-faint">
                    {formatMonth(item.updated)}
                  </span>
                </div>

                <div>
                  <p className="font-mono text-xs tracking-[0.12em] text-fg-faint uppercase">
                    {item.field}
                    {item.slug === featuredSlug && (
                      <span className="text-accent"> · Current focus</span>
                    )}
                  </p>
                  <h3 className="mt-2 text-xl leading-snug font-bold text-fg transition-colors group-hover:text-accent group-active:text-accent sm:text-2xl">
                    {item.question}
                  </h3>
                  {item.summary && (
                    <p className="mt-2 line-clamp-2 max-w-2xl leading-relaxed text-fg-muted">
                      {item.summary}
                    </p>
                  )}
                </div>

                <span
                  aria-hidden
                  className="hidden size-11 place-items-center rounded-full border border-line text-fg-muted transition-all group-hover:-rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-forest-deep sm:grid"
                >
                  →
                </span>
              </Link>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      {shown.length === 0 && (
        <p className="py-16 text-center text-fg-muted">
          Nothing here yet — new questions are on the way.
        </p>
      )}
    </div>
  );
}