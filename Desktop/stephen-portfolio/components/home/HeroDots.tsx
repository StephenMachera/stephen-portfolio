"use client";

import { useEffect, useRef } from "react";

export default function HeroDots() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const area = cursor?.parentElement?.parentElement; // the Hero section
    if (!cursor || !area) return;

    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const box = area.getBoundingClientRect();
      cursor.style.setProperty("--mx", `${e.clientX - box.left}px`);
      cursor.style.setProperty("--my", `${e.clientY - box.top}px`);
      cursor.dataset.active = "true";
    };
    const leave = () => {
      cursor.dataset.active = "false";
    };

    area.addEventListener("pointermove", move);
    area.addEventListener("pointerleave", leave);
    return () => {
      area.removeEventListener("pointermove", move);
      area.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div className="dot-field" aria-hidden="true">
      <div className="dot-grid dot-grid-faint" />
      <div className="dot-grid dot-grid-bright animate-dot-wander" />
      <div ref={cursorRef} className="dot-grid dot-grid-bright dot-cursor" />
    </div>
  );
}