"use client";

import { useEffect, useRef, useState } from "react";

type Options = {
  locked?: boolean; // true = never hide (e.g. while the menu is open)
};

export function useScrollHeader({ locked = false }: Options = {}) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  const lastY = useRef(0);       // where we were last time
  const ticking = useRef(false); // stops us doing work more than once per frame

  useEffect(() => {
    lastY.current = window.scrollY;

    const update = () => {
      const y = window.scrollY;
      const diff = y - lastY.current; // positive = scrolling down

      setScrolled(y > 24);

      if (locked || y < 120) {
        setHidden(false); // near the top, or menu open: always show
      } else if (diff > 6) {
        setHidden(true);  // scrolling down
      } else if (diff < -6) {
        setHidden(false); // scrolling up
      }

      // only remember the position after a real move (ignores tiny jitters)
      if (Math.abs(diff) > 6) lastY.current = y;
      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(update);
      }
    };

    update(); // correct state if the page loads already scrolled
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [locked]);

  return { scrolled, hidden: hidden && !locked };
}