import type { Metadata } from "next";
import HeroDots from "@/components/home/HeroDots";
import SectionLabel from "@/components/motion/SectionLabel";
import SplitHeading from "@/components/motion/SplitHeading";
import { Reveal } from "@/components/motion/Reveal";
import ProjectsList from "@/components/projects/ProjectsList";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Restaurant systems, hotel platforms, gesture-controlled tools and AI for farmers — real products, built and shipped.",
};

export default function ProjectsPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <HeroDots />
        <div className="relative mx-auto max-w-7xl px-6 pb-12 pt-32 lg:pb-16 lg:pt-40">
          <SectionLabel>Projects</SectionLabel>
          <SplitHeading
            as="h1"
            text="Things I've built"
            accent={["built"]}
            className="mt-4 max-w-4xl text-5xl font-extrabold leading-[1.02] tracking-tight lg:text-7xl"
          />
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-fg-soft">
              Real products for real people — from restaurant kitchens in London to poultry houses in Kenya.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 lg:pb-32">
        <ProjectsList />
      </section>
    </>
  );
}