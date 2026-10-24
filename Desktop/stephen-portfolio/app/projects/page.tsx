import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { featured } from "@/lib/featured";
import HeroDots from "@/components/home/HeroDots";
import Marquee from "@/components/ui/Marquee";
import RollText from "@/components/ui/RollText";
import SectionLabel from "@/components/motion/SectionLabel";
import SplitHeading from "@/components/motion/SplitHeading";
import { Reveal } from "@/components/motion/Reveal";
import ProjectsList from "@/components/projects/ProjectsList";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Restaurant systems, hotel platforms, gesture-controlled tools and AI for farmers — real products, built and shipped.",
};

// the three tilted screenshots in the hero collage
const collage = [
  { project: featured[0], pos: "left-0 top-[4%] w-[62%] -rotate-6", z: "z-10" },
  { project: featured[1], pos: "right-0 top-[22%] w-[62%] rotate-4", z: "z-20" },
  { project: featured[2], pos: "left-[10%] bottom-0 w-[62%] -rotate-2", z: "z-30" },
];

export default function ProjectsPage() {
  return (
    <>
      {/* ───────── Hero ───────── */}
      <section className="relative overflow-hidden">
        <HeroDots />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 pb-14 pt-28 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16 lg:pb-16 lg:pt-32">
          <div>
            <SectionLabel>Projects</SectionLabel>
            <SplitHeading
              as="h1"
              text="Things I've built"
              accent={["built"]}
              className="mt-4 text-5xl font-extrabold leading-[1.02] tracking-tight lg:text-7xl"
            />
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-fg-soft">
                Real products for real people — from restaurant kitchens in London to poultry houses in Kenya.
              </p>
            </Reveal>
          </div>

          {/* tilted screenshot collage */}
          <Reveal y={0} scale={0.92} duration={0.9} delay={0.2} className="hidden lg:block">
            <div className="relative mx-auto aspect-[5/4] w-full max-w-xl">
              <div aria-hidden="true" className="absolute inset-[6%] rounded-full bg-accent" />
              {collage.map(({ project, pos, z }) => (
                <div
                  key={project.slug}
                  className={`absolute overflow-hidden rounded-2xl border-4 border-white shadow-[0_16px_40px_rgb(20_40_26/0.25)] ${pos} ${z}`}
                >
                  <div className="relative aspect-[16/10]">
                    {project.image && (
                      <Image
                        src={project.image}
                        alt=""
                        fill
                        sizes="320px"
                        className="object-cover object-top"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <Marquee className="-rotate-1" />

      {/* ───────── The projects ───────── */}
      <section className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
        <ProjectsList />
      </section>

      {/* ───────── Closing CTA band ───────── */}
      <section className="theme-forest">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 py-14 lg:flex-row lg:items-center">
          <h2 className="max-w-xl text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
            Got an idea? <span className="italic text-accent">Let&apos;s build it</span> together.
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/lets-talk"
              className="group inline-flex min-h-13 items-center justify-between gap-3 rounded-full bg-accent py-1.5 pl-7 pr-1.5 font-bold text-forest-deep max-sm:w-full sm:justify-start"
            >
              <RollText text="Start a conversation" />
              <span aria-hidden="true" className="inline-flex size-10 items-center justify-center rounded-full bg-forest text-accent transition-transform duration-300 group-hover:translate-x-0.5">→</span>
            </Link>
            <Link
              href="/"
              className="inline-flex min-h-13 items-center justify-center rounded-full border border-line px-7 font-medium max-sm:w-full transition-colors duration-300 hover:border-accent hover:text-accent"
            >
              <RollText text="Back home" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
