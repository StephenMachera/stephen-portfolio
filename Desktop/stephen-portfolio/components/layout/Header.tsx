"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { usePathname } from "next/navigation";
import { navLinks, ctaLink, isActive } from "@/lib/nav";
import { useScrollHeader } from "@/hooks/useScrollHeader";
import MobileMenu from "@/components/layout/MobileMenu";
import FloatingTalk from "@/components/layout/FloatingTalk";
import MagneticLink from "@/components/ui/MagneticLink";
import RollText from "@/components/ui/RollText";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const closeMenu = useCallback(() => setOpen(false), []);

  // locked: the header never hides while the menu is open
  const { scrolled, hidden } = useScrollHeader({ locked: open });

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 border-b transition-[transform,background-color,border-color] duration-300 ease-out focus-within:translate-y-0 ${
          hidden ? "-translate-y-full" : "translate-y-0"
        } ${
          scrolled && !open
            ? "border-line bg-ink/75 backdrop-blur-md"
            : "border-transparent bg-transparent"
        }`}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 transition-[height] duration-300 ease-out ${
            scrolled ? "h-17" : "h-22"
          }`}
        >
          {/* Logo: moon + name (name fades out after scrolling) */}
          <Link
            href="/"
            onClick={closeMenu}
            aria-label="Stephen Machera — home"
            className="flex items-center text-lg font-bold"
          >
            <span
              aria-hidden="true"
              className="size-7 shrink-0 rounded-full bg-accent shadow-[inset_-8px_-3px_0_0_var(--color-ink)]"
            />
            <span
              aria-hidden="true"
              className={`overflow-hidden whitespace-nowrap transition-all duration-300 ease-out ${
                scrolled ? "ml-0 max-w-0 opacity-0" : "ml-3 max-w-48 opacity-100"
              }`}
            >
              Stephen Machera
            </span>
          </Link>

          {/* Page links — desktop only, with text roll */}
          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-8 text-[15px]">
              {navLinks.map((link) => {
                const active = isActive(pathname, link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={`group relative inline-block py-2 transition-colors duration-300 ${
                        active ? "text-fg" : "text-fg-muted hover:text-fg"
                      }`}
                    >
                      <RollText text={link.label} />
                      {active && (
                        <span
                          aria-hidden="true"
                          className="absolute -bottom-1 left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-accent"
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Let's Talk — desktop only: magnetic + text roll */}
          <MagneticLink
            href={ctaLink.href}
            className="hidden min-h-11 items-center rounded-full border border-line px-5 text-[15px] font-medium transition-colors duration-300 hover:border-accent hover:text-accent lg:inline-flex"
          >
            <RollText text={ctaLink.label} />
          </MagneticLink>

          {/* Menu button — phones only: two lines that twist into an X */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex size-11 items-center justify-center rounded-full border border-line lg:hidden"
          >
            <span aria-hidden="true" className="relative block h-3 w-5">
              <span
                className={`absolute left-0 top-1/2 -mt-px h-0.5 w-5 rounded-full bg-current transition-transform duration-300 ease-out ${
                  open ? "translate-y-0 rotate-45" : "-translate-y-[5px]"
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 -mt-px h-0.5 w-5 rounded-full bg-current transition-transform duration-300 ease-out ${
                  open ? "translate-y-0 -rotate-45" : "translate-y-[5px]"
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      <MobileMenu open={open} onClose={closeMenu} pathname={pathname} />
      <FloatingTalk suppressed={open || pathname === ctaLink.href} />
    </>
  );
}