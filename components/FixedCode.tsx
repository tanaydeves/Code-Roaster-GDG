"use client";

import React, { useState } from "react";
import { LANGUAGES } from "@/config/app.config";
import { SectionHeader } from "@/components/SectionHeader";
import { LanguageId } from "@/types/roast";

interface FixedCodeProps {
  sectionNumber: number;
  language: LanguageId;
  code: string;
  onApply: (fixedCode: string) => void;
}

export const FixedCode: React.FC<FixedCodeProps> = ({
  sectionNumber,
  language,
  code,
  onApply,
}) => {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">("idle");

  const ext = LANGUAGES.find((l) => l.id === language)?.extension || "txt";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    }
    setTimeout(() => {
      setCopyStatus("idle");
    }, 2000);
  };

  let copyLabel = "📋 COPY FIXED CODE";
  if (copyStatus === "copied") {
    copyLabel = "✓ COPIED TO CLIPBOARD";
  } else if (copyStatus === "failed") {
    copyLabel = "✕ COPY BLOCKED, SELECT MANUALLY";
  }

  return (
    <div className="mb-6">
      <SectionHeader number={sectionNumber} title="Fix">
        <span className="text-emerald-600 font-bold text-[10px] tracking-wider uppercase">
          CORRECTED CODE
        </span>
      </SectionHeader>

      <div className="border border-frame bg-panel font-mono text-xs">
        {/* Header Strip */}
        <div className="bg-canvas border-b border-frame px-3 py-1.5 flex justify-between items-center font-bold text-[11px]">
          <span>solution.{ext}</span>
          <span className="text-emerald-600 uppercase">READY TO APPLY</span>
        </div>

        {/* Code Content */}
        <pre className="p-3 font-mono text-xs bg-[#FAF9F6] overflow-x-auto whitespace-pre leading-relaxed text-frame">
          <code>{code}</code>
        </pre>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2 mt-2 font-mono text-xs">
        <button
          type="button"
          onClick={handleCopy}
          className="border border-frame bg-panel px-3 py-1.5 font-bold uppercase text-frame hover:bg-frame hover:text-white transition-colors"
        >
          {copyLabel}
        </button>
        <button
          type="button"
          onClick={() => onApply(code)}
          className="border border-frame bg-frame text-white px-3 py-1.5 font-bold uppercase hover:bg-black transition-colors"
        >
          APPLY TO EDITOR ↵
        </button>
      </div>
    </div>
  );
};
