"use client";

import { useMemo, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import RollText from "@/components/ui/RollText";

type Segment = { d: string; depth: number };
type Tip = { x: number; y: number };

const MAX_DEPTH = 7;

// Grows a tree from one simple rule: every branch splits into 2 (sometimes 3)
// shorter branches at a slightly random angle. Same seed = same tree,
// so the server and the browser draw the same first tree.
function grow(seed: number) {
  let s = seed;
  const rand = () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };

  const segments: Segment[] = [];
  const tips: Tip[] = [];

  function branch(x: number, y: number, angle: number, length: number, depth: number) {
    const x2 = x + Math.cos(angle) * length;
    const y2 = y + Math.sin(angle) * length;
    segments.push({
      d: `M${x.toFixed(1)} ${y.toFixed(1)} L${x2.toFixed(1)} ${y2.toFixed(1)}`,
      depth,
    });

    if (depth >= MAX_DEPTH || length < 8) {
      tips.push({ x: x2, y: y2 });
      return;
    }

    const children = depth > 1 && rand() < 0.25 ? 3 : 2;
    for (let k = 0; k < children; k++) {
      const spread = 0.35 + rand() * 0.3;
      const offset = children === 2 ? (k === 0 ? -1 : 1) * spread : (k - 1) * spread;
      branch(x2, y2, angle + offset + (rand() - 0.5) * 0.2, length * (0.68 + rand() * 0.12), depth + 1);
    }
  }

  branch(200, 410, -Math.PI / 2, 92, 0);
  return { segments, tips };
}

export default function GrowthTree({ caption }: { caption: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduce = useReducedMotion();

  const [seed, setSeed] = useState(42);
  const tree = useMemo(() => grow(seed), [seed]);

  const show = inView || !!reduce;
  const step = 0.28; // seconds between generations

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-md">
      {/* soft yellow glow behind */}
      <div
        aria-hidden="true"
        className="absolute inset-12 -z-10 rounded-full bg-accent/10 blur-3xl"
      />

      <svg
        key={seed}
        viewBox="0 0 400 420"
        role="img"
        aria-label="A branching tree that grows itself, generation by generation"
        className="h-auto w-full"
      >
        {tree.segments.map((seg, i) => (
          <motion.path
            key={i}
            d={seg.d}
            fill="none"
            strokeLinecap="round"
            strokeWidth={Math.max(0.7, 3.4 - seg.depth * 0.42)}
            stroke={
              seg.depth >= MAX_DEPTH - 1
                ? "var(--color-accent)"
                : "color-mix(in srgb, var(--color-fg) 55%, transparent)"
            }
            initial={reduce ? false : { pathLength: 0 }}
            animate={show ? { pathLength: 1 } : undefined}
            transition={{ duration: 0.5, delay: seg.depth * step, ease: "easeOut" }}
          />
        ))}

        {tree.tips.map((tip, i) => (
          <motion.circle
            key={`t${i}`}
            cx={tip.x}
            cy={tip.y}
            r={2.6}
            fill="var(--color-accent)"
            initial={reduce ? false : { opacity: 0, scale: 0 }}
            animate={show ? { opacity: 1, scale: 1 } : undefined}
            transition={{ duration: 0.4, delay: (MAX_DEPTH + 1) * step + (i % 12) * 0.03 }}
          />
        ))}
      </svg>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <p className="max-w-xs font-mono text-xs leading-relaxed text-fg-muted">{caption}</p>
        <button
          type="button"
          onClick={() => setSeed((s) => (s * 48271) % 2147483647)}
          className="group inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-4 text-sm font-medium transition-colors duration-300 [-webkit-tap-highlight-color:transparent] hover:border-accent hover:text-accent active:border-accent active:text-accent"
        >
          <svg
            aria-hidden="true"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-500 group-hover:rotate-180"
          >
            <path d="M21 12a9 9 0 1 1-3-6.7L21 8" />
            <path d="M21 3v5h-5" />
          </svg>
          <RollText text="Grow another" />
        </button>
      </div>
    </div>
  );
}