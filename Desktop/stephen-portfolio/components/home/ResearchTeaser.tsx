import Link from "next/link";
import { research } from "@/lib/research";
import RollText from "@/components/ui/RollText";
import GrowthTree from "@/components/home/GrowthTree";
import SectionLabel from "@/components/motion/SectionLabel";
import SectionDivider from "@/components/motion/SectionDivider";
import SplitHeading from "@/components/motion/SplitHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";

export default function ResearchTeaser() {
  return (
    <section id="research" className="relative">
      <SectionDivider />

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-20 lg:py-32">
        {/* Left: the idea */}
        <div>
          <SectionLabel>Research</SectionLabel>

          <SplitHeading
            text={research.headingText}
            accent={research.headingAccent}
            className="mt-4 text-4xl font-extrabold leading-[1.05] tracking-tight lg:text-5xl"
          />

          {/* the comparison — rows slide in from the left */}
          <RevealGroup as="dl" stagger={0.15} className="mt-10 border-t border-line">
            {research.comparison.map((row) => (
              <RevealItem
                key={row.label}
                x={-24}
                y={0}
                className="grid gap-1 border-b border-line py-4 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-6"
              >
                <dt
                  className={`font-mono text-xs uppercase tracking-widest ${
                    row.mine ? "text-accent" : "text-fg-faint"
                  }`}
                >
                  {row.label}
                </dt>
                <dd className={row.mine ? "font-semibold text-fg" : "text-fg-soft"}>
                  {row.text}
                </dd>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.1}>
            <p className="mt-8 max-w-xl leading-relaxed text-fg-soft">{research.why}</p>
          </Reveal>

          <RevealGroup as="ul" stagger={0.08} delay={0.2} className="mt-5 flex flex-wrap gap-2">
            {research.examples.map((example) => (
              <RevealItem
                key={example}
                as="li"
                y={12}
                className="rounded-full border border-line px-3 py-1.5 font-mono text-xs text-fg-muted"
              >
                {example}
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.3} y={16}>
            <Link
              href="/research"
              className="group mt-10 inline-flex min-h-11 items-center gap-2 font-bold text-accent"
            >
              <RollText text="Explore my research" />
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </Reveal>
        </div>

        {/* Right: the growing tree */}
        <GrowthTree caption={research.caption} />
      </div>
    </section>
  );
}