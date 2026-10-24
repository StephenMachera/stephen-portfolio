// Your tech stack — each group becomes one foldable "folder" card on the Home page.
export type StackGroup = {
  id: string;
  title: string;
  blurb: string;
  items: string[];
};

export const stack: StackGroup[] = [
  {
    id: "fullstack",
    title: "Full-stack development",
    blurb: "APIs, web apps and the databases behind them.",
    items: ["FastAPI", "Django", "Node.js", "Next.js", "React", "TypeScript", "Python", "PostgreSQL"],
  },
  {
    id: "ml",
    title: "Machine learning & research",
    blurb: "Models that run in the real world, not just in notebooks.",
    items: ["PyTorch", "TensorFlow Lite", "scikit-learn", "NumPy", "Pandas", "Research"],
  },
  {
    id: "vision",
    title: "Computer vision",
    blurb: "Teaching software to see — from gestures to farm cameras.",
    items: ["OpenCV", "MediaPipe", "YOLO", "Image classification", "Gesture control"],
  },
  {
    id: "devops",
    title: "DevOps",
    blurb: "Shipping reliably: build, containerise, deploy, repeat.",
    items: ["CI/CD", "Docker", "Kubernetes", "Terraform", "Linux", "GitHub Actions"],
  },
];
