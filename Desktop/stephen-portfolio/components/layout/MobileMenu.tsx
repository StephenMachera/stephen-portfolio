"use client";

import Link from "next/link";
import { useEffect } from "react";
import { navLinks, ctaLink, isActive } from "@/lib/nav";

type Props = {
  open: boolean;
  onClose: () => void;
  pathname: string;
};

// a soft "overshoot" curve — the little bounce at the end
const bounce = "ease-[cubic-bezier(0.34,1.56,0.64,1)]";

export default function MobileMenu({ open, onClose, pathname }: Props) {
  // While open: stop the page scrolling, close on Escape,
  // and close if the screen becomes desktop-sized
  useEffect(() => {
    if (!open) return;

    const html = document.documentElement;
    const previous = html.style.overflow;
    html.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onResize = () => {
      if (desktop.matches) onClose();
    };

    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);

    return () => {
      html.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
    };
  }, [open, onClose]);

  const count = navLinks.length;

  return (
    <div
      id="mobile-menu"
      inert={!open}
      className={`fixed inset-0 z-30 bg-ink transition-[opacity,visibility] duration-500 lg:hidden ${
        open ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      {/* the same live dot grid as the Hero */}
      <div className="dot-field">
        <div className="dot-grid" />
        <div className="dot-grid dot-grid-bright animate-dot-wander" />
      </div>

      <nav
        aria-label="Mobile"
        className="relative flex h-full flex-col justify-between px-6 pb-12 pt-28"
      >
        <ul className="flex flex-col gap-2">
          {navLinks.map((link, i) => {
            const active = isActive(pathname, link.href);
            return (
              <li
                key={link.href}
                className={`transition-[transform,opacity] duration-500 ${bounce} ${
                  open ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
                style={{
                  // opening: top to bottom · closing: bottom to top
                  transitionDelay: open
                    ? `${120 + i * 70}ms`
                    : `${(count - 1 - i) * 40}ms`,
                }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  aria-current={active ? "page" : undefined}
                  className="flex items-center gap-3 py-2"
                >
                  <span
                    className={`text-3xl font-bold tracking-tight sm:text-4xl ${
                      active ? "text-fg" : "text-fg-muted"
                    }`}
                  >
                    {link.label}
                  </span>
                  {active && (
                    <span
                      aria-hidden="true"
                      className="size-2 rounded-full bg-accent"
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Floating Let's Talk */}
        <div
          className={`flex flex-col items-center transition-[transform,opacity] duration-500 ${bounce} ${
            open ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{ transitionDelay: open ? `${120 + count * 70}ms` : "0ms" }}
        >
          <Link
            href={ctaLink.href}
            onClick={onClose}
            className="inline-flex min-h-14 animate-float items-center gap-2 rounded-full bg-accent px-8 text-lg font-bold text-ink"
          >
            {ctaLink.label}
            <svg
              aria-hidden="true"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m13 6 6 6-6 6" />
            </svg>
          </Link>
          <p className="mt-5 font-mono text-xs uppercase tracking-widest text-fg-faint">
            Full-stack developer · Kenya
          </p>
        </div>
      </nav>
    </div>
  );
}