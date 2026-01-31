"use client";
import { StudentList } from "../../../src/ui/student-list";

const sampleStudents = [
  {
    id: "1",
    name: "김단디 남 8",
    department: "자폐 스펙트럼",
    school: "단디초등학교",
    grade: "1학년",
    class: "1반",
  },
  {
    id: "2",
    name: "김단디 남 8",
    department: "자폐 스펙트럼",
    school: "단디초등학교",
    grade: "1학년",
    class: "1반",
  },
  {
    id: "3",
    name: "김단디 남 8",
    department: "자폐 스펙트럼",
    school: "단디초등학교",
    grade: "1학년",
    class: "1반",
  },
  {
    id: "4",
    name: "김단디 남 8",
    department: "자폐 스펙트럼",
    school: "단디초등학교",
    grade: "1학년",
    class: "1반",
  },
  {
    id: "5",
    name: "김단디 남 8",
    department: "자폐 스펙트럼",
    school: "단디초등학교",
    grade: "1학년",
    class: "1반",
  },
  {
    id: "6",
    name: "김단디 남 8",
    department: "자폐 스펙트럼",
    school: "단디초등학교",
    grade: "1학년",
    class: "1반",
  },
  {
    id: "7",
    name: "김단디 남 8",
    department: "자폐 스펙트럼",
    school: "단디초등학교",
    grade: "1학년",
    class: "1반",
  },
  {
    id: "8",
    name: "김단디 남 8",
    department: "자폐 스펙트럼",
    school: "단디초등학교",
    grade: "1학년",
    class: "1반",
  },
  {
    id: "9",
    name: "김단디 남 8",
    department: "자폐 스펙트럼",
    school: "단디초등학교",
    grade: "1학년",
    class: "1반",
  },
  {
    id: "10",
    name: "김단디 남 8",
    department: "자폐 스펙트럼",
    school: "단디초등학교",
    grade: "1학년",
    class: "1반",
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
