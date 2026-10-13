import type { ComponentProps } from "react";

// Quotes (lines starting with ">" in your .mdx) become feature cards
function Quote(props: ComponentProps<"blockquote">) {
  return (
    <blockquote
      {...props}
      className="not-prose relative my-12 rounded-3xl border border-line bg-surface/60 px-7 pb-8 pt-14 text-xl font-semibold leading-relaxed text-fg lg:px-10 lg:text-2xl"
    >
      <span aria-hidden="true" className="absolute left-7 top-4 text-6xl font-extrabold leading-none text-accent lg:left-10">
        &ldquo;
      </span>
      {props.children}
    </blockquote>
  );
}

export const mdxComponents = {
  blockquote: Quote,
};

// the reading styles, tuned to your theme
export const proseClass = [
  "prose prose-invert prose-lg max-w-[68ch]",
  "prose-p:leading-[1.85] prose-p:text-fg-soft",
  "prose-headings:font-extrabold prose-headings:tracking-tight prose-headings:text-fg",
  "prose-h2:mt-16 prose-h2:text-3xl",
  "prose-strong:text-fg",
  "prose-a:text-accent prose-a:no-underline hover:prose-a:underline",
  "prose-li:text-fg-soft prose-li:marker:text-accent",
  "prose-hr:border-line",
  "prose-img:rounded-2xl",
].join(" ");