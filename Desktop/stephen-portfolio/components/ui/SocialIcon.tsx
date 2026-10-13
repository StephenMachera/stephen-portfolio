import type { Social } from "@/lib/site";

type Props = {
  name: Social["icon"];
  className?: string;
};

export default function SocialIcon({ name, className }: Props) {
  const common = {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    className,
  };

  switch (name) {
    case "github":
      return (
        <svg {...common}>
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...common}>
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect width="4" height="12" x="2" y="9" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      );
    case "dribbble":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="10" />
          <path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94" />
          <path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32" />
          <path d="M8.56 2.75c4.37 6 6 9.42 8 17.72" />
        </svg>
      );
    case "discord":
      return (
        <svg {...common}>
          <path d="M8.5 5.5c-1.6.3-3 .8-4.2 1.6C2.6 9.8 2 12.8 2.2 16c1.4 1.1 2.9 1.9 4.6 2.4l1-1.7" />
          <path d="M15.5 5.5c1.6.3 3 .8 4.2 1.6 1.7 2.7 2.3 5.7 2.1 8.9-1.4 1.1-2.9 1.9-4.6 2.4l-1-1.7" />
          <path d="M7 16.2c3.2 1.4 6.8 1.4 10 0" />
          <path d="M8.5 5.5 9.2 7c1.9-.3 3.7-.3 5.6 0l.7-1.5" />
          <circle cx="9" cy="12.5" r="1.2" />
          <circle cx="15" cy="12.5" r="1.2" />
        </svg>
      );
  }
}