import Image from "next/image";
import Link from "next/link";
import { navLinks, ctaLink } from "@/lib/nav";
import { site, socials } from "@/lib/site";
import FooterReveal from "@/components/layout/FooterReveal";
import MagneticLink from "@/components/ui/MagneticLink";
import RollText from "@/components/ui/RollText";
import LocalTime from "@/components/ui/LocalTime";
import BackToTop from "@/components/ui/BackToTop";
import SocialIcon from "@/components/ui/SocialIcon";

const label = "font-mono text-xs uppercase tracking-widest text-fg-faint";

// shared style for the phone's outline buttons and icons
const phoneOutline =
  "border border-line transition-[color,border-color,background-color,transform] duration-200 [-webkit-tap-highlight-color:transparent] hover:border-accent hover:bg-accent/10 hover:text-accent active:border-accent active:bg-accent/10 active:text-accent";

export default function Footer() {
  const year = new Date().getFullYear();
  const pages = [...navLinks, ctaLink];

  return (
    <FooterReveal className="relative overflow-hidden bg-ink-deep">
      {/* ───────────── PHONE: full-screen "Let's Talk" ───────────── */}
      <div className="relative flex min-h-dvh flex-col px-6 pb-6 pt-16 lg:hidden">
        {/* live dot grid — same as the Hero */}
        <div className="dot-field">
          <div className="dot-grid" />
          <div className="dot-grid dot-grid-bright animate-dot-wander" />
        </div>

        <div className="relative flex flex-1 flex-col">
          <p className="font-mono text-xs uppercase tracking-widest text-fg-muted">
            Let&apos;s Talk
          </p>
          <h2 className="mt-4 text-[13vw] font-extrabold leading-[0.9] tracking-tight">
            Have
            <br />
            something
            <br />
            in mind?
          </h2>

          {/* Buttons */}
          <div className="mt-8 flex flex-col gap-3">
            <Link
              href={ctaLink.href}
              className="group inline-flex min-h-14 items-center justify-between rounded-full bg-accent pl-7 pr-2 text-lg font-bold text-ink transition-transform duration-200 [-webkit-tap-highlight-color:transparent] active:scale-[0.97]"
            >
              <RollText text={ctaLink.label} />
              <span
                aria-hidden="true"
                className="inline-flex size-10 items-center justify-center rounded-full bg-ink text-accent transition-transform duration-300 group-hover:translate-x-1 group-active:translate-x-1"
              >
                <svg
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
              </span>
            </Link>

            <div className="grid grid-cols-2 gap-3">
              <a
                href={`mailto:${site.email}`}
                className={`group inline-flex min-h-12 items-center justify-center gap-2 rounded-full font-medium active:scale-[0.97] ${phoneOutline}`}
              >
                <svg
                  aria-hidden="true"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <RollText text="Email" />
              </a>
              <a
                href={`https://wa.me/${site.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`group inline-flex min-h-12 items-center justify-center gap-2 rounded-full font-medium active:scale-[0.97] ${phoneOutline}`}
              >
                <svg
                  aria-hidden="true"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                </svg>
                <RollText text="WhatsApp" />
              </a>
            </div>
          </div>

          {/* Bottom group — pushed to the bottom of the screen */}
          <div className="mt-auto pt-10">
            <ul className="flex gap-2">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${social.label} (opens in a new tab)`}
                    className={`inline-flex size-11 items-center justify-center rounded-full text-fg-soft hover:-translate-y-0.5 active:scale-90 ${phoneOutline}`}
                  >
                    <SocialIcon name={social.icon} />
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex items-end justify-between gap-4">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-widest text-fg-faint">
                  Local time
                </p>
                <p className="mt-1 flex items-center gap-2 font-mono text-lg text-fg">
                  <span
                    aria-hidden="true"
                    className="size-2 animate-pulse rounded-full bg-accent"
                  />
                  <LocalTime />
                </p>
              </div>
              <div className="text-sm text-fg-faint">
                <BackToTop />
              </div>
            </div>
          </div>
        </div>

        {/* Giant outlined surname — a signature across the bottom */}
        <p
          aria-hidden="true"
          className="pointer-events-none relative -mx-6 mt-6 select-none whitespace-nowrap text-center text-[24vw] font-extrabold uppercase leading-[0.8] tracking-tighter text-transparent [-webkit-text-stroke:1px_rgb(236_233_226/0.2)]"
        >
          Machera
        </p>

        <p className="relative mt-4 text-center text-xs text-fg-faint">
          © {year} {site.name}
        </p>
      </div>

      {/* ───────────── DESKTOP ───────────── */}
      <div className="hidden lg:block">
        <div className="dot-field">
          <div className="dot-grid dot-grid-faint" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 pb-8 pt-28">
          <div className="grid grid-cols-[1fr_auto] items-center gap-16">
            {/* Left: the invitation */}
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-fg-muted">
                Let&apos;s Talk
              </p>
              <h2 className="mt-6 text-7xl font-extrabold leading-[0.95] tracking-tight xl:text-8xl">
                Have something
                <br />
                in mind?
              </h2>

              <div className="mt-10 flex flex-wrap gap-3">
                <MagneticLink
                  href={`mailto:${site.email}`}
                  className="inline-flex min-h-13 items-center rounded-full bg-accent px-7 font-bold text-ink"
                >
                  <RollText text="Email me" />
                </MagneticLink>
                <MagneticLink
                  href={`https://wa.me/${site.whatsapp}`}
                  external
                  className="inline-flex min-h-13 items-center rounded-full border border-line px-7 font-medium transition-colors duration-300 hover:border-accent hover:text-accent"
                >
                  <RollText text="WhatsApp" />
                </MagneticLink>
              </div>
            </div>

            {/* Right: floating arch portrait */}
            <div className="relative w-64 self-end xl:w-80">
              {/* soft yellow glow behind */}
              <div
                aria-hidden="true"
                className="absolute inset-x-4 bottom-8 top-24 -z-10 rounded-full bg-accent/25 blur-3xl"
              />

              {/* outer: floats up and down */}
              <div className="animate-float-slow">
                {/* same shape as the photo (843 × 1264) so nothing gets cropped */}
                <div className="group relative aspect-[843/1264]">
                  {/* the arch — starts a little below the top so your head pops out */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 top-[18%] rounded-t-full bg-linear-to-b from-accent to-accent/55"
                  />

                  {/* you — sits on top of the arch */}
                  <Image
                    src="/images/me/portrait.png"
                    alt="Portrait of Stephen Machera"
                    fill
                    sizes="(min-width: 1280px) 320px, 256px"
                    className="origin-bottom object-contain object-bottom drop-shadow-[0_8px_24px_rgb(0_0_0/0.35)] transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                </div>
              </div>

              {/* moon sticker */}
              <span
                aria-hidden="true"
                className="absolute -left-5 top-[22%] size-12 animate-float rounded-full bg-accent shadow-[inset_-14px_-5px_0_0_var(--color-ink-deep)]"
              />
            </div>
          </div>

          {/* Three columns */}
          <div className="mt-20 grid grid-cols-3 gap-10 border-t border-line pt-10">
            <div>
              <h3 className={label}>Pages</h3>
              <ul className="mt-4 space-y-2">
                {pages.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group inline-block text-fg-soft transition-colors duration-300 hover:text-fg"
                    >
                      <RollText text={link.label} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className={label}>Elsewhere</h3>
              <ul className="mt-4 flex gap-2">
                {socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${social.label} (opens in a new tab)`}
                      title={social.label}
                      className="inline-flex size-11 items-center justify-center rounded-full border border-line text-fg-soft transition-[color,border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                    >
                      <SocialIcon name={social.icon} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className={label}>Contact</h3>
              <ul className="mt-4 space-y-2 text-fg-soft">
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="transition-colors duration-300 hover:text-accent"
                  >
                    {site.email}
                  </a>
                </li>
                <li>
                  {site.role} · {site.location}
                </li>
                <li className="flex items-center gap-2 font-mono text-sm text-fg-muted">
                  <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
                  <LocalTime />
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom row */}
          <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 text-sm text-fg-faint">
            <p>
              © {year} {site.name}
            </p>
            <BackToTop />
          </div>
        </div>
      </div>
    </FooterReveal>
  );
}