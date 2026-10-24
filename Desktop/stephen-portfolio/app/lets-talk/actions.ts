"use server";

import { Resend } from "resend";
import { isTopic, topicLabel, topicPhrase, type TopicId } from "@/lib/contact";
import ContactEmail from "@/emails/ContactEmail";
import ClientEmail from "@/emails/ClientEmail";
import { makeReceiptToken } from "@/lib/receipt";
import { site } from "@/lib/site";

type FieldErrors = Partial<Record<"name" | "email" | "message", string>>;

export type FormState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message?: string; errors?: FieldErrors };

export async function sendMessage(_prev: FormState, formData: FormData): Promise<FormState> {
  const get = (key: string) => String(formData.get(key) ?? "").trim();

  // spam trap: real people never see or fill this field
  if (get("website")) return { status: "success" };

  const name = get("name");
  const email = get("email");
  const message = get("message");
  const rawTopic = get("topic");
  const topic: TopicId = isTopic(rawTopic) ? rawTopic : "hello";

  // 1. check the fields
  const errors: FieldErrors = {};
  if (!name) errors.name = "Please tell me your name.";
  else if (name.length > 100) errors.name = "That name is a bit long.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Please enter a valid email address.";
  if (message.length < 10) errors.message = "A little more detail, please (at least 10 characters).";
  else if (message.length > 5000) errors.message = "Please keep it under 5,000 characters.";
  if (Object.keys(errors).length > 0) return { status: "error", errors };

  // 2. make sure email sending is set up
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    return {
      status: "error",
      message: "The form isn't connected yet. Please email or WhatsApp me directly for now.",
    };
  }

  // 3. gather the optional details that were filled in
  const details = [
    { label: "Company", value: get("company") },
    { label: "Role", value: get("role") },
    { label: "Budget", value: get("budget") },
    { label: "Timeline", value: get("timeline") },
  ].filter((d) => d.value);

  const receivedAt = new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Africa/Nairobi",
  })
    .format(new Date())
    .replace(/,(?=[^,]*$)/, " ·"); // "Sun, 4 Oct 2026 · 04:18"

  // plain-text version, for email apps that don't show designs
  const text = [
    `From: ${name} <${email}>`,
    `Topic: ${topicLabel(topic)}`,
    ...details.map((d) => `${d.label}: ${d.value}`),
    "",
    message,
  ].join("\n");

  // the read-receipt link: loads only when YOU open the email
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/$/, "");
  const receiptUrl = siteUrl
    ? `${siteUrl}/api/receipt/${makeReceiptToken({ n: name, e: email, t: topicLabel(topic) })}`
    : undefined;

  // 4. send
  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
      to,
      replyTo: email, // pressing Reply answers the visitor directly
      subject: `New message · ${topicLabel(topic)} · ${name}`,
      react: ContactEmail({
        name,
        email,
        topic: topicLabel(topic),
        topicPhrase: topicPhrase(topic),
        message,
        details,
        receivedAt,
        siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
        receiptUrl,
      }),
      text,
    });
    if (error) throw error;

    // 5. tell the visitor it arrived — if this fails, the message still went through
    try {
      const { error: confirmError } = await resend.emails.send({
        from: process.env.CONTACT_FROM_EMAIL ?? "Stephen Machera <onboarding@resend.dev>",
        to: email,
        replyTo: to,
        subject: "Got your message — Stephen Machera",
        react: ClientEmail({ kind: "received", name, topic: topicLabel(topic), replyTime: site.replyTime }),
      });
      if (confirmError) throw confirmError;
    } catch (confirmErr) {
      console.error("Confirmation email failed:", confirmErr);
    }

    return { status: "success" };
  } catch (err) {
    console.error("Contact form failed:", err);
    return {
      status: "error",
      message: "Something went wrong sending your message. Please try again, or reach me on WhatsApp.",
    };
  }
}