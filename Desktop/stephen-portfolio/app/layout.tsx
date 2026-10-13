import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, IBM_Plex_Mono } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Providers from "@/components/motion/Providers";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Stephen Machera — Full-stack developer",
    template: "%s — Stephen Machera",
  },
  description:
    "I build real products that solve real problems — from restaurant systems to AI for poultry farms in Kenya.",
  openGraph: {
    type: "website",
    siteName: "Stephen Machera",
  },
};

export const viewport: Viewport = {
  themeColor: "#0c0e12",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${bricolage.variable} ${plexMono.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <Providers>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-accent focus:px-5 focus:py-3 focus:font-bold focus:text-ink"
          >
            Skip to content
          </a>

          <Header />

          {/* the "curtain" — lifts away to reveal the footer */}
          <div className="relative z-10 flex flex-1 flex-col rounded-b-[2rem] border-b border-line bg-ink lg:rounded-b-[2.5rem]">
            <main id="main" className="flex-1">
              {children}
            </main>
          </div>

          <Footer />
        </Providers>
      </body>
    </html>
  );
}