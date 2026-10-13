import Image from "next/image";
import { site } from "@/lib/site";
import { ctaLink } from "@/lib/nav";
import HeroDots from "@/components/home/HeroDots";
import HeroName from "@/components/home/HeroName";
import ProjectPreview from "@/components/home/ProjectPreview";
import MagneticLink from "@/components/ui/MagneticLink";
import RollText from "@/components/ui/RollText";
import { Reveal } from "@/components/motion/Reveal";

export default function Hero() {
  const photo = (
    <Reveal className="shrink-0" y={0} scale={0.6} duration={0.9} delay={0.1}>
      <div className="relative size-24 overflow-hidden rounded-full bg-accent sm:size-32 lg:size-44">
        <Image
          src="/images/me/portrait-cutout.png"
          alt=""
          fill
          priority
          quality={90}
          sizes="(min-width: 1024px) 220px, 150px"
          className="origin-[50%_35%] scale-[1.15] object-cover object-[50%_28%]"
        />
      </div>
    </Reveal>
  );

  return (
    <section className="relative overflow-hidden">
      <HeroDots />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 pb-20 pt-32 lg:min-h-dvh lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:pb-24 lg:pt-36">
        {/* Left */}
        <div className="flex flex-col">
          <Reveal y={16}>
            <p className="flex items-center gap-2.5 font-mono text-[13px] uppercase tracking-[0.06em] text-fg-muted">
              <span aria-hidden="true" className="size-2 rounded-full bg-accent" />
              {site.role} · {site.location}
            </p>
          </Reveal>

          <HeroName photo={photo} phrases={site.buildPhrases} />

          <Reveal delay={0.4}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-fg-soft">
              {site.heroIntro}
            </p>
          </Reveal>

          <Reveal delay={0.55} className="mt-10 flex flex-wrap gap-3">
            <MagneticLink
              href="/projects"
              className="inline-flex min-h-13 items-center rounded-full bg-accent px-7 font-bold text-ink"
            >
              <RollText text="See my projects" />
              <span aria-hidden="true">→</span>
            </MagneticLink>
            <MagneticLink
              href={ctaLink.href}
              className="inline-flex min-h-13 items-center rounded-full border border-line px-7 font-medium transition-colors duration-300 hover:border-accent hover:text-accent"
            >
              <RollText text={ctaLink.label} />
            </MagneticLink>
          </Reveal>

          <Reveal
            delay={0.7}
            y={16}
            className="mt-10 flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-5 font-mono text-[13px] text-fg-muted"
          >
            <a href="#doors" className="transition-colors hover:text-accent">Hire me</a>
            <span aria-hidden="true" className="text-fg-faint">/</span>
            <a href="#doors" className="transition-colors hover:text-accent">Work with me</a>
            <span aria-hidden="true" className="text-fg-faint">/</span>
            <a href="#doors" className="transition-colors hover:text-accent">Partner with me</a>
          </Reveal>
        </div>

        {/* Right — project preview, desktop only */}
        <Reveal className="hidden lg:block" x={60} y={0} delay={0.3} duration={1}>
          <ProjectPreview />
        </Reveal>
      </div>
    </section>
  );
}