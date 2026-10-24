# Design System — Stephen Machera Portfolio

Single source of truth for how the site looks. Tokens live in [app/globals.css](app/globals.css); fonts are loaded in [app/layout.tsx](app/layout.tsx).

**Look in one line:** clean white pages, deep forest-green sections and pills, amber highlights, rounded pill buttons, subtle motion.

---

## 1. Colour

### Core palette (Tailwind tokens, defined in `@theme`)

| Token | Value | Use |
|---|---|---|
| `ink` | `#ffffff` | Page background |
| `surface` | `#f4f5f2` | Cards, panels, grey sections |
| `line` | `rgb(20 40 26 / 0.12)` | Thin borders and dividers |
| `fg` | `#16241b` | Headings, main text |
| `fg-soft` | `#46524a` | Paragraphs |
| `fg-muted` | `#66716a` | Labels, small text |
| `fg-faint` | `#86908a` | Least important text |
| `accent` | `#ffab00` | Amber — highlights, active links, buttons, dots |
| `forest` | `#2d4f34` | Green sections, pills, header |
| `forest-deep` | `#1f3a27` | Dark text on amber, copyright bar |

Use as classes: `bg-accent`, `text-fg-soft`, `border-line`, `bg-forest`, `text-forest-deep`, etc.

### Forest sections (`.theme-forest`)

Add `theme-forest` to any element to flip the tokens inside it — children keep using the same classes and just work.

| Token inside `.theme-forest` | Value |
|---|---|
| `ink` (background) | `forest` `#2d4f34` |
| `surface` | `#3a5e41` |
| `line` | `rgb(255 255 255 / 0.16)` |
| `fg` | `#ffffff` |
| `fg-soft` | `#e3ebe5` |
| `fg-muted` | `#bccabf` |
| `fg-faint` | `#9fb1a3` |

Used on: header pill, mobile menu, **Who I am**, **Pick your door**, footer copyright bar, footer "Let's Talk" button.

### Colour rules
- Text on amber is always `text-forest-deep`, never white.
- Arrow circles inside buttons: green button → amber circle; amber button → green circle.
- Amber text on white is low-contrast — use it for large headings and accents, not small body text.
- Text selection: amber background, `forest-deep` text.

---

## 2. Typography

| Role | Font | Weights | Variable |
|---|---|---|---|
| Sans (everything) | **Plus Jakarta Sans** (Google Fonts) | variable, 400–800 | `--font-bricolage` → `font-sans` |
| Mono (labels, status, code-ish) | **IBM Plex Mono** (Google Fonts) | 400, 500 | `--font-plex-mono` → `font-mono` |

Both use `display: swap`. Body text is antialiased.

### Scale in use

| Element | Size | Weight / style |
|---|---|---|
| Hero name | `clamp(1.9rem, 6.5vw, 3.75rem)` | extrabold, leading `0.95`, tracking `-0.035em`, one line; "Stephen" in `forest` green, "Machera" in `accent` amber-orange |
| Page titles (h1) | `text-5xl` → `lg:text-7xl` | extrabold, leading `1.02`, tracking tight |
| Section headings (h2) | `text-4xl` → `lg:text-5xl` | extrabold, tracking tight |
| Footer heading | `text-3xl` → `sm:text-4xl` | bold |
| "Who I am" lead | `clamp(1.75rem, 2.6vw, 2.25rem)` | semibold, leading `1.25` |
| Hero typed line ("I build …") | `text-xl` → `sm:text-2xl` | medium |
| Body / intro | `text-lg`, leading relaxed | regular |
| Small labels | `13px` mono, uppercase, `0.06em` tracking | regular |
| Tiny meta | `10–11px` mono | regular |

**Accent words in headings** are **amber italic** (`SplitHeading` `accent` prop), e.g. *built*, *door*, *Connect*.

---

## 3. Layout & spacing

- Container: `max-w-7xl` (featured projects row: `max-w-[88rem]`), `px-6` gutters.
- Section padding: `py-16`, `lg:py-20`.
- Hero: two columns on desktop — text left (`1.15fr`), image right (`1fr`), `lg:gap-20`. On phones the image stacks above the text.
- Breakpoint for desktop layouts: `lg` (1024px). Phone layouts are first-class (swipeable project cards, compact door rows, hamburger menu).
- Page structure: Header (fixed) → Hero → amber Marquee → Who I am (green) → Featured projects (white) → Research (grey `surface`) → Pick your door (green) → Footer.

---

## 4. Shapes & surfaces

