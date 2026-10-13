import type { Metadata } from "next";
import { getStories } from "@/lib/content";
import HeroDots from "@/components/home/HeroDots";
import SectionLabel from "@/components/motion/SectionLabel";
import SplitHeading from "@/components/motion/SplitHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { CardReveal } from "@/components/motion/CardReveal";
import { FeatureStory, StoryRow } from "@/components/stories/StoryCards";

export const metadata: Metadata = {
  title: "Stories",
  description: "Real moments from building, failing and learning — and what each one taught me.",
};

export default function StoriesPage() {
  const stories = getStories();
  const [feature, ...rest] = stories;

  return (
    <>
      {/* page header */}
      <section className="relative overflow-hidden">
        <HeroDots />
        <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-32 lg:pb-20 lg:pt-40">
          <SectionLabel>Stories</SectionLabel>
          <SplitHeading
            as="h1"
            text="What I've lived and learned"
            accent={["learned"]}
            className="mt-4 max-w-4xl text-5xl font-extrabold leading-[1.02] tracking-tight lg:text-7xl"
          />
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-fg-soft">
              Real moments from building, failing and learning — and what each one taught me.
            </p>
          </Reveal>
        </div>
      </section>

      {/* the stories */}
      <section className="mx-auto max-w-7xl px-6 pb-24 lg:pb-32">
        {stories.length === 0 ? (
          <p className="text-fg-soft">The first story is on its way.</p>
        ) : (
          <>
            <CardReveal className="max-w-4xl">
              <FeatureStory story={feature} />
            </CardReveal>

            {rest.length > 0 && (
              <RevealGroup as="ul" stagger={0.12} className="mt-16 border-t border-line">
                {rest.map((story) => (
                  <RevealItem key={story.slug} as="li" className="border-b border-line">
                    <StoryRow story={story} />
                  </RevealItem>
                ))}
              </RevealGroup>
            )}
          </>
        )}
      </section>
    </>
  );
}