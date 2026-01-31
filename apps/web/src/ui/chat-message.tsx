import React from "react";
import { cn } from "tailwind-variants";

interface ChatMessageProps {
  sender: string;
  timestamp: string;
  title: string;
  message?: string;
  statusItems?: string[];
  isRead?: boolean;
  readTime?: string;
  variant?: "card" | "list";
  className?: string;
}

export function ChatMessage({
  sender,
  timestamp,
  title,
  message,
  statusItems = [],
  isRead = false,
  readTime,
  variant = "card",
  className,
}: ChatMessageProps) {
  const chips = statusItems.filter(Boolean);

  const renderChip = (raw: string, index: number) => {
    const text = raw.trim();
    const maybeEmoji = text.match(
      /^(?:\p{Extended_Pictographic}|\p{Emoji_Presentation}|\p{Emoji}\uFE0F)\s+/u
    );
    const leadingEmoji = maybeEmoji ? maybeEmoji[0].trim() : null;
    const label = leadingEmoji ? text.slice(maybeEmoji![0].length).trim() : text;

    const isCheck =
      (!leadingEmoji && (label.startsWith("정상") || label.includes("완료"))) ||
      text.startsWith("✅") ||
      text.startsWith("☑") ||
      text.startsWith("✔");

    return (
      <div
        key={`${text}-${index}`}
        className="inline-flex items-center gap-2 rounded-full bg-[#F3F4F6] px-3 py-2"
      >
        {isCheck ? (
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-[#22C55E] text-[12px] font-bold text-white">
            ✓
          </span>
        ) : leadingEmoji ? (
          <span className="text-[14px] leading-none">{leadingEmoji}</span>
        ) : null}
        <span className="typo-label-m text-[#6B7280]">{label}</span>
      </div>
    );
  };

  const wrapperClassName =
    variant === "list"
      ? "bg-white px-5 py-5"
      : "mx-5 rounded-[18px] bg-white px-5 py-5 shadow-[0_1px_0_rgba(0,0,0,0.04)] ring-1 ring-black/5";

  return (
    <article className={cn(wrapperClassName, className)}>
      <div className="flex gap-3">
        <div className="h-12 w-12 shrink-0 rounded-full bg-[#D9D9D9]" />

        <div className="min-w-0 flex-1">
          <div className="typo-label-m mb-1 flex items-center gap-2 text-[#9CA3AF]">
            <span className="truncate">{sender}</span>
            <span className="text-[#D1D5DB]">|</span>
            <span className="shrink-0">{timestamp}</span>
          </div>

          <h3 className="mb-2 truncate whitespace-nowrap text-[22px] font-extrabold leading-[28px] tracking-[-0.4px] text-[#111]">
            {title}
          </h3>

          {message ? (
            <p className="mb-3 break-keep text-[14px] font-normal leading-[22px] tracking-[-0.2px] text-[#333]">
              <span className="text-[#B6B6B6]">“</span>
              <span
                dangerouslySetInnerHTML={{
                  __html: message,
                }}
              />
              <span className="text-[#B6B6B6]">”</span>
            </p>
          ) : null}

          {chips.length > 0 ? (
            <div className="mb-2 flex flex-wrap gap-2">{chips.map(renderChip)}</div>
          ) : null}

          {isRead && readTime ? (
            <div className="typo-label-m flex items-center gap-2 text-[#B6B6B6]">
              <span>✓</span>
              <span>선생님 확인 완료</span>
              <span>{readTime}</span>
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}