import Link from "next/link";
import { site } from "@/lib/site";
import RollText from "@/components/ui/RollText";
import ScrollRevealText from "@/components/home/ScrollRevealText";
import SectionLabel from "@/components/motion/SectionLabel";
import SectionDivider from "@/components/motion/SectionDivider";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";

function CvButton() {
  return (
    <div className="animate-float self-start hover:[animation-play-state:paused]">
      <a
        href={site.cvUrl}
        download
        className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-accent pl-5 pr-1.5 font-bold text-ink transition-transform duration-200 [-webkit-tap-highlight-color:transparent] active:scale-[0.97] lg:min-h-13 lg:pl-6 lg:pr-2"
      >
        <RollText text="Download CV" />
        <span
          aria-hidden="true"
          className="inline-flex size-9 items-center justify-center rounded-full bg-ink text-accent"
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
            className="transition-transform duration-300 group-hover:translate-y-0.5 group-active:translate-y-0.5"
          >
            <path d="M12 4v12" />
            <path d="m6 11 6 6 6-6" />
            <path d="M5 20h14" />
          </svg>
        </span>
      </a>
    </div>
  );
}

function JourneyLink() {
  return (
    <Link
      href="/journey"
      className="group inline-flex min-h-12 items-center gap-2 font-bold text-accent"
    >
      <RollText text="Read my journey" />
      <span
        aria-hidden="true"
        className="inline-block transition-transform duration-300 group-hover:translate-x-1"
      >
        →
      </span>
    </Link>
  );
}

export default function Intro() {
  return (
    <section id="about" className="relative">
      <SectionDivider />

      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-x-20 lg:gap-y-12 lg:py-36">
        <SectionLabel className="lg:col-start-1 lg:row-start-1">Who I am</SectionLabel>

        <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <ScrollRevealText
            text={site.introLead}
            highlight={site.introHighlights}
            className="text-[1.65rem] font-semibold leading-[1.25] tracking-[-0.015em] sm:text-3xl lg:text-[clamp(1.75rem,2.6vw,2.25rem)]"
          />

          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-fg-soft sm:text-lg">
              {site.introBody}
            </p>
          </Reveal>

          <Reveal delay={0.2} className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 lg:hidden">
            <CvButton />
            <JourneyLink />
          </Reveal>

          <Reveal delay={0.2} className="mt-8 hidden lg:block">
            <JourneyLink />
          </Reveal>
        </div>

        <div className="flex flex-col gap-10 lg:col-start-1 lg:row-start-2 lg:self-end">
          <Reveal className="hidden lg:flex">
            <CvButton />
          </Reveal>

          <RevealGroup
            as="dl"
            className="grid grid-cols-2 gap-3 lg:grid-cols-1 lg:gap-6 lg:border-t lg:border-line lg:pt-8"
          >
            {site.facts.map((fact) => (
              <RevealItem
                key={fact.label}
                className="rounded-2xl border border-line bg-surface/60 p-4 lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0"
              >
                <dt className="font-mono text-[11px] uppercase tracking-widest text-fg-faint lg:text-xs">
                  {fact.label}
                </dt>
                <dd className="mt-1.5 text-sm leading-snug text-fg-soft lg:text-base">
                  {fact.value}
                </dd>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}