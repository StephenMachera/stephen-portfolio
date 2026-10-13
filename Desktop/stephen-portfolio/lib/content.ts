import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { StoryMeta } from "@/types/content";

const STORIES_DIR = path.join(process.cwd(), "content", "stories");

function readingTime(text: string) {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200)); // ~200 words a minute
}

// The opening lines of a story, as plain text (no headings, quotes or markdown symbols)
function makeExcerpt(content: string, max = 220) {
  const paragraphs = content
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter((p) => p && !p.startsWith("#") && !p.startsWith(">"));

  let text = "";
  for (const p of paragraphs) {
    const clean = p
      .replace(/\[(.*?)\]\(.*?\)/g, "$1")
      .replace(/[*_`]/g, "")
      .replace(/\s+/g, " ");
    text = text ? `${text} ${clean}` : clean;
    if (text.length >= 160) break;
  }

  if (text.length <= max) return text;
  return text.slice(0, text.lastIndexOf(" ", max)) + "…";
}

function readStoryFile(file: string) {
  const raw = fs.readFileSync(path.join(STORIES_DIR, file), "utf8");
  const { data, content } = matter(raw);
  const meta: StoryMeta = {
    slug: file.replace(/\.mdx$/, ""),
    title: data.title,
    date: data.date,
    summary: data.summary,
    excerpt: makeExcerpt(content),
    cover: data.cover,
    tags: data.tags ?? [],
    readingTime: readingTime(content),
  };
  return { meta, content };
}

// All stories, newest first. Runs on the server only (reads files from disk).
export function getStories(): StoryMeta[] {
  if (!fs.existsSync(STORIES_DIR)) return [];
  return fs
    .readdirSync(STORIES_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => readStoryFile(file).meta)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

// One story: its details + the text to render. null if it doesn't exist.
export function getStory(slug: string) {
  // only allow slugs that really exist (stops tricks like "../../secret")
  const exists = getStories().some((s) => s.slug === slug);
  if (!exists) return null;
  return readStoryFile(`${slug}.mdx`);
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

// A project's case study text, or null if it hasn't been written yet
export function getProjectBody(slug: string) {
  if (!/^[a-z0-9-]+$/.test(slug)) return null; // only simple slugs, no path tricks
  const file = path.join(PROJECTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const { content } = matter(fs.readFileSync(file, "utf8"));
  return content;
}