import React, { type ComponentProps } from "react";
import { cn } from "tailwind-variants";

type TextareaProps = ComponentProps<"textarea">;

export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        // iOS WebView에서 입력 포커스 시 자동 확대(줌) 방지를 위해 16px 이상 사용
        "typo-body-l-r w-full resize-none rounded-xl border border-[#E6E6E6] bg-white px-[18px] py-[16px] text-[#11181C] placeholder:text-[#999] focus:outline-none focus:border-[#D0D0D0]",
        className
      )}
      {...props}
    />
  );
}
