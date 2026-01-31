import React, { useState, useEffect } from "react";
import { cn } from "tailwind-variants";

type ToggleChipProps = {
  icon?: string;
  text: string;
  defaultActive?: boolean;
  className?: string;
  height?: string;
  onToggle?: (isActive: boolean) => void;
  variant?: "default" | "activity";
};

export function ToggleChip({
  icon,
  text,
  defaultActive = false,
  className,
  onToggle,
  variant = "default",
}: ToggleChipProps) {
  const [isActive, setIsActive] = useState(defaultActive);

  useEffect(() => {
    setIsActive(defaultActive);
  }, [defaultActive]);

  const handleClick = () => {
    const newActive = !isActive;
    setIsActive(newActive);
    onToggle?.(newActive);
  };

  const base = cn(
    "inline-flex items-center gap-1 py-2 px-3 transition-colors duration-200 cursor-pointer shadow-sm w-full",
    "text-[12px] whitespace-nowrap border",
    variant === "activity" ? "rounded-full" : "rounded-2xl",
    isActive
      ? "bg-[#FF8C00] text-white border-[#FF8C00]"
      : "bg-white text-[#666] border-[#E0E0E0]",
  );

  return (
    <div className={cn(base, className)} onClick={handleClick}>
      {icon && <span className="text-[14px] flex-shrink-0">{icon}</span>}
      <span className="text-[14px]">{text}</span>
    </div>
  );
}
