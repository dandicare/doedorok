"use client";

import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
import { isInReactNativeWebView, navigateNative } from "../lib/native-bridge";
import { Button } from "../src/ui/button";

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
    <main className="min-h-screen grid place-items-center p-6">
      <Button
        onClick={onGo}
      >
        예시 화면 열기
      </Button>
    </main>
  );
}
