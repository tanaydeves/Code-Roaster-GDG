"use client";

import React, { useRef, useState } from "react";
import { LANGUAGES } from "@/config/app.config";
import { LanguageId } from "@/types/roast";

interface CodeEditorProps {
  code: string;
  onChange: (val: string) => void;
  language: LanguageId;
  errorLine?: number;
  onLoadSample: () => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  onChange,
  language,
  errorLine,
  onLoadSample,
}) => {
  const [cursorPos, setCursorPos] = useState({ line: 1, col: 1 });
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);

  const lines = code.split("\n");
  const lineCount = Math.max(lines.length, 10);
  const languageLabel =
    LANGUAGES.find((l) => l.id === language)?.label.toUpperCase() || language.toUpperCase();

  const handleSelect = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const target = e.currentTarget;
    const textBefore = target.value.substring(0, target.selectionStart);
    const lineNum = textBefore.split("\n").length;
    const lastNewlineIdx = textBefore.lastIndexOf("\n");
    const colNum = target.selectionStart - (lastNewlineIdx === -1 ? 0 : lastNewlineIdx + 1) + 1;
    setCursorPos({ line: lineNum, col: colNum });
  };

  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    if (gutterRef.current) {
      gutterRef.current.scrollTop = e.currentTarget.scrollTop;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab" && !e.shiftKey) {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      textarea.setRangeText("    ", start, end, "end");
      onChange(textarea.value);

      // Recalculate cursor
      const textBefore = textarea.value.substring(0, textarea.selectionStart);
      const lineNum = textBefore.split("\n").length;
      const lastNewlineIdx = textBefore.lastIndexOf("\n");
      const colNum = textarea.selectionStart - (lastNewlineIdx === -1 ? 0 : lastNewlineIdx + 1) + 1;
      setCursorPos({ line: lineNum, col: colNum });
    }
  };

  return (
    <div className="flex flex-col flex-1 h-full bg-panel font-mono text-xs text-frame border-r-2 border-frame">
      {/* 40px Header Strip */}
      <div className="h-10 border-b border-frame bg-canvas px-4 flex items-center justify-between text-xs font-bold uppercase tracking-wider">
        <span className="text-gray-500">INPUT // SRC</span>
        <span className="text-frame">Your Code</span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onLoadSample}
            className="text-frame hover:text-accent font-bold text-[11px]"
          >
            [ SAMPLE BUG ]
          </button>
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-gray-500 hover:text-frame font-bold text-[11px]"
          >
            [ CLEAR ]
          </button>
        </div>
      </div>

      {/* Editor Body: Gutter + Textarea */}
      <div className="flex flex-1 relative overflow-hidden bg-panel min-h-[360px]">
        {/* Line Gutter */}
        <div
          ref={gutterRef}
          className="w-12 bg-canvas border-r border-subtle text-gray-400 select-none py-3 text-right pr-2 font-mono text-xs leading-6 overflow-hidden"
        >
          {Array.from({ length: lineCount }).map((_, i) => {
            const lineNum = i + 1;
            const isError = errorLine === lineNum;
            return (
              <div
                key={lineNum}
                className={
                  isError
                    ? "bg-accent text-white font-bold px-1 rounded-none text-center"
                    : ""
                }
              >
                {lineNum}
              </div>
            );
          })}
        </div>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => onChange(e.target.value)}
          onSelect={handleSelect}
          onScroll={handleScroll}
          onKeyDown={handleKeyDown}
          placeholder="// Paste your code here..."
          spellCheck={false}
          className="flex-1 p-3 font-mono text-xs leading-6 bg-transparent outline-none resize-none whitespace-pre overflow-x-auto text-frame border-none focus:ring-0"
        />
      </div>

      {/* Bottom Status Strip */}
      <div className="h-7 border-t border-subtle bg-canvas px-3 flex justify-between items-center text-[10px] text-gray-600 uppercase">
        <span>
          Ln {cursorPos.line}, Col {cursorPos.col} · {languageLabel}
        </span>
        <span className="hidden sm:inline">UTF-8 · Tab Size: 4</span>
      </div>
    </div>
  );
};
