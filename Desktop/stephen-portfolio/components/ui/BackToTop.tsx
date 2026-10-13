"use client";

import RollText from "@/components/ui/RollText";
import { getLenis } from "@/components/motion/SmoothScroll";

export default function BackToTop() {
  function goUp() {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.6 });
      return;
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  }

  return (
    <button
      type="button"
      onClick={goUp}
      className="group inline-flex min-h-11 items-center gap-2 transition-colors duration-300 hover:text-accent"
    >
      <RollText text="Back to top" />
      <span aria-hidden="true">↑</span>
    </button>
  );
}