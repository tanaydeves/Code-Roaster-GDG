import { NextResponse } from "next/server";
import { DEFAULTS, LANGUAGES, LIMITS, ROAST_LEVELS } from "@/config/app.config";
import { analyzeCode } from "@/lib/gemini";
import { LanguageId, RoastLevel } from "@/types/roast";

export async function POST(request: Request) {
  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON request body." }, { status: 400 });
  }

  const rawCode = typeof body.code === "string" ? body.code : "";
  const rawErrorMessage = typeof body.errorMessage === "string" ? body.errorMessage.trim() : "";

  if (!rawCode || rawCode.trim().length === 0) {
    return NextResponse.json({ error: "No code provided." }, { status: 400 });
  }

  if (rawCode.length > LIMITS.maxCodeLength) {
    return NextResponse.json(
      { error: `Code exceeds maximum limit of ${LIMITS.maxCodeLength.toLocaleString()} characters.` },
      { status: 400 }
    );
  }

  if (rawErrorMessage.length > LIMITS.maxErrorMessageLength) {
    return NextResponse.json(
      { error: `Error message exceeds maximum limit of ${LIMITS.maxErrorMessageLength.toLocaleString()} characters.` },
      { status: 400 }
    );
  }

  const isKnownLanguage = LANGUAGES.some((l) => l.id === body.language);
  const language: LanguageId = isKnownLanguage ? body.language : DEFAULTS.language;

  const isKnownRoastLevel = ROAST_LEVELS.some((r) => r.id === body.roastLevel);
  const roastLevel: RoastLevel = isKnownRoastLevel ? body.roastLevel : DEFAULTS.roastLevel;

  try {
    const result = await analyzeCode({
      language,
      code: rawCode,
      roastLevel,
      errorMessage: rawErrorMessage,
    });

    return NextResponse.json(result, { status: 200 });
  } catch (err: any) {
    console.error("[POST /api/roast Error]:", err);
    return NextResponse.json(
      { error: err.message || "An error occurred during code analysis." },
      { status: 500 }
    );
  }
}
