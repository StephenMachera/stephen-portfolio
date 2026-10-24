import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { isTopic, type TopicId } from "@/lib/contact";
import { site } from "@/lib/site";
import HeroDots from "@/components/home/HeroDots";
import ContactForm from "@/components/talk/ContactForm";
import ContactAside from "@/components/talk/ContactAside";
import Marquee from "@/components/ui/Marquee";
import RollText from "@/components/ui/RollText";
import MagneticLink from "@/components/ui/MagneticLink";
import SectionLabel from "@/components/motion/SectionLabel";
import SplitHeading from "@/components/motion/SplitHeading";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Let's Talk",
  description:
    "Hiring, a project, a partnership, or just saying hello. Send me a message or reach me on WhatsApp.",
};

export default async function LetsTalkPage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string }>;
}) {
  const { topic } = await searchParams;
  const initialTopic: TopicId = isTopic(topic) ? topic : "hello";

  return (
    <>
      {/* ───────── Hero ───────── */}
      <section className="relative overflow-hidden">
        <HeroDots />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 pb-16 pt-28 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16 lg:pb-20 lg:pt-32">
          {/* Left: words + CTAs */}
          <div>
            <SectionLabel>Let&apos;s Talk</SectionLabel>
            <SplitHeading
              as="h1"
              text="Let's build something together."
              accent={["together"]}
              className="mt-4 text-5xl font-extrabold leading-[1.02] tracking-tight lg:text-7xl"
            />
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-fg-soft">
                Tell me a little about what you have in mind, and I&apos;ll get back to you.{" "}
                {site.replyTime}
              </p>
            </Reveal>

            <Reveal delay={0.4} className="mt-8 flex flex-wrap gap-3">
              <MagneticLink
                href="/projects"
                className="inline-flex min-h-13 items-center justify-between gap-3 rounded-full bg-forest py-1.5 pl-7 pr-1.5 font-bold text-white max-sm:w-full sm:justify-start"
              >
                <RollText text="See my projects" />
                <span aria-hidden="true" className="inline-flex size-10 items-center justify-center rounded-full bg-accent text-forest-deep">→</span>
              </MagneticLink>
              <MagneticLink
                href="/"
                className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-line px-7 font-medium max-sm:w-full transition-colors duration-300 hover:border-accent hover:text-accent"
              >
                <span aria-hidden="true">←</span>
                <RollText text="Back home" />
              </MagneticLink>
            </Reveal>
          </div>

          {/* Right: contact image */}
          <Reveal y={0} scale={0.92} duration={0.9} delay={0.2} className="mx-auto w-full max-w-xl lg:max-w-none">
            <div className="relative aspect-[1312/1199] w-full">
              <Image
                src="/images/me/contact.png"
                alt="Stephen Machera, full-stack developer"
                fill
                priority
                quality={90}
                sizes="(min-width: 1024px) 560px, 90vw"
                className="object-contain"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <Marquee className="-rotate-1" />

      {/* ───────── Form + channels ───────── */}
      <section className="relative">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)] gap-10 px-6 py-16 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-14 lg:py-24">
          <Reveal delay={0.1}>
            <div className="rounded-3xl border border-line bg-white p-6 shadow-[0_20px_50px_rgb(20_40_26/0.08)] lg:p-10">
              <h2 className="text-2xl font-extrabold tracking-tight lg:text-3xl">
                Send me a <span className="italic text-accent">message</span>
              </h2>
              <p className="mb-8 mt-2 text-fg-muted">
                Pick what brings you here, fill in the rest, and hit send.
              </p>
              <ContactForm initialTopic={initialTopic} />
            </div>
          </Reveal>

          <Reveal delay={0.25} x={30} y={0} className="self-start lg:sticky lg:top-28">
            <ContactAside />
          </Reveal>
        </div>
      </section>

      {/* ───────── Closing CTA band ───────── */}
      <section className="theme-forest relative overflow-hidden">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 py-16 lg:flex-row lg:items-center lg:py-20">
          <div className="max-w-xl">
            <h2 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
              Not ready to write? <span className="italic text-accent">See what I&apos;ve built</span> first.
            </h2>
            <p className="mt-3 text-fg-soft">
              Browse the projects, then come back — the door&apos;s always open.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="group inline-flex min-h-13 items-center justify-between gap-3 rounded-full bg-accent py-1.5 pl-7 pr-1.5 font-bold text-forest-deep max-sm:w-full sm:justify-start"
            >
              <RollText text="Explore projects" />
              <span aria-hidden="true" className="inline-flex size-10 items-center justify-center rounded-full bg-forest text-accent transition-transform duration-300 group-hover:translate-x-0.5">→</span>
            </Link>
            <Link
              href="/"
              className="group inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-line px-7 font-medium max-sm:w-full transition-colors duration-300 hover:border-accent hover:text-accent"
            >
              <RollText text="Go to home" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
