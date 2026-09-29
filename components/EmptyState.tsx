import React from "react";

export const EmptyState: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center p-6 my-auto">
      <div className="w-16 h-16 border-2 border-dashed border-frame bg-canvas flex items-center justify-center text-2xl font-bold font-mono text-gray-500 mb-4">
        {"{}"}
      </div>
      <h3 className="font-display text-sm font-bold uppercase tracking-wider text-frame mb-2">
        Awaiting Code Submission
      </h3>
      <p className="font-mono text-xs text-gray-500 max-w-xs leading-relaxed">
        Paste your code on the left, then click &quot;ROAST MY CODE&quot; or press Ctrl+Enter (⌘+Enter on Mac).
      </p>
    </div>
  );
};
