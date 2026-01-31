"use client";
import React from "react";
import Image from "next/image";
import { cn } from "tailwind-variants";

interface Student {
  id: string;
  name: string;
  gender: string;
  age: number;
  department: string;
  school: string;
  grade: string;
  class: string;
  avatarUrl?: string;
}

interface StudentListProps {
  students: Student[];
  selectedFilter?: string;
  onFilterChange?: (filter: string) => void;
  onStudentClick?: (student: Student) => void;
}

export function StudentList({
  students,
  selectedFilter = "이름순으로 정렬",
  onFilterChange,
  onStudentClick,
}: StudentListProps) {
  return (
    <main className="min-h-screen w-full bg-[#FAFAFA]">
      <div className="mx-auto w-full">
        {/* Filter Dropdown */}
        <div className="p-4">
          <div className="relative ml-auto w-fit">
            <select
              value={selectedFilter}
              onChange={(e) => onFilterChange?.(e.target.value)}
              className={cn(
                "appearance-none bg-transparent border-none outline-none",
                "pr-6 text-right",
                "typo-label-l text-[#a5a5a5]",
              )}
              aria-label="정렬 기준"
            >
              <option value="이름순으로 정렬">이름순으로 정렬</option>
              <option value="학년순으로 정렬">학년순으로 정렬</option>
              <option value="학과순으로 정렬">학과순으로 정렬</option>
            </select>
            <svg
              className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-[#AFAFAF]"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M6 9L12 15L18 9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Student List */}
        <div className="h-[calc(100vh-50px)] overflow-y-auto p-4 space-y-3">
          {students.map((student) => (
            <div
              key={student.id}
              onClick={() => onStudentClick?.(student)}
              className={cn(
                "flex items-center p-3 pr-5 bg-white rounded-xl shadow-sm",
                "cursor-pointer hover:shadow-md transition-shadow",
              )}
            >
              {/* Avatar */}
              <div className="w-20 h-20 bg-gray-200 rounded-lg mr-[14px] shrink-0 overflow-hidden relative">
                {student.avatarUrl ? (
                  <Image
                    src={student.avatarUrl}
                    alt={`${student.name} 프로필`}
                    fill
                    sizes="80px"
                    className="object-cover"
                    draggable={false}
                  />
                ) : (
                  <div className="w-full h-full bg-linear-to-br from-gray-300 to-gray-400 rounded-xl opacity-30" />
                )}
              </div>

              {/* Student Info */}
              <div className="flex-1">
                <h3 className="text-[#333] mb-1">
                  <span className="typo-title-s mr-1">{student.name}</span>{" "}
                  <span className="typo-body-xl-medium">
                    {student.gender} <span className="typo-body-xl-regular">{student.age}</span>
                  </span>
                </h3>
                <p className="typo-body-m-medium text-[#333] mb-0">
                  {student.department}
                </p>
                <p className="typo-body-m-medium text-[#333]">
                  {student.school} {student.grade} {student.class}
                </p>
              </div>

              {/* Arrow */}
              <div className="text-[#d9d9d9] ml-2">
                <svg
                  width="8"
                  height="14"
                  viewBox="0 0 8 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1L7 7L1 13"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
