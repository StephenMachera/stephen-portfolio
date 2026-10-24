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
  const { scrolled } = useScrollHeader({ locked: open });

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-40 px-4 pt-4 sm:px-6"
      >
        <div
          className={`theme-forest mx-auto flex max-w-6xl items-center justify-between gap-6 rounded-full pl-5 pr-2 shadow-[0_8px_24px_rgb(20_40_26/0.18)] transition-[height] duration-300 ease-out ${
            scrolled ? "h-14" : "h-16"
          }`}
        >
          {/* Logo: moon + name */}
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
            <span aria-hidden="true" className="ml-3 whitespace-nowrap">
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
                        active ? "text-accent" : "text-fg hover:text-accent"
                      }`}
                    >
                      <RollText text={link.label} />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Let's Talk — desktop only: white pill, magnetic + text roll */}
          <MagneticLink
            href={ctaLink.href}
            className="hidden min-h-11 items-center rounded-full bg-white px-6 text-[15px] font-bold text-forest-deep lg:inline-flex"
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