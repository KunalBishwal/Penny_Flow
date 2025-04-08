// /api/sendBudgetAlertEmail.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  secure: false,
  auth: {
    user: "14616f6211aaa9",
    pass: "11c0c2ccd09121",
  },
  logger: true,
  debug: true,
});

export async function POST(request: Request) {
  // Now we destructure "message" along with the other parameters
  const { to, budget, currency, message } = await request.json();
  console.log("📧 Sending budget alert email to:", to);

  if (!to) {
    return NextResponse.json(
      { error: "Recipient email is missing" },
      { status: 400 }
    );
  }

  // Determine subject and HTML content based on the provided message
  let subject = "";
  let htmlContent = "";

  if (message.includes("50%") || message.includes("50")) {
    subject = "⚠️ Budget Alert - 50% of Budget Used";
    htmlContent = `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #e63946;">🚨 50% Budget Alert!</h2>
        <p>Hi there,</p>
        <p>${message}</p>
        <hr />
        <small>This is an automated message from PennyFlow. Do not reply.</small>
      </div>
    `;
  } else {
    subject = "💸 Budget Alert - You’ve Exceeded Your Monthly Limit!";
    htmlContent = `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #e63946;">🚨 Budget Alert!</h2>
        <p>Hi there,</p>
        <p>${message}</p>
        <hr />
        <small>This is an automated message from PennyFlow. Do not reply.</small>
      </div>
    `;
  }

  try {
    const mailOptions = {
      from: '"PennyFlow" <noreply@pennyflow.com>',
      to,
      subject,
      html: htmlContent,
    };
    console.log("📧 Sending email with options:", mailOptions);

    const result = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", result.messageId);
    return NextResponse.json({ messageId: result.messageId });
  } catch (error: any) {
    console.error("❌ Error sending email:", error?.message || error);
    return NextResponse.json(
      { error: error.message || "Failed to send email" },
      { status: 500 }
    );
  }
}
