export const topics = [
  { id: "hiring", label: "Hiring" },
  { id: "project", label: "A project" },
  { id: "partnership", label: "Partnership" },
  { id: "hello", label: "Just saying hello" },
] as const;

export type TopicId = (typeof topics)[number]["id"];

export function isTopic(value: unknown): value is TopicId {
  return topics.some((t) => t.id === value);
}

export function topicLabel(id: TopicId) {
  return topics.find((t) => t.id === id)?.label ?? "";
}

// shown only for "A project" — change these to suit you
export const budgets = ["Under $50","$50 – $500", "$500 – $2,000", "$2,000 – $5,000", "$5,000+","Lets negotiate", "Not sure yet"];
export const timelines = ["As soon as possible", "Within 1–3 months", "3+ months", "Flexible"];

// how the email headline reads for each topic: "Jane Wanjiku has a project for you."
export function topicPhrase(id: TopicId) {
  const phrases: Record<TopicId, string> = {
    hiring: "is hiring",
    project: "has a project for you",
    partnership: "wants to partner with you",
    hello: "says hello",
  };
  return phrases[id];
}