"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { ease } from "@/components/motion/Reveal";

// A project card "dealt" onto the table: rises, tilted back in 3D, settles flat
export function CardReveal({
  children,
  index = 0,
  className,
}: {
  children: ReactNode;
  index?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      style={{ transformPerspective: 1200 }}
      initial={{ opacity: 0, y: 90, rotateX: 18, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ type: "spring", stiffness: 80, damping: 18, mass: 0.9, delay: index * 0.12 }}
    >
      {children}
    </motion.div>
  );
}

// The image inside a card zooms out as the card lands
export function ZoomReveal({ children }: { children: ReactNode }) {
  return (
    <motion.div
      className="absolute inset-0"
      initial={{ scale: 1.3 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.4, ease }}
    >
      {children}
    </motion.div>
  );
}