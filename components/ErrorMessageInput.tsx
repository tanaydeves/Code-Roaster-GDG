import React from "react";

interface ErrorMessageInputProps {
  value: string;
  onChange: (val: string) => void;
  onClose: () => void;
}

export const ErrorMessageInput: React.FC<ErrorMessageInputProps> = ({
  value,
  onChange,
  onClose,
}) => {
  return (
    <div className="border-b-2 border-frame bg-[#FFF8F6] p-3 font-mono text-xs">
      <div className="flex justify-between items-center mb-1.5 font-bold uppercase tracking-wider text-[11px] text-frame">
        <span>Attach Terminal Traceback / Compiler Error (Optional)</span>
        <button
          type="button"
          onClick={onClose}
          className="text-frame hover:text-accent font-bold cursor-pointer"
        >
          Dismiss ✕
        </button>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={2}
        placeholder="TypeError: 'list' object cannot be interpreted as an integer at line 5..."
        className="w-full bg-panel border border-frame p-2 font-mono text-xs text-frame focus:outline-none focus:ring-1 focus:ring-accent resize-y"
      />
    </div>
  );
};
