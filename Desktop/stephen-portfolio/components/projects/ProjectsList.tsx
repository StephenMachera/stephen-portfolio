"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { featured } from "@/lib/featured";
import SocialIcon from "@/components/ui/SocialIcon";
import { ease } from "@/components/motion/Reveal";

const categories = ["All", ...Array.from(new Set(featured.map((p) => p.category)))];

export default function ProjectsList() {
  const [active, setActive] = useState("All");
  const projects = active === "All" ? featured : featured.filter((p) => p.category === active);

  return (
    <div className="lg:mx-auto lg:w-[90%]">
      {/* filter bar */}
      <div
        role="group"
        aria-label="Filter projects"
        className="inline-flex max-w-full flex-wrap gap-1.5 rounded-3xl border border-line bg-surface p-1.5 sm:rounded-full"
      >
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            aria-pressed={active === cat}
            onClick={() => setActive(cat)}
            className={`inline-flex min-h-10 items-center rounded-full px-5 text-sm font-bold transition-colors duration-300 ${
              active === cat ? "bg-forest text-white" : "text-fg-soft hover:text-fg"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* the projects — a checkerboard of green and white cards */}
      <motion.ul layout className="mt-8 grid gap-5 lg:grid-cols-2 lg:gap-6">
        <AnimatePresence mode="popLayout">
          {projects.map((project, i) => {
            const green = (i + Math.floor(i / 2)) % 2 === 0;
            return (
              <motion.li
                key={project.slug}
                layout
                initial={{ opacity: 0, y: 48, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.7, ease }}
              >
                <div
                  className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border p-3 transition-transform duration-300 hover:-translate-y-1 ${
                    green ? "theme-forest border-transparent" : "border-line bg-surface"
                  }`}
                >
                  {/* screenshot in a little browser frame */}
                  <div className="relative overflow-hidden rounded-2xl bg-white">
                    <div className="flex items-center gap-1.5 bg-white px-4 py-2.5" aria-hidden="true">
                      <span className="size-2 rounded-full bg-accent" />
                      <span className="size-2 rounded-full bg-forest/40" />
                      <span className="size-2 rounded-full bg-forest/20" />
                      <span className="ml-3 truncate font-mono text-[10px] text-forest/60">{project.label}</span>
                    </div>
                    <div className="relative aspect-[16/9]">
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
                  </div>

                  {/* details */}
                  <div className="flex flex-1 flex-col p-4 pt-6 sm:p-6 sm:pt-7">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-mono text-sm text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-mono text-xs uppercase tracking-widest text-fg-muted">
                        {project.category}
                      </span>
                      {project.status && (
                        <span className="rounded-full bg-accent px-2.5 py-0.5 font-mono text-[11px] font-bold text-forest-deep">
                          {project.status}
                        </span>
                      )}
                    </div>

                    <h2 className="mt-3 text-3xl font-extrabold tracking-tight lg:text-4xl">
                      {project.name}
                    </h2>
                    <p className="mt-3 leading-relaxed text-fg-soft">{project.summary}</p>

                    <ul className="mt-5 flex flex-wrap gap-2">
                      {project.stack.map((tool) => (
                        <li
                          key={tool}
                          className={`rounded-full px-3 py-1 font-mono text-xs ${
                            green ? "bg-white/10 text-fg-soft" : "bg-forest/10 text-forest"
                          }`}
                        >
                          {tool}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-7">
                      {/* the stretched link makes the whole card clickable */}
                      <Link
                        href={`/projects/${project.slug}`}
                        className="inline-flex items-center gap-3 font-bold after:absolute after:inset-0 after:rounded-3xl after:content-['']"
                      >
                        Learn more
                        <span
                          aria-hidden="true"
                          className="inline-flex size-9 items-center justify-center rounded-full bg-accent text-forest-deep transition-transform duration-300 group-hover:translate-x-1"
                        >
                          →
                        </span>
                      </Link>

                      {project.links?.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${project.name} on GitHub (opens in a new tab)`}
                          className={`relative z-10 inline-flex min-h-10 items-center gap-2 rounded-full border px-4 text-sm font-bold transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-forest-deep ${
                            green ? "border-line" : "border-forest/25"
                          }`}
                        >
                          <SocialIcon name="github" />
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
