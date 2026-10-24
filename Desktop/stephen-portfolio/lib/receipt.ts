import { createHmac, timingSafeEqual } from "node:crypto";

// A "read receipt" link is a signed token, so nobody can forge one.
// The token carries who to notify — no database needed.
export type ReceiptData = { n: string; e: string; t: string };

function secret() {
  return process.env.RECEIPT_SECRET ?? process.env.RESEND_API_KEY ?? "";
}

function sign(payload: string) {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

export function makeReceiptToken(data: ReceiptData) {
  const payload = Buffer.from(JSON.stringify(data)).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function readReceiptToken(token: string): ReceiptData | null {
  const [payload, sig] = token.split(".");
  if (!payload || !sig || !secret()) return null;

  const expected = sign(payload);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString());
    if (typeof data.n === "string" && typeof data.e === "string" && typeof data.t === "string") {
      return data as ReceiptData;
    }
  } catch {}
  return null;
}
