import { Schema, Type } from "@google/genai";
import { SEVERITIES } from "@/config/app.config";

export const roastResponseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    roast: {
      type: Type.STRING,
      description: "A witty, deadpan roast of the code in Hinglish with emojis.",
    },
    issues: {
      type: Type.ARRAY,
      description: "List of structured code issues found.",
      items: {
        type: Type.OBJECT,
        properties: {
          line: {
            type: Type.INTEGER,
            description: "1-based line number of the issue.",
          },
          severity: {
            type: Type.STRING,
            enum: [...SEVERITIES],
            description: "Severity category of the issue.",
          },
          title: {
            type: Type.STRING,
            description: "Short title of the issue.",
          },
          codeSnippet: {
            type: Type.STRING,
            description: "The exact problematic code line or snippet.",
          },
          diagnosis: {
            type: Type.STRING,
            description: "Detailed explanation of what is wrong.",
          },
          expected: {
            type: Type.STRING,
            description: "Expected behavior or correct pattern.",
          },
        },
        required: ["line", "severity", "title", "codeSnippet", "diagnosis", "expected"],
      },
    },
    correctedCode: {
      type: Type.STRING,
      description: "Complete corrected code program.",
    },
    takeaway: {
      type: Type.STRING,
      description: "Short summary lesson or rule to take away.",
    },
  },
  required: ["roast", "issues", "correctedCode", "takeaway"],
};
