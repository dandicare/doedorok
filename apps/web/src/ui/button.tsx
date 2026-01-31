import React, { type ComponentProps } from "react";

import { cn } from "tailwind-variants";

type ButtonProps = ComponentProps<"button"> & {
  variant?: "primary" | "ghost";
};

export function Button({
  className,
  // variant = "primary",
  ...props
}: ButtonProps) {
  const base =
    "typo-button-l text-white inline-flex h-[60px] w-[354px] items-center justify-center rounded-[12px] px-5 py-3.5 bg-[#323232]";

  return (
    <button
      className={cn(base, className)}
      {...props}
    />
  );
}

