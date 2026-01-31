"use client";

import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  isInReactNativeWebView,
  navigateNative,
} from "../../lib/native-bridge";
import { Button } from "../../src/ui/button";
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

  const onGoParentAfterMealCheckin = useCallback(() => {
    if (isInReactNativeWebView()) {
      navigateNative("parent/after-meal-checkin");
    } else {
      router.push("/parent/after-meal-checkin");
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

  const onGoTeacherWriteRecord = useCallback(() => {
    if (isInReactNativeWebView()) {
      navigateNative("teacher/write-record");
    } else {
      router.push("/teacher/write-record");
    }
  }, [router]);

  const onGoStudentRecords = useCallback(() => {
    if (isInReactNativeWebView()) {
      navigateNative("student/records");
    } else {
      router.push("/student/records");
    }
  }, [router]);

  const onGoParentFeed = useCallback(() => {
    if (isInReactNativeWebView()) {
      navigateNative("parent/feed");
    } else {
      router.push("/parent/feed");
    }
  }, [router]);

  return (
    <main className="min-h-screen w-full flex flex-col gap-4 items-center justify-center p-6">
      <Button onClick={onGoParentMorningCheckin}>학부모 페이지</Button>
      <Button onClick={onGoParentAfterMealCheckin}>식사 후 체크인</Button>
      <Button onClick={onGoStudentProfile}>학생 프로필 페이지</Button>
      <Button onClick={onGoStudentRecords}>어젯밤 아이들의 기록이에요</Button>
      <Button onClick={onGoTeacherStudents}>내가 맡는 아이들</Button>
      <Button onClick={onGoTeacherWriteRecord}>수업 후 일괄기록 페이지</Button>
      <Button onClick={onGoParentFeed}>피드 페이지</Button>
    </main>
  );
}
