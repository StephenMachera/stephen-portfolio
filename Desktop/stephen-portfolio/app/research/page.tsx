import type { Metadata } from "next";
import Link from "next/link";
import { getResearch, pickFeatured } from "@/lib/research-content";
import { formatMonth, isActive } from "@/lib/research-status";
import StatusPill from "@/components/research/StatusPill";
import ResearchList from "@/components/research/ResearchList";
import ResearchTree from "@/components/research/ResearchTree";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Research",
  description:
    "The questions Stephen Machera is exploring — machine learning, growth and systems that learn.",
};

export default function ResearchPage() {
  const all = getResearch();
  const featured = pickFeatured(all);
  const activeCount = all.filter((r) => isActive(r.status)).length;
  const fieldCount = new Set(all.map((r) => r.field)).size;

  const stats = [
    { label: all.length === 1 ? "Question" : "Questions", value: all.length },
    { label: "Active", value: activeCount },
    { label: fieldCount === 1 ? "Field" : "Fields", value: fieldCount },
  ];

  return (
    <>
      {/* header */}
      <section className="relative overflow-hidden pt-36 pb-16 lg:pt-44 lg:pb-20">
        <div aria-hidden className="dot-grid dot-grid-faint absolute inset-0" />
        <div className="relative mx-auto max-w-6xl px-5 lg:px-8">
          <Reveal>
            <p className="font-mono text-xs tracking-[0.2em] text-fg-faint uppercase">
              Research
            </p>
            <h1 className="mt-5 max-w-3xl text-[clamp(2.5rem,6vw,4.75rem)] leading-[1.02] font-extrabold tracking-tight">
              Questions I&apos;m <span className="text-accent">chasing</span>.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-fg-soft">
              Some are just ideas, some are experiments, some will become
              papers. This is where I keep them — honestly, including the ones
              still in progress.
            </p>

            <dl className="mt-10 flex flex-wrap gap-x-12 gap-y-6">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="font-mono text-xs tracking-[0.12em] text-fg-faint uppercase">
                    {s.label}
                  </dt>
                  <dd className="mt-1 text-4xl font-extrabold text-fg">
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* current focus */}
      {featured && (
        <section className="mx-auto max-w-6xl px-5 lg:px-8">
          <Reveal>
            <div className="grid overflow-hidden rounded-[2rem] border border-line bg-surface lg:grid-cols-[1.1fr_1fr]">
              <div className="group relative flex flex-col gap-6 p-7 sm:p-10">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-xs tracking-[0.2em] text-fg-faint uppercase">
                    Current focus
                  </span>
                  <StatusPill status={featured.status} />
                </div>

                <h2 className="text-3xl leading-tight font-bold tracking-tight sm:text-4xl">
                  {/* the link covers the whole text side of the card */}
                  <Link
                    href={`/research/${featured.slug}`}
                    className="transition-colors after:absolute after:inset-0 group-hover:text-accent group-active:text-accent"
                  >
                    {featured.question}
                  </Link>
                </h2>

                {featured.summary && (
                  <p className="max-w-xl leading-relaxed text-fg-soft">
                    {featured.summary}
                  </p>
                )}

                <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-4 font-mono text-xs text-fg-faint">
                  <span>
                    {featured.field}
                    {featured.started &&
                      ` · Since ${formatMonth(featured.started)}`}
                  </span>
                  <span className="text-accent transition-transform group-hover:translate-x-1">
                    Read the research →
                  </span>
                </div>
              </div>

              <div className="relative min-h-72 border-t border-line bg-ink lg:border-t-0 lg:border-l">
                {featured.visual === "tree" ? (
                  <ResearchTree />
                ) : (
                  <div
                    aria-hidden
                    className="dot-grid dot-grid-faint absolute inset-0"
                  />
                )}
              </div>
            </div>
          </Reveal>
        </section>
      )}

      {/* everything */}
      <section className="mx-auto max-w-6xl px-5 py-24 lg:px-8 lg:py-32">
        <Reveal>
          <h2 className="mb-10 text-3xl font-bold tracking-tight sm:text-4xl">
            All research
          </h2>
        </Reveal>
        <ResearchList items={all} featuredSlug={featured?.slug} />
      </section>
    </>
  );
}