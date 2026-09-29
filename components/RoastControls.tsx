import React from "react";
import { LANGUAGES, ROAST_LEVELS } from "@/config/app.config";
import { LanguageId, RoastLevel } from "@/types/roast";

interface RoastControlsProps {
  roastLevel: RoastLevel;
  onRoastLevelChange: (level: RoastLevel) => void;
  language: LanguageId;
  onLanguageChange: (lang: LanguageId) => void;
  onRoast: () => void;
  isRoasting: boolean;
  errorDrawerOpen: boolean;
  onToggleErrorDrawer: () => void;
}

export const RoastControls: React.FC<RoastControlsProps> = ({
  roastLevel,
  onRoastLevelChange,
  language,
  onLanguageChange,
  onRoast,
  isRoasting,
  errorDrawerOpen,
  onToggleErrorDrawer,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
      {/* Roast Level Radios */}
      <div className="flex items-center gap-2">
        <span className="font-bold text-frame">Roast Level:</span>
        <div className="flex items-center gap-3">
          {ROAST_LEVELS.map((rl) => (
            <label
              key={rl.id}
              className="inline-flex items-center gap-1.5 cursor-pointer text-frame"
              title={rl.description}
            >
              <input
                type="radio"
                name="roastLevel"
                value={rl.id}
                checked={roastLevel === rl.id}
                onChange={() => onRoastLevelChange(rl.id as RoastLevel)}
                className="accent-accent cursor-pointer"
              />
              <span>{rl.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Language Selector */}
      <div className="flex items-center gap-2">
        <span className="font-bold text-frame">Language:</span>
        <div className="relative inline-block">
          <select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value as LanguageId)}
            className="appearance-none bg-panel border border-frame px-3 py-1 pr-7 text-xs font-mono cursor-pointer text-frame focus:outline-none focus:ring-1 focus:ring-accent"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.id} value={lang.id}>
                {lang.label} (.{lang.extension})
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[10px]">
            ▾
          </span>
        </div>
      </div>

      {/* Error Message Toggle */}
      <button
        type="button"
        onClick={onToggleErrorDrawer}
        className="border border-dashed border-frame px-2.5 py-1 text-xs font-mono uppercase font-bold text-frame hover:bg-canvas transition-colors"
      >
        {errorDrawerOpen ? "− ERROR MESSAGE" : "+ ERROR MESSAGE"}
      </button>

      {/* Primary Action CTA */}
      <button
        type="button"
        onClick={onRoast}
        disabled={isRoasting}
        className={`px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-wider border-2 border-frame shadow-[2px_2px_0px_#111111] transition-all flex items-center gap-2 text-white ${
          isRoasting
            ? "bg-gray-700 cursor-not-allowed animate-pulse"
            : "bg-accent hover:opacity-95 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_#111111]"
        }`}
      >
        {isRoasting ? (
          "ANALYZING..."
        ) : (
          <>
            <span>ROAST MY CODE</span>
            <span className="bg-black/30 border border-white/40 px-1 py-0.5 text-[9px]">
              Ctrl ⏎
            </span>
          </>
        )}
      </button>
    </div>
  );
};
