"use client";

import { useReducedMotion } from "motion/react";
import { useTypewriter } from "@/hooks/useTypewriter";

const NAME = "Stephen Machera";

function Cursor({ hidden = false }: { hidden?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`ml-[0.06em] inline-block h-[0.85em] w-[0.08em] translate-y-[0.06em] bg-accent transition-opacity duration-700 ${
        hidden ? "opacity-0" : "animate-blink"
      }`}
    />
  );
}

type Props = {
  phrases: string[];
};

export default function HeroName({ phrases }: Props) {
  const reduce = useReducedMotion();

  // 1. the name types once
  const name = useTypewriter([NAME], {
    startDelay: 400,
    typeSpeed: 75,
    enabled: !reduce,
  });
  const nameDone = !!reduce || name.done;

  // 2. then the changing line starts
  const line = useTypewriter(phrases, {
    loop: true,
    startDelay: 600,
    enabled: !reduce && nameDone,
  });

  const nameText = reduce ? NAME : name.text;
  const lineText = reduce ? phrases[0] : line.text;

  return (
    <>
      <div className="mt-6 flex items-center gap-5 sm:gap-6">
        <h1 className="text-[clamp(1.9rem,6.5vw,3.75rem)] font-extrabold leading-[0.95] tracking-[-0.035em]">
          {/* screen readers and Google always get the full name */}
          <span className="sr-only">Stephen Machera</span>

          {/* the invisible copy holds the space, so nothing jumps while typing */}
          <span aria-hidden="true" className="grid">
            <span className="invisible col-start-1 row-start-1 whitespace-nowrap">
              {NAME}
            </span>
            <span className="col-start-1 row-start-1 whitespace-nowrap">
              <span className="text-forest">{nameText.slice(0, nameText.indexOf(" ") === -1 ? undefined : nameText.indexOf(" "))}</span>
              <span className="text-accent">
                {nameText.indexOf(" ") === -1 ? "" : nameText.slice(nameText.indexOf(" "))}
              </span>
              <Cursor hidden={nameDone} />
            </span>
          </span>
        </h1>
      </div>

      <p className="mt-6 min-h-[1.5em] text-xl font-medium sm:text-2xl">
        <span className="sr-only">I build {phrases.join(" ")}</span>
        <span aria-hidden="true">
          <span className="text-fg-muted">I build </span>
          <span className="text-accent">{lineText}</span>
          {nameDone && <Cursor />}
        </span>
      </p>
    </>
  );
}