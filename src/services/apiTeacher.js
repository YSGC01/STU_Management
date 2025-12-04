import { supabase } from "@/utils/supabase";

export async function createTeacher(teacher) {
  const { data, error } = await supabase.from("teacher").insert([teacher]);

  if (error) {
    throw new Error(error.message);
  }
}

export async function getTeacherByTeacherId(teacherId) {
  let { data: teacher, error } = await supabase
    .from("teacher")
    .select("class_in_charge")
    // Filters
    .eq("teacher_id", teacherId);

  if (error) {
    throw new Error(error.message);
  }

  return teacher;
}
