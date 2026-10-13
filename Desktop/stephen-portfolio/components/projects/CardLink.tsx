type Props = {
  href: string;
  className?: string;
};

export default function CodeLink({ href, className = "" }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="View source code on GitHub"
      className={`group/code inline-flex min-h-9 items-center gap-2 rounded-full border border-line bg-ink/75 px-3.5 font-mono text-xs text-fg backdrop-blur transition-colors hover:border-accent hover:bg-accent hover:text-ink active:border-accent active:bg-accent active:text-ink ${className}`}
    >
      <svg
        aria-hidden
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-transform duration-300 group-hover/code:-rotate-12 group-active/code:-rotate-12"
      >
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
      View code
    </a>
  );
}