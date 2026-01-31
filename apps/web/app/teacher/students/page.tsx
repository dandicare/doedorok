"use client";
import { StudentList } from "../../../src/ui/student-list";

const sampleStudents = [
  {
    id: "1",
    name: "김철수",
    gender: "남",
    age: 8,
    department: "자폐 스펙트럼",
    school: "단디초등학교",
    grade: "1학년",
    class: "1반",
  },
  {
    id: "2",
    name: "이영희",
    gender: "여",
    age: 9,
    department: "ADHD",
    school: "우리초등학교",
    grade: "2학년",
    class: "3반",
  },
  {
    id: "3",
    name: "박지민",
    gender: "남",
    age: 11,
    department: "지적장애",
    school: "미래초등학교",
    grade: "4학년",
    class: "2반",
  },
  {
    id: "4",
    name: "최하은",
    gender: "여",
    age: 7,
    department: "언어발달지연",
    school: "단디유치원",
    grade: "햇살반",
    class: "A반",
  },
  {
    id: "5",
    name: "정다운",
    gender: "남",
    age: 13,
    department: "학습장애",
    school: "푸른중학교",
    grade: "1학년",
    class: "5반",
  },
  {
    id: "6",
    name: "윤서아",
    gender: "여",
    age: 8,
    department: "자폐 스펙트럼",
    school: "단디초등학교",
    grade: "1학년",
    class: "2반",
  },
  {
    id: "7",
    name: "강건우",
    gender: "남",
    age: 10,
    department: "사회적 의사소통 장애",
    school: "중앙초등학교",
    grade: "3학년",
    class: "1반",
  },
  {
    id: "8",
    name: "한예슬",
    gender: "여",
    age: 12,
    department: "청각장애",
    school: "남산초등학교",
    grade: "5학년",
    class: "4반",
  },
  {
    id: "9",
    name: "오진혁",
    gender: "남",
    age: 9,
    department: "뇌병변장애",
    school: "우리초등학교",
    grade: "2학년",
    class: "2반",
  },
  {
    id: "10",
    name: "임유나",
    gender: "여",
    age: 11,
    department: "정서행동장애",
    school: "미래초등학교",
    grade: "4학년",
    class: "6반",
  },
];

export default function TeacherStudentsPage() {
  return (
    <StudentList
      students={sampleStudents}
      onStudentClick={(student) => {
        console.log("Selected student:", student);
      }}
      onFilterChange={(filter) => {
        console.log("Filter changed:", filter);
      }}
    />
  );
}
