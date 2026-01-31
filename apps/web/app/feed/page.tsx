'use client';

import React, { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { MealPrompt } from '../../src/ui/meal-prompt';
import { ChatMessage } from '../../src/ui/chat-message';
import { isInReactNativeWebView, navigateNative } from '../../lib/native-bridge';

export default function Feed() {
  const router = useRouter();

  const onGoDev = useCallback(() => {
    if (isInReactNativeWebView()) {
      navigateNative('dev');
      return;
    }
    router.push('/dev');
  }, [router]);

  return (
    <div className="min-h-screen bg-white pt-[env(safe-area-inset-top)]">
      <main className="mx-auto max-w-[420px] pb-[calc(env(safe-area-inset-bottom)+24px)]">
        <MealPrompt
          date="2026년 2월 1일 아침이에요"
          question="단디는 오늘 아침 무엇을 먹었나요?"
          buttonText="작성하러 가기"
        />


        <div className="bg-white px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-[#EDEDED]" />
            <span className="typo-label-m text-[#C7C7C7]">2026년 1월 31일</span>
            <div className="h-px flex-1 bg-[#EDEDED]" />
          </div>
        </div>

        <div className="bg-white">
          <ChatMessage
            sender="마무리 로그"
            timestamp="도우미 오후 6:07"
            title="안전히 귀가했어요 🏠"
            message='<span style="color: #22C55E; font-weight: 600;">동행시간 내내 편안한 태도</span>를 보였고, 집으로 <span style="color: #22C55E; font-weight: 600;">안전하게 귀가</span>했습니다.'
            statusItems={["✅ 안전하게 하루를 마무리했어요"]}
            variant="list"
            className="border-b border-[#EDEDED]"
          />

          <ChatMessage
            sender="수업 로그"
            timestamp="선생님 오후 4:33"
            title="집중이 조금 어려웠어요 🥺"
            message='<span style="color: #22C55E; font-weight: 600;">수업 태도는 전반적으로 양호</span>했지만 <span style="color: #FF8C00; font-weight: 600;">약간의 집중력 난조</span>가 보였습니다. 체육 활동 중에 <span style="color: #FF8C00; font-weight: 600;">잠시 돌발 이탈</span>이 있었지만, 휴식 후에 도움을 받아 수업을 이어 갔어요.'
            statusItems={[
              "정상 출석",
              "😬 평소보다 예민했어요",
              "🥺 집중이 어려웠어요",
            ]}
            variant="list"
            className="border-b border-[#EDEDED]"
          />

          <ChatMessage
            sender="식사 로그"
            timestamp="보호자 오전 9:37"
            title="매운 걸 조금 많이 먹었어요 🌶️"
            message='매운 제육볶음을 과식하여 <span style="color: #FF8C00; font-weight: 600;">속쓰림과 짜증</span>이 예상됩니다. <span style="color: #FF8C00; font-weight: 600;">긴장 반응</span>에 대비해 주세요.'
            statusItems={["💊 항우울제 복용량이 평소보다 줄었어요"]}
            isRead={true}
            readTime="1.31.10:07"
            variant="list"
            className="border-b border-[#EDEDED]"
          />

          <ChatMessage
            sender="모닝 로그"
            timestamp="보호자 오전 08:29"
            title="8시간 꿀잠 잤어요 😴"
            message='<span style="color: #22C55E; font-weight: 600;">수면의 질이 좋았으나</span> 한 차례 각성이 있었으므로 <span style="color: #FF8C00; font-weight: 600;">약간의 지도</span>가 필요합니다.'
            statusItems={["✅ 경련 없음", "😳 수면 도중 1차례 각성"]}
            isRead={true}
            readTime="1.31.08:36"
            variant="list"
          />
        </div>
      </main>

      {/* 우측 하단 플로팅 버튼: 아직 연결되지 않은 dev 페이지로 진입 */}
      <div className="fixed inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+16px)] pointer-events-none">
        <div className="mx-auto max-w-[420px] px-5 flex justify-end">
          <button
            type="button"
            onClick={onGoDev}
            aria-label="Dev로 이동"
            className="pointer-events-auto h-12 w-12 rounded-full bg-black text-white flex items-center justify-center shadow-lg shadow-black/20 active:scale-[0.98] transition-transform"
          >
            Dev
          </button>
        </div>
      </div>
    </div>
  );
}