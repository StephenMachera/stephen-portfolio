import Link from "next/link";
import { navLinks, ctaLink } from "@/lib/nav";
import { site, socials } from "@/lib/site";
import FooterReveal from "@/components/layout/FooterReveal";
import Marquee from "@/components/ui/Marquee";
import MagneticLink from "@/components/ui/MagneticLink";
import RollText from "@/components/ui/RollText";
import LocalTime from "@/components/ui/LocalTime";
import BackToTop from "@/components/ui/BackToTop";
import SocialIcon from "@/components/ui/SocialIcon";

const heading = "text-sm font-bold text-accent";
const linkStyle = "text-sm text-fg-soft transition-colors duration-300 hover:text-accent";

export default function Footer() {
  const year = new Date().getFullYear();
  const pages = [...navLinks, ctaLink];

  return (
    <FooterReveal className="relative bg-ink">
      <Marquee />

      <div className="mx-auto max-w-7xl px-6 pb-12 pt-16 lg:pt-20">
        {/* Heading row */}
        <div className="flex flex-wrap items-center justify-between gap-6 border-b border-line pb-10">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Let&apos;s <span className="italic text-accent">Connect</span> there
          </h2>

          <MagneticLink
            href={ctaLink.href}
            className="theme-forest inline-flex min-h-12 items-center gap-3 rounded-full py-1.5 pl-6 pr-1.5 text-sm font-bold"
          >
            <RollText text={ctaLink.label} />
            <span
              aria-hidden="true"
              className="inline-flex size-9 items-center justify-center rounded-full bg-accent text-forest-deep"
            >
              →
            </span>
          </MagneticLink>
        </div>

        {/* Columns */}
        <div className="grid gap-10 pt-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.4fr_1.2fr] lg:gap-12">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center text-lg font-bold" aria-label="Stephen Machera — home">
              <span
                aria-hidden="true"
                className="size-7 shrink-0 rounded-full bg-accent shadow-[inset_-8px_-3px_0_0_var(--color-ink)]"
              />
              <span className="ml-3">{site.name}</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-fg-muted">
              {site.role} · {site.location}. Building real products that solve real problems.
            </p>
            <ul className="mt-5 flex gap-2">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${social.label} (opens in a new tab)`}
                    title={social.label}
                    className="inline-flex size-9 items-center justify-center rounded-full bg-accent text-forest-deep transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    <SocialIcon name={social.icon} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h3 className={heading}>Navigation</h3>
            <ul className="mt-4 space-y-3">
              {pages.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={`group inline-block ${linkStyle}`}>
                    <RollText text={link.label} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className={heading}>Contact</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a href={`mailto:${site.email}`} className={linkStyle}>
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${site.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkStyle}
                >
                  WhatsApp · {site.whatsapp}
                </a>
              </li>
              <li className="text-sm text-fg-soft">
                {site.city}, {site.location}
              </li>
            </ul>
          </div>

          {/* Local time + back to top */}
          <div>
            <h3 className={heading}>Local time</h3>
            <p className="mt-4 flex items-center gap-2 font-mono text-lg text-fg">
              <span aria-hidden="true" className="size-2 animate-pulse rounded-full bg-accent" />
              <LocalTime />
            </p>
            <p className="mt-3 text-sm leading-relaxed text-fg-muted">{site.replyTime}</p>
            <div className="mt-5 text-sm text-fg-muted">
              <BackToTop />
            </div>
          </div>
        </div>
      </div>

      {/* Green copyright bar */}
      <div className="theme-forest">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-4 text-xs">
          <p>
            Copyright © {year} <span className="text-accent">{site.name}</span>. All Rights Reserved.
          </p>
          <p>{site.role} · {site.location}</p>
        </div>
      </div>
    </FooterReveal>
  );
}
