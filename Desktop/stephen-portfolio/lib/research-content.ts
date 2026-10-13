import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type {
  ResearchLink,
  ResearchLogEntry,
  ResearchMeta,
} from "@/types/content";
import { isActive, isResearchStatus } from "@/lib/research-status";

const DIR = path.join(process.cwd(), "content", "research");
const SLUG = /^[a-z0-9-]+$/;

// gray-matter turns unquoted dates into Date objects — make them plain text
function toDate(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (typeof value === "string") return value.trim();
  return "";
}

function toStrings(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((v): v is string => typeof v === "string")
    : [];
}

function toLinks(value: unknown): ResearchLink[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((v: Record<string, unknown>) =>
    typeof v?.label === "string" && typeof v?.href === "string"
      ? [{ label: v.label, href: v.href }]
      : [],
  );
}

function toLog(value: unknown): ResearchLogEntry[] {
  if (!Array.isArray(value)) return [];
  return value
    .flatMap((v: Record<string, unknown>) =>
      typeof v?.note === "string"
        ? [{ date: toDate(v.date), note: v.note }]
        : [],
    )
    .sort((a, b) => b.date.localeCompare(a.date)); // newest first
}

function read(slug: string) {
  const file = path.join(DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;

  const { data, content } = matter(fs.readFileSync(file, "utf8"));

  const meta: ResearchMeta = {
    slug,
    title: typeof data.title === "string" ? data.title : slug,
    question:
      typeof data.question === "string" ? data.question : (data.title ?? slug),
    status: isResearchStatus(data.status) ? data.status : "Exploring",
    field: typeof data.field === "string" ? data.field : "Research",
    started: toDate(data.started),
    updated: toDate(data.updated) || toDate(data.started),
    summary: typeof data.summary === "string" ? data.summary : "",
    featured: data.featured === true,
    visual: data.visual === "tree" ? "tree" : undefined,
    tags: toStrings(data.tags),
    links: toLinks(data.links),
    log: toLog(data.log),
  };

  return { meta, body: content };
}

// All research, newest update first. Files starting with "_" are ignored.
export function getResearch(): ResearchMeta[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".mdx") && !f.startsWith("_"))
    .map((f) => f.replace(/\.mdx$/, ""))
    .filter((slug) => SLUG.test(slug))
    .map((slug) => read(slug)?.meta)
    .filter((m): m is ResearchMeta => Boolean(m))
    .sort((a, b) => b.updated.localeCompare(a.updated));
}

export function getResearchEntry(slug: string) {
  if (!SLUG.test(slug)) return null;
  return read(slug);
}

// Featured one first, otherwise the newest active one, otherwise the newest
export function pickFeatured(list: ResearchMeta[]) {
  return (
    list.find((r) => r.featured) ??
    list.find((r) => isActive(r.status)) ??
    list[0] ??
    null
  );
}