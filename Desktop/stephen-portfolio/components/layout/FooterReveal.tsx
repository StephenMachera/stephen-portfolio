"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

// The <footer> element itself. It measures its own height and stores it
// in --footer-h, so CSS can decide where it should stick.
export default function FooterReveal({ children, className }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      el.style.setProperty("--footer-h", `${el.offsetHeight}px`);
    };

    update();
    const observer = new ResizeObserver(update); // re-measure when its size changes
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={ref}
      className={`sticky bottom-[min(0px,calc(100dvh_-_var(--footer-h,0px)))] z-0 ${className ?? ""}`}
    >
      {children}
    </footer>
  );
}