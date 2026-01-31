import React from 'react';
import { MealPrompt } from '../../src/ui/meal-prompt';
import { ChatMessage } from '../../src/ui/chat-message';

export default function Feed() {
  return (
    <div className="min-h-screen bg-white">
      <MealPrompt
        date="2026년 2월 1일 아침이에요"
        question="단디는 오늘 아침 무엇을 먹었나요?"
        buttonText="작성하러 가기"
      />
      
      <div className="border-t-8 border-gray-100 pt-4">
        <p className="text-center text-gray-400 text-sm py-4">2026년 1월 31일</p>
        
        <div className="space-y-0">
          <ChatMessage
            sender="마무리 체크인 | 도우미"
            timestamp="오후 6:07"
            title="안전히 귀가했어요 🏠"
            message='"<span style="color: #10b981">동행시간 내내 편안한 태도</span>를 보였고, <span style="color: #10b981">집으로 안전하게 귀가</span>했습니다."'
            statusItems={["안전하게 하루를 마무리했어요"]}
          />
          
          <ChatMessage
            sender="하교 체크인 | 선생님"
            timestamp="오후 4:33"
            title="집중이 조금 어려웠어요 😴"
            message='"<span style="color: #3b82f6">수업 태도는 전반적으로 양호</span>했지만 <span style="color: #f59e0b">약간의 집중력 난조</span>가 보였습니다. 체육 활동 중에 <span style="color: #f59e0b">잠시 흥분 상태</span>가 있었지만, 휴식 후에 도움을 받아 수업을 이어 갔어요."'
            statusItems={["정상 휴식", "😴 평소보다 예민했어요", "😴 집중이 어려웠어요"]}
          />
          
          <ChatMessage
            sender="식사 체크인 | 부모님"
            timestamp="오전 9:37"
            title="매운 걸 조금 많이 먹었어요 🌶️"
            message='"매운 제육볶음을 과식하여 <span style="color: #f59e0b">속쓰림과 배중이 예상</span>됩니다. <span style="color: #f59e0b">간식 반응에 대해</span> 해 주세요."'
            statusItems={["🌶️ 향후음식 복용량이 평소보다 증가했어요"]}
            isRead={true}
            readTime="1.31.10:07"
          />
          
          <ChatMessage
            sender="모닝 체크인 | 부모님"
            timestamp="오전 08:29"
            title="오시간 꽃차 차려요 🌼"
          />
        </div>
      </div>
    </div>
  );
}