"use client";

import { useActionState, useState, type ChangeEvent, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { sendMessage, type FormState } from "@/app/lets-talk/actions";
import { site } from "@/lib/site";
import { topics, budgets, timelines, topicLabel, type TopicId } from "@/lib/contact";
import RollText from "@/components/ui/RollText";

const initialState: FormState = { status: "idle" };

const inputClass =
  "w-full rounded-xl border border-line bg-surface/70 px-4 py-3.5 text-fg placeholder:text-fg-faint outline-none transition-colors duration-200 focus:border-accent focus:bg-surface aria-[invalid=true]:border-red-400/70";

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block font-mono text-xs uppercase tracking-widest text-fg-muted">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

function Select({
  id,
  name,
  value,
  onChange,
  options,
}: {
  id: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
}) {
  return (
    <div className="relative">
      <select id={id} name={name} value={value} onChange={onChange} className={`${inputClass} appearance-none pr-10`}>
        <option value="">Choose one</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <span aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-fg-muted">
        ▾
      </span>
    </div>
  );
}

// slides extra fields open and closed smoothly
function Expand({ show, children }: { show: boolean; children: ReactNode }) {
  return (
    <AnimatePresence initial={false}>
      {show && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden"
        >
          <div className="grid gap-5 pb-1 pt-1 sm:grid-cols-2">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Success({ name, onReset }: { name: string; onReset: () => void }) {
  const first = name.split(" ")[0];
  return (
    <div role="status" className="flex flex-col items-start rounded-3xl border border-line bg-surface/60 p-8 lg:p-10">
      <svg width="56" height="56" viewBox="0 0 56 56" aria-hidden="true">
        <motion.circle
          cx="28" cy="28" r="26" fill="none" stroke="var(--color-accent)" strokeWidth="2"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6 }}
        />
        <motion.path
          d="M17 29l7 7 15-16" fill="none" stroke="var(--color-accent)" strokeWidth="3"
          strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4, delay: 0.5 }}
        />
      </svg>
      <h2 className="mt-6 text-3xl font-extrabold tracking-tight">
        Message sent{first ? `, ${first}` : ""}!
      </h2>
      <p className="mt-3 max-w-md text-fg-soft">
        Thank you for reaching out. I&apos;ll read it and get back to you{" "}
        {site.replyTime || "soon"}.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="group mt-8 inline-flex min-h-11 items-center gap-2 font-bold text-accent"
      >
        <RollText text="Send another message" />
      </button>
    </div>
  );
}

function FormInner({ initialTopic, onReset }: { initialTopic: TopicId; onReset: () => void }) {
  const [state, formAction, pending] = useActionState(sendMessage, initialState);
  const [topic, setTopic] = useState<TopicId>(initialTopic);
  const [values, setValues] = useState({
    name: "", email: "", message: "", company: "", role: "", budget: "", timeline: "",
  });

  const update =
    (key: keyof typeof values) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setValues((v) => ({ ...v, [key]: e.target.value }));

  if (state.status === "success") return <Success name={values.name} onReset={onReset} />;

  const errors = state.status === "error" ? state.errors ?? {} : {};
  const formError = state.status === "error" ? state.message : undefined;

  // WhatsApp gets whatever they've typed so far
  const waText = [
    `Hi Stephen${values.name ? `, I'm ${values.name}` : ""}.`,
    `(${topicLabel(topic)})`,
    values.message,
  ]
    .filter(Boolean)
    .join(" ");
  const waHref = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(waText)}`;

  return (
    <form action={formAction} noValidate className="space-y-8">
      {/* 1. reason */}
      <fieldset>
        <legend className="font-mono text-xs uppercase tracking-widest text-fg-muted">
          What brings you here?
        </legend>
        <div className="mt-4 flex flex-wrap gap-2">
          {topics.map((t) => (
            <label key={t.id} className="cursor-pointer">
              <input
                type="radio"
                name="topic"
                value={t.id}
                checked={topic === t.id}
                onChange={() => setTopic(t.id)}
                className="peer sr-only"
              />
              <span className="inline-flex min-h-11 items-center rounded-full border border-line px-5 text-sm font-medium transition-all duration-200 hover:border-fg-faint peer-checked:border-accent peer-checked:bg-accent peer-checked:text-forest-deep peer-focus-visible:ring-2 peer-focus-visible:ring-accent peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-ink">
                {t.label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* spam trap — hidden from people, bots fill it in */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {/* 2. who */}
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" htmlFor="name" error={errors.name}>
          <input
            id="name" name="name" type="text" autoComplete="name" placeholder="Jane Wanjiku"
            value={values.name} onChange={update("name")}
            aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined}
            className={inputClass}
          />
        </Field>
        <Field label="Email" htmlFor="email" error={errors.email}>
          <input
            id="email" name="email" type="email" autoComplete="email" placeholder="jane@company.com"
            value={values.email} onChange={update("email")}
            aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined}
            className={inputClass}
          />
        </Field>
      </div>

      {/* 3. extra fields — only when they fit */}
      <Expand show={topic === "project"}>
        <Field label="Budget" htmlFor="budget">
          <Select id="budget" name="budget" value={values.budget} onChange={update("budget")} options={budgets} />
        </Field>
        <Field label="Timeline" htmlFor="timeline">
          <Select id="timeline" name="timeline" value={values.timeline} onChange={update("timeline")} options={timelines} />
        </Field>
      </Expand>

      <Expand show={topic === "hiring"}>
        <Field label="Company" htmlFor="company">
          <input id="company" name="company" type="text" autoComplete="organization"
            value={values.company} onChange={update("company")} className={inputClass} />
        </Field>
        <Field label="Role" htmlFor="role">
          <input id="role" name="role" type="text" placeholder="e.g. Junior full-stack developer"
            value={values.role} onChange={update("role")} className={inputClass} />
        </Field>
      </Expand>

      {/* 4. message */}
      <Field label="Your message" htmlFor="message" error={errors.message}>
        <textarea
          id="message" name="message" rows={6}
          placeholder="Tell me a little about what you have in mind…"
          value={values.message} onChange={update("message")}
          aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined}
          className={`${inputClass} resize-y`}
        />
      </Field>

      {formError && (
        <p role="alert" className="rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-700">
          {formError}
        </p>
      )}

      {/* 5. send */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="group inline-flex min-h-13 items-center gap-2 rounded-full bg-accent px-7 font-bold text-forest-deep transition-[transform,opacity] duration-200 active:scale-[0.97] disabled:opacity-60"
        >
          {pending ? (
            <>
              <span aria-hidden="true" className="size-4 animate-spin rounded-full border-2 border-forest-deep border-t-transparent" />
              Sending…
            </>
          ) : (
            <>
              <RollText text="Send message" />
              <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </>
          )}
        </button>

        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex min-h-13 items-center gap-2 rounded-full border border-line px-6 font-medium transition-colors duration-300 hover:border-accent hover:text-accent"
        >
          <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
          </svg>
          <RollText text="Prefer WhatsApp?" />
        </a>
      </div>
    </form>
  );
}

// a fresh key = a fresh, empty form ("Send another message")
export default function ContactForm({ initialTopic }: { initialTopic: TopicId }) {
  const [round, setRound] = useState(0);
  return <FormInner key={round} initialTopic={initialTopic} onReset={() => setRound((r) => r + 1)} />;
}