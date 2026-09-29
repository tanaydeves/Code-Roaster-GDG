import React from "react";

export const LoadingState: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center p-6 my-auto">
      <div className="w-16 h-16 border-2 border-frame bg-panel flex items-center justify-center text-2xl font-bold font-mono text-frame mb-4 animate-spin">
        /
      </div>
      <h3 className="font-display text-sm font-bold uppercase tracking-wider text-frame mb-2 animate-pulse">
        Analyzing Code
      </h3>
      <p className="font-mono text-xs text-gray-500 max-w-xs leading-relaxed">
        Evaluating computational complexity and architectural purity...
      </p>
    </div>
  );
};
