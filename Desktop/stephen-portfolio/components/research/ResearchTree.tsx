"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

type Branch = { d: string; depth: number; width: number };
type Bud = { x: number; y: number; depth: number };

const MAX_DEPTH = 7;
const STEP = 0.35; // seconds between each level of branches

// Same seed = same tree (on the server and in the browser)
function seeded(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

function growTree(seed: number) {
  const rand = seeded(seed);
  const branches: Branch[] = [];
  const buds: Bud[] = [];
  const f = (n: number) => n.toFixed(1);

  function branch(x: number, y: number, angle: number, len: number, depth: number) {
    const x2 = x + Math.cos(angle) * len;
    const y2 = y + Math.sin(angle) * len;

    // a small bend so branches look alive, not straight sticks
    const bend = (rand() - 0.5) * len * 0.35;
    const cx = (x + x2) / 2 + Math.cos(angle + Math.PI / 2) * bend;
    const cy = (y + y2) / 2 + Math.sin(angle + Math.PI / 2) * bend;

    branches.push({
      d: `M${f(x)} ${f(y)} Q${f(cx)} ${f(cy)} ${f(x2)} ${f(y2)}`,
      depth,
      width: Math.max(0.8, (MAX_DEPTH - depth) * 1.1),
    });

    if (depth >= MAX_DEPTH || len < 6) {
      buds.push({ x: x2, y: y2, depth });
      return;
    }

    const kids = rand() < 0.25 ? 3 : 2;
    for (let k = 0; k < kids; k++) {
      const spread = 0.3 + rand() * 0.35;
      const offset = kids === 2 ? (k === 0 ? -spread : spread) : (k - 1) * spread;
      branch(
        x2,
        y2,
        angle + offset + (rand() - 0.5) * 0.2,
        len * (0.68 + rand() * 0.12),
        depth + 1,
      );
    }
  }

  branch(200, 410, -Math.PI / 2, 88, 0);
  return { branches, buds };
}

export default function ResearchTree() {
  const [seed, setSeed] = useState(7);
  const reduce = useReducedMotion();
  const { branches, buds } = useMemo(() => growTree(seed), [seed]);

  return (
    <div className="absolute inset-0">
      <div aria-hidden className="dot-grid dot-grid-faint absolute inset-0" />

      <svg
        key={seed} // new seed = fresh tree that grows again
        viewBox="0 0 400 420"
        preserveAspectRatio="xMidYMax meet"
        className="absolute inset-x-0 bottom-0 h-[90%] w-full"
        role="img"
        aria-label="A tree growing, branch by branch"
      >
        {branches.map((b, i) => (
          <motion.path
            key={i}
            d={b.d}
            fill="none"
            stroke="var(--color-fg-soft)"
            strokeOpacity={0.75 - b.depth * 0.06}
            strokeWidth={b.width}
            strokeLinecap="round"
            initial={reduce ? false : { pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: STEP + 0.15, delay: b.depth * STEP, ease: "easeOut" }}
          />
        ))}

        {buds.map((b, i) => (
          <motion.circle
            key={i}
            cx={b.x}
            cy={b.y}
            r={2.4}
            fill="var(--color-accent)"
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
            initial={reduce ? false : { scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: (b.depth + 1) * STEP,
              type: "spring",
              stiffness: 300,
              damping: 14,
            }}
          />
        ))}
      </svg>

      <button
        type="button"
        onClick={() => setSeed((s) => s + 1)}
        className="absolute right-4 bottom-4 z-10 rounded-full border border-line bg-ink/70 px-4 py-2 font-mono text-xs tracking-[0.12em] text-fg-muted uppercase backdrop-blur transition-colors hover:border-accent hover:text-accent active:border-accent active:text-accent"
      >
        Grow another ↻
      </button>
    </div>
  );
}