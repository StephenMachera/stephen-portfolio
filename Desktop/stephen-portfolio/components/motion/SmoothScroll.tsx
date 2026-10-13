"use client";

import Lenis from "lenis";
import { useEffect } from "react";

// one shared Lenis instance, so other components can use it (e.g. Back to top)
let lenis: Lenis | null = null;
export const getLenis = () => lenis;

export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    lenis = new Lenis({
      autoRaf: true, // Lenis runs its own animation loop
      anchors: true, // smooth-scroll for links like #doors
      lerp: 0.1,     // lower = smoother/slower, higher = snappier
    });

    return () => {
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  return null;
}