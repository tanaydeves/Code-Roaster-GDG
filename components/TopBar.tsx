import React from "react";
import { APP } from "@/config/app.config";

interface TopBarProps {
  children: React.ReactNode;
}

export const TopBar: React.FC<TopBarProps> = ({ children }) => {
  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-3 md:px-4 border-b-2 border-frame bg-panel">
      <div className="flex items-center gap-2.5">
        <span className="font-display font-bold text-xl tracking-wider uppercase text-frame">
          {APP.name}
        </span>
        <span className="border border-frame px-1.5 py-0.5 text-[10px] font-mono font-bold bg-canvas text-frame">
          {APP.version}
        </span>
      </div>
      <div className="flex items-center gap-3 flex-wrap font-mono text-xs">
        {children}
      </div>
    </header>
  );
};
