"use client";

import { useEffect, useState } from "react";

type Options = {
  loop?: boolean;       // false = type once and stop · true = type, pause, delete, next
  typeSpeed?: number;   // ms per letter while typing
  deleteSpeed?: number; // ms per letter while deleting
  pause?: number;       // ms to wait before deleting (loop only)
  startDelay?: number;  // ms before the first letter
  enabled?: boolean;    // false = do nothing (yet)
};

export function useTypewriter(
  words: string[],
  {
    loop = false,
    typeSpeed = 70,
    deleteSpeed = 35,
    pause = 1800,
    startDelay = 0,
    enabled = true,
  }: Options = {}
) {
  const [index, setIndex] = useState(0);      // which word
  const [count, setCount] = useState(0);      // how many letters are showing
  const [deleting, setDeleting] = useState(false);
  const [started, setStarted] = useState(false);

  const word = words[index % words.length];
  const done = !loop && count === word.length;

  useEffect(() => {
    if (!enabled) return;

    let delay: number;
    let next: () => void;

    if (!started) {
      delay = startDelay;
      next = () => setStarted(true);
    } else if (!deleting && count < word.length) {
      delay = typeSpeed + Math.random() * 40; // tiny randomness = feels human
      next = () => setCount((c) => c + 1);
    } else if (!deleting) {
      if (!loop) return; // typed once — finished
      delay = pause;
      next = () => setDeleting(true);
    } else if (count > 0) {
      delay = deleteSpeed;
      next = () => setCount((c) => c - 1);
    } else {
      delay = 300;
      next = () => {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      };
    }

    const id = window.setTimeout(next, delay);
    return () => window.clearTimeout(id);
  }, [enabled, started, deleting, count, word.length, loop, typeSpeed, deleteSpeed, pause, startDelay, words.length]);

  return { text: word.slice(0, count), done };
}