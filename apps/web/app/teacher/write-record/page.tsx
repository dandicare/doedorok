"use client";

import { useState } from "react";
import { ToggleChip } from "../../../src/ui/toggle-chip";
import { Button } from "../../../src/ui/button";
import { Textarea } from "../../../src/ui/textarea";

export default function WriteRecordPage() {
  const [attendance, setAttendance] = useState<string>("");
  const [mood, setMood] = useState<string>("");
  const [activities, setActivities] = useState<string[]>([]);
  const [dailyMood, setDailyMood] = useState<string>("");
  const [specialNotes, setSpecialNotes] = useState<string>("");

  const handleAttendanceToggle = (item: string, isActive: boolean) => {
    if (isActive) {
      setAttendance(item);
    } else {
      setAttendance("");
    }
  };

  const handleMoodToggle = (item: string, isActive: boolean) => {
    if (isActive) {
      setMood(item);
    } else {
      setMood("");
    }
  };

  const handleActivityToggle = (activity: string, isActive: boolean) => {
    if (isActive) {
      setActivities((prev) => [...prev, activity]);
    } else {
      setActivities((prev) => prev.filter((a) => a !== activity));
    }
  };

  const handleDailyMoodToggle = (item: string, isActive: boolean) => {
    if (isActive) {
      setDailyMood(item);
    } else {
      setDailyMood("");
    }
  };

  const handleSubmit = () => {
    console.log({
      attendance,
      mood,
      activities,
      dailyMood,
      specialNotes,
    });
  };

  const isFormValid = attendance && mood && activities.length > 0 && dailyMood;

  return (
    <div className="min-h-screen bg-[#F5F5F5] p-6 font-sans pb-32">
      {/* 출결사항 */}
      <h1 className="typo-title-s text-black mb-6">출결사항</h1>

      {/* 출결 여부 카드 */}
      <div className="bg-white rounded-2xl p-6 mb-4 shadow-sm border border-[#E0E0E0]">
        <p className="typo-body-m-r text-[#666] mb-4">출결 여부</p>
        <div className="grid grid-cols-4 gap-1">
          {["출석", "결석", "지각", "조퇴"].map((item) => (
            <ToggleChip
              key={item}
              text={item}
              defaultActive={attendance === item}
              className="justify-center"
              onToggle={(isActive) => handleAttendanceToggle(item, isActive)}
            />
          ))}
        </div>
      </div>

      {/* 당일 기분 카드 */}
      <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm border border-[#E0E0E0]">
        <p className="typo-body-m-r text-[#666] mb-4">당일 기분</p>
        <div className="grid grid-cols-4 gap-1">
          {["좋음", "평온", "무표정", "짜증/울음"].map((item) => (
            <ToggleChip
              key={item}
              text={item}
              defaultActive={mood === item}
              className="justify-center"
              onToggle={(isActive) => handleMoodToggle(item, isActive)}
            />
          ))}
        </div>
      </div>

      {/* 수업 및 활동 성취도 */}
      <h2 className="typo-title-s text-black mb-6">수업 및 활동 성취도</h2>

      {/* 주요 활동 카드 */}
      <div className="bg-white rounded-2xl p-6 mb-4 shadow-sm border border-[#E0E0E0]">
        <p className="typo-body-m-r text-[#666] mb-4">주요 활동</p>
        <div className="grid grid-cols-4 gap-1">
          {[
            { text: "체육", icon: "⚽" },
            { text: "창작", icon: "🎨" },
            { text: "감각통합", icon: "🧩" },
            { text: "교과수업", icon: "📚" },
          ].map((item) => (
            <ToggleChip
              key={item.text}
              icon={item.icon}
              text={item.text}
              defaultActive={activities.includes(item.text)}
              className="justify-center text-[10px]"
              variant="activity"
              onToggle={(isActive) => handleActivityToggle(item.text, isActive)}
            />
          ))}
        </div>
      </div>

      {/* 당일 기분 카드 */}
      <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm border border-[#E0E0E0]">
        <p className="typo-body-m-r text-[#666] mb-4">당일 기분</p>
        <div className="grid grid-cols-4 gap-1">
          {["거부/이탈", "적극적", "소극적", "보통"].map((item) => (
            <ToggleChip
              key={item}
              text={item}
              defaultActive={dailyMood === item}
              className="justify-center"
              onToggle={(isActive) => handleDailyMoodToggle(item, isActive)}
            />
          ))}
        </div>
      </div>

      {/* 특이사항 */}
      <h2 className="typo-title-s text-black mb-6">특이사항(선택)</h2>
      <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm border border-[#E0E0E0]">
        <Textarea
          placeholder="수업을 위해서 편소와 다른 점을 발견한 경우 기입해주세요."
          value={specialNotes}
          onChange={(e) => setSpecialNotes(e.target.value)}
          rows={6}
          className="w-full border-0 bg-transparent p-0 resize-none focus:ring-0 text-[#666] placeholder:text-[#999]"
        />
      </div>

      {/* 제출 버튼 */}
      <div className="fixed bottom-6 left-6 right-6">
        <Button
          onClick={handleSubmit}
          disabled={!isFormValid}
          className={`w-full ${
            isFormValid
              ? "bg-[#323232] text-white"
              : "bg-[#D9D9D9] text-white cursor-not-allowed"
          }`}
        >
          수업 후 기록이 끝났어요
        </Button>
      </div>
    </div>
  );
}
