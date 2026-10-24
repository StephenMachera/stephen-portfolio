import Link from "next/link";
import type { ReactNode } from "react";
import { doors, type Door } from "@/lib/doors";
import { ctaLink } from "@/lib/nav";
import RollText from "@/components/ui/RollText";
import SectionLabel from "@/components/motion/SectionLabel";
import SplitHeading from "@/components/motion/SplitHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { CardReveal } from "@/components/motion/CardReveal";

// a door is either a file download (CV) or a normal page link
function DoorLink({
  door,
  className,
  children,
}: {
  door: Door;
  className: string;
  children: ReactNode;
}) {
  if (door.download) {
    return (
      <a href={door.href} download className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={door.href} className={className}>
      {children}
    </Link>
  );
}

const swing =
  "group-hover:[transform:rotateY(-72deg)] group-focus-visible:[transform:rotateY(-72deg)]";

export default function Doors() {
  return (
    <section id="doors" className="theme-forest relative scroll-mt-24">

      <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
        {/* Heading */}
        <div className="max-w-2xl">
          <SectionLabel>Work together</SectionLabel>
          <SplitHeading
            text="Pick your door"
            accent={["door"]}
            className="mt-4 text-4xl font-extrabold tracking-tight lg:text-5xl"
          />
          <Reveal delay={0.2}>
            <p className="mt-4 text-fg-soft">
              Whoever you are, there&apos;s a way in. Choose the one that fits you.
            </p>
          </Reveal>
        </div>

        {/* ───────── DESKTOP: three arched doors that swing open ───────── */}
        <div className="mt-14 hidden grid-cols-3 gap-6 lg:grid">
          {doors.map((door, i) => (
            <CardReveal key={door.id} index={i}>
              <DoorLink
                door={door}
                className="group relative block aspect-[3/4] overflow-hidden rounded-t-full border border-line [perspective:1400px]"
              >
                {/* the room behind the door */}
                <div className="absolute inset-0 flex flex-col justify-end bg-accent p-8 pl-[38%] text-forest-deep">
                  <ul className="space-y-2.5 text-sm font-medium leading-snug">
                    {door.points.map((point) => (
                      <li key={point} className="flex gap-2">
                        <span aria-hidden="true" className="mt-1.5 size-1.5 shrink-0 rounded-full bg-ink" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-6 inline-flex items-center gap-2 font-extrabold">
                    {door.cta}
                    <span aria-hidden="true">→</span>
                  </span>
                </div>

                {/* the door itself — swings open on its left hinge */}
                <div
                  className={`absolute inset-0 origin-left bg-surface transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] ${swing}`}
                >
                  <div className="dot-grid dot-grid-faint" aria-hidden="true" />

                  {/* inner arch panel, like a real door */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-5 rounded-t-full border border-line"
                  />

                  {/* glowing doorknob */}
                  <span
                    aria-hidden="true"
                    className="absolute right-8 top-1/2 size-3 rounded-full bg-accent shadow-[0_0_14px_var(--color-accent)]"
                  />

                  <div className="absolute inset-x-0 bottom-0 p-9">
                    <p className="font-mono text-xs uppercase tracking-widest text-fg-muted">
                      {door.who}
                    </p>
                    <h3 className="mt-3 text-4xl font-extrabold tracking-tight">{door.title}</h3>
                    <p className="mt-3 max-w-[16rem] text-sm leading-relaxed text-fg-soft">
                      {door.line}
                    </p>
                  </div>
                </div>
              </DoorLink>
            </CardReveal>
          ))}
        </div>

        {/* ───────── PHONE: compact rows with a small door icon ───────── */}
        <RevealGroup as="ul" stagger={0.12} className="mt-10 space-y-3 lg:hidden">
          {doors.map((door) => (
            <RevealItem key={door.id} as="li">
              <DoorLink
                door={door}
                className="group flex items-center gap-4 rounded-2xl border border-line bg-surface/60 p-4 transition-transform duration-200 [-webkit-tap-highlight-color:transparent] active:scale-[0.98]"
              >
                <span
                  aria-hidden="true"
                  className="relative h-14 w-11 shrink-0 overflow-hidden rounded-t-full border border-line bg-accent/15 transition-colors duration-300 group-active:bg-accent"
                >
                  <span className="absolute right-2 top-1/2 size-1.5 rounded-full bg-accent group-active:bg-ink" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-mono text-[11px] uppercase tracking-widest text-fg-muted">
                    {door.who}
                  </span>
                  <span className="mt-0.5 block text-xl font-bold">{door.title}</span>
                  <span className="mt-0.5 block text-sm text-fg-soft">{door.line}</span>
                </span>
                <span
                  aria-hidden="true"
                  className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-line transition-colors duration-300 group-active:border-accent group-active:text-accent"
                >
                  →
                </span>
              </DoorLink>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* for people who don't fit a box */}
        <Reveal delay={0.2} className="mt-10 lg:mt-14">
          <Link
            href={ctaLink.href}
            className="group inline-flex min-h-11 items-center gap-2 text-fg-soft transition-colors hover:text-fg"
          >
            Not sure which?
            <span className="font-bold text-accent">
              <RollText text="Just say hello" />
            </span>
            <span
              aria-hidden="true"
              className="inline-block text-accent transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}