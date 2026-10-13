import { site, socials } from "@/lib/site";
import SocialIcon from "@/components/ui/SocialIcon";
import LocalTime from "@/components/ui/LocalTime";
import RollText from "@/components/ui/RollText";

const label = "font-mono text-xs uppercase tracking-widest text-fg-faint";

export default function ContactAside() {
  return (
    <aside className="space-y-8 rounded-3xl border border-line bg-surface/60 p-6 lg:p-8">
      {/* direct channels */}
      <div>
        <p className={label}>Prefer to chat?</p>
        <div className="mt-4 space-y-3">
          <a
            href={`https://wa.me/${site.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between gap-4 rounded-2xl border border-line bg-ink/40 p-4 transition-colors duration-300 hover:border-accent"
          >
            <span>
              <span className="block font-bold">WhatsApp</span>
              <span className="block text-sm text-fg-muted">Chat with me directly</span>
            </span>
            <span aria-hidden="true" className="inline-block text-accent transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
          <a
            href={`mailto:${site.email}`}
            className="group flex items-center justify-between gap-4 rounded-2xl border border-line bg-ink/40 p-4 transition-colors duration-300 hover:border-accent"
          >
            <span className="min-w-0">
              <span className="block font-bold">Email</span>
              <span className="block truncate text-sm text-fg-muted">{site.email}</span>
            </span>
            <span aria-hidden="true" className="inline-block text-accent transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>

      {/* socials */}
      <div>
        <p className={label}>Elsewhere</p>
        <ul className="mt-4 flex gap-2">
          {socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${social.label} (opens in a new tab)`}
                title={social.label}
                className="inline-flex size-11 items-center justify-center rounded-full border border-line text-fg-soft transition-[color,border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent"
              >
                <SocialIcon name={social.icon} />
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* time + CV */}
      <div className="flex flex-wrap items-end justify-between gap-4 border-t border-line pt-6">
        <div>
          <p className={label}>Local time</p>
          <p className="mt-1 flex items-center gap-2 font-mono text-lg">
            <span aria-hidden="true" className="size-2 animate-pulse rounded-full bg-accent" />
            <LocalTime />
          </p>
        </div>
        <a href={site.cvUrl} download className="group inline-flex min-h-11 items-center gap-2 font-bold text-accent">
          <RollText text="Download CV" />
          <span aria-hidden="true">↓</span>
        </a>
      </div>
    </aside>
  );
}