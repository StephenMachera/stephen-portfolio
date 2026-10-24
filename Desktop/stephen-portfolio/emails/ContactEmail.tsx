import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

export type ContactEmailProps = {
  name: string;
  email: string;
  topic: string;       // "A project"
  topicPhrase: string; // "has a project for you"
  message: string;
  details: { label: string; value: string }[]; // company, role, budget, timeline…
  receivedAt: string;  // e.g. "Sun, 4 Oct 2026 · 04:18"
  siteUrl?: string;
  receiptUrl?: string; // 1×1 pixel: loads when you open this email → the visitor is told you read it
};

// Your site's colours — emails need plain values, not CSS variables
const c = {
  ink: "#0c0e12",
  inkDeep: "#07080a",
  surface: "#14171d",
  line: "#262a32",
  fg: "#ece9e2",
  soft: "#c9c6be",
  muted: "#a3a29c",
  faint: "#7d7c77",
  accent: "#ffce47",
};

const font = "'Bricolage Grotesque', -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif";
const mono = "'IBM Plex Mono', 'SFMono-Regular', Menlo, Consolas, monospace";

const label = {
  margin: 0,
  fontFamily: mono,
  fontSize: "11px",
  letterSpacing: "0.12em",
  textTransform: "uppercase" as const,
  color: c.faint,
};

export default function ContactEmail({
  name,
  email,
  topic,
  topicPhrase,
  message,
  details,
  receivedAt,
  siteUrl = "https://example.com",
  receiptUrl,
}: ContactEmailProps) {
  const first = name.split(" ")[0];
  const rows = [
    { label: "From", value: name },
    { label: "Email", value: email, href: `mailto:${email}` },
    { label: "Topic", value: topic },
    ...details,
  ];

  return (
    <Html lang="en">
      <Head />

      {/* the grey line next to the subject in your inbox */}
      <Preview>{`${name} · ${topic} — ${message.slice(0, 90)}`}</Preview>

      <Body style={{ margin: 0, backgroundColor: c.inkDeep, fontFamily: font, color: c.fg }}>
        <Container style={{ maxWidth: "600px", margin: "0 auto", padding: "40px 20px" }}>
          {/* top bar: moon + name · NEW MESSAGE */}
          <Section>
            <table width="100%" cellPadding={0} cellSpacing={0} role="presentation">
              <tbody>
                <tr>
                  <td style={{ verticalAlign: "middle" }}>
                    <table cellPadding={0} cellSpacing={0} role="presentation">
                      <tbody>
                        <tr>
                          <td
                            style={{
                              width: "22px",
                              height: "22px",
                              borderRadius: "50%",
                              backgroundColor: c.accent,
                              boxShadow: `inset -6px -2px 0 0 ${c.inkDeep}`,
                            }}
                          />
                          <td style={{ paddingLeft: "10px", fontWeight: 700, fontSize: "15px", color: c.fg }}>
                            Stephen Machera
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                  <td align="right" style={{ verticalAlign: "middle" }}>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "6px 12px",
                        borderRadius: "999px",
                        border: `1px solid ${c.accent}`,
                        fontFamily: mono,
                        fontSize: "11px",
                        letterSpacing: "0.08em",
                        color: c.accent,
                      }}
                    >
                      NEW MESSAGE
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </Section>

          {/* main card */}
          <Section
            style={{
              marginTop: "28px",
              backgroundColor: c.ink,
              border: `1px solid ${c.line}`,
              borderRadius: "20px",
              padding: "36px 32px",
            }}
          >
            <Text style={label}>Received {receivedAt} · Nairobi</Text>
            <Text
              style={{
                margin: "14px 0 0",
                fontSize: "30px",
                lineHeight: "1.15",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                color: c.fg,
              }}
            >
              {name} <span style={{ color: c.accent }}>{topicPhrase}</span>.
            </Text>

            {/* details */}
            <table
              width="100%"
              cellPadding={0}
              cellSpacing={0}
              role="presentation"
              style={{ marginTop: "28px", borderTop: `1px solid ${c.line}` }}
            >
              <tbody>
                {rows.map((row) => (
                  <tr key={row.label}>
                    <td
                      style={{
                        ...label,
                        width: "110px",
                        padding: "14px 0",
                        borderBottom: `1px solid ${c.line}`,
                        verticalAlign: "top",
                      }}
                    >
                      {row.label}
                    </td>
                    <td
                      style={{
                        padding: "14px 0",
                        borderBottom: `1px solid ${c.line}`,
                        fontSize: "15px",
                        color: c.fg,
                      }}
                    >
                      {"href" in row && row.href ? (
                        <Link href={row.href} style={{ color: c.accent, textDecoration: "none" }}>
                          {row.value}
                        </Link>
                      ) : (
                        row.value
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* their message */}
            <Section
              style={{
                marginTop: "28px",
                backgroundColor: c.surface,
                borderRadius: "16px",
                padding: "24px 24px 20px",
              }}
            >
              <Text style={{ margin: 0, fontSize: "44px", lineHeight: "0.6", fontWeight: 800, color: c.accent }}>
                &ldquo;
              </Text>
              <Text
                style={{
                  margin: "16px 0 0",
                  fontSize: "16px",
                  lineHeight: "1.7",
                  color: c.soft,
                  whiteSpace: "pre-wrap",
                }}
              >
                {message}
              </Text>
            </Section>

            {/* reply button */}
            <Section style={{ marginTop: "28px" }}>
              <Button
                href={`mailto:${email}?subject=${encodeURIComponent(`Re: ${topic}`)}`}
                style={{
                  backgroundColor: c.accent,
                  color: c.ink,
                  fontWeight: 800,
                  fontSize: "15px",
                  padding: "14px 26px",
                  borderRadius: "999px",
                  textDecoration: "none",
                }}
              >
                Reply to {first} →
              </Button>
            </Section>
          </Section>

          {/* footer */}
          <Hr style={{ borderColor: c.line, margin: "32px 0 20px" }} />
          <Text style={{ margin: 0, fontSize: "13px", lineHeight: "1.6", color: c.muted }}>
            Sent from the contact form on your portfolio. Pressing{" "}
            <span style={{ color: c.fg }}>Reply</span> in your inbox answers {first} directly.
          </Text>
          <Text style={{ margin: "8px 0 0", fontSize: "13px" }}>
            <Link href={siteUrl} style={{ color: c.accent, textDecoration: "none" }}>
              Open portfolio ↗
            </Link>
          </Text>
          {receiptUrl && <Img src={receiptUrl} width="1" height="1" alt="" style={{ display: "block" }} />}
        </Container>
      </Body>
    </Html>
  );
}