import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

const SMTP_HOST = process.env.SMTP_HOST ?? "smtp.gmail.com";
const SMTP_PORT = Number(process.env.SMTP_PORT ?? 465);
const SMTP_USER = process.env.SMTP_USER ?? "";
const SMTP_PASS = process.env.SMTP_PASS ?? "";
const CONTACT_TO = process.env.CONTACT_TO ?? "support@karharimedia.com";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  if (!SMTP_USER || !SMTP_PASS) {
    console.error("[api/contact] SMTP_USER / SMTP_PASS are not configured");
    return NextResponse.json(
      { error: "Email service is not configured on the server." },
      { status: 500 }
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { subject, body, replyTo, fromName, website } = (payload ?? {}) as Record<
    string,
    unknown
  >;

  // Honeypot: bots that fill a hidden field are silently dropped.
  if (typeof website === "string" && website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  if (typeof subject !== "string" || subject.trim().length === 0 || subject.length > 200) {
    return NextResponse.json(
      { error: "A valid subject is required (max 200 characters)." },
      { status: 400 }
    );
  }
  if (typeof body !== "string" || body.trim().length === 0 || body.length > 60000) {
    return NextResponse.json(
      { error: "A valid message body is required (max 60,000 characters)." },
      { status: 400 }
    );
  }
  if (typeof replyTo !== "string" || !EMAIL_RE.test(replyTo) || replyTo.length > 320) {
    return NextResponse.json(
      { error: "A valid reply-to email address is required." },
      { status: 400 }
    );
  }
  if (typeof fromName !== "string" || fromName.length > 200) {
    return NextResponse.json(
      { error: "Invalid sender name." },
      { status: 400 }
    );
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    await transporter.sendMail({
      from: `"Karhari Media Website" <${SMTP_USER}>`,
      to: CONTACT_TO,
      subject: subject.trim(),
      text: body,
      replyTo: fromName.trim()
        ? `"${fromName.trim().replace(/"/g, "")}" <${replyTo}>`
        : replyTo,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/contact] sendMail failed:", err);
    return NextResponse.json(
      { error: "Email could not be sent. Please try again or email us directly at support@karharimedia.com." },
      { status: 500 }
    );
  }
}
