import React from "react";
import { RoastIssue } from "@/types/roast";

interface IssueCardProps {
  index: number;
  issue: RoastIssue;
}

export const IssueCard: React.FC<IssueCardProps> = ({ index, issue }) => {
  const paddedIndex = String(index).padStart(2, "0");

  let badgeStyle = "bg-red-100 text-[#D94826] border-[#D94826]";
  if (issue.severity === "CODE SMELL") {
    badgeStyle = "bg-amber-100 text-[#D97706] border-[#D97706]";
  } else if (issue.severity === "OPTIMIZATION") {
    badgeStyle = "bg-emerald-100 text-[#059669] border-[#059669]";
  }

  return (
    <div className="border border-frame bg-panel p-3 mb-3 font-mono text-xs shadow-[2px_2px_0px_#E6E6E2]">
      {/* Top Header Row */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <span className="bg-frame text-white px-1.5 py-0.5 text-[10px] font-bold">
            {paddedIndex}
          </span>
          <span className="font-bold text-frame">LINE {issue.line}</span>
          <span
            className={`border px-1.5 py-0.5 text-[10px] font-bold uppercase ${badgeStyle}`}
          >
            {issue.severity}
          </span>
        </div>
        <span className="text-gray-500 text-[11px] font-medium text-right break-words">
          {issue.title}
        </span>
      </div>

      {/* Code Snippet Block */}
      <div className="border border-subtle border-l-4 border-l-accent bg-canvas p-2 my-2 font-mono text-xs overflow-x-auto whitespace-pre">
        <code>{issue.codeSnippet}</code>
      </div>

      {/* Diagnosis and Expected */}
      <div className="space-y-1 text-[11px] leading-relaxed">
        <div>
          <span className="text-accent font-bold">✕ Diagnosis: </span>
          <span className="text-frame">{issue.diagnosis}</span>
        </div>
        <div>
          <span className="text-emerald-600 font-bold">✓ Expected: </span>
          <span className="text-frame">{issue.expected}</span>
        </div>
      </div>
    </div>
  );
};
