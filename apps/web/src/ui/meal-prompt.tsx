import React from "react";

interface MealPromptProps {
  date: string;
  question: string;
  buttonText: string;
  onButtonClick?: () => void;
}

export function MealPrompt({
  date,
  question,
  buttonText,
  onButtonClick,
}: MealPromptProps) {
  return (
    <section className="bg-white px-5 pb-6 pt-6">
      <p className="typo-label-m mb-4 text-center text-[#C7C7C7]">{date}</p>

      <h2 className="typo-title-s mb-5 text-center tracking-[-0.2px] text-[#111]">
        {question.split("단디").length > 1 ? (
          <>
            {question.split("단디")[0]}
            <span className="text-[#FF8C00]">단디</span>
            {question.split("단디").slice(1).join("단디")}
          </>
        ) : (
          <>
            <span className="text-[#FF8C00]">단디</span>는 오늘 아침 무엇을 먹었나요?
          </>
        )}
      </h2>

      <div className="flex justify-center">
        <button
          type="button"
          onClick={onButtonClick}
          className="inline-flex h-[44px] items-center justify-center rounded-[14px] bg-[#FF8C00] px-8 text-[16px] font-semibold tracking-[-0.2px] text-white"
        >
          {buttonText}
        </button>
      </div>
    </section>
  );
}
