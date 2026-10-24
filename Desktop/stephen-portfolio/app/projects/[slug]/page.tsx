import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import { featured, getProject } from "@/lib/featured";
import { getProjectBody } from "@/lib/content";
import { ctaLink } from "@/lib/nav";
import HeroDots from "@/components/home/HeroDots";
import SocialIcon from "@/components/ui/SocialIcon";
import Marquee from "@/components/ui/Marquee";
import ReadingProgress from "@/components/stories/ReadingProgress";
import { mdxComponents, proseClass } from "@/components/stories/mdx";
import SplitHeading from "@/components/motion/SplitHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
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

// a screenshot inside a little browser window
function BrowserFrame({
  src,
  alt,
  label,
  priority,
  sizes,
}: {
  src: string;
  alt: string;
  label: string;
  priority?: boolean;
  sizes: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border-4 border-white bg-white shadow-[0_20px_50px_rgb(20_40_26/0.25)]">
      <div className="flex items-center gap-1.5 px-4 py-2.5" aria-hidden="true">
        <span className="size-2.5 rounded-full bg-accent" />
        <span className="size-2.5 rounded-full bg-forest/40" />
        <span className="size-2.5 rounded-full bg-forest/20" />
        <span className="ml-3 truncate font-mono text-[11px] text-forest/60">{label}</span>
      </div>
      <div className="relative aspect-[16/10]">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          quality={90}
          sizes={sizes}
          className="object-cover object-top"
        />
      </div>
    </div>
  );
}

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

      {/* ───────── Hero ───────── */}
      <section className="relative overflow-hidden">
        <HeroDots />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 pb-14 pt-28 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-14 lg:pb-16 lg:pt-32">
          <div>
            <Reveal y={12}>
              <Link
                href="/projects"
                className="group inline-flex min-h-10 items-center gap-2 rounded-full border border-line bg-surface px-4 text-sm font-bold transition-colors hover:border-accent"
              >
                <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:-translate-x-1">
                  ←
                </span>
                All projects
              </Link>
            </Reveal>

            <Reveal delay={0.05} y={12} className="mt-7 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-forest px-3.5 py-1 font-mono text-xs uppercase tracking-widest text-white">
                {project.category}
              </span>
              {project.status && (
                <span className="rounded-full bg-accent px-3 py-1 font-mono text-xs font-bold text-forest-deep">
                  {project.status}
                </span>
              )}
            </Reveal>

            <SplitHeading
              as="h1"
              text={project.name}
              className="mt-5 text-5xl font-extrabold leading-none tracking-tight text-forest lg:text-7xl"
            />
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-fg-soft lg:text-xl">{project.summary}</p>
            </Reveal>

            {/* CTAs */}
            <Reveal delay={0.3} className="mt-8 flex flex-wrap gap-3">
              {project.links?.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex min-h-13 items-center justify-between gap-3 rounded-full bg-forest py-1.5 pl-7 pr-1.5 font-bold text-white max-sm:w-full sm:justify-start"
                >
                  <RollText text="Live site" />
                  <span aria-hidden="true" className="inline-flex size-10 items-center justify-center rounded-full bg-accent text-forest-deep">↗</span>
                </a>
              )}
              {project.links?.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-13 items-center gap-2 rounded-full border border-line px-6 font-bold transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-forest-deep"
                >
                  <SocialIcon name="github" />
                  GitHub <span aria-hidden="true">↗</span>
                </a>
              )}
              <Link
                href={ctaLink.href}
                className="inline-flex min-h-13 items-center rounded-full border border-line px-6 font-medium transition-colors duration-300 hover:border-accent hover:text-accent"
              >
                <RollText text="Ask me about it" />
              </Link>
            </Reveal>
          </div>

          {/* screenshot over an amber blob */}
          {project.image && (
            <Reveal y={0} x={40} duration={1} delay={0.2}>
              <div className="relative">
                <div aria-hidden="true" className="absolute -right-4 -top-6 size-2/3 rounded-full bg-accent lg:-right-8" />
                <div aria-hidden="true" className="absolute -bottom-6 -left-4 size-1/3 rounded-full bg-forest/15" />
                <div className="relative rotate-1 transition-transform duration-500 hover:rotate-0">
                  <BrowserFrame
                    src={project.image}
                    alt={`${project.name} preview`}
                    label={project.label}
                    priority
                    sizes="(min-width: 1024px) 640px, 100vw"
                  />
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <Marquee className="-rotate-1" items={project.stack} />

      {/* ───────── At a glance (green) ───────── */}
      <section className="theme-forest">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:py-16">
          <RevealGroup className="grid gap-4 md:grid-cols-3">
            <RevealItem className="rounded-3xl border border-line bg-surface p-6">
              <p className={factLabel}>Category</p>
              <p className="mt-2 text-2xl font-extrabold tracking-tight">{project.category}</p>
              {project.status && <p className="mt-1 text-accent">{project.status}</p>}
            </RevealItem>

            <RevealItem className="rounded-3xl border border-line bg-surface p-6 md:col-span-2">
              <p className={factLabel}>Built with</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {project.stack.map((tool) => (
                  <li key={tool} className="rounded-full bg-accent px-3.5 py-1.5 text-sm font-bold text-forest-deep">
                    {tool}
                  </li>
                ))}
              </ul>
            </RevealItem>
          </RevealGroup>

          {/* the big screenshot */}
          {project.image && (
            <CardReveal className="mt-8">
              <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border-4 border-white bg-white shadow-[0_20px_50px_rgb(0_0_0/0.25)]">
                <ZoomReveal>
                  <Image
                    src={project.image}
                    alt={`${project.name} in use`}
                    fill
                    quality={90}
                    sizes="(min-width: 1280px) 1232px, 100vw"
                    className="object-cover object-top"
                  />
                </ZoomReveal>
              </div>
            </CardReveal>
          )}
        </div>
      </section>

      {/* ───────── The story ───────── */}
      <section className="mx-auto max-w-7xl px-6 py-14 lg:py-20">
        <div className="mx-auto max-w-3xl">
          {body ? (
            <div className={proseClass}>
              <MDXRemote source={body} components={mdxComponents} />
            </div>
          ) : (
            <Reveal className="rounded-3xl border-2 border-dashed border-accent bg-surface p-8 lg:p-10">
              <p className="font-mono text-xs uppercase tracking-widest text-forest">Case study coming soon</p>
              <p className="mt-3 text-lg leading-relaxed text-fg-soft">
                I&apos;m writing up the full story behind {project.name} — the problem, the decisions and what I
                learned. Want to hear about it sooner?
              </p>
              <Link
                href={ctaLink.href}
                className="group mt-6 inline-flex min-h-12 items-center gap-3 rounded-full bg-forest py-1.5 pl-6 pr-1.5 font-bold text-white"
              >
                <RollText text="Ask me about it" />
                <span aria-hidden="true" className="inline-flex size-9 items-center justify-center rounded-full bg-accent text-forest-deep transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </Reveal>
          )}
        </div>
      </section>

      {/* ───────── Next project ───────── */}
      {next && (
        <section className="mx-auto max-w-7xl px-6 pb-14 lg:pb-20">
          <Link
            href={`/projects/${next.slug}`}
            className="theme-forest group grid items-center gap-8 overflow-hidden rounded-3xl p-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:p-8"
          >
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-accent">Next project</p>
              <p className="mt-3 text-4xl font-extrabold tracking-tight lg:text-5xl">{next.name}</p>
              <p className="mt-3 max-w-md text-fg-soft">{next.summary}</p>
              <span className="mt-6 inline-flex items-center gap-3 font-bold">
                Learn more
                <span
                  aria-hidden="true"
                  className="inline-flex size-9 items-center justify-center rounded-full bg-accent text-forest-deep transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
            </div>
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border-4 border-white bg-white">
              {next.image && (
                <Image
                  src={next.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 560px, 100vw"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                />
              )}
            </div>
          </Link>
        </section>
      )}

      {/* ───────── Closing CTA ───────── */}
      <section className="bg-accent text-forest-deep">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 py-12 lg:flex-row lg:items-center">
          <h2 className="max-w-xl text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
            Like what you see? Let&apos;s build yours.
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href={ctaLink.href}
              className="group inline-flex min-h-13 items-center justify-between gap-3 rounded-full bg-forest py-1.5 pl-7 pr-1.5 font-bold text-white max-sm:w-full sm:justify-start"
            >
              <RollText text="Start a conversation" />
              <span aria-hidden="true" className="inline-flex size-10 items-center justify-center rounded-full bg-accent text-forest-deep">→</span>
            </Link>
            <Link
              href="/projects"
              className="inline-flex min-h-13 items-center justify-center rounded-full border-2 border-forest-deep px-7 font-bold max-sm:w-full transition-colors duration-300 hover:bg-forest-deep hover:text-white"
            >
              <RollText text="All projects" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
