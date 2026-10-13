"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "motion/react";
import SmoothScroll from "@/components/motion/SmoothScroll";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    // "user" = respect the visitor's "reduce motion" setting, site-wide
    <MotionConfig reducedMotion="user">
      <SmoothScroll />
      {children}
    </MotionConfig>
  );
}