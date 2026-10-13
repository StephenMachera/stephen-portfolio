// "/stories/my-story" should still highlight "Stories"
export function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export type NavLink = {
  href: string;
  label: string;
};

export const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/journey", label: "My Journey" },
  { href: "/projects", label: "Projects" },
  { href: "/research", label: "Research" },
  { href: "/stories", label: "Stories" },
];

export const ctaLink: NavLink = { href: "/lets-talk", label: "Let's Talk" };