| Thing | Style |
|---|---|
| Buttons, pills, badges, header | Fully rounded (`rounded-full`) |
| Cards | `rounded-2xl`, `border-line`, `bg-surface` |
| Doors | Arched top (`rounded-t-full`) |
| Hero image | Transparent PNG, no frame, `object-contain` |
| Header shadow | `0 8px 24px rgb(20 40 26 / 0.18)` |
| Marquee | Amber band, tilted `-1deg` on the home page |

Borders are always hairline `border-line`; amber borders appear on hover/active.

---

## 5. Components

### Header
Floating green pill (`theme-forest`, `max-w-6xl`, height `64px` → `56px` on scroll). Left: amber moon logo + "Stephen Machera". Centre (desktop): links — active link amber, others white with amber hover and text roll. Right: white "Let's Talk" pill (magnetic + roll). Phones: hamburger that twists into an X, opening a full-screen green menu. Header stays fixed at the top while scrolling (it shrinks slightly after you scroll).

### Buttons
- **Primary:** `bg-forest`, white bold text, pill, amber circular arrow on the right (`size-10`). Magnetic hover.
- **Secondary:** transparent, `border-line`, hover → amber border + amber text.
- **Amber button:** `bg-accent text-forest-deep` (e.g. Download CV in *Who I am*), with a green arrow circle.
- **White pill:** used on green backgrounds (header "Let's Talk").
- Min height `52px` (`min-h-13`) for main CTAs, `44px` minimum for everything tappable.

### Hero
Eyebrow removed. Typed name (one line) → typed "I build …" line (amber phrase, blinking cursor) → intro paragraph → two buttons (*See my projects*, *Download CV* — opens the CV in a new tab and downloads it). Faint amber dot grid behind, with a bright spotlight that follows the mouse.

### Marquee
Amber band, `forest-deep` bold text (`text-lg`/`sm:text-xl`), ✳ separators, scrolls left in a 28s linear loop. Content comes from `site.buildPhrases`. Paused by reduced-motion. Appears under the hero and above the footer.

### Section label
Amber dot + short amber line + uppercase mono label, animated in on scroll.

### Cards (projects, facts, contact)
`rounded-2xl`, hairline border, `surface` background; project cards show a screenshot with a gradient fade, name + status badge, and reveal summary and stack on hover (desktop). Status badge: amber-outlined mono pill.

### Doors
Three arched cards on desktop that swing open to an amber "room" with bullet points; compact rows with a small arch icon on phones.

### Footer
Amber marquee → white area: "Let's *Connect* there" + green "Let's Talk" pill → four columns (Brand + amber social circles, Navigation, Contact, Local time) → green copyright bar. On desktop it is revealed from under the page as you scroll to the bottom.

---

## 6. Motion

| Effect | Details |
|---|---|
| Easing (default) | `cubic-bezier(0.22, 1, 0.36, 1)` — fast start, soft landing |
| Scroll reveals | Fade + rise via `Reveal`, `RevealGroup`, `CardReveal` (≈0.7s) |
| Headings | `SplitHeading` — each word rises out of a mask, 0.07s stagger |
| Hover text | `RollText` — label slides up and is replaced (500ms, `cubic-bezier(0.65,0,0.35,1)`) |
| Magnetic buttons | Move up to 8px toward the cursor on desktop, spring back |
| Marquee | `animate-marquee` 28s linear |
| Floats | `animate-float` (3.2s, ±6px), `animate-float-slow` (7s) |
| Typing | `blink` cursor 1s; name types once, then phrases loop |
| Dots | `dot-wander` 16s drifting spotlight on the dot grid |
| Smooth scrolling | Lenis |

**Reduced motion:** all animation and transition durations collapse to ~0 under `prefers-reduced-motion`; the marquee stops.

---

## 7. Imagery

| File | Where |
|---|---|
| `public/images/me/portfolio.png` | Hero image (transparent background; original `portfolio.jpeg` kept) |
| `public/images/me/journey-portrait.png` | Round portrait, full photo |
| `public/images/me/portrait-cutout.png`, `portrait.png` | Cut-out portraits |
| `public/images/projects/` | Project screenshots |
| `public/cv/stephen-machera-cv.pdf` | CV |

---

## 8. Accessibility

- Skip-to-content link (amber, appears on focus).
- Headings keep full text for screen readers (animated words are `aria-hidden`, with an `aria-label` on the heading).
- Decorative elements are `aria-hidden`.
- Tap targets ≥ 44px; visible focus rings on form options.
- `color-scheme: light`, `themeColor: #ffffff`.

---

## 9. Reference

The visual direction follows the green / amber / white product-designer template used as reference (floating green nav pill, amber ticker bands, green "About" and "FAQ" sections, "Let's *Connect* there" footer). Content is Stephen's own; only the theme and structure are borrowed.
