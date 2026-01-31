'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MealPrompt } from '../../src/ui/meal-prompt';
import { ChatMessage } from '../../src/ui/chat-message';
import { isInReactNativeWebView, navigateNative } from '../../lib/native-bridge';
import {
  consumeLastAddedAfterMealCheckinId,
  addAfterMealCheckin,
  listAfterMealCheckins,
  type AfterMealCheckinRecord,
} from '../../lib/feed-store';

export default function Feed() {
  const router = useRouter();
  const [afterMeal, setAfterMeal] = useState<AfterMealCheckinRecord[]>([]);
  const [animateId, setAnimateId] = useState<string | null>(null);
  const [animateToken, setAnimateToken] = useState(0);

  useEffect(() => {
    const refresh = () => {
      setAfterMeal(listAfterMealCheckins());
      const lastId = consumeLastAddedAfterMealCheckinId();
      if (lastId) {
        setAnimateId(lastId);
        setAnimateToken((t) => t + 1);
        window.setTimeout(() => setAnimateId(null), 450);
      }
    };

    refresh();

    window.addEventListener('focus', refresh);
    const onVis = () => {
      if (document.visibilityState === 'visible') refresh();
    };
    document.addEventListener('visibilitychange', onVis);

    // Native -> WebView: 다른 화면(WebView)에서 작성한 record를 전달받아 즉시 피드에 반영
    const getRawMessage = (event: unknown): unknown => {
      if (typeof event !== 'object' || event === null) return undefined;
      const e = event as { data?: unknown; nativeEvent?: { data?: unknown } };
      return e.data ?? e.nativeEvent?.data;
    };

    const applyRecordWithDelay = (record: AfterMealCheckinRecord, delayMs: number) => {
      window.setTimeout(() => {
        setAfterMeal((prev) => {
          if (prev.some((p) => p.id === record.id)) return prev;
          return [record, ...prev];
        });
        addAfterMealCheckin(record);
        setAnimateId(record.id);
        setAnimateToken((t) => t + 1);
        window.setTimeout(() => setAnimateId(null), 1600);
      }, delayMs);
    };

    const onMessage = (event: MessageEvent | unknown) => {
      const raw = getRawMessage(event);
      if (typeof raw !== 'string') return;
      let msg: unknown;
      try {
        msg = JSON.parse(raw);
      } catch {
        return;
      }
      if (typeof msg !== 'object' || msg === null) return;
      const m = msg as { type?: unknown; record?: unknown };
      if (m.type !== 'AFTER_MEAL_CHECKIN_ADDED') return;
      const record = m.record as AfterMealCheckinRecord | undefined;
      if (!record || typeof record !== 'object' || !('id' in record)) return;
      if (!record.id) return;

      // 앱(WebView)에서는 "피드 화면이 보인 다음"에 추가돼야 애니메이션이 느껴져요.
      // visible이면 0.5초 기다렸다가, 아니면 visible 될 때까지 기다렸다가 0.5초 후에 넣습니다.
      if (document.visibilityState === 'visible') {
        applyRecordWithDelay(record, 500);
        return;
      }

      const onVisOnce = () => {
        if (document.visibilityState !== 'visible') return;
        document.removeEventListener('visibilitychange', onVisOnce);
        applyRecordWithDelay(record, 500);
      };
      document.addEventListener('visibilitychange', onVisOnce);
    };

    window.addEventListener('message', onMessage as EventListener);
    // RN WebView(Android) 호환
    (document as unknown as { addEventListener?: (type: string, listener: EventListener) => void })
      .addEventListener?.('message', onMessage as EventListener);

    return () => {
      window.removeEventListener('focus', refresh);
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('message', onMessage as EventListener);
      (document as unknown as { removeEventListener?: (type: string, listener: EventListener) => void })
        .removeEventListener?.('message', onMessage as EventListener);
    };
  }, []);

  const formatAfterMealMessage = useCallback((r: AfterMealCheckinRecord) => {
    const mealLine = `<span style="color:#22C55E;font-weight:600;">${r.mealTime}</span>에 <span style="color:#22C55E;font-weight:600;">${r.mealFood1}</span>과 <span style="color:#22C55E;font-weight:600;">${r.mealFood2}</span>를 먹었어요.`;
    const medicineLine = `약은 <span style="color:#FF8C00;font-weight:600;">${r.medicine1}</span>과 <span style="color:#FF8C00;font-weight:600;">${r.medicine2}</span>을 먹었어요.`;
    const noteLine = r.note
      ? `<br/><span style="color:#6B7280;">메모:</span> ${r.note}`
      : "";
    return `${mealLine}<br/>${medicineLine}${noteLine}`;
  }, []);

  const formatTimestamp = useCallback((createdAt: number) => {
    try {
      const d = new Date(createdAt);
      return `보호자 ${d.toLocaleTimeString("ko-KR", { hour: "numeric", minute: "2-digit" })}`;
    } catch {
      return "보호자 방금";
    }
  }, []);

  const onGoAfterMealCheckin = useCallback(() => {
    if (isInReactNativeWebView()) {
      navigateNative('parent/after-meal-checkin');
      return;
    }
    router.push('/parent/after-meal-checkin');
  }, [router]);

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
        {afterMeal.length === 0 ? (
          <MealPrompt
            date="2026년 2월 1일 아침이에요"
            question="단디는 오늘 아침 무엇을 먹었나요?"
            buttonText="작성하러 가기"
            onButtonClick={onGoAfterMealCheckin}
          />
        ) : null}

        {afterMeal.length > 0 ? (
          <div className="bg-white">
            {afterMeal.map((r) => (
              <div
                key={r.id === animateId ? `${r.id}-enter-${animateToken}` : r.id}
                className={r.id === animateId ? 'dc-slide-in-ltr' : undefined}
                onAnimationEnd={() => {
                  if (r.id === animateId) setAnimateId(null);
                }}
              >
                <ChatMessage
                  sender="식사 로그"
                  timestamp={formatTimestamp(r.createdAt)}
                  role="보호자"
                  title="방금 작성한 기록이 도착했어요"
                  message={formatAfterMealMessage(r)}
                  statusItems={r.cautions}
                  variant="list"
                />
              </div>
            ))}
          </div>
        ) : null}

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
            role="도우미"
            title="안전히 귀가했어요 🏠"
            message='<span style="color: #22C55E; font-weight: 600;">동행시간 내내 편안한 태도</span>를 보였고, 집으로 <span style="color: #22C55E; font-weight: 600;">안전하게 귀가</span>했습니다.'
            statusItems={["✅ 안전하게 하루를 마무리했어요"]}
            variant="list"
            className="border-b border-[#EDEDED]"
          />

          <ChatMessage
            sender="수업 로그"
            timestamp="선생님 오후 4:33"
            role="선생님"
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
            role="보호자"
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
            role="보호자"
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