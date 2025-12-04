import { supabase } from "@/utils/supabase.js";

export async function getScoreList() {
  const { data: score, error } = await supabase.from("score").select("*");

  if (error) {
    console.error("Error fetching score data:", error);
    return;
  }

  return score;
}

export async function createScore(newScore) {
  const { data, error } = await supabase
    .from("score")
    .insert([newScore])
    .select();

  if (error) {
    console.error("Error creating score:", error);
    return;
  }

  return data;
}

export async function getScoreById(id) {
  const { data: score, error } = await supabase
    .from("score")
    .select("*")
    .eq("id", id);

  if (error) {
    console.error("Error fetching score data:", error);
    return;
  }

  return score;
}

export async function updateScore(id, newScore) {
  const { data, error } = await supabase
    .from("score")
    .update(newScore)
    .eq("id", id)
    .select();

  if (error) {
    console.error("Error updating score:", error);
    return;
  }

  return data;
}

const FAKE_SCORE_LIST = [
  {
    id: 1,
    name: "John Doe",
    class: "Class 1 | Year 9",
    subject: "Mathematics",
    semester: "Fall 2024",
    score: 95,
  },
  {
    id: 2,
    name: "Jane Smith",
    class: "Class 2 | Year 9",
    subject: "Science",
    semester: "Fall 2024",
    score: 88,
  },
  {
    id: 3,
    name: "Emily Zhang",
    class: "Class 1 | Year 10",
    subject: "English",
    semester: "Spring 2024",
    score: 92,
  },
  {
    id: 4,
    name: "Michael Li",
    class: "Class 3 | Year 10",
    subject: "History",
    semester: "Spring 2024",
    score: 85,
  },
  {
    id: 5,
    name: "Sophia Wang",
    class: "Class 1 | Year 11",
    subject: "Physics",
    semester: "Fall 2024",
    score: 90,
  },
  {
    id: 6,
    name: "David Chen",
    class: "Class 2 | Year 9",
    subject: "Mathematics",
    semester: "Spring 2024",
    score: 91,
  },
  {
    id: 7,
    name: "Olivia Brown",
    class: "Class 1 | Year 9",
    subject: "Science",
    semester: "Spring 2024",
    score: 89,
  },
  {
    id: 8,
    name: "Liam Davis",
    class: "Class 1 | Year 10",
    subject: "History",
    semester: "Fall 2024",
    score: 84,
  },
  {
    id: 9,
    name: "Ava Miller",
    class: "Class 3 | Year 10",
    subject: "Physics",
    semester: "Spring 2024",
    score: 93,
  },
  {
    id: 10,
    name: "Ethan Wilson",
    class: "Class 2 | Year 11",
    subject: "Mathematics",
    semester: "Fall 2024",
    score: 86,
  },
  {
    id: 11,
    name: "Mia Johnson",
    class: "Class 1 | Year 10",
    subject: "English",
    semester: "Spring 2024",
    score: 95,
  },
  {
    id: 12,
    name: "Lucas Rodriguez",
    class: "Class 3 | Year 9",
    subject: "Science",
    semester: "Fall 2024",
    score: 82,
  },
  {
    id: 13,
    name: "Charlotte Lee",
    class: "Class 2 | Year 10",
    subject: "History",
    semester: "Spring 2024",
    score: 90,
  },
  {
    id: 14,
    name: "Amelia Harris",
    class: "Class 1 | Year 11",
    subject: "Physics",
    semester: "Fall 2024",
    score: 87,
  },
  {
    id: 15,
    name: "Benjamin Clark",
    class: "Class 3 | Year 11",
    subject: "English",
    semester: "Spring 2024",
    score: 94,
  },
];
