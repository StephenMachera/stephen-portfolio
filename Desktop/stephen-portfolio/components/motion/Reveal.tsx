"use client";

import type { ReactNode } from "react";
import { motion, type Variants } from "motion/react";

export const ease = [0.22, 1, 0.36, 1] as const; // fast start, soft landing

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  x?: number;
  scale?: number;
  duration?: number;
};

// One element that fades and rises in when it scrolls into view
export function Reveal({
  children,
  className,
  delay = 0,
  y = 32,
  x = 0,
  scale = 1,
  duration = 0.8,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x, scale }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

type GroupProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul" | "dl";
  stagger?: number;
  delay?: number;
};

// A group whose children (RevealItem) arrive one after another
export function RevealGroup({
  children,
  className,
  as = "div",
  stagger = 0.1,
  delay = 0,
}: GroupProps) {
  const Comp = as === "ul" ? motion.ul : as === "dl" ? motion.dl : motion.div;
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {children}
    </Comp>
  );
}

type ItemProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
  y?: number;
  x?: number;
};

export function RevealItem({ children, className, as = "div", y = 28, x = 0 }: ItemProps) {
  const variants: Variants = {
    hidden: { opacity: 0, y, x },
    show: { opacity: 1, y: 0, x: 0, transition: { duration: 0.7, ease } },
  };
  const Comp = as === "li" ? motion.li : motion.div;
  return (
    <Comp className={className} variants={variants}>
      {children}
    </Comp>
  );
}