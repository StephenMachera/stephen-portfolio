import { isActive, type ResearchStatus } from "@/lib/research-status";

export default function StatusPill({ status }: { status: ResearchStatus }) {
  const active = isActive(status);

  const tone =
    status === "Paused"
      ? "border-line text-fg-faint"
      : status === "Published"
        ? "border-fg/30 text-fg"
        : "border-accent/40 text-accent";

  const dot =
    status === "Paused"
      ? "bg-fg-faint"
      : status === "Published"
        ? "bg-fg"
        : "bg-accent";

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[11px] tracking-[0.12em] uppercase ${tone}`}
    >
      <span className="relative flex size-2">
        {active && (
          <span
            className={`absolute inset-0 animate-ping rounded-full opacity-60 motion-reduce:hidden ${dot}`}
          />
        )}
        <span className={`relative size-2 rounded-full ${dot}`} />
      </span>
      {status}
    </span>
  );
}