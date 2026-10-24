import Image from "next/image";
import StackFolders from "@/components/home/StackFolders";
import { Reveal } from "@/components/motion/Reveal";

export default function Intro() {
  return (
    <section id="about" className="theme-forest relative">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 items-center lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-20 lg:py-20">
        {/* Left: about image */}
        <Reveal y={0} x={-40} duration={1} className="self-center">
          <div className="relative mx-auto aspect-[1322/1190] w-full max-w-xl lg:max-w-none">
            <Image
              src="/images/me/about.png"
              alt="Stephen Machera pointing at his tech stack"
              fill
              quality={90}
              sizes="(min-width: 1024px) 560px, 90vw"
              className="object-contain object-bottom"
            />
          </div>
        </Reveal>

        {/* Right: foldable stack folders */}
        <Reveal delay={0.15} y={24}>
          <StackFolders />
        </Reveal>
      </div>
    </section>
  );
}
