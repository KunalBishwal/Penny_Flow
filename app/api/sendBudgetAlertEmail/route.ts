import { NextResponse } from "next/server";
import nodemailer from "nodemailer";


const transporter = nodemailer.createTransport(
    {
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      secure: false, 
      auth: {
        user: '14616f6211aaa9',
        pass: '11c0c2ccd09121',
      },
      logger: true,  
      debug: true,   
    }
  );
  

export async function POST(request: Request) {
  const { to, budget, currency } = await request.json();
  console.log("📧 Sending budget alert email to:", to);

  if (!to) {
    return NextResponse.json({ error: "Recipient email is missing" }, { status: 400 });
  }

  try {
    const mailOptions = {
      from: '"PennyFlow" <noreply@pennyflow.com>',
      to,
      subject: "💸 Budget Alert - You’ve Exceeded Your Monthly Limit!",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2 style="color: #e63946;">🚨 Budget Alert!</h2>
          <p>Hi there,</p>
          <p>Just a heads-up! You've exceeded your monthly budget of <strong>${currency} ${budget}</strong>. Time to pump the brakes on those expenses!</p>
          <p>Stay money-smart! 💸</p>
          <hr />
          <small>This is an automated message from PennyFlow. Do not reply.</small>
        </div>
      `,
    };
    console.log("📧 Sending email with options:", mailOptions);

    const result = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", result.messageId);
    return NextResponse.json({ messageId: result.messageId });
  } catch (error: any) {
    console.error("❌ Error sending email:", error?.message || error);
    return NextResponse.json({ error: error.message || "Failed to send email" }, { status: 500 });
  }
}
