"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function StudentProfile(): React.JSX.Element {
  const router = useRouter();

  const handleEdit = (field: string) => {
    router.push(`/student/profile/edit?field=${field}`);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <div className="px-6 space-y-6 pt-6">
        {/* Profile Image */}
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
        </div>

        {/* Name */}
        <div className="text-center">
          <h2 className="text-xl font-medium">김단디</h2>
        </div>

        {/* Profile Fields */}
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1 flex items-center justify-between bg-white p-4 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="text-black font-medium">성별</span>
                <span className="text-gray-400">남성</span>
              </div>
              <button onClick={() => handleEdit("gender")}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                    stroke="#ccc"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z"
                    stroke="#ccc"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div className="flex-1 flex items-center justify-between bg-white p-4 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="text-black font-medium">출생연도</span>
                <span className="text-gray-400">2019</span>
              </div>
              <button onClick={() => handleEdit("birthYear")}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                    stroke="#ccc"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z"
                    stroke="#ccc"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between bg-white p-4 rounded-lg">
            <div className="flex items-center gap-2">
              <span className="text-black font-medium">제한적 관심사</span>
              <span className="text-gray-400">라부부</span>
            </div>
            <button onClick={() => handleEdit("interest")}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                  stroke="#ccc"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z"
                  stroke="#ccc"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <div className="flex items-center justify-between bg-white p-4 rounded-lg">
            <div className="flex items-center gap-2">
              <span className="text-black font-medium">오늘의 컨디션</span>
              <span className="text-gray-400">최고</span>
            </div>
            <button onClick={() => handleEdit("condition")}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                  stroke="#ccc"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z"
                  stroke="#ccc"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Medication Section */}
        <div className="bg-white p-4 rounded-lg space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-black font-medium">복용 중인 약 리스트</span>
            <button onClick={() => handleEdit("medication")}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                  stroke="#ccc"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z"
                  stroke="#ccc"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <div className="space-y-2">
            <div className="text-gray-400">수면제(멜라토닌)</div>
            <div className="text-gray-400">항우울제(플루옥세틴)</div>
            <div className="text-gray-400">비정형 항정신병약(리스페리돈)</div>
            <div className="text-gray-400">항경련제(발프로산)</div>
          </div>
        </div>

        {/* AI Analysis Button */}
        <div className="bg-[#E87F00] text-white p-4 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-medium">AI 분석 레포트</h3>
            <div className="flex items-center gap-1 text-sm">
              <span>전체보기</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 18L15 12L9 6"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <span>•</span>
              <span>돌발 행동 15% 감소, 핵심은 '투약 관리' 💊</span>
            </div>
            <div className="flex items-center gap-2">
              <span>•</span>
              <span>
                전반적으로 안정적이나 주말 수면 패턴에 주의가 필요합니다.
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span>•</span>
              <span>2월을 위한 '아침 식사 변경' 제안</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
