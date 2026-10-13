"use client";

import { Fragment, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { journeyIntro as intro } from "@/lib/journey";
import { ease } from "./bits";

export default function JourneyHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // photo drifts slower than the page while scrolling away
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 90]);

  const words = intro.headline.split(" ");

  return (
    <section ref={ref} className="relative overflow-hidden pt-28 pb-20 lg:pt-40 lg:pb-28">
      <div aria-hidden className="dot-grid dot-grid-faint absolute inset-0" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-[1.35fr_1fr] lg:gap-16 lg:px-8">
        {/* text */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="font-mono text-xs tracking-[0.2em] text-fg-faint uppercase"
          >
            {intro.label}
          </motion.p>

          <h1 className="mt-5 text-[clamp(2.1rem,4.6vw,3.75rem)] leading-[1.08] font-extrabold tracking-tight">
            {words.map((word, i) => {
              const clean = word.replace(/[.,]/g, "");
              return (
                <Fragment key={i}>
                  <span className="inline-block overflow-hidden pb-[0.1em] align-bottom">
                    <motion.span
                      className={`inline-block ${intro.accent.includes(clean) ? "text-accent" : ""}`}
                      initial={{ y: "110%" }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.7, delay: 0.25 + i * 0.045, ease }}
                    >
                      {word}
                    </motion.span>
                  </span>{" "}
                </Fragment>
              );
            })}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 + words.length * 0.045, ease }}
            className="mt-7 max-w-xl text-base leading-relaxed text-fg-soft sm:text-lg"
          >
            {intro.body}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.6 }}
            className="mt-10 hidden items-center gap-3 font-mono text-xs text-fg-faint lg:flex"
          >
            <span className="animate-float inline-block text-accent">↓</span>
            Scroll to walk the road with me
          </motion.div>
        </div>

        {/* photo — on top for phones, right side on desktop */}
        <motion.div
          style={{ y: photoY }}
          className="order-first mx-auto w-full max-w-[15rem] sm:max-w-[18rem] lg:order-last lg:max-w-sm"
        >
          <div className="relative aspect-[843/1180]">
            <motion.div
              aria-hidden
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.9, ease }}
              className="absolute inset-x-0 top-[14%] bottom-0 origin-bottom rounded-t-full rounded-b-3xl bg-accent"
            />
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease }}
              className="absolute inset-0"
            >
              <Image
                src={intro.photo}
                alt="Stephen Machera"
                fill
                priority
                quality={90}
                sizes="(min-width: 1024px) 384px, 288px"
                className="rounded-b-3xl object-cover object-top"
              />
            </motion.div>

            {/* entrance on the outer element, float on the inner one */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1, type: "spring", stiffness: 260, damping: 18 }}
              className="absolute bottom-8 -left-4 sm:-left-6"
            >
              <div className="animate-float flex items-center gap-2.5 rounded-2xl border border-line bg-surface px-4 py-3">
                <span className="size-2.5 rounded-full bg-accent" />
                <span className="font-mono text-[11px] text-fg-soft sm:text-xs">
                  {intro.tag}
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}