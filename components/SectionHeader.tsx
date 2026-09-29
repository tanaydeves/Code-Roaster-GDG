import React from "react";

interface SectionHeaderProps {
  number: number;
  title: string;
  children?: React.ReactNode;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  number,
  title,
  children,
}) => {
  const paddedNum = String(number).padStart(2, "0");

  return (
    <div className="border-b border-frame pb-1 mb-3 flex items-center justify-between font-mono text-xs text-frame">
      <span className="font-bold tracking-wider uppercase">
        {paddedNum} // {title}
      </span>
      {children && <div>{children}</div>}
    </div>
  );
};
