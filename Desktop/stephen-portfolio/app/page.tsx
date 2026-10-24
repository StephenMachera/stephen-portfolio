import Hero from "@/components/home/Hero";
import Intro from "@/components/home/Intro";
import Marquee from "@/components/ui/Marquee";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee className="-rotate-1" />
      <Intro />
    </>
  );
}
