"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useReducedMotion } from "motion/react";
import { featured, type FeaturedProject } from "@/lib/featured";

// shown until a real screenshot is added
function Placeholder({ project }: { project: FeaturedProject }) {
  return (
    <div className="relative flex h-full flex-col justify-between p-8">
      <div className="dot-grid dot-grid-faint" aria-hidden="true" />
      <span className="relative font-mono text-xs uppercase tracking-widest text-fg-faint">
        Screenshot coming soon
      </span>
      <span className="relative text-5xl font-extrabold tracking-tight">
        {project.name}
      </span>
    </div>
  );
}

export default function ProjectPreview() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  const current = featured[active];
  const goNext = () => setActive((i) => (i + 1) % featured.length);

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* soft yellow glow behind the window */}
      <div
        aria-hidden="true"
        className="absolute inset-10 -z-10 rounded-full bg-accent/15 blur-3xl"
      />

      {/* the floating window */}
      <div className="animate-float-slow">
        <div className="overflow-hidden rounded-2xl border border-line bg-surface">
          {/* top bar */}
          <div className="flex h-11 items-center justify-between border-b border-line px-4 font-mono text-xs text-fg-muted">
            <span aria-hidden="true" className="flex gap-1.5">
              <span className="size-2.5 rounded-full bg-fg-faint/40" />
              <span className="size-2.5 rounded-full bg-fg-faint/40" />
              <span className="size-2.5 rounded-full bg-fg-faint/40" />
            </span>
            <span>{current.label}</span>
            <span>
              {String(active + 1).padStart(2, "0")} / {String(featured.length).padStart(2, "0")}
            </span>
          </div>

          {/* the screen — click to open the project */}
          <Link
            href={`/projects/${current.slug}`}
            aria-label={`Open ${current.name}`}
            className="group relative block aspect-[16/10] overflow-hidden bg-ink"
          >
            {featured.map((project, i) => (
              <div
                key={project.slug}
                aria-hidden={i !== active}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  i === active ? "opacity-100" : "opacity-0"
                }`}
              >
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={`${project.name} screenshot`}
                    fill
                    quality={90}
                    sizes="(min-width: 1280px) 640px, 50vw"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                ) : (
                  <Placeholder project={project} />
                )}
              </div>
            ))}

            {/* appears on hover */}
            <span className="absolute bottom-4 right-4 inline-flex translate-y-2 items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-bold text-forest-deep opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
              View project <span aria-hidden="true">→</span>
            </span>
          </Link>
        </div>
      </div>

      {/* tabs with progress bars */}
      <div role="tablist" aria-label="Featured projects" className="mt-8 grid grid-cols-4 gap-3">
        {featured.map((project, i) => {
          const selected = i === active;
          return (
            <button
              key={project.slug}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(i)}
              className={`flex flex-col gap-2 pb-2 text-left transition-colors duration-300 ${
                selected ? "text-fg" : "text-fg-faint hover:text-fg-soft"
              }`}
            >
              <span className="relative block h-0.5 overflow-hidden rounded-full bg-line">
                {selected && (
                  <span
                    key={active}
                    onAnimationEnd={goNext}
                    className={`absolute inset-0 origin-left bg-accent ${
                      reduce ? "" : "animate-progress"
                    } ${paused ? "[animation-play-state:paused]" : ""}`}
                  />
                )}
              </span>
              <span className="font-mono text-xs">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-bold">{project.name}</span>
            </button>
          );
        })}
      </div>

      {/* description of the current project */}
      <div aria-live="polite" className="mt-4 min-h-[5.5rem]">
        <p className="text-fg-soft">
          {current.summary}
          {current.status && (
            <span className="ml-2 inline-block rounded-full border border-accent/40 px-2 py-0.5 align-middle font-mono text-[11px] text-accent">
              {current.status}
            </span>
          )}
        </p>
        <p className="mt-2 font-mono text-xs text-fg-muted">{current.stack.join(" · ")}</p>
      </div>
    </div>
  );
}