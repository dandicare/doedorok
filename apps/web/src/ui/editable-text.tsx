"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "tailwind-variants";

type EditableTextProps = {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  className?: string;
  onValueChange?: (value: string) => void;
};

export function EditableText({
  value,
  defaultValue = "",
  placeholder,
  className,
  onValueChange,
}: EditableTextProps) {
  const isControlled = value != null;
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const text = useMemo(
    () => (isControlled ? String(value ?? "") : String(uncontrolledValue ?? "")),
    [isControlled, uncontrolledValue, value]
  );

  const ref = useRef<HTMLDivElement | null>(null);

  // controlled일 때 외부 value 변경을 DOM에 반영
  useEffect(() => {
    if (!isControlled) return;
    const el = ref.current;
    if (!el) return;
    if ((el.textContent ?? "") !== text) el.textContent = text;
  }, [isControlled, text]);

  const base =
    "typo-display-s inline-block min-w-[60px] h-[48px] rounded-xl bg-[#FF8C00] text-[#FFEFCB] px-[14px] leading-[48px] outline-none whitespace-pre";

  const isEmpty = text.length === 0;

  return (
    <span className="relative inline-block">
      {isEmpty && placeholder ? (
        <span className="pointer-events-none absolute left-[14px] top-1/2 -translate-y-1/2 opacity-60 typo-display-s text-[#FFEFCB]">
          {placeholder}
        </span>
      ) : null}
      <div
        ref={ref}
        role="textbox"
        aria-multiline="false"
        contentEditable
        suppressContentEditableWarning
        className={cn(base, className)}
        onKeyDown={(e) => {
          if (e.key === "Enter") e.preventDefault();
        }}
        onInput={(e) => {
          const next = e.currentTarget.textContent ?? "";
          if (!isControlled) setUncontrolledValue(next);
          onValueChange?.(next);
        }}
      />
    </span>
  );
}

