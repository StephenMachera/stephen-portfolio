import type { ResearchStatus } from "@/lib/research-status";

export type StoryMeta = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  excerpt: string;     // first lines of the story, worked out automatically
  cover?: string;
  tags?: string[];
  readingTime: number;
};


export type ResearchLink = { label: string; href: string };
export type ResearchLogEntry = { date: string; note: string };

export type ResearchMeta = {
  slug: string;
  title: string;
  question: string;
  status: ResearchStatus;
  field: string;
  started: string;
  updated: string;
  summary: string;
  featured: boolean;
  visual?: "tree";
  tags: string[];
  links: ResearchLink[];
  log: ResearchLogEntry[];
};