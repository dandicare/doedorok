"use client";

import React, { useMemo, useState } from "react";

const COLORS = {
  primary: "#FF8C00",
  text: "#111111",
  subtext: "#8E8E93",
  divider: "#EDEDED",
  card: "#fafafa",
  chipBg: "#F2F2F2",
} as const;

type AreaKey = "sleep" | "meal" | "med" | "behavior";

const AREA_TABS: Array<{ key: AreaKey; label: string }> = [
  { key: "sleep", label: "수면" },
  { key: "meal", label: "식사 및 소화" },
  { key: "med", label: "복약 관리" },
  { key: "behavior", label: "행동 발달" },
];

export default function ReportPage(): React.JSX.Element {
  const [area, setArea] = useState<AreaKey>("sleep");

  const areaData = useMemo(() => {
    const data: Record<
      AreaKey,
      { titleLeft: string; metrics: [string, string, string]; row1: string; row2: string; insight: string }
    > = {
      sleep: {
        titleLeft: "수면의 질",
        metrics: ["꿀잠 15일", "설침 10일", "깸 6일"],
        row1: "특이점",
        row2: "주말에 기상 시간이 2시간 이상 늦어지며\n월요일 컨디션 난조로 이어지는 '월요병' 패턴이 관찰됩니다.",
        insight: "주말-평일 기상 시간 편차를 1시간 이내로 맞추면 월요일 컨디션이 안정될 확률이 높아요.",
      },
      meal: {
        titleLeft: "식사 및 소화",
        metrics: ["규칙 18일", "편식 7일", "복통 3일"],
        row1: "특이점",
        row2: "밀가루(글루텐) 섭취가 있는 날에 예민함이 올라가는 경향이 있습니다.\n유제품의 영향은 상대적으로 미미해요.",
        insight: "다음 달에는 아침 식사에서 빵 대신 밥/죽으로 바꿔보고 컨디션 변화를 관찰해보세요.",
      },
      med: {
        titleLeft: "복약 관리",
        metrics: ["이행 22일", "지연 5일", "누락 1일"],
        row1: "특이점",
        row2: "복용 시간이 1시간 이상 지연된 날은 오후 컨디션이 급격히 떨어지는 패턴이 보입니다.",
        insight: "알람을 ‘복용’과 ‘확인’ 2단계로 나눠서 누락을 줄여보세요.",
      },
      behavior: {
        titleLeft: "행동 발달",
        metrics: ["돌발 12회", "안정 20일", "트리거 6일"],
        row1: "특이점",
        row2: "낮잠을 건너뛴 날과 복약이 지연된 날에 돌발행동 빈도가 높았습니다.",
        insight: "수면/복약 루틴을 먼저 고정하면 행동 지표가 가장 빠르게 안정되는 편이에요.",
      },
    };
    return data[area];
  }, [area]);

  return (
    <main className="min-h-screen w-full bg-[#FAFAFA]">
      <div className="mx-auto w-full max-w-[430px] px-5 pb-10">
        {/* Title (on page background) */}
        <div className="pt-6">
          <div className="typo-title-xl tracking-[-0.2px] text-[#111]">
            우리 아이 김단디(8세) 의
            <br />
            <span style={{ color: COLORS.primary }}>1월</span> 발달 리포트
          </div>
        </div>

        {/* Sections */}
        <div className="mt-6 flex flex-col gap-3 pb-28">
          {/* Monthly summary */}
          <section className="-mx-5 bg-white px-5 py-6">
            <div className="typo-body-m-m text-[#111]">이번 달 총평</div>
            <div className="mt-4 flex items-start justify-between gap-4">
              <div className="typo-title-m leading-[34px] tracking-[-0.2px] text-[#111]">
                “꾸준한 투약 관리가
                <br />
                핵심이에요.”
              </div>
              {/* pill icon */}
              <div className="typo-display-xl mt-1 flex h-12 w-12 items-center justify-center rounded-full bg-white ">
                💊
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <div className="grid grid-cols-[108px_1fr] items-center gap-x-3">
                <div className="typo-body-m-r text-[#323232]">평균 컨디션</div>
                <div className="typo-body-m-m text-[#6b6b6b]">보통 (Level 2)</div>
              </div>
              <div className="h-px w-full bg-[--divider]" style={{ ["--divider" as string]: COLORS.divider }} />
              <div className="grid grid-cols-[108px_1fr] items-start gap-x-4">
                <div className="typo-body-m-r text-[#323232]">최고의 날</div>
                <div>
                  <div className="typo-body-m-m text-[#6b6b6b]">1월 15일</div>
                  <div className="typo-body-m-r mt-0.5 text-[#c3c3c3]">
                    14일 연속 복용 이행률 100%, 기분 최상
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-[108px_1fr] items-start gap-x-4">
                <div className="typo-body-m-r text-[#323232]">힘들었던 날</div>
                <div>
                  <div className="typo-body-m-m text-[#6b6b6b]">1월 23일</div>
                  <div className="typo-body-m-r mt-0.5 text-[#c3c3c3]">점심 약 미복용, 텐트럼 3회</div>
                </div>
              </div>
            </div>

            {/* AI comment (belongs to monthly summary) */}
            <div
              className="mt-6 rounded-[16px] px-3 py-4.5"
              style={{ backgroundColor: COLORS.card }}
            >
              <div className="typo-body-m-m text-[#6b6b6b]">AI 코멘트</div>
              <div className="typo-body-l-m mt-1.5 text-[#111]">
                지난달보다 돌발행동 빈도가 <span className="font-bold typo-title-m">15% 감소</span>했어요!
              </div>
              <div className="typo-body-m-r mt-2 text-[#7d7d7d] text-[14px]">
                전반적으로 안정적이었으나, 약 복용이 누락되거나 시간이 1시간 이상 지연된 날 컨디션이 급격히
                떨어지는 패턴이 보였습니다.
              </div>
            </div>
          </section>

          {/* Data insight */}
          <section className="-mx-5 bg-white px-5 py-6">
            <div className="typo-body-m-m text-[#111]">데이터 인사이트</div>
            <div className="mt-4 flex items-start justify-between gap-3">
              <div className="typo-title-m leading-[34px] tracking-[-0.2px] text-[#111]">
                “밀가루(글루텐)를 먹은 날,
                <br />
                예민해질 확률이 75% 높아요.”
              </div>
              <div className="typo-display-xl mt-1 flex h-12 w-12 items-center justify-center rounded-full bg-white ">
                🔍
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <div className="grid grid-cols-[156px_1fr] items-center gap-x-3">
                <div className="typo-body-m-r text-[#323232]">글루텐 섭취 일수:</div>
                <div className="typo-body-m-m text-[#6b6b6b]">총 12일</div>
              </div>
              <div className="grid grid-cols-[156px_1fr] items-center gap-x-3">
                <div className="typo-body-m-r text-[#323232]">섭취 시 예민해질 확률:</div>
                <div className="typo-body-m-m text-[#6b6b6b]">75%</div>
              </div>
              <div className="grid grid-cols-[156px_1fr] items-start gap-x-3">
                <div className="typo-body-m-r text-[#323232]">“짜증/울음” 발생률:</div>
                <div className="typo-body-m-m text-[#6b6b6b]">
                  평소 대비 <span className="font-bold">30%p</span> 높음
                </div>
              </div>
              <div className="grid grid-cols-[156px_1fr] items-start gap-x-3">
                <div className="typo-body-m-r text-[#323232]">유제품 섭취 시 영향:</div>
                <div className="typo-body-m-m text-[#6b6b6b]">미미함 (상관관계 낮음)</div>
              </div>
            </div>

            <div
              className="mt-6 rounded-[16px] px-3 py-4.5"
              style={{ backgroundColor: COLORS.card }}
            >
              <div className="typo-body-m-m text-[#6b6b6b]">제안 💡</div>
              <div className="typo-body-l-m mt-1.5 text-[#111]">
                다음 달에는 아침 식사에서 빵 대신
                <br />
                <span className="font-bold typo-title-m">밥이나 죽</span>으로 변경해 보는 것을 추천합니다.
              </div>
            </div>
          </section>

          {/* Area report */}
          <section className="-mx-5 bg-white px-5 py-6">
            <div className="typo-body-m-m text-[#111]">영역별 데이터 레포트</div>

            <div className="mt-4 flex gap-1.5">
              {AREA_TABS.map((t) => {
                const active = t.key === area;
                return (
                  <button
                    key={t.key}
                    type="button"
                    className={[
                      "typo-body-m-m flex-1 h-[40px] rounded-[12px] px-[3px] py-2.5 text-center transition-colors",
                      "border shadow-[0_2px_10px_rgba(0,0,0,0.06)]",
                      active ? "text-white border-transparent" : "text-[#3A3A3C] border-[#D1D1D6]",
                    ].join(" ")}
                    style={{
                      backgroundColor: active ? "#3A3A3C" : "#FFFFFF",
                    }}
                    onClick={() => setArea(t.key)}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>

            <div className="mt-6">
              <div className="flex items-center gap-[32px]">
                <div className="typo-body-l-m text-[#111] min-w-[58px]">{areaData.titleLeft}</div>
                <div className="grid flex-1 grid-cols-3 gap-4">
                  {areaData.metrics.map((m) => (
                    <div key={m} className="typo-body-l-m text-center text-[#6B7280]">
                      {m}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex items-start gap-[40px]">
                <div className="typo-body-l-m text-[#111] min-w-[58px]">{areaData.row1}</div>
                <div className="typo-body-l-regular whitespace-pre-line text-[#6B7280]">{areaData.row2}</div>
              </div>
            </div>
          </section>

          {/* Next month checkpoint */}
          <section className="-mx-5 bg-white px-5 py-6">
            <div className="typo-body-xl-medium text-[#111]">다음달 체크포인트</div>
            <div className="mt-4">
              <div className="typo-title-m leading-[34px] tracking-[-0.2px] text-[#111]">
                “복약 여부 꼼꼼하게 챙기기”
              </div>
              <div className="typo-body-m-r mt-3 text-[#6B7280]">
                지난달 데이터에 따르면, 단디는 수면 리듬이 깨질 때 가장 힘들어했습니다. 이번 달은 주말에도
                오전 8시 기상을 목표로 해볼까요?
              </div>
            </div>
          </section>
        </div>

        {/* Bottom actions */}
        <div className="sticky bottom-0 -mx-5 bg-[#FAFAFA] px-5 -mt-20">
          <div
            className="flex gap-3 pb-4"
            style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 16px)" }}
          >
            <button
              type="button"
              className="typo-body-l-m w-[140px] rounded-[14px] px-4 py-4 text-white active:opacity-90"
              style={{ backgroundColor: COLORS.primary }}
              onClick={() => {
                if (typeof navigator !== "undefined" && "share" in navigator) {
                  void (navigator as Navigator & { share?: (data: ShareData) => Promise<void> }).share?.({
                    title: "월별 레포트",
                    text: "월별 레포트를 공유합니다.",
                    url: typeof window !== "undefined" ? window.location.href : undefined,
                  });
                }
              }}
            >
              공유하기
            </button>
            <button
              type="button"
              className="typo-body-l-m flex-1 h-[60px] rounded-[14px] px-4 py-4 active:bg-black/5"
              style={{ border: `1.5px solid ${COLORS.primary}`, color: COLORS.primary, backgroundColor: "#fff" }}
              onClick={() => alert("PDF 저장 기능은 다음 단계에서 연결할게요.")}
            >
              PDF로 저장(병원 제출용)
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

