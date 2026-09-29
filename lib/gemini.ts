import { GoogleGenAI } from "@google/genai";
import { AI } from "@/config/app.config";
import { ROAST_SYSTEM_INSTRUCTION, buildUserPrompt } from "@/lib/prompt";
import { roastResponseSchema } from "@/lib/schema";
import { RoastRequest, RoastResult } from "@/types/roast";

function friendlyErrorMessage(status: number | undefined, message: string): string {
  if (status === 400) {
    return "Invalid request format or input invalid for Gemini model.";
  }
  if (status === 403) {
    return "Invalid or unauthorized GEMINI_API_KEY. Please check your .env.local file.";
  }
  if (status === 404) {
    return `Model ${AI.model} not found. Check AI.model configuration in app.config.ts.`;
  }
  if (status === 429) {
    return "Gemini API rate limit exceeded. Please wait a moment and try again.";
  }
  if (status === 503) {
    return "Gemini service is temporarily overloaded (503). Please retry in a few seconds.";
  }
  return message || "An error occurred while calling the Gemini API.";
}

export async function analyzeCode(request: RoastRequest): Promise<RoastResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.trim() === "") {
    throw new Error(
      "GEMINI_API_KEY is missing. Copy .env.example to .env.local, add your key, and restart the server."
    );
  }

  const ai = new GoogleGenAI({ apiKey });

  let attempt = 0;
  let lastError: unknown;

  while (attempt < AI.maxAttempts) {
    attempt++;
    try {
      const response = await ai.models.generateContent({
        model: AI.model,
        contents: buildUserPrompt(request),
        config: {
          systemInstruction: ROAST_SYSTEM_INSTRUCTION,
          responseMimeType: "application/json",
          responseSchema: roastResponseSchema,
        },
      });

      const responseText = response.text;
      if (!responseText || responseText.trim() === "") {
        throw new Error("Received an empty response from Gemini.");
      }

      const result = JSON.parse(responseText);

      return {
        roast: typeof result.roast === "string" ? result.roast : "",
        issues: Array.isArray(result.issues) ? result.issues : [],
        correctedCode: typeof result.correctedCode === "string" ? result.correctedCode : "",
        takeaway: typeof result.takeaway === "string" ? result.takeaway : "",
      };
    } catch (err: any) {
      lastError = err;
      const status = err?.status || err?.statusCode;

      if (status === 503 && attempt < AI.maxAttempts) {
        await new Promise((res) => setTimeout(res, attempt * 1000));
        continue;
      }

      const userMsg = friendlyErrorMessage(status, err?.message || String(err));
      throw new Error(userMsg);
    }
  }

  throw new Error(
    lastError instanceof Error ? lastError.message : "Failed to analyze code after multiple retries."
  );
}
