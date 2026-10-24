"use client";

import Image from "next/image";
import { site } from "@/lib/site";
import HeroDots from "@/components/home/HeroDots";
import HeroName from "@/components/home/HeroName";
import MagneticLink from "@/components/ui/MagneticLink";
import RollText from "@/components/ui/RollText";
import { Reveal } from "@/components/motion/Reveal";

const CV_PATH = "/cv/stephen-machera-cv.pdf";

// the link opens the CV in a new tab; this saves a copy at the same time
function downloadCv() {
  const a = document.createElement("a");
  a.href = CV_PATH;
  a.download = "stephen-machera-cv.pdf";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <HeroDots />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 pb-16 pt-28 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-20 lg:pb-20 lg:pt-32">
        {/* Portrait (right on desktop) */}
        <Reveal className="mx-auto w-full max-w-xl lg:order-2 lg:max-w-none" y={0} scale={0.8} duration={0.9} delay={0.1}>
          <div className="relative aspect-[1312/1199] w-full max-w-xl animate-float-slow lg:max-w-none lg:animate-none">
            <Image
              src="/images/me/portfolio.png"
              alt="Stephen Machera — software engineer"
              fill
              priority
              quality={90}
              sizes="(min-width: 1024px) 560px, 90vw"
              className="object-contain"
            />
          </div>
        </Reveal>

        {/* Text (left on desktop) */}
        <div className="flex flex-col lg:order-1">
          <HeroName phrases={site.buildPhrases} />

          <Reveal delay={0.4}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-fg-soft">
              {site.heroIntro}
            </p>
          </Reveal>

          <Reveal delay={0.55} className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:mt-10">
            <MagneticLink
              href="/projects"
              className="inline-flex min-h-13 items-center justify-between gap-3 rounded-full bg-forest py-1.5 pl-7 pr-1.5 font-bold text-white max-sm:w-full sm:justify-start"
            >
              <RollText text="See my projects" />
              <span aria-hidden="true" className="inline-flex size-10 items-center justify-center rounded-full bg-accent text-forest-deep transition-transform duration-300 group-hover:translate-x-0.5">→</span>
            </MagneticLink>
            <MagneticLink
              href={CV_PATH}
              external
              onClick={downloadCv}
              className="inline-flex min-h-13 items-center justify-center rounded-full border border-line px-7 font-medium transition-colors duration-300 hover:border-accent hover:text-accent max-sm:w-full"
            >
              <RollText text="Download CV" />
            </MagneticLink>
          </Reveal>
        </div>

      </div>
    </section>
  );
}