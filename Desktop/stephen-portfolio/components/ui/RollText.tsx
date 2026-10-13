type Props = {
  text: string;
};

// Each letter rolls up and an identical copy rolls in from below.
// Needs a parent with the `group` class (the link) to trigger on hover.
export default function RollText({ text }: Props) {
  const letters = Array.from(text);

  return (
    <span className="relative inline-block">
      {/* what screen readers hear — the full word, once */}
      <span className="sr-only">{text}</span>

      {/* what people see — the animated letters */}
      <span aria-hidden="true" className="relative inline-flex overflow-hidden leading-[1.25]">
        {letters.map((char, i) => {
          const letter = char === " " ? "\u00A0" : char;
          const delay = { transitionDelay: `${i * 18}ms` };
          const move =
            "inline-block transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:-translate-y-full group-focus-visible:-translate-y-full";

          return (
            <span key={i} className="relative inline-block">
              <span className={move} style={delay}>
                {letter}
              </span>
              <span className={`absolute left-0 top-full ${move}`} style={delay}>
                {letter}
              </span>
            </span>
          );
        })}
      </span>
    </span>
  );
}