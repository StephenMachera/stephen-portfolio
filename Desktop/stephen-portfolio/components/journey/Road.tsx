"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { beginnings, bridge, turningPoints, type Moment } from "@/lib/journey";
import { SectionHead, StoryLink, ease } from "./bits";

const inView = { once: true, margin: "-15% 0px" } as const;

function MomentItem({ moment, hasStory }: { moment: Moment; hasStory: boolean }) {
  return (
    <motion.article
      initial={{ opacity: 0, x: 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={inView}
      transition={{ duration: 0.6, ease }}
      className="relative pb-12 sm:pb-14"
    >
      {/* dot on the line — pops when it arrives */}
      <motion.span
        aria-hidden
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={inView}
        transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.15 }}
        className="absolute top-2 -left-[38px] size-3 rounded-full border-2 border-accent bg-ink sm:-left-[50px]"
      />
      <h3 className="text-xl font-bold tracking-tight sm:text-2xl">{moment.title}</h3>
      <p className="mt-2.5 max-w-xl text-base leading-relaxed text-fg-soft sm:text-lg">
        {moment.text}
      </p>
      {hasStory && moment.story && (
        <StoryLink href={`/stories/${moment.story}`}>Read the story</StoryLink>
      )}
    </motion.article>
  );
}

export default function Road({ storySlugs }: { storySlugs: string[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const stories = new Set(storySlugs);

  // line grows as you scroll through the road
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 70%", "end 55%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  const tipTop = useTransform(progress, (v) => `${v * 100}%`);

  return (
    <section className="border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-24 lg:grid-cols-[17rem_1fr] lg:gap-16 lg:px-8 lg:py-32">
        <div>
          <div className="lg:sticky lg:top-32">
            <SectionHead
              label="The road"
              title="Where it started"
              text="Short moments from my life. Each one has a full story behind it, if you want to go deeper."
            />
          </div>
        </div>

        <div ref={trackRef} className="relative pl-10 sm:pl-14">
          {/* grey track */}
          <div aria-hidden className="absolute top-2 bottom-2 left-[7px] w-0.5 bg-line sm:left-[11px]" />
          {/* yellow progress */}
          <motion.div
            aria-hidden
            style={{ scaleY: progress }}
            className="absolute top-2 bottom-2 left-[7px] w-0.5 origin-top bg-accent sm:left-[11px]"
          />
          {/* glowing tip */}
          <motion.span
            aria-hidden
            style={{ top: tipTop }}
            className="absolute left-[2px] -mt-1.5 size-3 rounded-full bg-accent shadow-[0_0_0_6px_rgb(255_206_71/0.18)] sm:left-[6px]"
          />

          {beginnings.map((m) => (
            <MomentItem key={m.title} moment={m} hasStory={!!m.story && stories.has(m.story)} />
          ))}

          <motion.p
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={inView}
            transition={{ duration: 0.8, ease }}
            className="mb-16 text-lg leading-snug text-accent italic sm:text-xl"
          >
            {bridge}
          </motion.p>

          <p className="mb-8 font-mono text-xs tracking-[0.2em] text-fg-faint uppercase">
            Turning points
          </p>

          {turningPoints.map((m) => (
            <MomentItem key={m.title} moment={m} hasStory={!!m.story && stories.has(m.story)} />
          ))}
        </div>
      </div>
    </section>
  );
}