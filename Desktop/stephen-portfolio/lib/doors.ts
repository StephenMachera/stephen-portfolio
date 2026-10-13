import { site } from "@/lib/site";

export type Door = {
  id: string;
  who: string;
  title: string;
  line: string;
  points: string[]; // shown inside the open door
  cta: string;
  href: string;
  download?: boolean; // true = the link downloads a file
};

export const doors: Door[] = [
  {
    id: "hire",
    who: "For employers",
    title: "Hire me",
    line: "See my skills, my experience, and how I work.",
    points: [
      "Full-stack: Next.js, FastAPI, Django",
      "Real products, shipped and running",
      "DevOps: Docker, AWS, GCP, Vercel",
      "Cloud infrastructure, Container orchestration, CI/CD",
      "Python, TypeScript, React, Tailwind, PostgreSQL",
      "PyTorch, TensorFlow, HuggingFace, RAG",
      "Machine Learning research",
    ],
    cta: "Download my CV",
    href: site.cvUrl,
    download: true,
  },
  {
    id: "work",
    who: "For businesses",
    title: "Work with me",
    line: "Need a system built? Let's build it together.",
    points: [
      "POS and ERP systems",
      "Restaurant & hotel systems",
      "Dashboards and data tools",
      "Machine learning and AI solutions",
      "API integrations and automation",
      "Payments with Flutterwave",
    ],
    cta: "Start a project",
    href: "/lets-talk?topic=project",
  },
  {
    id: "partner",
    who: "For partners & investors",
    title: "Partner with me",
    line: "Ideas that are growing into ventures.",
    points: [
      "Jicho — AI for poultry farmers",
      "GestFlow — gesture-based transfer",
      "Research into grown systems",
      "Aura - Personal Home Assistant",
      "Exama - RAG system for your notes revision",
    ],
    cta: "Let's talk",
    href: "/lets-talk?topic=partnership",
  },
];