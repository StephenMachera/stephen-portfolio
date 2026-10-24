"use client";

import { useEffect, useState } from "react";
import { ctaLink } from "@/lib/nav";
import MagneticLink from "@/components/ui/MagneticLink";
import RollText from "@/components/ui/RollText";

type Props = {
  suppressed: boolean; // true = stay hidden (menu open, or already on Let's Talk)
};

export default function FloatingTalk({ suppressed }: Props) {
  const [pastHero, setPastHero] = useState(false);

  // only appear once the visitor has scrolled past the top section
  useEffect(() => {
    let ticking = false;

    const update = () => {
      setPastHero(window.scrollY > 600);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const visible = pastHero && !suppressed;

  return (
    // outer: position + show/hide animation
    <div
      inert={!visible}
      className={`lg:hidden fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-5 z-20 transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]  ${
        visible
          ? "translate-y-0 scale-100 opacity-100"
          : "pointer-events-none translate-y-6 scale-90 opacity-0"
      }`}
    >
      {/* soft pulse ring behind the button */}
      <span
        aria-hidden="true"
        className="absolute inset-0 animate-ping rounded-full bg-accent opacity-40 [animation-duration:2.4s]"
      />
      {/* inner: the magnetic button */}
      <MagneticLink
        href={ctaLink.href}
        ariaLabel={ctaLink.label}
        className="inline-flex size-14 items-center justify-center rounded-full bg-accent font-bold text-forest-deep shadow-[0_8px_24px_rgb(20_40_26/0.3)]"
      >
        {/* chat bubble icon */}
        <svg
          aria-hidden="true"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z" />
        </svg>
      </MagneticLink>
    </div>
  );
}