"use client";

import Link from "next/link";
import type { PointerEvent, ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";

const MotionLink = motion.create(Link);

// springy snap-back with a small wobble
const spring = { stiffness: 220, damping: 15, mass: 0.4 };
const MAX = 8; // subtle: the button moves at most 8px

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
  external?: boolean; // true = open in a new tab
};

export default function MagneticLink({
  href,
  children,
  className,
  onClick,
  ariaLabel,
  external,
}: Props) {
  const reduceMotion = useReducedMotion();

  // the button
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, spring);
  const springY = useSpring(y, spring);

  // the text inside — moves a bit more, for depth
  const innerX = useMotionValue(0);
  const innerY = useMotionValue(0);
  const springInnerX = useSpring(innerX, spring);
  const springInnerY = useSpring(innerY, spring);

  function handleMove(e: PointerEvent<HTMLAnchorElement>) {
    if (reduceMotion || e.pointerType !== "mouse") return; // desktop mouse only

    const box = e.currentTarget.getBoundingClientRect();
    // -1 (left/top edge) … 0 (centre) … 1 (right/bottom edge)
    const dx = (e.clientX - (box.left + box.width / 2)) / (box.width / 2);
    const dy = (e.clientY - (box.top + box.height / 2)) / (box.height / 2);

    x.set(dx * MAX);
    y.set(dy * MAX);
    innerX.set(dx * MAX * 0.5);
    innerY.set(dy * MAX * 0.5);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
    innerX.set(0);
    innerY.set(0);
  }

  return (
    <MotionLink
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onClick={onClick}
      aria-label={ariaLabel}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{ x: springX, y: springY }}
      className={`group ${className ?? ""}`}
    >
      <motion.span
        style={{ x: springInnerX, y: springInnerY }}
        className="inline-flex items-center gap-2"
      >
        {children}
      </motion.span>
    </MotionLink>
  );
}