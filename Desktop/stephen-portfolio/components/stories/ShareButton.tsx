"use client";

import { useState } from "react";

export default function ShareButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  async function share() {
    const url = window.location.href;
    // phones: open the share sheet (WhatsApp, X, etc.)
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        /* they closed the share sheet — that's fine */
      }
      return;
    }
    // desktop: copy the link
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={share}
      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-5 text-sm font-medium transition-colors duration-300 hover:border-accent hover:text-accent"
    >
      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
        <path d="m16 6-4-4-4 4" />
        <path d="M12 2v13" />
      </svg>
      <span aria-live="polite">{copied ? "Link copied!" : "Share this story"}</span>
    </button>
  );
}