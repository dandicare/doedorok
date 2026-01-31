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
    <div className="flex flex-col items-center p-6 bg-gray-50">
      <p className="text-gray-400 text-sm mb-4">{date}</p>

      <h2 className="text-lg font-medium text-center mb-6 leading-relaxed">
        <span className="text-orange-500">단디</span>는 오늘 아침 무엇을
        먹었나요?
      </h2>

      <button
        onClick={onButtonClick}
        className="bg-orange-400 text-white px-6 py-3 rounded-xl text-base font-medium"
      >
        {buttonText}
      </button>
    </div>
  );
}
