import { Resend } from "resend";
import { createHash } from "node:crypto";
import { readReceiptToken } from "@/lib/receipt";
import ClientEmail from "@/emails/ClientEmail";
import { site } from "@/lib/site";

// A tiny 1×1 transparent GIF — this is the "tracking pixel" inside the email sent to YOU.
// When your mail app loads it (you opened the email), the visitor gets a "read" note.
const PIXEL = Buffer.from("R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", "base64");

export const dynamic = "force-dynamic";

export async function GET(_req: Request, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const data = readReceiptToken(token);
  const apiKey = process.env.RESEND_API_KEY;

  if (data && apiKey) {
    try {
      const resend = new Resend(apiKey);
      await resend.emails.send(
        {
          from: process.env.CONTACT_FROM_EMAIL ?? "Stephen Machera <onboarding@resend.dev>",
          to: data.e,
          replyTo: process.env.CONTACT_TO_EMAIL,
          subject: "Stephen has read your message",
          react: ClientEmail({ kind: "read", name: data.n, topic: data.t, replyTime: site.replyTime }),
        },
        // opening the email twice must not send two receipts (the key is honoured for 24h)
        { idempotencyKey: `read-${createHash("sha256").update(token).digest("hex").slice(0, 40)}` },
      );
    } catch (err) {
      console.error("Read receipt failed:", err);
    }
  }

  return new Response(PIXEL, {
    headers: {
      "Content-Type": "image/gif",
      "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
    },
  });
}
