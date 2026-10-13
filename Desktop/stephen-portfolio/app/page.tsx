import Hero from "@/components/home/Hero";
import Intro from "@/components/home/Intro";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import ResearchTeaser from "@/components/home/ResearchTeaser";
import LatestStories from "@/components/home/LatestStories";
import Doors from "@/components/home/Doors";

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <FeaturedProjects />
      <ResearchTeaser />
      <LatestStories />
      <Doors />
    </>
  );
}