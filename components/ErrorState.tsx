import React from "react";

interface ErrorStateProps {
  error?: string;
  onRetry: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ error, onRetry }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center p-6 my-auto">
      <div className="w-16 h-16 border-2 border-accent bg-[#FFF8F6] flex items-center justify-center text-2xl font-bold font-mono text-accent mb-4">
        !
      </div>
      <h3 className="font-display text-sm font-bold uppercase tracking-wider text-accent mb-2">
        Analysis Failed
      </h3>
      <p className="font-mono text-xs text-gray-600 max-w-sm mb-4 leading-relaxed break-words">
        {error || "An unknown error occurred during code evaluation."}
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="border border-frame bg-panel px-3 py-1.5 font-mono text-xs font-bold uppercase text-frame hover:bg-frame hover:text-white transition-colors"
      >
        RETRY ANALYSIS ↵
      </button>
    </div>
  );
};
