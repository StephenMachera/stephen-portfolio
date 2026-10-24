import { Body, Container, Head, Hr, Html, Preview, Section, Text } from "@react-email/components";

export type ClientEmailProps = {
  kind: "received" | "read";
  name: string;
  topic: string;
  replyTime: string;
};

const c = {
  forest: "#2d4f34",
  forestDeep: "#1f3a27",
  accent: "#ffab00",
  fg: "#16241b",
  soft: "#46524a",
  line: "#e3e8e4",
  surface: "#f4f5f2",
};
const font = "'Plus Jakarta Sans', -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif";

const copy = {
  received: {
    badge: "RECEIVED",
    title: (first: string) => `Thanks ${first}, your message landed.`,
    body: (topic: string, reply: string) =>
      `This is an automatic note to confirm your message about “${topic}” reached my inbox safely. ${reply}`,
    preview: "Your message reached Stephen's inbox.",
  },
  read: {
    badge: "READ",
    title: (first: string) => `${first}, I've just read your message.`,
    body: (topic: string) =>
      `I opened your message about “${topic}”. I'll reply to you personally very soon — no need to send it again.`,
    preview: "Stephen has read your message.",
  },
} as const;

export default function ClientEmail({ kind, name, topic, replyTime }: ClientEmailProps) {
  const first = name.split(" ")[0];
  const t = copy[kind];

  return (
    <Html lang="en">
      <Head />
      <Preview>{t.preview}</Preview>
      <Body style={{ margin: 0, backgroundColor: c.surface, fontFamily: font, color: c.fg }}>
        <Container style={{ maxWidth: "560px", margin: "0 auto", padding: "32px 16px" }}>
          <Section style={{ backgroundColor: c.forest, borderRadius: "20px 20px 0 0", padding: "20px 28px" }}>
            <Text style={{ margin: 0, color: "#ffffff", fontWeight: 700, fontSize: "16px" }}>
              Stephen Machera
              <span
                style={{
                  marginLeft: "12px",
                  padding: "4px 10px",
                  borderRadius: "999px",
                  backgroundColor: c.accent,
                  color: c.forestDeep,
                  fontSize: "11px",
                  letterSpacing: "0.08em",
                }}
              >
                {t.badge}
              </span>
            </Text>
          </Section>

          <Section
            style={{
              backgroundColor: "#ffffff",
              border: `1px solid ${c.line}`,
              borderTop: "none",
              borderRadius: "0 0 20px 20px",
              padding: "32px 28px",
            }}
          >
            <Text style={{ margin: 0, fontSize: "26px", lineHeight: "1.2", fontWeight: 800, letterSpacing: "-0.02em" }}>
              {t.title(first)}
            </Text>
            <Text style={{ margin: "16px 0 0", fontSize: "16px", lineHeight: "1.7", color: c.soft }}>
              {kind === "received" ? copy.received.body(topic, replyTime) : copy.read.body(topic)}
            </Text>
            <Hr style={{ borderColor: c.line, margin: "28px 0 16px" }} />
            <Text style={{ margin: 0, fontSize: "13px", color: c.soft }}>
              — Stephen, Full-stack developer · Kenya
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
