"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { featured } from "@/lib/featured";
import { ease } from "@/components/motion/Reveal";

const categories = ["All", ...Array.from(new Set(featured.map((p) => p.category)))];

export default function ProjectsList() {
  const [active, setActive] = useState("All");
  const projects = active === "All" ? featured : featured.filter((p) => p.category === active);

  return (
    <>
      {/* filter chips */}
      <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            aria-pressed={active === cat}
            onClick={() => setActive(cat)}
            className={`inline-flex min-h-11 items-center rounded-full border px-5 text-sm font-medium transition-colors duration-300 ${
              active === cat
                ? "border-accent bg-accent text-ink"
                : "border-line text-fg-soft hover:border-fg-faint hover:text-fg"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* the projects */}
      <motion.ul layout className="mt-14 space-y-20 lg:mt-20 lg:space-y-28">
        <AnimatePresence mode="popLayout">
          {projects.map((project, i) => (
            <motion.li
              key={project.slug}
              layout
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7, ease }}
            >
              <Link
                href={`/projects/${project.slug}`}
                className="group grid items-center gap-8 lg:grid-cols-2 lg:gap-16"
              >
                {/* image — alternates sides on desktop */}
                <div
                  className={`relative aspect-[16/10] overflow-hidden rounded-3xl border border-line bg-surface ${
                    i % 2 === 1 ? "lg:order-2" : ""
                  }`}
                >
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={`${project.name} preview`}
                      fill
                      quality={90}
                      sizes="(min-width: 1024px) 600px, 100vw"
                      className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <div className="dot-grid dot-grid-faint" aria-hidden="true" />
                  )}
                </div>

                {/* details */}
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-xs uppercase tracking-widest text-fg-muted">
                      {project.category}
                    </span>
                    {project.status && (
                      <span className="rounded-full border border-accent/40 px-2 py-0.5 font-mono text-[11px] text-accent">
                        {project.status}
                      </span>
                    )}
                  </div>
                  <h2 className="mt-4 text-4xl font-extrabold tracking-tight transition-colors duration-300 group-hover:text-accent lg:text-5xl">
                    {project.name}
                  </h2>
                  <p className="mt-4 max-w-lg text-lg leading-relaxed text-fg-soft">{project.summary}</p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {project.stack.map((tool) => (
                      <li key={tool} className="rounded-full border border-line px-3 py-1 font-mono text-xs text-fg-muted">
                        {tool}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-8 inline-flex items-center gap-2 font-bold text-accent">
                    View case study
                    <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </div>
              </Link>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </>
  );
}