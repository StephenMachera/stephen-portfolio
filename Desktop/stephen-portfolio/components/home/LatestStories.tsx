import Link from "next/link";
import { getStories } from "@/lib/content";
import RollText from "@/components/ui/RollText";
import SectionLabel from "@/components/motion/SectionLabel";
import SectionDivider from "@/components/motion/SectionDivider";
import SplitHeading from "@/components/motion/SplitHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { CardReveal } from "@/components/motion/CardReveal";
import { FeatureStory, StoryRow } from "@/components/stories/StoryCards";

export default function LatestStories() {
  const stories = getStories().slice(0, 3);
  if (stories.length === 0) return null;

  const [feature, ...rest] = stories;

  return (
    <section id="stories" className="relative">
      <SectionDivider />

      <div className="mx-auto max-w-7xl px-6 py-20 lg:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel>Latest stories</SectionLabel>
            <SplitHeading
              text="What I've lived and learned"
              className="mt-4 text-4xl font-extrabold tracking-tight lg:text-5xl"
            />
          </div>
          <Reveal delay={0.3} y={16}>
            <Link href="/stories" className="group inline-flex min-h-11 items-center gap-2 font-bold text-accent">
              <RollText text="All stories" />
              <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-12">
          <CardReveal>
            <FeatureStory story={feature} />
          </CardReveal>

          <div className="flex flex-col">
            {rest.length > 0 ? (
              <RevealGroup as="ul" stagger={0.15} className="border-t border-line">
                {rest.map((story) => (
                  <RevealItem key={story.slug} as="li" className="border-b border-line">
                    <StoryRow story={story} />
                  </RevealItem>
                ))}
              </RevealGroup>
            ) : (
              <Reveal className="rounded-2xl border border-dashed border-line p-8">
                <p className="font-mono text-xs uppercase tracking-widest text-fg-faint">More coming soon</p>
                <p className="mt-3 text-fg-soft">
                  New stories are on the way. Real moments, and what they taught me.
                </p>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}