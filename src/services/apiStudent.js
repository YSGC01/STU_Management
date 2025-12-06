import { faker } from "@faker-js/faker";
import { supabase } from "../utils/supabase.js";

export async function getStudentList(teacherId) {
  const { data: student, error } = await supabase
    .from("student")
    .select("*")
    .eq("teacher_id", teacherId);

  if (error) {
    console.error("Error fetching student data:", error);
    return;
  }

  return student;
}

export async function getPaginatedStudentList(
  teacherId,
  currentPage,
  pageSize
) {
  const { data: student, error } = await supabase
    .from("student")
    .select("*")
    .eq("teacher_id", teacherId)
    .range((currentPage - 1) * pageSize, currentPage * pageSize - 1);

  if (error) {
    console.error("Error fetching student data:", error);
    return;
  }

  return student;
}

export async function getStudentCount(teacherId) {
  const { count, error } = await supabase
    .from("student")
    .select("*", { count: "exact", head: true })
    .eq("teacher_id", teacherId);

  if (error) {
    console.error("Error fetching student data:", error);
    return;
  }

  return count;
}

export async function addStudent(studentData) {
  const { data, error } = await supabase
    .from("student")
    .insert([studentData])
    .select();

  if (error) {
    console.error("Error creating student:", error);
    return;
  }

  return data;
}

export async function getStudentById(studentId) {
  const { data: student, error } = await supabase
    .from("student")
    .select("*")
    .eq("student_id", studentId);

  if (error) {
    console.error("Error fetching student data:", error);
    return;
  }

  // 直接返回单个学生对象
  return student[0];
}

export async function updateStudent(student_id, newStudent) {
  const { data, error } = await supabase
    .from("student")
    .update(newStudent)
    .eq("student_id", student_id)
    .select();

  if (error) {
    console.error("Error updating student:", error);
    return;
  }

  return data;
}

const FAKE_STUDENT_LIST = [
  {
    id: "1",
    name: "John Doe",
    class: "class 1 | year 9",
    gender: "male",
    teacher: "mr. smith",
  },
  {
    id: "2",
    name: "Jane Smith",
    class: "class 2 | year 10",
    gender: "female",
    teacher: "mrs. johnson",
  },
  {
    id: "3",
    name: "Michael Brown",
    class: "class 1 | year 9",
    gender: "male",
    teacher: "mr. wilson",
  },
  {
    id: "4",
    name: "Emily Davis",
    class: "class 3 | year 11",
    gender: "female",
    teacher: "mr. anderson",
  },
  {
    id: "5",
    name: "Chris Lee",
    class: "class 2 | year 10",
    gender: "male",
    teacher: "mrs. clark",
  },
  {
    id: "6",
    name: "Sophie White",
    class: "class 1 | year 9",
    gender: "female",
    teacher: "mr. smith",
  },
  {
    id: "7",
    name: "Liam Harris",
    class: "class 3 | year 11",
    gender: "male",
    teacher: "mrs. davis",
  },
  {
    id: "8",
    name: "Olivia Scott",
    class: "class 2 | year 10",
    gender: "female",
    teacher: "mr. taylor",
  },
  {
    id: "9",
    name: "Ethan Miller",
    class: "class 3 | year 11",
    gender: "male",
    teacher: "mr. anderson",
  },
  {
    id: "10",
    name: "Ava Johnson",
    class: "class 1 | year 9",
    gender: "female",
    teacher: "mrs. clark",
  },
];
