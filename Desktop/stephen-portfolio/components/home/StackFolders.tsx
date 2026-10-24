"use client";

import { useState } from "react";
import { stack } from "@/lib/stack";

// foldable folder cards — click a folder to open it, the others fold shut
export default function StackFolders() {
  const [open, setOpen] = useState(stack[0].id);

  return (
    <ul className="space-y-4">
      {stack.map((group, i) => {
        const isOpen = open === group.id;
        return (
          <li key={group.id} className="relative pt-3">
            {/* the folder tab */}
            <span
              aria-hidden="true"
              className={`absolute left-6 top-0 flex h-3.5 w-28 items-center justify-center rounded-t-lg transition-colors duration-300 ${
                isOpen ? "bg-accent" : "bg-surface"
              }`}
            />

            <div
              className={`overflow-hidden rounded-2xl rounded-tl-none border transition-colors duration-300 ${
                isOpen
                  ? "border-accent bg-accent text-forest-deep"
                  : "border-line bg-surface text-fg hover:border-accent"
              }`}
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? "" : group.id)}
                aria-expanded={isOpen}
                aria-controls={`stack-${group.id}`}
                className="flex w-full items-center gap-4 p-5 text-left transition-transform duration-150 [-webkit-tap-highlight-color:transparent] active:scale-[0.98]"
              >
                <span
                  aria-hidden="true"
                  className={`font-mono text-sm ${isOpen ? "text-forest-deep/70" : "text-accent"}`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-lg font-extrabold tracking-tight sm:text-xl">
                    {group.title}
                  </span>
                  <span
                    className={`mt-0.5 block font-mono text-[11px] uppercase tracking-widest ${
                      isOpen ? "text-forest-deep/70" : "text-fg-muted"
                    }`}
                  >
                    {group.items.length} tools
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className={`inline-flex size-9 shrink-0 items-center justify-center rounded-full text-xl leading-none transition-transform duration-300 ${
                    isOpen ? "rotate-45 bg-forest text-accent" : "border border-line"
                  }`}
                >
                  +
                </span>
              </button>

              {/* the fold: grid rows animate 0fr → 1fr */}
              <div
                id={`stack-${group.id}`}
                className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-5 pb-6">
                    <p className="max-w-md text-sm leading-relaxed text-forest-deep/80">
                      {group.blurb}
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="rounded-full bg-forest px-3.5 py-1.5 text-sm font-semibold text-white"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
