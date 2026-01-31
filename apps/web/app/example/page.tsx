import type { JSX } from "react";

export default function ExamplePage(): JSX.Element {
  return (
    <main className="p-6">
      <h1 className="text-title-s m-0">예시 페이지</h1>
      <p className="text-body-m-r mt-3 opacity-80">
        이 화면은 WebView에서 “새 앱 화면(스택)”으로 열린 웹 페이지입니다.
      </p>
    </main>
  );
}

