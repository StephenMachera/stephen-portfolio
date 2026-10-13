"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { motion } from "motion/react";

export const ease = [0.22, 1, 0.36, 1] as const;

export function SectionHead({
  label,
  title,
  text,
}: {
  label: string;
  title: string;
  text?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.7, ease }}
    >
      <p className="font-mono text-xs tracking-[0.2em] text-fg-faint uppercase">
        {label}
      </p>
      <h2 className="mt-4 text-[clamp(1.85rem,3.2vw,2.75rem)] leading-[1.08] font-extrabold tracking-tight">
        {title}
      </h2>
      {text && (
        <p className="mt-4 max-w-sm leading-relaxed text-fg-muted">{text}</p>
      )}
    </motion.div>
  );
}

export function StoryLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group/link mt-2 inline-flex min-h-11 items-center gap-2 font-mono text-[13px] tracking-wide text-accent"
    >
      {children}
      <span
        aria-hidden
        className="inline-block transition-transform duration-300 group-hover/link:translate-x-1 group-active/link:translate-x-1"
      >
        →
      </span>
    </Link>
  );
}