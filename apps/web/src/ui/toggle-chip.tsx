import React, { useState } from 'react';
import { cn } from 'tailwind-variants';

type ToggleChipProps = {
  icon?: string;
  text: string;
  defaultActive?: boolean;
  className?: string;
  height?: string;
  onToggle?: (isActive: boolean) => void;
};

export function ToggleChip({
  icon,
  text,
  defaultActive = false,
  className,
  height = 'auto',
  onToggle,
}: ToggleChipProps) {
  const [isActive, setIsActive] = useState(defaultActive);

  const handleClick = () => {
    const newActive = !isActive;
    setIsActive(newActive);
    onToggle?.(newActive);
  };

  const base = cn(
    'inline-flex items-center gap-2 py-4 px-2 rounded-[36px] transition-colors duration-200 cursor-pointer',
    'text-[14px] whitespace-nowrap w-fit',
    isActive
      ? 'bg-[#FF8C00] text-white'
      : 'bg-[#D9D9D9] text-white',
  );

  return (
    <div 
      className={cn(base, className)} 
      style={{ height }}
      onClick={handleClick}
    >
      {icon && <span className="text-[24px] flex-shrink-0">{icon}</span>}
      <span className="text-[14px]">{text}</span>
    </div>
  );
}