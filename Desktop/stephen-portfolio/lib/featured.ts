export type FeaturedProject = {
  slug: string;
  name: string;
  label: string;      // small text in the Hero preview's top bar
  summary: string;
  stack: string[];
  category: string;   // used by the filter chips on /projects
  status?: string;    // e.g. "In development"
  image?: string;
  links?: { live?: string; github?: string };
};

export const featured: FeaturedProject[] = [
  {
    slug: "sweet1ne",
    name: "Sweet1NE",
    label: "sweet1ne · kitchen screen",
    summary:
      "Restaurant system for a London restaurant group: live kitchen screen, QR table ordering and staff permissions across branches.",
    stack: ["Next.js", "FastAPI", "Supabase", "Hetzner VPS","Docker", "TypeScript"],
    category: "Web platforms",
    image: "/images/projects/sweet1ne.jpeg",
    links: {
        github: "https://sweet1ne.com/",
    },
  },
  {
    slug: "quickdine",
    name: "QuickDine",
    label: "quickdine · manager portal",
    summary:
      "Multi-tenant hotel and restaurant platform: rooms, bookings, housekeeping, inventory and payments in one place.",
    stack: ["Django", "HTMX", "Cloud Run", "Flutterwave"],
    category: "Web platforms",
    image: "/images/projects/quickdine.webp",
    links: {
      github: "https://github.com/Innovators-group-1/smart-hotel-system"
    }
  },
  {
    slug: "gestflow",
    name: "GestFlow",
    label: "gestflow · transfer",
    summary:
      "Move your work between computers with a hand gesture: grab it on one screen, throw it to the next. No setup.",
    stack: ["TensorFlow", "MediaPipe", "Python", "P2P"],
    category: "Tools",
    image: "/images/projects/gestflow.webp",
    links: {
      github: "https://github.com/StephenMachera/gestflow-learning"
    }
  },
  {
    slug: "jicho",
    name: "Jicho",
    label: "jicho · live camera",
    summary:
      "AI that watches a poultry house around the clock and alerts the farmer the moment a bird looks unwell.",
    stack: ["Computer vision", "Cloud", "Mobile alerts"],
    category: "AI & ML",
    status: "In development",
    image: "/images/projects/jicho.webp",
  },
];

export function getProject(slug: string) {
  return featured.find((p) => p.slug === slug) ?? null;
}