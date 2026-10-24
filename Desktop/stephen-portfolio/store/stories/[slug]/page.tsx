import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import { getStories, getStory, formatDate } from "@/lib/content";
import { ctaLink } from "@/lib/nav";
import ReadingProgress from "@/components/stories/ReadingProgress";
import ShareButton from "@/components/stories/ShareButton";
import { StoryRow } from "@/components/stories/StoryCards";
import { mdxComponents, proseClass } from "@/components/stories/mdx";
import SplitHeading from "@/components/motion/SplitHeading";
import { Reveal } from "@/components/motion/Reveal";
import RollText from "@/components/ui/RollText";

type Props = { params: Promise<{ slug: string }> };

// build every story page ahead of time; unknown slugs → 404
export function generateStaticParams() {
  return getStories().map((story) => ({ slug: story.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) return {};
  return {
    title: story.meta.title,
    description: story.meta.summary,
    openGraph: { type: "article", title: story.meta.title, description: story.meta.summary },
  };
}

export default async function StoryPage({ params }: Props) {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) notFound();

  const { meta, content } = story;

  // "next story" = the next older one (or the newest, if this is the oldest)
  const all = getStories();
  const index = all.findIndex((s) => s.slug === slug);
  const next = all.length > 1 ? all[(index + 1) % all.length] : null;

  return (
    <>
      <ReadingProgress />

      <article className="mx-auto max-w-7xl px-6 pb-24 pt-32 lg:pb-32 lg:pt-40">
        {/* header */}
        <header className="mx-auto max-w-3xl">
          <Reveal y={12}>
            <Link
              href="/stories"
              className="group inline-flex min-h-11 items-center gap-2 font-mono text-xs uppercase tracking-widest text-fg-muted transition-colors hover:text-accent"
            >
              <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:-translate-x-1">
                ←
              </span>
              All stories
            </Link>
          </Reveal>

          {meta.tags && meta.tags.length > 0 && (
            <Reveal delay={0.05} y={12}>
              <ul className="mt-8 flex flex-wrap gap-2">
                {meta.tags.map((tag) => (
                  <li key={tag} className="rounded-full border border-accent/40 px-3 py-1 font-mono text-xs text-accent">
                    {tag}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}

          <SplitHeading
            as="h1"
            text={meta.title}
            className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight lg:text-6xl"
          />

          <Reveal delay={0.2}>
            <p className="mt-6 font-mono text-xs text-fg-muted">
              {formatDate(meta.date)} · {meta.readingTime} min read
            </p>
            <p className="mt-6 text-xl leading-relaxed text-fg-soft lg:text-2xl">{meta.summary}</p>
          </Reveal>
        </header>

        {/* cover, if there is one */}
        {meta.cover && (
          <Reveal delay={0.3} className="relative mx-auto mt-14 aspect-[16/9] max-w-5xl overflow-hidden rounded-3xl border border-line">
            <Image src={meta.cover} alt="" fill priority quality={90} sizes="(min-width: 1024px) 1024px, 100vw" className="object-cover" />
          </Reveal>
        )}

        {/* the story */}
        <div className="mx-auto mt-14 max-w-3xl border-t border-line pt-14">
          <div className={proseClass}>
            <MDXRemote source={content} components={mdxComponents} />
          </div>
        </div>

        {/* end of story */}
        <footer className="mx-auto mt-20 max-w-3xl">
          <div className="flex flex-wrap items-center justify-between gap-4 border-y border-line py-8">
            <p className="text-fg-soft">Thanks for reading.</p>
            <ShareButton title={meta.title} />
          </div>

          {next && (
            <div className="mt-14">
              <p className="font-mono text-xs uppercase tracking-widest text-fg-faint">Next story</p>
              <div className="mt-2 border-b border-line">
                <StoryRow story={next} />
              </div>
            </div>
          )}

          <div className="mt-14 rounded-3xl border border-line bg-surface/60 p-8">
            <p className="text-xl font-bold">Did this story speak to you?</p>
            <p className="mt-2 text-fg-soft">I&apos;d love to hear your thoughts — or your own story.</p>
            <Link
              href={ctaLink.href}
              className="group mt-6 inline-flex min-h-11 items-center gap-2 font-bold text-accent"
            >
              <RollText text={ctaLink.label} />
              <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </footer>
      </article>
    </>
  );
}