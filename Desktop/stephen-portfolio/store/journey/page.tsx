import type { Metadata } from "next";
import { getStories } from "@/lib/content";
import JourneyHero from "@/components/journey/JourneyHero";
import Road from "@/components/journey/Road";
import {
  Beliefs,
  Beyond,
  Education,
  Experience,
  WhatsNext,
} from "@/components/journey/Sections";

export const metadata: Metadata = {
  title: "My Journey",
  description:
    "From a humble background in Kenya to building software and AI. The road that made Stephen Machera.",
};

export default async function JourneyPage() {
  // only stories that exist get a "Read the story" link
  const storySlugs = (await getStories()).map((s) => s.slug);

  return (
    <>
      <JourneyHero />
      <Road storySlugs={storySlugs} />
      <Education />
      <Experience />
      <Beyond storySlugs={storySlugs} />
      <Beliefs />
      <WhatsNext />
    </>
  );
}