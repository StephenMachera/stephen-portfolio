import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import { featured, getProject } from "@/lib/featured";
import { getProjectBody } from "@/lib/content";
import { ctaLink } from "@/lib/nav";
import ReadingProgress from "@/components/stories/ReadingProgress";
import { mdxComponents, proseClass } from "@/components/stories/mdx";
import SplitHeading from "@/components/motion/SplitHeading";
import { Reveal } from "@/components/motion/Reveal";
import { CardReveal, ZoomReveal } from "@/components/motion/CardReveal";
import RollText from "@/components/ui/RollText";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return featured.map((p) => ({ slug: p.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: project.name, description: project.summary };
}

const factLabel = "font-mono text-xs uppercase tracking-widest text-fg-faint";

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const body = getProjectBody(slug);
  const index = featured.findIndex((p) => p.slug === slug);
  const next = featured.length > 1 ? featured[(index + 1) % featured.length] : null;

  return (
    <>
      <ReadingProgress />

      <article className="mx-auto max-w-7xl px-6 pb-24 pt-32 lg:pb-32 lg:pt-40">
        {/* header */}
        <header className="grid gap-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-end lg:gap-20">
          <div>
            <Reveal y={12}>
              <Link
                href="/projects"
                className="group inline-flex min-h-11 items-center gap-2 font-mono text-xs uppercase tracking-widest text-fg-muted transition-colors hover:text-accent"
              >
                <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:-translate-x-1">
                  ←
                </span>
                All projects
              </Link>
            </Reveal>
            <Reveal delay={0.05} y={12}>
              <p className="mt-8 font-mono text-xs uppercase tracking-widest text-accent">{project.category}</p>
            </Reveal>
            <SplitHeading
              as="h1"
              text={project.name}
              className="mt-4 text-5xl font-extrabold leading-none tracking-tight lg:text-8xl"
            />
            <Reveal delay={0.2}>
              <p className="mt-8 max-w-2xl text-xl leading-relaxed text-fg-soft lg:text-2xl">{project.summary}</p>
            </Reveal>
          </div>

          {/* facts panel */}
          <Reveal delay={0.3} className="rounded-3xl border border-line bg-surface/60 p-6 lg:p-8">
            <dl className="space-y-6">
              {project.status && (
                <div>
                  <dt className={factLabel}>Status</dt>
                  <dd className="mt-1.5 text-accent">{project.status}</dd>
                </div>
              )}
              <div>
                <dt className={factLabel}>Built with</dt>
                <dd className="mt-3 flex flex-wrap gap-2">
                  {project.stack.map((tool) => (
                    <span key={tool} className="rounded-full border border-line px-3 py-1 font-mono text-xs text-fg-soft">
                      {tool}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>

            {(project.links?.live || project.links?.github) && (
              <div className="mt-8 flex flex-wrap gap-3 border-t border-line pt-6">
                {project.links.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-5 text-sm font-bold text-ink"
                  >
                    Live site <span aria-hidden="true">↗</span>
                  </a>
                )}
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-5 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
                  >
                    GitHub <span aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
            )}
          </Reveal>
        </header>

        {/* the big image */}
        {project.image && (
          <CardReveal className="mt-16 lg:mt-20">
            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-line">
              <ZoomReveal>
                <Image
                  src={project.image}
                  alt={`${project.name} preview`}
                  fill
                  priority
                  quality={90}
                  sizes="(min-width: 1280px) 1232px, 100vw"
                  className="object-cover object-top"
                />
              </ZoomReveal>
            </div>
          </CardReveal>
        )}

        {/* the case study */}
        <div className="mx-auto mt-16 max-w-3xl lg:mt-24">
          {body ? (
            <div className={proseClass}>
              <MDXRemote source={body} components={mdxComponents} />
            </div>
          ) : (
            <Reveal className="rounded-3xl border border-dashed border-line p-8 lg:p-10">
              <p className="font-mono text-xs uppercase tracking-widest text-fg-faint">Case study coming soon</p>
              <p className="mt-3 text-lg text-fg-soft">
                I&apos;m writing up the full story behind {project.name} — the problem, the decisions and what I learned.
                Want to hear about it sooner?
              </p>
              <Link href={ctaLink.href} className="group mt-6 inline-flex min-h-11 items-center gap-2 font-bold text-accent">
                <RollText text="Ask me about it" />
                <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </Reveal>
          )}
        </div>

        {/* next project */}
        {next && (
          <div className="mx-auto mt-24 max-w-5xl border-t border-line pt-14">
            <p className="font-mono text-xs uppercase tracking-widest text-fg-faint">Next project</p>
            <Link href={`/projects/${next.slug}`} className="group mt-6 grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-line bg-surface">
                {next.image && (
                  <Image
                    src={next.image}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 450px, 100vw"
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                )}
              </div>
              <div>
                <p className="text-4xl font-extrabold tracking-tight transition-colors duration-300 group-hover:text-accent lg:text-5xl">
                  {next.name}
                </p>
                <p className="mt-3 text-fg-soft">{next.summary}</p>
                <span className="mt-6 inline-flex items-center gap-2 font-bold text-accent">
                  View case study
                  <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                </span>
              </div>
            </Link>
          </div>
        )}
      </article>
    </>
  );
}