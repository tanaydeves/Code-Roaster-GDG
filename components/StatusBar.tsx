import React from "react";
import { AI, APP } from "@/config/app.config";

interface StatusBarProps {
  isRoasting: boolean;
}

export const StatusBar: React.FC<StatusBarProps> = ({ isRoasting }) => {
  return (
    <footer className="border-t-2 border-frame bg-canvas px-4 py-2 font-mono text-[11px] text-frame">
      <div className="flex flex-wrap items-center justify-between gap-2 uppercase tracking-wide">
        <div className="flex items-center gap-2">
          {isRoasting ? (
            <>
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
              <span className="font-bold text-amber-600">STATUS: PROCESSING...</span>
            </>
          ) : (
            <>
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="font-bold">
                STATUS: ONLINE ({AI.modelLabel.toUpperCase()})
              </span>
            </>
          )}
          <span className="hidden sm:inline text-gray-500">
            | ENGINE: GOOGLE GEMINI
          </span>
        </div>

        <div className="font-bold tracking-wider text-frame">
          {APP.name.toUpperCase()} {APP.version} // LIVE
        </div>
      </div>

      <div className="text-center text-[10px] text-gray-500 uppercase tracking-wider mt-1 pt-1 border-t border-subtle">
        Made at GDG Nashik Pre-DevFest Workshop
      </div>
    </footer>
  );
};
