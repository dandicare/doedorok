"use client";

import React, { useCallback } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const onGo = useCallback(() => {
    const hasRN = typeof window !== "undefined" && Boolean((window as any).ReactNativeWebView);

    // WebView(앱) 안이면: 네이티브 화면 전환 트리거(postMessage).
    // 브라우저면: 그냥 Next 라우팅으로 /example 이동.
    if (hasRN) {
      (window as any).ReactNativeWebView.postMessage(
        JSON.stringify({ type: "NAVIGATE", screen: "example" }),
      );
    } else {
      router.push("/example");
    }
  }, [router]);

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: 24,
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto",
      }}
    >
      <button
        onClick={onGo}
        style={{
          padding: "14px 18px",
          borderRadius: 12,
          border: "1px solid rgba(0,0,0,0.12)",
          background: "#111",
          color: "#fff",
          fontSize: 16,
          cursor: "pointer",
        }}
      >
        예시 화면 열기
      </button>
    </main>
  );
}
