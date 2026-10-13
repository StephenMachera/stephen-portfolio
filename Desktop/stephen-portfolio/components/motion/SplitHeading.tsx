"use client";

import { motion } from "motion/react";
import { ease } from "@/components/motion/Reveal";

type Props = {
  text: string;
  accent?: string[];
  className?: string;
  as?: "h1" | "h2";
};

// Each word rises out of an invisible line, one after another
export default function SplitHeading({ text, accent = [], className, as = "h2" }: Props) {
  const words = text.split(" ");
  const clean = (w: string) => w.replace(/[^\p{L}']/gu, "");
  const Tag = as === "h1" ? motion.h1 : motion.h2;

  return (
    <Tag
      className={className}
      aria-label={text}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
    >
      {words.map((word, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="mr-[0.25em] inline-block overflow-hidden pb-[0.12em] align-bottom"
        >
          <motion.span
            className={`inline-block ${accent.includes(clean(word)) ? "text-accent" : ""}`}
            variants={{
              hidden: { y: "110%" },
              show: { y: "0%", transition: { duration: 0.9, ease } },
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}