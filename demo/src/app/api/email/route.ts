import { NextRequest } from "next/server";
import nodemailer from "nodemailer";

const senderEmail = process.env.EMAIL;
const senderPassword = process.env.EMAIL_PASSWORD;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: senderEmail,
    pass: senderPassword,
  },
});

export async function POST(req: NextRequest) {
  const { receiverEmail, subject, text } = await req.json();

  await transporter.sendMail({
    from: senderEmail,
    to: receiverEmail,
    subject: subject,
    text: text,
  });
  return new Response("Email sent!");
}
