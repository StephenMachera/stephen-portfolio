export const researchStatuses = [
  "Exploring",
  "Experimenting",
  "Writing",
  "Published",
  "Paused",
] as const;

export type ResearchStatus = (typeof researchStatuses)[number];

export function isResearchStatus(value: unknown): value is ResearchStatus {
  return (
    typeof value === "string" &&
    (researchStatuses as readonly string[]).includes(value)
  );
}

// "Active" = still moving
export function isActive(status: ResearchStatus) {
  return (
    status === "Exploring" || status === "Experimenting" || status === "Writing"
  );
}

export const statusHint: Record<ResearchStatus, string> = {
  Exploring: "Reading and asking questions",
  Experimenting: "Building and testing ideas",
  Writing: "Writing up what I found",
  Published: "Finished and shared",
  Paused: "On hold for now",
};

// "2026-10-07" -> "Oct 2026"
export function formatMonth(date: string) {
  if (!date) return "";
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return date;
  return d.toLocaleDateString("en-GB", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

// "2026-10-07" -> "7 Oct 2026"
export function formatDay(date: string) {
  if (!date) return "";
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return date;
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}