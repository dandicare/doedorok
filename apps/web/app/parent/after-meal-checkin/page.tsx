"use client";

import React, { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "../../../src/ui/button";
import { EditableText } from "../../../src/ui/editable-text";
import { Textarea } from "../../../src/ui/textarea";
import { ToggleChip } from "../../../src/ui/toggle-chip";
import { isInReactNativeWebView, postToNative } from "../../../lib/native-bridge";
import {
    addAfterMealCheckin,
    markLastAddedAfterMealCheckinId,
    type AfterMealCheckinRecord,
} from "../../../lib/feed-store";

function Label({ children }: { children: React.ReactNode }) {
    return <div className="typo-label-l mb-3 text-[#9BA1A6]">{children}</div>;
}

export default function AfterMealCheckinPage(): React.JSX.Element {
    const router = useRouter();

    // Step 1
    const [mealAmount, setMealAmount] = useState("");
    const [mealTime, setMealTime] = useState("");
    const [mealFood1, setMealFood1] = useState("");
    const [mealFood2, setMealFood2] = useState("");
    const [cautions, setCautions] = useState<Record<string, boolean>>({});

    // Step 2
    const [medicine1, setMedicine1] = useState("");
    const [medicine2, setMedicine2] = useState("");

    // Step 3 (optional)
    const [note, setNote] = useState("");

    const cautionOptions = useMemo(
        () =>
            [
                { key: "flour", icon: "🌾", text: "밀가루를 많이 먹었어요" },
                { key: "dairy", icon: "🥛", text: "유제품을 먹었어요" },
                { key: "spicy", icon: "🌶️", text: "매운 걸 먹었어요" },
                { key: "sugar", icon: "🍬", text: "당분을 많이 먹었어요" },
                { key: "caffeine", icon: "☕", text: "카페인을 먹었어요" },
                { key: "overeating", icon: "🍚", text: "과식을 했어요" },
            ] as const,
        []
    );
    const [c0, c1, c2, c3, c4, c5] = cautionOptions;

    const steps = useMemo(
        () =>
            [
                { key: "amount", label: "총 식사량" },
                { key: "status", label: "식사 상태" },
                { key: "note", label: "기타 특이사항" },
            ] as const,
        []
    );

    const [stepIdx, setStepIdx] = useState(0);
    const isLast = stepIdx === steps.length - 1;
    const current = steps[stepIdx];

    const isStep1Valid =
        mealAmount.trim().length > 0 &&
        mealTime.trim().length > 0 &&
        mealFood1.trim().length > 0 &&
        mealFood2.trim().length > 0;

    const isStep2Valid =
        medicine1.trim().length > 0 && medicine2.trim().length > 0;

    const isCurrentStepValid = useMemo(() => {
        if (current?.key === "amount") return isStep1Valid;
        if (current?.key === "status") return isStep2Valid;
        // note는 optional
        return true;
    }, [current?.key, isStep1Valid, isStep2Valid]);

    const goNext = useCallback(() => {
        setStepIdx((s) => Math.min(steps.length - 1, s + 1));
    }, [steps.length]);

    const onSubmit = useCallback(() => {
        const selectedCautions = cautionOptions
            .filter((o) => Boolean(cautions[o.key]))
            .map((o) => o.text);

        const record: AfterMealCheckinRecord = {
            id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
            createdAt: Date.now(),
            mealAmount: mealAmount.trim(),
            mealTime: mealTime.trim(),
            mealFood1: mealFood1.trim(),
            mealFood2: mealFood2.trim(),
            cautions: selectedCautions,
            medicine1: medicine1.trim(),
            medicine2: medicine2.trim(),
            note: note.trim().length > 0 ? note.trim() : undefined,
        };

        // 앱(WebView) 안에서는 feed가 다른 WebView라 sessionStorage를 공유하지 못해요.
        // 그래서 네이티브로 record를 전달하고, 화면은 "닫기(pop)"로 원래 feed로 돌아갑니다.
        if (isInReactNativeWebView()) {
            postToNative({ type: "AFTER_MEAL_CHECKIN_ADDED", record });
            postToNative({ type: "GO_BACK" });
            return;
        }

        // 브라우저에서는 sessionStorage로 저장한 뒤, history back으로 "닫히는" 느낌을 유지합니다.
        addAfterMealCheckin(record);
        markLastAddedAfterMealCheckinId(record.id);
        if (window.history.length > 1) router.back();
        else router.push("/feed");
    }, [
        cautionOptions,
        cautions,
        mealAmount,
        mealFood1,
        mealFood2,
        mealTime,
        medicine1,
        medicine2,
        note,
        router,
    ]);

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
                <section className="flex-1">
                    {current?.key === "amount" ? (
                        <div className="flex flex-col gap-10">
                            <div className="flex flex-col">
                                <Label>총 식사량</Label>
                                <div className="typo-display-s text-[#11181C] flex flex-col gap-2">
                                    <div>우리 단디는</div>
                                    <div>
                                        <span className="inline-flex gap-2">
                                            <EditableText onValueChange={setMealAmount} />
                                            <EditableText
                                                className="min-w-[48px]"
                                                onValueChange={setMealTime}
                                            />{" "}
                                            시에
                                        </span>
                                    </div>
                                    <div>
                                        <EditableText onValueChange={setMealFood1} /> 과
                                    </div>
                                    <div>
                                        <EditableText onValueChange={setMealFood2} /> 를 먹었어요.
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <Label>이 점을 주의해주세요!</Label>
                                <div className="flex flex-wrap gap-[6px]">
                                    <div className="flex justify-start gap-[6px]">
                                        <ToggleChip
                                            icon={c0.icon}
                                            text={c0.text}
                                            defaultActive={false}
                                            onToggle={(isActive) =>
                                                setCautions((m) => ({ ...m, [c0.key]: isActive }))
                                            }
                                        />
                                        <ToggleChip
                                            icon={c1.icon}
                                            text={c1.text}
                                            defaultActive={false}
                                            onToggle={(isActive) =>
                                                setCautions((m) => ({ ...m, [c1.key]: isActive }))
                                            }
                                        />
                                    </div>
                                    <div className="flex justify-start gap-[6px]">
                                        <ToggleChip
                                            icon={c2.icon}
                                            text={c2.text}
                                            defaultActive={false}
                                            onToggle={(isActive) =>
                                                setCautions((m) => ({ ...m, [c2.key]: isActive }))
                                            }
                                        />
                                        <ToggleChip
                                            icon={c3.icon}
                                            text={c3.text}
                                            defaultActive={false}
                                            onToggle={(isActive) =>
                                                setCautions((m) => ({ ...m, [c3.key]: isActive }))
                                            }
                                        />
                                    </div>
                                    <div className="flex justify-start gap-[6px]">
                                        <ToggleChip
                                            icon={c4.icon}
                                            text={c4.text}
                                            defaultActive={false}
                                            onToggle={(isActive) =>
                                                setCautions((m) => ({ ...m, [c4.key]: isActive }))
                                            }
                                        />
                                        <ToggleChip
                                            icon={c5.icon}
                                            text={c5.text}
                                            defaultActive={false}
                                            onToggle={(isActive) =>
                                                setCautions((m) => ({ ...m, [c5.key]: isActive }))
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : null}

                    {current?.key === "status" ? (
                        <div className="flex flex-col gap-10">
                            <div className="flex flex-col">
                                <Label>이런 약을 먹었어요</Label>
                                <div className="typo-display-s text-[#11181C] flex flex-col gap-2">
                                    <div>약은</div>
                                    <div>
                                        <EditableText onValueChange={setMedicine1} /> 과
                                    </div>
                                    <div>
                                        <EditableText onValueChange={setMedicine2} /> 을
                                    </div>
                                    <div>먹었어요.</div>
                                </div>
                            </div>
                        </div>
                    ) : null}

                    {current?.key === "note" ? (
                        <>
                            <Label>기타 특이사항</Label>
                            <div className="typo-display-s text-[#11181C]">
                                식사 후 우리 단디는 ...
                            </div>
                            <div className="mt-4">
                                <Textarea
                                    value={note}
                                    onChange={(e) => setNote(e.currentTarget.value)}
                                    className="min-h-[180px] rounded-2xl border border-[#E6E8EA] bg-white px-4 py-4 text-[#11181C] placeholder:text-[#9BA1A6]"
                                    placeholder="식사 후 평소와 달랐던 점(컨디션, 알레르기 반응 등)을 자유롭게 입력해주세요."
                                />
                            </div>
                        </>
                    ) : null}
                </section>
            </div>

            <div className="fixed inset-x-0 bottom-0 bg-white/90 backdrop-blur-sm">
                <div className="mx-auto w-full max-w-[430px] px-5 pt-3 pb-5">
                    {isLast ? (
                        <Button className="w-full" onClick={onSubmit}>
                            다 적었어요
                        </Button>
                    ) : (
                        <Button className="w-full" onClick={goNext} disabled={!isCurrentStepValid}>
                            다음
                        </Button>
                    )}
                </div>
            </div>
        </main>
    );
}

