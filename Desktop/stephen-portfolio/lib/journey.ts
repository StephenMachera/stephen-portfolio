export type Moment = {
  title: string;
  text: string;
  story?: string; // slug of the story in content/stories
};

export const journeyIntro = {
  label: "My Journey",
  headline:
    "Grace opened the doors. Hard work kept me going. Now I build to open doors for others.",
  accent: ["Grace"],
  body: "I come from a humble background, and every door in my education was opened by someone else. By God's grace, and by people who believed in me. Now I build so I can open doors for others.",
  photo: "/images/me/journey-portrait.png",
  tag: "Embu, Kenya · BSc CS 2027",
};

export const beginnings: Moment[] = [
  {
    title: "Growing up fast",
    text: "When my mother fell very sick, life pushed me to start hustling while I was still a child, doing whatever work I could find to help at home.",
    story: "growing-up-fast",
  },
  {
    title: "Losing my best sister",
    text: "Then I lost my sister, my best friend. It taught me early how much people matter, and how quickly they can be gone.",
    story: "she-called-my-name",
  },
  {
    title: "One teacher saw me",
    text: "I was lost, on a path that could have ended badly. Then Madam Elizabeth noticed me and refused to give up on me. By the end of primary school, I was one of the best students in my school.",
    story: "the-teacher-who-saw-me",
  },
  {
    title: "A scholarship and a question",
    text: "A Safaricom scholarship carried me through all of high school, and I finished among the best again. But honestly, I didn't know where I was going. My family hoped I'd become a teacher. It felt like the fastest way to change our story.",
  },
];

export const bridge = "Then came campus, and a “no” that changed everything.";

export const turningPoints: Moment[] = [
  {
    title: "A “no” that changed everything",
    text: "I applied to study Agricultural Education, and I was turned away. I had failed English and never studied agriculture in high school. My first year, I didn't know where I belonged.",
  },
  {
    title: "“Steve, you can do this”",
    text: "Then Madam Rachael looked at me and said those words. She pointed me to Computer Science, and later her brother walked with me too. That's how I became a developer.",
    story: "steve-you-can-do-this",
  },
  {
    title: "Working my way through",
    text: "Campus wasn't easy. I worked as a waiter, a chef, a dancer and on construction sites, whatever it took to stay in school.",
  },
  {
    title: "Two children, one purpose",
    text: "In my third year, I took in my late sister's two children. Caring for them changed how I see my work. I stopped just learning, and started asking how I could solve real problems and open doors for others.",
    story: "two-children-one-purpose",
  },
  {
    title: "Losing my flock",
    text: "I lost most of my chickens to a disease that had a cure. Nobody noticed in time. That pain became Jicho, an AI that watches the flock so farmers don't lose everything like I did.",
    story: "the-day-i-lost-my-flock",
  },
];

export const education = [
  {
    years: "2023 – 2027",
    school: "University of Embu",
    detail: "Bachelor of Science in Computer Science · Fourth year",
    note: "Research focus: Machine Learning",
  },
  {
    years: "2019 – 2023",
    school: "Matare Boys High School",
    detail: "Finished among the top students",
  },
  {
    years: "2009 – 2018",
    school: "Igena Primary School",
    detail: "Finished among the top students",
  },
];

export const courses = [
  "Full-Stack Web Development · Udemy",
  "AI Essentials · ALX",
  "DevOps",
  "RAG Bootcamp",
];

export const experience = [
  {
    role: "Career Peer Advisor",
    org: "University of Embu",
    dates: "Sep 2026 – now",
    current: true,
    points: [
      "Part of the university's career program, serving a student community of 10,000+.",
      "Help fellow students find opportunities, build job-ready skills and make career decisions, working with Career Services.",
    ],
  },
  {
    role: "Industrial Attachment",
    org: "University of Embu",
    dates: "May – Aug 2026",
    points: [
      "Built VunaSoko, a platform that connects farmers, buyers, startups and aggregators so produce can reach the market more easily.",
      "Solved technical problems alongside 10+ staff and the IT team.",
    ],
  },
  {
    role: "Freelance Full-Stack Developer",
    dates: "2026 – now",
    current: true,
    points: [
      "Built a management system for Sweet1NE, a restaurant and bar with several branches.",
      "Building Jicho, AI that spots sick chickens early.",
    ],
  },
  {
    role: "Web Development Lead",
    org: "GDSC, University of Embu",
    dates: "Oct 2024 – Apr 2025",
    points: [
      "Led coding workshops for 50+ students on frontend, backend and GitHub teamwork.",
      "Guided 5+ student teams through building real projects.",
    ],
  },
  {
    role: "CIT Department Leader",
    org: "Foster Tech Kuria",
    dates: "Apr – Aug 2024 · Volunteer",
    points: [
      "Ran 20+ digital skills workshops for students and young people.",
      "Led a team of 10 volunteers and grew attendance by 40%.",
    ],
  },
];

export type BeyondIcon = "nature" | "people" | "hope" | "music" | "kitchen";

export const beyond: {
  icon: BeyondIcon;
  title: string;
  text: string;
  story?: string;
  link?: { href: string; label: string };
  wide?: boolean;
}[] = [
  {
    icon: "nature",
    title: "Out in nature",
    text: "Forest walks and exploring places I've never been. It's where I think clearly.",
  },
  {
    icon: "people",
    title: "Bringing people together",
    text: "I love team-building activities. Watching a group become a team never gets old.",
  },
  {
    icon: "hope",
    title: "Sharing hope",
    text: "I preach to young people, especially those starting where I started. If my story can open a door for one of them, it's worth telling.",
  },
  {
    icon: "music",
    title: "Music",
    text: "Always playing in the background, while I code, walk and think.",
  },
  {
    icon: "kitchen",
    title: "Lessons from the kitchen",
    text: "Working as a chef and a waiter taught me patience with difficult customers, how to read people's emotions, and how to stay calm when every table needs something at once. It also showed me how a hotel really runs. The problems I saw there became Sweet1NE and QuickDine.",
    story: "lessons-from-the-kitchen",
    link: { href: "/projects", label: "See the projects" },
    wide: true,
  },
];

export const beliefs = [
  {
    title: "I can't change the past, but I can control my future.",
    text: "I didn't choose where I started. I do choose what I build from here, every single day.",
  },
  {
    title: "I refuse to let poverty win.",
    text: "I've lived it, and I know what it steals from people. That's why I build things that help others earn, grow and keep what they have.",
  },
  {
    title: "Prosperity is my portion.",
    text: "I believe God has good things ahead for me, and that what I receive is meant to be shared.",
  },
];

export const whatsNext = {
  goals: [
    {
      label: "Next",
      title: "Go deeper into Machine Learning",
      text: "After I graduate in 2027, I want to keep studying, with advanced training and research in ML, so I can build things that truly understand the world.",
    },
    {
      label: "The dream",
      title: "Build a robotics company in Africa",
      text: "Robots and smart machines made in Africa, for Africa: tools that help farmers, workers and families do more with less.",
    },
  ],
  invite:
    "I'm looking for people to walk this road with: research mentors, study opportunities, partners and teams building the future here. Grace opened my doors, and maybe we can open the next one together.",
};