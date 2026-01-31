'use client';

import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
import { isInReactNativeWebView, navigateNative } from "../lib/native-bridge";
import { Button } from "../src/ui/button";
export default function Home(): React.JSX.Element {
  const router = useRouter();

  const onGoMorning = useCallback(() => {
    // WebView(앱) 안이면: 네이티브 화면 전환 트리거(postMessage).
    // 브라우저면: 그냥 Next 라우팅으로 해당 페이지 이동.
    if (isInReactNativeWebView()) {
      navigateNative("parent/morning-checkin");
    } else {
      router.push("/parent/morning-checkin");
    }
  }, [router]);

  const onGoAfterMeal = useCallback(() => {
    if (isInReactNativeWebView()) {
      navigateNative("parent/after-meal-checkin");
    } else {
      router.push("/parent/after-meal-checkin");
    }
  }, [router]);

  return (
    <main className="min-h-screen w-full flex flex-col gap-4 items-center justify-center p-6">
      <Button onClick={onGoMorning}>모닝 체크인</Button>
      <Button onClick={onGoAfterMeal}>식사 후 체크인</Button>
    </main>
  );
}
