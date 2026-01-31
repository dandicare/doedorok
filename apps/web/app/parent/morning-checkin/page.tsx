import React from "react";

import { Button } from "../../../src/ui/button";
import { EditableText } from "../../../src/ui/editable-text";
import { Textarea } from "../../../src/ui/textarea";

function Label({ children }: { children: React.ReactNode }) {
    return <div className="typo-label-l mb-1.5 text-[#9BA1A6]">{children}</div>;
}

export default function ParentMorningCheckinPage(): React.JSX.Element {
    return (
        <main className="min-h-screen w-full bg-white">
            <div className="mx-auto w-full max-w-[430px] px-5 pt-5 pb-28">
                <section className="mb-[70px]">
                    <Label>총 수면 시간</Label>
                    <div className="typo-display-s text-[#11181C]">
                        우리 단디는 어제
                        <br />
                        총 <EditableText defaultValue="13" /> 시간 <EditableText defaultValue="50" /> 분
                        <br />
                        수면했어요.
                    </div>
                </section>

                <section className="mb-[70px]">
                    <Label>수면의 질</Label>
                    <div className="typo-display-s text-[#11181C]">
                        우리 단디의
                        <br />
                        어젯밤 수면의 질은
                        <br />
                        <EditableText defaultValue="꿀잠" /> 이었어요.
                    </div>
                </section>

                <section className="mb-[70px]">
                    <Label>경련 발작 여부</Label>
                    <div className="typo-display-s text-[#11181C]">
                        우리 단디는
                        <br />
                        어제 자던 중에
                        <br />
                        발작을 <EditableText defaultValue="하지 않았어요" />
                    </div>
                </section>

                <section className="mb-[70px]">
                    <Label>기타 특이사항</Label>
                    <div className="typo-display-s text-[#11181C]">
                        우리 단디는
                        <br />
                        어제 자던 중에...
                    </div>

                    <div className="mt-4">
                        <Textarea
                            className="min-h-[180px] rounded-2xl border border-[#E6E8EA] bg-white px-4 py-4 text-[#11181C] placeholder:text-[#9BA1A6]"
                            placeholder="어젯밤 우리 아이가 자던 중에 평소와 달랐던 점에 대해 자유롭게 입력해주세요."
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
