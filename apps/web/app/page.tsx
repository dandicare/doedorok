"use client";

import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
import { isInReactNativeWebView, navigateNative } from "../lib/native-bridge";
import { Button } from "../src/ui/button";
export default function Home(): React.JSX.Element {
  const router = useRouter();

  const onGoParentMorningCheckin = useCallback(() => {
    // WebView(앱) 안이면: 네이티브 화면 전환 트리거(postMessage).
    // 브라우저면: 그냥 Next 라우팅으로 해당 페이지 이동.
    if (isInReactNativeWebView()) {
      navigateNative("parent/morning-checkin");
    } else {
      router.push("/parent/morning-checkin");
    }
  }, [router]);

  const onGoStudentProfile = useCallback(() => {
    if (isInReactNativeWebView()) {
      navigateNative("student/profile");
    } else {
      router.push("/student/profile");
    }
  }, [router]);

  const onGoTeacherStudents = useCallback(() => {
    if (isInReactNativeWebView()) {
      navigateNative("teacher/students");
    } else {
      router.push("/teacher/students");
    }
  }, [router]);

  return (
    <main className="min-h-screen w-full flex flex-col gap-4 items-center justify-center p-6">
      <Button onClick={onGoParentMorningCheckin}>학부모 페이지</Button>
      <Button onClick={onGoStudentProfile}>학생 프로필 페이지</Button>
      <Button onClick={onGoTeacherStudents}>내가 맡는 아이들</Button>
    </main>
  );
}
