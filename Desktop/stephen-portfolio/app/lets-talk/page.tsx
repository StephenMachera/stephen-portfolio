import type { Metadata } from "next";
import { isTopic, type TopicId } from "@/lib/contact";
import HeroDots from "@/components/home/HeroDots";
import ContactForm from "@/components/talk/ContactForm";
import ContactAside from "@/components/talk/ContactAside";
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
    <section className="relative overflow-hidden">
      <HeroDots />

      <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-32 lg:pb-32 lg:pt-40">
        <SectionLabel>Let&apos;s Talk</SectionLabel>
        <SplitHeading
          as="h1"
          text="Let's build something together."
          accent={["together"]}
          className="mt-4 max-w-4xl text-5xl font-extrabold leading-[1.02] tracking-tight lg:text-7xl"
        />
        <Reveal delay={0.2}>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-fg-soft">
            Tell me a little about what you have in mind, and I&apos;ll get back to you.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-16">
          <Reveal delay={0.3}>
            <ContactForm initialTopic={initialTopic} />
          </Reveal>
          <Reveal delay={0.45} x={30} y={0} className="self-start lg:sticky lg:top-28">
            <ContactAside />
          </Reveal>
        </div>
      </div>
    </section>
  );
}