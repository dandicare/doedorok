"use client";

import React, { useCallback, useMemo, useRef, useState } from "react";
import ReactCardFlip from "react-card-flip";
import TinderCard from "react-tinder-card";

const THRESHOLD_MS = 150;

// react-tinder-card v1.x 타입 export가 불완전할 수 있어 로컬에서 방향 타입을 정의합니다.
export type SwipeDirection = "left" | "right" | "up" | "down";

type CardModel = {
    id: string;
    name: string;
    genderAge: string;
    diagnosis: string;
    schoolClass: string;
    noteTitle: string;
    noteBody: string;
    tags: Array<{ emoji: string; text: string }>;
};

type Props = {
    /** 추후 확장: preventSwipe 커스터마이징 */
    preventSwipe?: SwipeDirection[];
    /** 탭 vs 드래그 판정 임계값(px). 기본 10 */
    dragThresholdPx?: number;
};

export function SwipeFlipCard({
    preventSwipe,
    dragThresholdPx = 10,
}: Props): React.JSX.Element {
    // 덱 확장하기 쉽게: cards 배열 + flipState 맵 형태로 유지
    const cards: CardModel[] = useMemo(
        () => [
            {
                id: "card-1",
                name: "김단디",
                genderAge: "남 8",
                diagnosis: "자폐 스펙트럼",
                schoolClass: "단디초등학교 1학년 1반",
                noteTitle: "김단디 어린이는 오늘...",
                noteBody: "약을 못 챙겨주고 보냅니다ㅠㅠ\n가방에 넣어 뒀으니 복약 도와주시면 감사합니다.",
                tags: [
                    { emoji: "😴", text: "평소에 비해 수면 시간이 짧아요" },
                    { emoji: "💊", text: "아침에 복약을 놓쳤어요" },
                ],
            },
            {
                id: "card-2",
                name: "이하루",
                genderAge: "여 7",
                diagnosis: "다운 증후군",
                schoolClass: "단디초등학교 1학년 2반",
                noteTitle: "이하루 어린이는 오늘...",
                noteBody: "아침에 식사를 조금 했어요.\n점심은 천천히 먹을 수 있게 도와주세요.",
                tags: [{ emoji: "🍚", text: "평소보다 식사량이 적어요" }],
            },
            {
                id: "card-3",
                name: "박하늘",
                genderAge: "남 9",
                diagnosis: "ADHD",
                schoolClass: "단디초등학교 2학년 1반",
                noteTitle: "박하늘 어린이는 오늘...",
                noteBody: "아침에 잠을 설쳤어요.\n수업 중 피곤해할 수 있어요.",
                tags: [{ emoji: "😵‍💫", text: "평소에 비해 컨디션이 떨어져요" }],
            },
            {
                id: "card-4",
                name: "최보라",
                genderAge: "여 8",
                diagnosis: "언어 발달 지연",
                schoolClass: "단디초등학교 1학년 3반",
                noteTitle: "최보라 어린이는 오늘...",
                noteBody: "오늘은 낯선 환경에 예민할 수 있어요.\n새 활동은 천천히 안내 부탁드려요.",
                tags: [
                    { emoji: "🧩", text: "새 활동은 단계적으로 도와주세요" },
                    { emoji: "🔇", text: "소음에 민감할 수 있어요" },
                ],
            },
            {
                id: "card-5",
                name: "정도윤",
                genderAge: "남 7",
                diagnosis: "감각 처리 어려움",
                schoolClass: "단디초등학교 1학년 4반",
                noteTitle: "정도윤 어린이는 오늘...",
                noteBody: "등교 전 컨디션이 살짝 다운이에요.\n칭찬과 짧은 휴식이 도움이 돼요.",
                tags: [
                    { emoji: "⏸️", text: "중간중간 짧은 쉬는 시간" },
                    { emoji: "👏", text: "작은 성공을 자주 칭찬해 주세요" },
                ],
            },
            {
                id: "card-6",
                name: "한유진",
                genderAge: "여 9",
                diagnosis: "주의집중 어려움",
                schoolClass: "단디초등학교 2학년 2반",
                noteTitle: "한유진 어린이는 오늘...",
                noteBody: "아침에 약 복용을 했어요.\n수업 중 집중이 흐트러지면 한 번만 상기해 주세요.",
                tags: [{ emoji: "🎯", text: "짧게 상기/리마인드가 효과적" }],
            },
            {
                id: "card-7",
                name: "문서준",
                genderAge: "남 8",
                diagnosis: "정서 조절 어려움",
                schoolClass: "단디초등학교 1학년 5반",
                noteTitle: "문서준 어린이는 오늘...",
                noteBody: "오늘은 감정 기복이 있을 수 있어요.\n감정이 올라오면 조용한 공간에서 2~3분 쉬면 좋아요.",
                tags: [
                    { emoji: "🌿", text: "조용한 공간에서 잠깐 휴식" },
                    { emoji: "🗣️", text: "짧고 명확한 안내" },
                ],
            },
        ],
        []
    );

    function ActionIcon({ kind }: { kind: "mail" | "phone" | "profile" }): React.JSX.Element {
        const common = "w-6 h-6";
        if (kind === "mail") {
            return (
                <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M4 6.5H20V17.5H4V6.5Z" stroke="#2B2F31" strokeWidth="2" strokeLinejoin="round" />
                    <path d="M4.5 7L12 13L19.5 7" stroke="#2B2F31" strokeWidth="2" strokeLinejoin="round" />
                </svg>
            );
        }
        if (kind === "phone") {
            return (
                <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                        d="M8 3.5L10.5 4.5L9.5 7.5C10.8 10.2 13 12.4 15.7 13.7L18.7 12.7L19.7 15.2C20 16 19.7 16.9 19 17.3C17.9 18 16.5 18.5 15 18.5C9.5 18.5 5 14 5 8.5C5 7 5.5 5.6 6.2 4.5C6.6 3.8 7.5 3.5 8.3 3.8"
                        stroke="#2B2F31"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            );
        }
        return (
            <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                    d="M12 12C14.2 12 16 10.2 16 8C16 5.8 14.2 4 12 4C9.8 4 8 5.8 8 8C8 10.2 9.8 12 12 12Z"
                    stroke="#2B2F31"
                    strokeWidth="2"
                />
                <path
                    d="M4 20C5.6 16.6 8.5 14.5 12 14.5C15.5 14.5 18.4 16.6 20 20"
                    stroke="#2B2F31"
                    strokeWidth="2"
                    strokeLinecap="round"
                />
            </svg>
        );
    }

    function ActionButton({ kind }: { kind: "mail" | "phone" | "profile" }): React.JSX.Element {
        return (
            <div className="w-[56px] h-[56px] rounded-full bg-[#EFEFEF] flex items-center justify-center">
                <ActionIcon kind={kind} />
            </div>
        );
    }

    function TagPill({ emoji, text }: { emoji: string; text: string }) {
        return (
            <div className="inline-flex w-fit max-w-full items-center gap-2 rounded-full bg-[#FF8C00] px-4 py-2">
                <span className="text-[14px] leading-none">{emoji}</span>
                <span className="typo-body-m-m text-white whitespace-nowrap">{text}</span>
            </div>
        );
    }

    const [flipById, setFlipById] = useState<Record<string, boolean>>(() => {
        const init: Record<string, boolean> = {};
        for (const c of cards) init[c.id] = false;
        return init;
    });

    // 덱 진행: top index(0..n-1). 마지막이 top으로 보이게 렌더링 역순 사용
    const [currentIndex, setCurrentIndex] = useState(cards.length - 1);
    const [gone, setGone] = useState<Record<string, boolean>>({});
    const goneCount = useMemo(() => Object.values(gone).filter(Boolean).length, [gone]);
    const isComplete = goneCount >= cards.length;

    // 포인터 기반 탭/드래그 구분(UX 핵심) — 카드별로 refs 관리
    const pointerStartById = useRef<Record<string, { x: number; y: number } | null>>({});
    const pointerDraggingById = useRef<Record<string, boolean>>({});
    const tapTimerById = useRef<Record<string, ReturnType<typeof setTimeout> | null>>({});

    // iOS/WebView에서 pointer 이벤트가 불안정할 때 최소 fallback
    const touchStartById = useRef<Record<string, { x: number; y: number } | null>>({});
    const touchDraggingById = useRef<Record<string, boolean>>({});

    const clearTapTimer = useCallback((id: string) => {
        const t = tapTimerById.current[id];
        if (t) clearTimeout(t);
        tapTimerById.current[id] = null;
    }, []);

    const toggleFlip = useCallback((id: string) => {
        setFlipById((prev) => ({ ...prev, [id]: !prev[id] }));
    }, []);

    const onSwipe = useCallback((dir: SwipeDirection) => {
        console.log("swipe:", dir);
    }, []);

    const handlePointerDown = useCallback((id: string, e: React.PointerEvent) => {
        pointerStartById.current[id] = { x: e.clientX, y: e.clientY };
        pointerDraggingById.current[id] = false;
        clearTapTimer(id);
        // 일부 WebView에서 pointerup/touchend가 안정적으로 오지 않는 케이스를 대비한 fallback.
        // 드래그로 판정되면 move에서 즉시 취소됨.
        tapTimerById.current[id] = setTimeout(() => {
            const isDragging = Boolean(pointerDraggingById.current[id]);
            if (!isDragging) toggleFlip(id);
        }, THRESHOLD_MS);
    }, [clearTapTimer, toggleFlip]);

    const handlePointerMove = useCallback(
        (id: string, e: React.PointerEvent) => {
            const start = pointerStartById.current[id];
            if (!start) return;
            const dx = e.clientX - start.x;
            const dy = e.clientY - start.y;
            const dist = Math.hypot(dx, dy);
            if (dist >= dragThresholdPx) {
                pointerDraggingById.current[id] = true;
                clearTapTimer(id);
            }
        },
        [clearTapTimer, dragThresholdPx]
    );

    const handlePointerUp = useCallback(
        (id: string) => {
            clearTapTimer(id);
            const isDragging = Boolean(pointerDraggingById.current[id]);
            pointerStartById.current[id] = null;
            pointerDraggingById.current[id] = false;
            if (!isDragging) toggleFlip(id);
        },
        [clearTapTimer, toggleFlip]
    );

    const handleTouchStart = useCallback((id: string, e: React.TouchEvent) => {
        const t = e.touches?.[0];
        if (!t) return;
        touchStartById.current[id] = { x: t.clientX, y: t.clientY };
        touchDraggingById.current[id] = false;
        clearTapTimer(id);
        tapTimerById.current[id] = setTimeout(() => {
            const isDragging = Boolean(touchDraggingById.current[id]);
            if (!isDragging) toggleFlip(id);
        }, THRESHOLD_MS);
    }, [clearTapTimer, toggleFlip]);

    const handleTouchMove = useCallback(
        (id: string, e: React.TouchEvent) => {
            const start = touchStartById.current[id];
            const t = e.touches?.[0];
            if (!start || !t) return;
            const dx = t.clientX - start.x;
            const dy = t.clientY - start.y;
            const dist = Math.hypot(dx, dy);
            if (dist >= dragThresholdPx) {
                touchDraggingById.current[id] = true;
                clearTapTimer(id);
            }
        },
        [clearTapTimer, dragThresholdPx]
    );

    const handleTouchEnd = useCallback(
        (id: string) => {
            clearTapTimer(id);
            const isDragging = Boolean(touchDraggingById.current[id]);
            touchStartById.current[id] = null;
            touchDraggingById.current[id] = false;
            if (!isDragging) toggleFlip(id);
        },
        [clearTapTimer, toggleFlip]
    );

    const onCardSwiped = useCallback(
        (dir: SwipeDirection, id: string, index: number) => {
            onSwipe(dir);
            clearTapTimer(id);
            setGone((prev) => ({ ...prev, [id]: true }));
            setFlipById((prev) => ({ ...prev, [id]: false }));
            setCurrentIndex(index - 1);
        },
        [clearTapTimer, onSwipe]
    );

    const resetDeck = useCallback(() => {
        setGone({});
        setCurrentIndex(cards.length - 1);
        setFlipById(() => {
            const init: Record<string, boolean> = {};
            for (const c of cards) init[c.id] = false;
            return init;
        });
    }, [cards]);

    return (
        <div className="w-full flex flex-col items-center justify-center">


            <div className="relative w-[320px] h-[420px] mt-3">
                {isComplete ? (
                    <div className="absolute inset-0 rounded-2xl bg-[#F2F2F2] shadow-lg border border-black/5 flex flex-col items-center justify-center px-6 text-center">
                        <div className="w-[72px] h-[72px] rounded-full bg-white flex items-center justify-center shadow-sm">
                            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <path
                                    d="M20 7L10 17L4 11"
                                    stroke="#22C55E"
                                    strokeWidth="2.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                        <div className="mt-5 typo-title-m text-[#11181C]">확인 완료했어요</div>
                        <div className="mt-2 typo-body-m-r text-[#9BA1A6]">총 {cards.length}개의 카드를 확인했어요.</div>
                        <button
                            type="button"
                            className="mt-6 h-11 px-5 rounded-full bg-[#11181C] text-white typo-body-m-m active:opacity-90"
                            onClick={resetDeck}
                        >
                            다시 보기
                        </button>
                    </div>
                ) : (
                    <>
                        {/* 스택 배경(밑 카드 느낌 강화) */}
                        <div
                            className="absolute inset-0 rounded-2xl bg-[#E9EAEB] border border-black/5"
                            style={{ transform: "translate(10px, 36px) scale(0.86)" }}
                        />
                        <div
                            className="absolute inset-0 rounded-2xl bg-[#EEEFF0] border border-black/5"
                            style={{ transform: "translate(6px, 20px) scale(0.93)" }}
                        />

                        {cards.map((card, idx) => {
                            if (gone[card.id]) return null;
                            const isTop = idx === currentIndex;
                            const isFlipped = Boolean(flipById[card.id]);
                            const depth = Math.max(0, currentIndex - idx);
                            // 스택은 최대 3장(현재 + 뒤 2장)까지만 보이게
                            const maxVisibleDepth = 2;
                            if (depth > maxVisibleDepth) return null;
                            const cappedDepth = Math.min(depth, maxVisibleDepth);
                            // NOTE: 맨 위 카드의 box-shadow가 뒤 요소를 덮을 수 있어 오프셋을 넉넉히 잡아 "쌓임"을 확실히 보이게 합니다.
                            const stackTranslateY = cappedDepth * 18; // px
                            const stackTranslateX = cappedDepth * 6; // px
                            const stackScale = 1 - cappedDepth * 0.035;
                            const stackOpacity = 1 - cappedDepth * 0.14;

                            return (
                                <div
                                    key={card.id}
                                    className="absolute inset-0"
                                    style={{
                                        pointerEvents: isTop ? "auto" : "none",
                                        zIndex: idx,
                                        transform: `translate(${stackTranslateX}px, ${stackTranslateY}px) scale(${stackScale})`,
                                        transformOrigin: "top center",
                                        opacity: stackOpacity,
                                        transition: "transform 180ms ease, opacity 180ms ease",
                                        touchAction: "pan-y",
                                        WebkitTapHighlightColor: "transparent",
                                        userSelect: "none",
                                        WebkitUserSelect: "none",
                                    }}
                                    // TinderCard가 child를 clone하면서 핸들러를 덮어쓸 수 있어서, 바깥 래퍼(캡처)에서 탭/드래그를 판정합니다.
                                    onPointerDownCapture={(e) => handlePointerDown(card.id, e)}
                                    onPointerMoveCapture={(e) => handlePointerMove(card.id, e)}
                                    onPointerUpCapture={() => handlePointerUp(card.id)}
                                    onPointerCancelCapture={() => {
                                        // 일부 WebView/Safari에서 탭이 cancel로 끝나는 케이스가 있어, cancel도 end로 취급
                                        handlePointerUp(card.id);
                                    }}
                                    onTouchStartCapture={(e) => handleTouchStart(card.id, e)}
                                    onTouchMoveCapture={(e) => handleTouchMove(card.id, e)}
                                    onTouchEndCapture={() => handleTouchEnd(card.id)}
                                    onTouchCancelCapture={() => {
                                        handleTouchEnd(card.id);
                                    }}
                                >
                                    <TinderCard
                                        preventSwipe={preventSwipe}
                                        onSwipe={(dir) => onCardSwiped(dir as SwipeDirection, card.id, idx)}
                                        className="absolute inset-0 select-none"
                                    >
                                        <div
                                            role="button"
                                            aria-pressed={isFlipped}
                                            tabIndex={0}
                                            className="w-[320px] h-[420px] rounded-2xl select-none outline-none"
                                            style={{
                                                WebkitTapHighlightColor: "transparent",
                                            }}
                                            onKeyDown={(e) => {
                                                if (!isTop) return;
                                                if (e.key === "Enter" || e.key === " ") {
                                                    e.preventDefault();
                                                    toggleFlip(card.id);
                                                }
                                            }}
                                        >
                                            <ReactCardFlip
                                                isFlipped={isFlipped}
                                                flipDirection="horizontal"
                                                containerStyle={{
                                                    width: "100%",
                                                    height: "100%",
                                                    perspective: "1200px",
                                                }}
                                            >
                                                {/* Front */}
                                                <div
                                                    className={[
                                                        "w-[320px] h-[420px] rounded-2xl overflow-hidden bg-[#F2F2F2] flex flex-col border border-black/5",
                                                        isTop ? "shadow-md" : "shadow-sm",
                                                    ].join(" ")}
                                                    style={{
                                                        backfaceVisibility: "hidden",
                                                        WebkitBackfaceVisibility: "hidden",
                                                        transform: "translateZ(0)",
                                                    }}
                                                >
                                                    <div className="flex-1" />
                                                    <div className="px-6 pb-6">
                                                        <div className="text-[#11181C] flex items-center gap-2">
                                                            <span className="typo-title-s">
                                                                {card.name}
                                                            </span>
                                                            <span className="typo-body-xl-medium">
                                                                {card.genderAge}
                                                            </span>
                                                        </div>
                                                        <div className="mt-2 typo-body-l-r text-[#11181C]">{card.diagnosis}</div>
                                                        <div className="mt-1 typo-body-l-r text-[#11181C]">{card.schoolClass}</div>
                                                    </div>
                                                </div>

                                                {/* Back */}
                                                <div
                                                    className={[
                                                        "w-[320px] h-[420px] rounded-2xl overflow-hidden bg-[#F2F2F2] p-6 flex flex-col border border-black/5",
                                                        isTop ? "shadow-md" : "shadow-sm",
                                                    ].join(" ")}
                                                    style={{
                                                        backfaceVisibility: "hidden",
                                                        WebkitBackfaceVisibility: "hidden",
                                                        transform: "translateZ(0)",
                                                    }}
                                                >
                                                    <div className="typo-body-m-r text-[#9BA1A6]">{card.noteTitle}</div>
                                                    <div className="mt-4 flex-1 rounded-2xl bg-white p-4">
                                                        <div className="typo-body-m-r text-[#9BA1A6] whitespace-pre-line leading-6">
                                                            {card.noteBody}
                                                        </div>
                                                    </div>
                                                    <div className="mt-4 flex flex-col gap-2">
                                                        {card.tags.map((t, i) => (
                                                            <TagPill key={`${card.id}-tag-${i}`} emoji={t.emoji} text={t.text} />
                                                        ))}
                                                    </div>
                                                </div>
                                            </ReactCardFlip>
                                        </div>
                                    </TinderCard>
                                </div>
                            );
                        })}
                    </>
                )}
            </div>

            {!isComplete ? (
                <div className="mt-7 flex items-center justify-center gap-6">
                    <ActionButton kind="mail" />
                    <ActionButton kind="phone" />
                    <ActionButton kind="profile" />
                </div>
            ) : null}
        </div>
    );
}

