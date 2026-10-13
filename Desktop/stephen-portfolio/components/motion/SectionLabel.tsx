"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { ease } from "@/components/motion/Reveal";

// dot springs in → a short line grows → the label slides up
export default function SectionLabel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.p
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.8 }}
      className={`flex items-center gap-2.5 font-mono text-[13px] uppercase tracking-[0.06em] text-fg-muted ${className ?? ""}`}
    >
      <motion.span
        aria-hidden="true"
        className="size-2 rounded-full bg-accent"
        variants={{
          hidden: { scale: 0 },
          show: { scale: 1, transition: { type: "spring", stiffness: 500, damping: 14 } },
        }}
      />
      <motion.span
        aria-hidden="true"
        className="h-px bg-accent/60"
        variants={{
          hidden: { width: 0 },
          show: { width: 24, transition: { duration: 0.6, ease, delay: 0.1 } },
        }}
      />
      <span className="overflow-hidden">
        <motion.span
          className="inline-block"
          variants={{
            hidden: { y: "100%" },
            show: { y: "0%", transition: { duration: 0.6, ease, delay: 0.2 } },
          }}
        >
          {children}
        </motion.span>
      </span>
    </motion.p>
  );
}