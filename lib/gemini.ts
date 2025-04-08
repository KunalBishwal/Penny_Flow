export async function extractExpenseDataFromGemini(ocrText: string) {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Gemini API key is missing. Check your .env.local file.");
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  const prompt = `
You are an intelligent expense parser. Extract the following from messy receipt text:
- vendor
- amount (number only, no symbols)
- date (ISO format preferred)
- category (Food, Transport, Shopping, Utilities, Entertainment, Other)

Receipt text:
"""
${ocrText}
"""

Respond ONLY with JSON like:
{
  "vendor": "...",
  "amount": "...",
  "date": "...",
  "category": "..."
}
`;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }),
    });
    const result = await response.json();
    console.log("🔍 Gemini full response:", JSON.stringify(result, null, 2));

    if (result.error) {
      console.error("🔥 Gemini API Error:", result.error);
      throw new Error(result.error.message || "Unknown Gemini API error");
    }

    const candidate = result?.candidates?.[0];
    if (!candidate) {
      console.error("❌ No candidates. Full response:", JSON.stringify(result, null, 2));
      throw new Error("No candidate found in Gemini response");
    }

    const text = candidate?.content?.parts?.[0]?.text;
    if (!text) {
      console.error("⚠️ Candidate text missing. Candidate object:", candidate);
      throw new Error("Gemini returned empty candidate text");
    }

    // Remove any leading/trailing triple backticks and language tags
    const cleanedText = text.replace(/```[a-z]*\n/, "").replace(/```$/, "").trim();
    console.log("🔍 Cleaned Gemini candidate text:", cleanedText);

    try {
      const json = JSON.parse(cleanedText);
      console.log("✅ Parsed Gemini response JSON:", json);
      return json;
    } catch (parseError) {
      console.error("🧨 JSON parsing error:", parseError, "Raw cleaned text received:", cleanedText);
      throw new Error("Failed to parse Gemini candidate text as JSON");
    }
  } catch (err) {
    console.error("❌ Error in extractExpenseDataFromGemini:", err);
    throw err;
  }
}
