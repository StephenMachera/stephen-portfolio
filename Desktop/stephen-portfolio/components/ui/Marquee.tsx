import { site } from "@/lib/site";

// the amber ticker band — scrolls your "I build …" lines, separated by stars
export default function Marquee({
  className = "",
  items,
}: {
  className?: string;
  items?: string[]; // defaults to your "I build …" lines
}) {
  const words = items ?? site.buildPhrases.map((p) => p.replace(/\.$/, ""));
  const row = (
    <ul className="flex shrink-0 items-center">
      {words.map((word) => (
        <li key={word} className="flex items-center">
          <span className="whitespace-nowrap px-8 text-lg font-bold sm:text-xl">{word}</span>
          <span aria-hidden="true" className="text-2xl leading-none">✳</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className={`overflow-hidden bg-accent py-4 text-forest-deep ${className}`}>
      <div className="flex w-max animate-marquee motion-reduce:animate-none max-sm:[animation-duration:16s]" aria-hidden="false">
        {row}
        <div aria-hidden="true" className="flex">{row}</div>
      </div>
    </div>
  );
}
