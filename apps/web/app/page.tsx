"use client";

import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
import { isInReactNativeWebView, navigateNative } from "../lib/native-bridge";
import { Button } from "../src/ui/button";
import { EditableText } from "../src/ui/editable-text";
import { Textarea } from "../src/ui/textarea";
export default function Home(): React.JSX.Element {
  const router = useRouter();

  const onGo = useCallback(() => {
    // WebView(앱) 안이면: 네이티브 화면 전환 트리거(postMessage).
    // 브라우저면: 그냥 Next 라우팅으로 /example 이동.
    if (isInReactNativeWebView()) {
      navigateNative("example");
    } else {
      router.push("/example");
    }
  }, [router]);

  return (
    <main className="min-h-screen w-full flex flex-col gap-4 items-center justify-center p-6">
      <Button
        onClick={onGo}
      >
        예시 화면 열기
      </Button>
      <EditableText defaultValue="123" />
      <div className="w-full">
        <Textarea className="h-[240px]" placeholder="어젯밤 우리 아이가 자던 중에 평소와 달랐던 점에 대해 자유롭게 입력해주세요." />
      </div>
    </main>
  );
}
