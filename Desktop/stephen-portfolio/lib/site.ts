// Your personal details — change them here and the whole site updates.
export const site = {
  name: "Stephen Machera",
  role: "Full-stack developer",
  location: "Kenya",
  city: "Nairobi",
  timeZone: "Africa/Nairobi",
  email: "stephennyansoho@gmail.com",
  whatsapp: "+254711629594",
    // short version — top of the Home page
  heroIntro:
    "I'm driven by a belief in limitless possibility and the power of togetherness to create meaningful change — a fourth-year Computer Science student at the University of Embu, exploring Machine Learning research.",

   // "Who I am" — first sentence, shown big with the light-up effect
  introLead:
    "Driven by a belief in limitless possibility and the power of togetherness to create meaningful change.",

  // "Who I am" — the rest, shown at normal reading size
  introBody:
    "A fourth-year Computer Science student at the University of Embu, exploring deep research in Machine Learning with a curious, analytical, and people-centered mindset. Brings ideas, initiative, and collaboration together to turn possibilities into meaningful solutions and contribute to a better future.",

  // the line that keeps changing under your name — "I build …"
  buildPhrases: [
    "restaurant systems.",
    "AI for poultry farmers.",
    "gesture-controlled tools.",
    "hotel management platforms.",
  ],

    // quick facts — "Who I am" section
  facts: [
    { label: "Studying", value: "Computer Science, University of Embu" },
    { label: "Year", value: "Fourth year" },
    { label: "Research", value: "Machine Learning" },
    { label: "Currently building", value: "Jicho" },
  ],

  // words that light up in yellow in the "Who I am" paragraph
  introHighlights: ["limitless", "possibility", "togetherness", "change"],

  cvUrl: "/cv/stephen-machera-cv.pdf",
  replyTime: "I typically respond within 24 hours.",
};

export type Social = {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "dribbble" | "discord";
};

export const socials: Social[] = [
  { label: "GitHub", href: "https://github.com/StephenMachera", icon: "github" },            
  { label: "LinkedIn", href: "https://www.linkedin.com/in/stephen-nyansoho", icon: "linkedin" },
  { label: "Dribbble", href: "https://dribbble.com/stephen-machera", icon: "dribbble" },      
  { label: "Discord", href: "https://discord.com/users/stephen-machera", icon: "discord" },  
];

