"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  beliefs,
  beyond,
  courses,
  education,
  experience,
  whatsNext,
  type BeyondIcon,
} from "@/lib/journey";
import { site } from "@/lib/site";
import { SectionHead, StoryLink, ease } from "./bits";

const inView = { once: true, margin: "-10% 0px" } as const;

/* ---------- Education ---------- */
export function Education() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-24 lg:grid-cols-[17rem_1fr] lg:gap-16 lg:px-8 lg:py-32">
        <SectionHead label="Education" title="Where I learned" />

        <div>
          <ul>
            {education.map((e, i) => (
              <motion.li
                key={e.school}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={inView}
                transition={{ duration: 0.6, delay: i * 0.1, ease }}
                className="relative grid gap-1 py-7 sm:grid-cols-[9rem_1fr] sm:gap-8"
              >
                {/* line draws across */}
                <motion.span
                  aria-hidden
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={inView}
                  transition={{ duration: 0.9, delay: i * 0.1, ease }}
                  className="absolute inset-x-0 top-0 h-px origin-left bg-line"
                />
                <span className={`pt-1 font-mono text-sm ${i === 0 ? "text-accent" : "text-fg-muted"}`}>
                  {e.years}
                </span>
                <div>
                  <h3 className="text-xl font-bold sm:text-2xl">{e.school}</h3>
                  <p className="mt-1 text-fg-soft">{e.detail}</p>
                  {e.note && <p className="mt-1 text-sm text-fg-muted">{e.note}</p>}
                </div>
              </motion.li>
            ))}
          </ul>

          <p className="mt-10 font-mono text-xs tracking-[0.2em] text-fg-faint uppercase">
            Learning on my own
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {courses.map((c, i) => (
              <motion.li
                key={c}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={inView}
                transition={{ delay: 0.2 + i * 0.07, type: "spring", stiffness: 300, damping: 20 }}
                className="rounded-full border border-line px-4 py-2 text-sm text-fg-soft"
              >
                {c}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------- Experience ---------- */
export function Experience() {
  return (
    <section className="border-t border-line bg-ink-deep">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-24 lg:grid-cols-[17rem_1fr] lg:gap-16 lg:px-8 lg:py-32">
        <div>
          <SectionHead label="Experience" title="Where I've worked and led" />
          <a
            href={site.cvUrl}
            download
            className="mt-7 inline-flex min-h-11 items-center gap-2.5 rounded-full border border-accent px-5 text-sm font-semibold text-accent transition-colors hover:bg-accent hover:text-ink active:bg-accent active:text-ink"
          >
            <svg aria-hidden width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3v12" />
              <path d="m7 10 5 5 5-5" />
              <path d="M5 21h14" />
            </svg>
            Download CV
          </a>
        </div>

        <div className="flex flex-col gap-4">
          {experience.map((job, i) => (
            <motion.article
              key={job.role + job.dates}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inView}
              transition={{ duration: 0.6, delay: i * 0.06, ease }}
              whileHover={{ y: -4 }}
              className="rounded-[1.25rem] border border-line bg-surface p-6 transition-colors hover:border-accent/40 active:border-accent/40 sm:p-7"
            >
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <h3 className="text-lg font-bold sm:text-xl">
                  {job.role}
                  {job.org && <span className="font-medium text-fg-faint"> · {job.org}</span>}
                </h3>
                <span className={`shrink-0 font-mono text-xs ${job.current ? "text-accent" : "text-fg-muted"}`}>
                  {job.dates}
                </span>
              </div>
              <ul className="mt-4 flex list-disc flex-col gap-2 pl-5 leading-relaxed text-fg-soft marker:text-fg-faint">
                {job.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Beyond the code ---------- */
function Icon({ name }: { name: BeyondIcon }) {
  const common = {
    width: 28,
    height: 28,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (name) {
    case "nature":
      return (
        <svg {...common}>
          <path d="M12 2 5 12h4l-3 5h12l-3-5h4z" />
          <path d="M12 17v5" />
        </svg>
      );
    case "people":
      return (
        <svg {...common}>
          <circle cx="9" cy="7" r="3.5" />
          <circle cx="17" cy="9" r="2.5" />
          <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
          <path d="M15.5 14.5A5 5 0 0 1 21.5 19" />
        </svg>
      );
    case "hope":
      return (
        <svg {...common}>
          <path d="M12 2v6" />
          <path d="M9 5h6" />
          <path d="M4 21h16" />
          <path d="M6 21V11l6-3 6 3v10" />
          <path d="M10 21v-5h4v5" />
        </svg>
      );
    case "music":
      return (
        <svg {...common}>
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      );
    case "kitchen":
      return (
        <svg {...common}>
          <path d="M6 13.9A4 4 0 0 1 7 6a5 5 0 0 1 10 0 4 4 0 0 1 1 7.9V20H6z" />
          <path d="M6 17h12" />
        </svg>
      );
  }
}

export function Beyond({ storySlugs }: { storySlugs: string[] }) {
  const stories = new Set(storySlugs);

  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-24 lg:px-8 lg:py-32">
        <SectionHead label="Beyond the code" title="The person behind the work" />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {beyond.map((card, i) => (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={inView}
              transition={{ duration: 0.6, delay: i * 0.08, ease }}
              className={`group rounded-[1.25rem] border bg-surface p-6 transition-colors sm:p-7 ${
                card.wide
                  ? "border-accent/35 sm:col-span-2"
                  : "border-line hover:border-accent/40 active:border-accent/40"
              }`}
            >
              <span className="inline-block text-accent transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 group-active:scale-110 group-active:-rotate-6">
                <Icon name={card.icon} />
              </span>
              <h3 className="mt-4 text-xl font-bold">{card.title}</h3>
              <p className="mt-2 max-w-2xl leading-relaxed text-fg-muted">{card.text}</p>

              {(card.link || (card.story && stories.has(card.story))) && (
                <div className="mt-1 flex flex-wrap gap-x-6">
                  {card.story && stories.has(card.story) && (
                    <StoryLink href={`/stories/${card.story}`}>Read the story</StoryLink>
                  )}
                  {card.link && <StoryLink href={card.link.href}>{card.link.label}</StoryLink>}
                </div>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- What I believe ---------- */
export function Beliefs() {
  return (
    <section className="border-t border-line bg-ink-deep">
      <div className="mx-auto max-w-6xl px-5 py-24 lg:px-8 lg:py-32">
        <SectionHead label="What I believe" title="What keeps me going" />

        <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-6">
          {beliefs.map((b, i) => (
            <article key={b.title} className="relative pt-8">
              <motion.span
                aria-hidden
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={inView}
                transition={{ duration: 0.8, delay: i * 0.15, ease }}
                className="absolute inset-x-0 top-0 h-0.5 origin-left bg-accent"
              />
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={inView}
                transition={{ duration: 0.7, delay: 0.3 + i * 0.15, ease }}
                className="text-2xl leading-tight font-extrabold tracking-tight sm:text-[1.75rem]"
              >
                {b.title}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={inView}
                transition={{ duration: 0.7, delay: 0.5 + i * 0.15 }}
                className="mt-4 leading-relaxed text-fg-muted"
              >
                {b.text}
              </motion.p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- What's next ---------- */
export function WhatsNext() {
  return (
    <section className="relative overflow-hidden border-t border-line">
      <div aria-hidden className="dot-grid dot-grid-faint absolute inset-0" />
      <div className="relative mx-auto max-w-6xl px-5 py-24 lg:px-8 lg:py-32">
        <SectionHead label="What's next" title="The road keeps going." />

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {whatsNext.goals.map((g, i) => (
            <motion.article
              key={g.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inView}
              transition={{ duration: 0.7, delay: i * 0.12, ease }}
              className="rounded-[1.5rem] border border-line bg-surface p-7 sm:p-8"
            >
              <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase">{g.label}</p>
              <h3 className="mt-3 text-2xl font-bold">{g.title}</h3>
              <p className="mt-3 leading-relaxed text-fg-muted">{g.text}</p>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inView}
          transition={{ duration: 0.8, ease }}
          className="mt-16 text-center sm:mt-20"
        >
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-fg-soft sm:text-xl">
            {whatsNext.invite}
          </p>
          <div className="animate-float mt-9 inline-block">
            <Link
              href="/lets-talk"
              className="inline-flex min-h-14 items-center gap-2 rounded-full bg-accent px-8 text-lg font-extrabold text-ink transition-transform hover:scale-105 active:scale-95"
            >
              Let&apos;s Talk <span aria-hidden>→</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}