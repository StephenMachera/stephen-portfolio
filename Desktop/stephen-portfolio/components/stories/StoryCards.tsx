import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/content";
import type { StoryMeta } from "@/types/content";
import { ZoomReveal } from "@/components/motion/CardReveal";

// the yellow underline that draws itself under a title on hover
export const underline =
  "bg-[linear-gradient(var(--color-accent),var(--color-accent))] bg-[length:0%_2px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-500 ease-out group-hover:bg-[length:100%_2px]";

export function StoryMetaLine({ story }: { story: StoryMeta }) {
  return (
    <p className="font-mono text-xs text-fg-muted">
      {formatDate(story.date)} · {story.readingTime} min read
    </p>
  );
}

// shown when a story has no cover photo: the opening lines inside a quote
export function QuoteCover({ story }: { story: StoryMeta }) {
  return (
    <div className="relative flex h-full min-h-[280px] flex-col justify-between gap-6 bg-surface p-6 lg:p-8">
      <div className="dot-grid dot-grid-faint" aria-hidden="true" />
      <div className="relative">
        <span aria-hidden="true" className="block text-7xl font-extrabold leading-[0.6] text-accent">
          &ldquo;
        </span>
        <p className="mt-6 line-clamp-4 text-lg font-medium leading-relaxed text-fg lg:line-clamp-5 lg:text-xl">
          {story.excerpt}
        </p>
      </div>
      <div className="relative flex items-center justify-between gap-4">
        {story.tags?.[0] ? (
          <span className="font-mono text-xs uppercase tracking-widest text-fg-muted">
            {story.tags[0]}
          </span>
        ) : (
          <span />
        )}
        <span className="inline-flex min-h-10 items-center gap-2 rounded-full border border-line bg-ink/40 px-4 text-sm font-bold transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-ink">
          Read more
          <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </span>
      </div>
    </div>
  );
}

// the big card for the newest story
export function FeatureStory({ story }: { story: StoryMeta }) {
  return (
    <Link href={`/stories/${story.slug}`} className="group block">
      <div
        className={`relative overflow-hidden rounded-2xl border border-line ${
          story.cover ? "aspect-[16/10]" : "lg:aspect-[16/10]"
        }`}
      >
        {story.cover ? (
          <ZoomReveal>
            <Image
              src={story.cover}
              alt=""
              fill
              quality={90}
              sizes="(min-width: 1024px) 700px, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </ZoomReveal>
        ) : (
          <QuoteCover story={story} />
        )}
      </div>
      <div className="mt-6">
        <StoryMetaLine story={story} />
        <h3 className="mt-3 text-2xl font-bold leading-snug tracking-tight lg:text-3xl">
          <span className={underline}>{story.title}</span>
        </h3>
        <p className="mt-3 max-w-xl leading-relaxed text-fg-soft">{story.summary}</p>
      </div>
    </Link>
  );
}

// a slim row for the other stories
export function StoryRow({ story }: { story: StoryMeta }) {
  return (
    <Link href={`/stories/${story.slug}`} className="group flex items-start justify-between gap-6 py-7">
      <div>
        <StoryMetaLine story={story} />
        <h3 className="mt-2 text-xl font-bold leading-snug tracking-tight transition-colors duration-300 group-hover:text-accent">
          {story.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-fg-soft">{story.summary}</p>
      </div>
      <span
        aria-hidden="true"
        className="mt-1 inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-line transition-all duration-300 group-hover:translate-x-1 group-hover:border-accent group-hover:text-accent"
      >
        →
      </span>
    </Link>
  );
}