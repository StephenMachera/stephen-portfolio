"use client";

import { motion } from "motion/react";
import { ease } from "@/components/motion/Reveal";

// The line across the top of a section: draws left → right,
// with a glowing yellow dot racing along it.
export default function SectionDivider() {
  return (
    <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px">
      <motion.div
        className="h-px origin-left bg-line"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease }}
      />
      <motion.span
        className="absolute top-0 size-1.5 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_14px_var(--color-accent)]"
        initial={{ left: "0%", opacity: 0 }}
        whileInView={{ left: "100%", opacity: [0, 1, 1, 0] }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease }}
      />
    </div>
  );
}