import Image from "next/image";
import Link from "next/link";
import { featured } from "@/lib/featured";
import RollText from "@/components/ui/RollText";
import SectionLabel from "@/components/motion/SectionLabel";
import SplitHeading from "@/components/motion/SplitHeading";
import { Reveal } from "@/components/motion/Reveal";
import { CardReveal, ZoomReveal } from "@/components/motion/CardReveal";
import CodeLink from "@/components/projects/CardLink";

function StatusBadge({ status }: { status?: string }) {
  if (!status) return null;
  return (
    <span className="rounded-full border border-accent/40 bg-ink/40 px-2 py-0.5 font-mono text-[10px] text-accent">
      {status}
    </span>
  );
}

export default function FeaturedProjects() {
  return (
    <section id="projects" className="relative">

      <div className="mx-auto max-w-[88rem] px-6 py-16 lg:py-20">
        {/* Heading */}
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel>Featured projects</SectionLabel>
            <SplitHeading
              text="Things I've built"
              accent={["built"]}
              className="mt-4 text-4xl font-extrabold tracking-tight lg:text-5xl"
            />
          </div>
          <Reveal delay={0.3} y={16}>
            <Link
              href="/projects"
              className="group inline-flex min-h-11 items-center gap-2 font-bold text-accent"
            >
              <RollText text="All projects" />
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </Reveal>
        </div>

        {/* ───────── DESKTOP: one row of 4, wraps to more rows ───────── */}
        <div className="mt-12 hidden grid-cols-4 gap-5 lg:grid">
          {featured.map((project, i) => (
            <CardReveal key={project.slug} index={i}>
              {/* wrapper: the card link and the code pill sit side by side */}
              <div className="relative">
                <Link
                  href={`/projects/${project.slug}`}
                  className="group relative block aspect-[40/33] overflow-hidden rounded-2xl border border-line bg-surface"
                >
                  {project.image ? (
                    <ZoomReveal>
                      <Image
                        src={project.image}
                        alt={`${project.name} preview`}
                        fill
                        quality={90}
                        sizes="(min-width: 1408px) 340px, 25vw"
                        className="object-cover object-left-top transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </ZoomReveal>
                  ) : (
                    <div className="dot-grid dot-grid-faint" aria-hidden="true" />
                  )}

                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-ink opacity-0 transition-opacity duration-500 group-hover:opacity-70"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-ink via-ink/70 to-transparent"
                  />

                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-lg font-extrabold tracking-tight">
                          {project.name}
                        </span>
                        <StatusBadge status={project.status} />
                      </div>

                      <div className="max-h-0 translate-y-3 overflow-hidden opacity-0 transition-all duration-500 ease-out group-hover:max-h-32 group-hover:translate-y-0 group-hover:opacity-100">
                        <p className="mt-1.5 line-clamp-3 text-xs leading-relaxed text-fg-soft">
                          {project.summary}
                        </p>
                        <p className="mt-1.5 truncate font-mono text-[10px] text-fg-muted">
                          {project.stack.join(" · ")}
                        </p>
                      </div>
                    </div>

                    <span
                      aria-hidden="true"
                      className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-line bg-ink/40 text-sm transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-forest-deep"
                    >
                      <span className="inline-block -rotate-45 transition-transform duration-300 group-hover:rotate-0">
                        →
                      </span>
                    </span>
                  </div>
                </Link>

                {project.links?.github && (
                  <CodeLink
                    href={project.links.github}
                    className="absolute top-3 right-3 z-10"
                  />
                )}
              </div>
            </CardReveal>
          ))}
        </div>

        {/* ───────── PHONE: swipeable cards ───────── */}
        <div className="-mx-6 mt-10 flex snap-x snap-mandatory scroll-px-6 gap-4 overflow-x-auto px-6 pb-2 [scrollbar-width:none] lg:hidden [&::-webkit-scrollbar]:hidden">
          {featured.map((project, i) => (
            <CardReveal
              key={project.slug}
              index={i}
              className="w-[90%] shrink-0 snap-start sm:w-[66%]"
            >
              {/* wrapper: the card link and the code pill sit side by side */}
              <div className="relative h-full">
                <Link
                  href={`/projects/${project.slug}`}
                  className="block h-full overflow-hidden rounded-2xl border border-line bg-surface/60 transition-transform duration-200 [-webkit-tap-highlight-color:transparent] active:scale-[0.98]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-ink">
                    {project.image && (
                      <ZoomReveal>
                        <Image
                          src={project.image}
                          alt={`${project.name} preview`}
                          fill
                          sizes="(min-width: 640px) 66vw, 90vw"
                          className="object-cover object-top"
                        />
                      </ZoomReveal>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold tracking-tight">{project.name}</span>
                      <StatusBadge status={project.status} />
                    </div>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-fg-soft">
                      {project.summary}
                    </p>
                    <p className="mt-3 font-mono text-[11px] text-fg-muted">
                      {project.stack.join(" · ")}
                    </p>
                  </div>
                </Link>

                {project.links?.github && (
                  <CodeLink
                    href={project.links.github}
                    className="absolute top-3 right-3 z-10"
                  />
                )}
              </div>
            </CardReveal>
          ))}
        </div>
        <p className="mt-4 font-mono text-xs text-fg-faint lg:hidden">Swipe to see more →</p>
      </div>
    </section>
  );
}