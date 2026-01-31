import React from "react";

import { Button } from "../../../src/ui/button";
import { EditableText } from "../../../src/ui/editable-text";
import { Textarea } from "../../../src/ui/textarea";

function Label({ children }: { children: React.ReactNode }) {
    return <div className="typo-label-l mb-3 text-[#9BA1A6]">{children}</div>;
}

export default function AfterMealCheckinPage(): React.JSX.Element {
    return (
        <main className="min-h-screen w-full bg-white">
            <div className="mx-auto w-full max-w-[430px] px-5 pt-5 pb-28">
                <section className="mb-7">
                    <Label>총 식사량</Label>
                    <div className="typo-display-s text-[#11181C]">
                        우리 단디는 방금
                        <br />
                        총 <EditableText defaultValue="80" /> % 만큼
                        <br />
                        먹었어요.
                    </div>
                </section>

                <section className="mb-7">
                    <Label>식사 상태</Label>
                    <div className="typo-display-s text-[#11181C]">
                        우리 단디는
                        <br />
                        식사를 <EditableText defaultValue="잘 했어요" />
                    </div>
                </section>

                <section className="mb-7">
                    <Label>구토/역류 여부</Label>
                    <div className="typo-display-s text-[#11181C]">
                        식사 후
                        <br />
                        구토/역류를 <EditableText defaultValue="하지 않았어요" />
                    </div>
                </section>

                <section className="mb-7">
                    <Label>기타 특이사항</Label>
                    <div className="typo-display-s text-[#11181C]">
                        식사 후 우리 단디는
                        <br />
                        ...
                    </div>

                    <div className="mt-4">
                        <Textarea
                            className="min-h-[180px] rounded-2xl border border-[#E6E8EA] bg-white px-4 py-4 text-[#11181C] placeholder:text-[#9BA1A6]"
                            placeholder="식사 후 평소와 달랐던 점(컨디션, 알레르기 반응 등)을 자유롭게 입력해주세요."
                        />
                    </div>
                </section>
            </div>

            <div className="fixed inset-x-0 bottom-0 bg-white/90 backdrop-blur-sm">
                <div className="mx-auto w-full max-w-[430px] px-5 pt-3 pb-5">
                    <Button className="w-full">다 적었어요</Button>
                </div>
            </div>
        </main>
    );
}

