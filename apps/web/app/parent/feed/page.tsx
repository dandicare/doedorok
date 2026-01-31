import React from "react";
import { MealPrompt } from "../../../src/ui/meal-prompt";
import { ChatMessage } from "../../../src/ui/chat-message";

export default function Feed() {
  return (
    <div className="min-h-screen bg-white">
      <MealPrompt
        date="2026년 2월 1일 아침이에요"
        question="단디는 오늘 아침 무엇을 먹었나요?"
        buttonText="작성하러 가기"
      />

      <div className="border-t-8 border-gray-100 pt-4">
        <p className="text-center text-gray-400 text-sm py-4">
          2026년 1월 31일
        </p>

        <div className="space-y-0">
          <ChatMessage
            sender="마무리 체크인 | 도우미"
            timestamp="오후 6:07"
            title="안전히 귀가했어요 🏠"
            isRead={true}
            readTime="02.12.08:30"
          />

          <ChatMessage
            sender="하교 체크인 | 선생님"
            timestamp="오후 4:33"
            title="안전히 귀가했어요 🏠"
            message="동행시간 내내 편안한 태도를 보였고, 집으로 안전하게 귀가 했습니다."
            isRead={false}
          />

          <ChatMessage
            sender="식사 체크인 | 부모님"
            timestamp="오전 9:37"
            title="집중이 조금 어려웠어요 😴"
            message="매운 걸 조금 많이 먹었어요 🌶️"
            isRead={true}
            readTime="02.12.08:30"
          />

          <ChatMessage
            sender="모닝 체크인 | 부모님"
            timestamp="오전 08:29"
            title="오늘 아침 잘 먹었어요 🍽️"
            message="오시간 꽃차 차려요 🌼"
            isRead={false}
          />
        </div>
      </div>
    </div>
  );
}
