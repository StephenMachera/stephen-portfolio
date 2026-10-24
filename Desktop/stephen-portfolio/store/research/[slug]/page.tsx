import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import { getResearch, getResearchEntry } from "@/lib/research-content";
import { formatDay, formatMonth, statusHint } from "@/lib/research-status";
import StatusPill from "@/components/research/StatusPill";
import ResearchTree from "@/components/research/ResearchTree";
import ReadingProgress from "@/components/stories/ReadingProgress";
import { mdxComponents, proseClass } from "@/components/stories/mdx";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getResearch().map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = getResearchEntry(slug);
  if (!entry) return {};
  return { title: entry.meta.title, description: entry.meta.summary };
}

export default async function ResearchEntryPage({ params }: Props) {
  const { slug } = await params;
  const entry = getResearchEntry(slug);
  if (!entry) notFound();

  const { meta, body } = entry;
  const others = getResearch()
    .filter((r) => r.slug !== slug)
    .slice(0, 3);

  const facts = [
    { label: "Status", value: `${meta.status} — ${statusHint[meta.status]}` },
    { label: "Field", value: meta.field },
    { label: "Started", value: formatMonth(meta.started) },
    { label: "Last update", value: formatDay(meta.updated) },
  ].filter((f) => f.value);

  return (
    <>
      <ReadingProgress />

      {/* header */}
      <section className="relative overflow-hidden pt-36 pb-14 lg:pt-44">
        <div aria-hidden className="dot-grid dot-grid-faint absolute inset-0" />
        <div className="relative mx-auto max-w-6xl px-5 lg:px-8">
          <Link
            href="/research"
            className="font-mono text-xs tracking-[0.12em] text-fg-muted uppercase transition-colors hover:text-accent active:text-accent"
          >
            ← All research
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <StatusPill status={meta.status} />
            <span className="font-mono text-xs tracking-[0.12em] text-fg-faint uppercase">
              {meta.field} · {meta.title}
            </span>
          </div>

          <h1 className="mt-6 max-w-4xl text-[clamp(2.25rem,5vw,4rem)] leading-[1.05] font-extrabold tracking-tight">
            {meta.question}
          </h1>

          {meta.summary && (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg-soft">
              {meta.summary}
            </p>
          )}
        </div>
      </section>

      {/* body + facts */}
      <section className="mx-auto grid max-w-6xl gap-12 px-5 pb-24 lg:grid-cols-[1fr_18rem] lg:gap-16 lg:px-8">
        <article className="min-w-0">
          {meta.visual === "tree" && (
            <div className="relative mb-12 h-80 overflow-hidden rounded-[1.5rem] border border-line bg-surface sm:h-96">
              <ResearchTree />
            </div>
          )}

          <div className={proseClass}>
            <MDXRemote source={body} components={mdxComponents} />
          </div>
        </article>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <dl className="rounded-[1.5rem] border border-line bg-surface p-6">
            {facts.map((f) => (
              <div
                key={f.label}
                className="border-b border-line py-4 first:pt-0 last:border-0 last:pb-0"
              >
                <dt className="font-mono text-[11px] tracking-[0.12em] text-fg-faint uppercase">
                  {f.label}
                </dt>
                <dd className="mt-1 text-fg">{f.value}</dd>
              </div>
            ))}
          </dl>

          {meta.tags.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-2">
              {meta.tags.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-line px-3 py-1 text-sm text-fg-muted"
                >
                  {t}
                </li>
              ))}
            </ul>
          )}

          {meta.links.length > 0 && (
            <ul className="mt-6 flex flex-col gap-2">
              {meta.links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between rounded-full border border-line px-5 py-3 text-sm text-fg transition-colors hover:border-accent hover:text-accent active:border-accent active:text-accent"
                  >
                    {l.label} <span aria-hidden>↗</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </aside>
      </section>

      {/* research log */}
      {meta.log.length > 0 && (
        <section className="border-t border-line">
          <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-28">
            <p className="font-mono text-xs tracking-[0.2em] text-fg-faint uppercase">
              Research log
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              How it&apos;s going
            </h2>

            <ol className="relative mt-12 ml-1.5 border-l border-line">
              {meta.log.map((item, i) => (
                <li key={`${item.date}-${i}`} className="relative pb-10 pl-8 last:pb-0">
                  <span
                    aria-hidden
                    className={`absolute top-1.5 -left-[7px] size-3 rounded-full border-2 border-ink ${
                      i === 0 ? "bg-accent" : "bg-fg-faint"
                    }`}
                  />
                  <p className="font-mono text-xs text-fg-faint">
                    {formatDay(item.date)}
                  </p>
                  <p className="mt-1 max-w-2xl leading-relaxed text-fg-soft">
                    {item.note}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* other questions */}
      {others.length > 0 && (
        <section className="border-t border-line">
          <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8">
            <p className="font-mono text-xs tracking-[0.2em] text-fg-faint uppercase">
              Other questions
            </p>
            <ul className="mt-8 grid gap-4 md:grid-cols-3">
              {others.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/research/${r.slug}`}
                    className="group flex h-full flex-col gap-4 rounded-[1.5rem] border border-line bg-surface p-6 transition-colors hover:border-accent/50 active:border-accent/50"
                  >
                    <StatusPill status={r.status} />
                    <h3 className="text-lg leading-snug font-bold transition-colors group-hover:text-accent">
                      {r.question}
                    </h3>
                    <span className="mt-auto font-mono text-xs text-fg-faint">
                      {r.field}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}