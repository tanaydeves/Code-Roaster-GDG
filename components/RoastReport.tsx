import React from "react";
import { EmptyState } from "@/components/EmptyState";
import { ErrorState } from "@/components/ErrorState";
import { FixedCode } from "@/components/FixedCode";
import { IssueCard } from "@/components/IssueCard";
import { LoadingState } from "@/components/LoadingState";
import { SectionHeader } from "@/components/SectionHeader";
import { LanguageId, ReportState, RoastLevel, RoastResult } from "@/types/roast";

interface RoastReportProps {
  state: ReportState;
  roastLevel: RoastLevel;
  language: LanguageId;
  result: RoastResult | null;
  errorMsg?: string;
  onRetry: () => void;
  onApplyFix: (code: string) => void;
}

export const RoastReport: React.FC<RoastReportProps> = ({
  state,
  roastLevel,
  language,
  result,
  errorMsg,
  onRetry,
  onApplyFix,
}) => {
  return (
    <div className="flex flex-col flex-1 h-full bg-panel font-mono text-xs text-frame">
      {/* 40px Header Strip */}
      <div className="h-10 border-b border-frame bg-canvas px-4 flex items-center justify-between text-xs font-bold uppercase tracking-wider">
        <span className="text-gray-500">AUDIT // REPORT</span>
        <span className="text-frame">Roast Report</span>
        <span className="text-gray-400 text-[10px]">STATUS: READY</span>
      </div>

      {/* Body Area */}
      <div className="flex-1 flex flex-col p-4 overflow-y-auto min-h-[360px]">
        {state === "empty" && <EmptyState />}

        {state === "loading" && <LoadingState />}

        {state === "error" && <ErrorState error={errorMsg} onRetry={onRetry} />}

        {state === "results" && result && (
          <div className="space-y-6">
            {/* Section 1: Roast */}
            <div>
              <SectionHeader number={1} title="Roast">
                <span className="text-gray-500 text-[10px] uppercase font-mono">
                  STYLE: {roastLevel}
                </span>
              </SectionHeader>
              <div className="border-l-4 border-frame bg-canvas p-3 text-xs leading-relaxed italic text-frame">
                &ldquo;{result.roast}&rdquo;
              </div>
            </div>

            {/* Section 2: What's Wrong */}
            <div>
              <SectionHeader number={2} title="What's Wrong">
                <span className="text-accent font-bold text-[10px] uppercase">
                  {result.issues.length}{" "}
                  {result.issues.length === 1 ? "ISSUE" : "ISSUES"}
                </span>
              </SectionHeader>

              {result.issues.length === 0 ? (
                <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-700 text-xs font-bold">
                  No issues found. Suspiciously clean code. 🚀
                </div>
              ) : (
                result.issues.map((issue, idx) => (
                  <IssueCard key={idx} index={idx + 1} issue={issue} />
                ))
              )}
            </div>

            {/* Section 3: Fix (Optional) */}
            {result.correctedCode && result.correctedCode.trim().length > 0 && (
              <FixedCode
                sectionNumber={3}
                language={language}
                code={result.correctedCode}
                onApply={onApplyFix}
              />
            )}

            {/* Section Takeaway (Dynamic Number) */}
            {result.takeaway && result.takeaway.trim().length > 0 && (
              <div>
                <SectionHeader
                  number={result.correctedCode ? 4 : 3}
                  title="Takeaway"
                />
                <div className="p-3 border border-frame bg-panel text-xs leading-relaxed text-frame">
                  {result.takeaway}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
