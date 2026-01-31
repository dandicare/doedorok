"use client";

import React, { useCallback, useMemo, useState } from "react";

import { Button } from "../../../src/ui/button";
import { EditableText } from "../../../src/ui/editable-text";
import { Textarea } from "../../../src/ui/textarea";
import { ToggleChip } from "../../../src/ui/toggle-chip";

function Label({ children }: { children: React.ReactNode }) {
    return <div className="typo-label-l mb-3 text-[#9BA1A6]">{children}</div>;
}

export default function AfterMealCheckinPage(): React.JSX.Element {
    const steps = useMemo(
        () =>
            [
                {
                    key: "amount",
                    label: "총 식사량",
                    content: (
                        <div className="flex flex-col gap-10">
                            <div className="flex flex-col">
                                <Label>총 식사량</Label>
                                <div className="typo-display-s text-[#11181C] flex flex-col gap-2">
                                    <div>우리 단디는</div>
                                    <div>
                                        <span className="inline-flex gap-2">
                                            <EditableText />
                                            <EditableText /> 시에
                                        </span>
                                    </div>
                                    <div>
                                        <EditableText /> 과
                                    </div>
                                    <div>
                                        <EditableText /> 를 먹었어요.
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <Label>이 점을 주의해주세요!</Label>
                                <div className="flex flex-wrap gap-[6px]">
                                    <div className="flex justify-start gap-[6px]">
                                        <ToggleChip icon="🌾" text="밀가루를 많이 먹었어요" defaultActive={false} />
                                        <ToggleChip icon="🥛" text="유제품을 먹었어요" defaultActive={false} />
                                    </div>
                                    <div className="flex justify-start gap-[6px]">
                                        <ToggleChip icon="🌶️" text="매운 걸 먹었어요" defaultActive={false} />
                                        <ToggleChip icon="🍬" text="당분을 많이 먹었어요" defaultActive={false} />
                                    </div>
                                    <div className="flex justify-start gap-[6px]">
                                        <ToggleChip icon="☕" text="카페인을 먹었어요" defaultActive={false} />
                                        <ToggleChip icon="🍚" text="과식을 했어요" defaultActive={false} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ),
                },
                {
                    key: "status",
                    label: "식사 상태",
                    content: (
                        <div className="flex flex-col gap-10">
                            <div className="flex flex-col">
                                <Label>이런 약을 먹었어요</Label>
                                <div className="typo-display-s text-[#11181C] flex flex-col gap-2">
                                    <div>약은</div>
                                    <div>
                                        <EditableText /> 과
                                    </div>
                                    <div>
                                        <EditableText /> 을
                                    </div>
                                    <div>
                                        먹었어요.
                                    </div>
                                </div>
                            </div>
                        </div>
                    ),
                },
                {
                    key: "note",
                    label: "기타 특이사항",
                    content: (
                        <>
                            <Label>기타 특이사항</Label>
                            <div className="typo-display-s text-[#11181C]">
                                식사 후 우리 단디는 ...
                            </div>
                            <div className="mt-4">
                                <Textarea
                                    className="min-h-[180px] rounded-2xl border border-[#E6E8EA] bg-white px-4 py-4 text-[#11181C] placeholder:text-[#9BA1A6]"
                                    placeholder="식사 후 평소와 달랐던 점(컨디션, 알레르기 반응 등)을 자유롭게 입력해주세요."
                                />
                            </div>
                        </>
                    ),
                },
            ] as const,
        []
    );

    const [stepIdx, setStepIdx] = useState(0);
    const isLast = stepIdx === steps.length - 1;
    const current = steps[stepIdx];

    const goNext = useCallback(() => {
        setStepIdx((s) => Math.min(steps.length - 1, s + 1));
    }, [steps.length]);

    return (
        <main className="min-h-screen w-full bg-white">
            {/* Progress bar (첨부 이미지처럼 4칸) */}
            <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm">
                <div className="mx-auto w-full max-w-[430px] px-5 pt-4 pb-3">
                    <div className="flex w-full gap-2">
                        {steps.map((s, idx) => {
                            const filled = idx <= stepIdx;
                            return (
                                <div
                                    key={s.key}
                                    className="h-[6px] flex-1 overflow-hidden rounded-full bg-[#E6E8EA]"
                                >
                                    <div
                                        className="h-full rounded-full transition-all duration-300"
                                        style={{
                                            width: filled ? "100%" : "0%",
                                            backgroundColor: filled ? "#B8BDC2" : "transparent",
                                        }}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="mx-auto flex min-h-[calc(100vh-72px)] w-full max-w-[430px] flex-col px-5 pt-5 pb-28">
                <section className="flex-1">{current?.content}</section>
            </div>

            <div className="fixed inset-x-0 bottom-0 bg-white/90 backdrop-blur-sm">
                <div className="mx-auto w-full max-w-[430px] px-5 pt-3 pb-5">
                    {isLast ? (
                        <Button className="w-full">다 적었어요</Button>
                    ) : (
                        <Button className="w-full" onClick={goNext}>
                            다음
                        </Button>
                    )}
                </div>
            </div>
        </main>
    );
}

