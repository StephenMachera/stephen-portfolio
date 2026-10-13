"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";

type WordProps = {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
  accent: boolean;
};

// one word: faint → bright as its slice of the scroll passes
function Word({ word, progress, range, accent }: WordProps) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span
      style={{ opacity }}
      className={`mr-[0.25em] inline-block ${accent ? "text-accent" : ""}`}
    >
      {word}
    </motion.span>
  );
}

type Props = {
  text: string;
  highlight?: string[];
  className?: string;
};

export default function ScrollRevealText({ text, highlight = [], className }: Props) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();

  // 0 when the paragraph's top reaches 85% down the screen,
  // 1 when its bottom reaches 40% down the screen
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.4"],
  });

  const words = text.split(" ");
  const clean = (w: string) => w.replace(/[^\p{L}]/gu, "");

  return (
    <p ref={ref} className={className}>
      {/* screen readers get the paragraph once, as normal text */}
      <span className="sr-only">{text}</span>

      <span aria-hidden="true">
        {words.map((word, i) => {
          const accent = highlight.includes(clean(word));
          if (reduce) {
            return (
              <span key={i} className={`mr-[0.25em] inline-block ${accent ? "text-accent" : ""}`}>
                {word}
              </span>
            );
          }
          const start = i / words.length;
          const end = start + 1 / words.length;
          return (
            <Word
              key={i}
              word={word}
              progress={scrollYProgress}
              range={[start, end]}
              accent={accent}
            />
          );
        })}
      </span>
    </p>
  );
}