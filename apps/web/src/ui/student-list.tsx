"use client";
import React from "react";
import { cn } from "tailwind-variants";

interface Student {
  id: string;
  name: string;
  department: string;
  school: string;
  grade: string;
  class: string;
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
    <div className="w-full max-w-md mx-auto bg-gray-50 min-h-screen">
      {/* Filter Dropdown */}
      <div className="p-4 bg-white">
        <select
          value={selectedFilter}
          onChange={(e) => onFilterChange?.(e.target.value)}
          className="w-full p-3 text-gray-600 bg-transparent border-none outline-none text-right"
        >
          <option value="이름순으로 정렬">이름순으로 정렬</option>
          <option value="학년순으로 정렬">학년순으로 정렬</option>
          <option value="학과순으로 정렬">학과순으로 정렬</option>
        </select>
      </div>

      {/* Student List */}
      <div className="space-y-3 p-4">
        {students.map((student) => (
          <div
            key={student.id}
            onClick={() => onStudentClick?.(student)}
            className={cn(
              "flex items-center p-4 bg-white rounded-xl shadow-sm",
              "cursor-pointer hover:shadow-md transition-shadow"
            )}
          >
            {/* Avatar */}
            <div className="w-16 h-16 bg-gray-200 rounded-xl mr-4 flex-shrink-0">
              <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 rounded-xl opacity-30" />
            </div>

            {/* Student Info */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {student.name}
              </h3>
              <p className="text-sm text-gray-600 mb-1">
                {student.department}
              </p>
              <p className="text-sm text-gray-500">
                {student.school} {student.grade} {student.class}
              </p>
            </div>

            {/* Arrow */}
            <div className="text-gray-400 ml-2">
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
  );
}