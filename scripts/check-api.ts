import { analyzeCode } from "../lib/gemini";
import { AI, SAMPLE } from "../config/app.config";

async function main() {
  console.log(`[CHECK:API] Testing Gemini API with model: ${AI.model}...`);

  try {
    const result = await analyzeCode({
      language: SAMPLE.language,
      code: SAMPLE.code,
      roastLevel: "sharp",
      errorMessage: "TypeError: unsupported operand type(s) for +=: 'int' and 'list'",
    });

    console.log("✅ [CHECK:API] Success!");
    console.log("-----------------------------------------");
    console.log("Roast Text:\n", result.roast);
    console.log("Issues Found:", result.issues.length);
    console.log("Takeaway:\n", result.takeaway);
    console.log("-----------------------------------------");
  } catch (err: any) {
    console.error("❌ [CHECK:API] Failure:");
    console.error(err.message || err);
    process.exit(1);
  }
}

main();
