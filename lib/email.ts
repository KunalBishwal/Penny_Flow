//lib\email.ts
import emailjs from "@emailjs/browser";

export const sendBudgetAlertEmail = async (email: string, budget: number, currency: string) => {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

  console.log("📤 Sending Email with config:", { serviceId, templateId, publicKey });
  console.log("📩 To:", email, "Budget:", budget, "Currency:", currency);

  try {
    const result = await emailjs.send(
      serviceId,
      templateId,
      {
        to_email: email,
        budget,
        currency,
      },
      publicKey
    );
    console.log("✅ EmailJS Response:", result);
    return result;
  } catch (error: any) {
    console.error("❌ EmailJS Error:", error?.text || error?.message || error || "Unknown error");
    throw error;
  }
};
