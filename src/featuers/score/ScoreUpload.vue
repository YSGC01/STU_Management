<template>
  <Loading v-show="isLoading" />

  <fieldset
    class="fieldset bg-base-300 border-base-300 rounded-box w-xs border p-4 mx-auto mt-20 shadow-md"
    v-show="!isLoading"
  >
    <legend class="fieldset-legend">Update Score</legend>

    <label class="label">Name</label>
    <select class="select" v-model="currentStudent">
      <option disabled selected>Choose Student</option>
      <option v-for="(student, idx) in students" :key="idx" :value="student">
        {{ student.name }}
      </option>
    </select>

    <label class="label">Student ID</label>
    <input
      type="text"
      class="input"
      placeholder="123456"
      :value="currentStudent.student_id"
      disabled
    />

    <label class="label">Class</label>
    <input
      type="text"
      class="input"
      placeholder="Class 1 | Year 9"
      :value="`Class ${currentStudent.class} | Grade ${currentStudent.grade}`"
      disabled
    />

    <label class="label">Score</label>
    <input type="number" class="input" v-model="score" min="0" max="100" />

    <label class="label">Subject</label>
    <select class="select" v-model="subject">
      <option disabled selected>Choose Subject</option>
      <option>Mathmatics</option>
      <option>Science</option>
      <option>English</option>
      <option>History</option>
      <option>Geography</option>
      <option>Physics</option>
      <option>Chemistry</option>
      <option>Biology</option>
    </select>

    <label class="label">Semester</label>
    <div class="grid grid-cols-2 gap-2">
      <select class="select" v-model="semesterYear">
        <option disabled selected>Choose Year</option>
        <option v-for="year in yearList" :key="year">{{ year }}</option>
      </select>
      <select class="select" v-model="semesterSeason">
        <option disabled selected>Choose Season</option>
        <option>Spring</option>
        <option>Fall</option>
      </select>
    </div>

    <button class="btn btn-neutral mt-4" @click="onClick">Upload Score</button>
  </fieldset>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

import Loading from "@/ui/loading.vue";

import { getStudentList } from "@/services/apiStudent";
import { getConfig } from "@/utils/configHelper";
import { createScore } from "@/services/apiScore";

const router = useRouter();
const toast = useToast();

const currentStudent = ref({
  name: "Alex",
  student_id: "123456",
  class: "x",
  grade: "x",
});

const students = ref([]);

const score = ref(0);
const subject = ref("Mathmatics");
const semesterSeason = ref("Spring");
const semesterYear = ref(new Date().getFullYear());

const yearList = Array.from(
  { length: new Date().getFullYear() - 2000 + 1 },
  (_, index) => 2000 + index
);

async function onClick() {
  toast.info("Uploading score...");

  const newScore = {
    student_id: currentStudent.value.student_id,
    score: score.value,
    subject: subject.value,
    semesterSeason: semesterSeason.value,
    semesterYear: semesterYear.value,
  };
  // console.log(newScore);
  const scores = await createScore(newScore);
  // console.log(scores);

  toast.clear();
  toast.success("Score uploaded successfully!");
  router.push({ name: "score" });
}

const isLoading = ref(true);
onMounted(async () => {
  isLoading.value = true;

  const token = getConfig("SUPABASE_TOKEN");
  const userToken = JSON.parse(localStorage.getItem(token));
  const teacherId = userToken.user.id;

  students.value = await getStudentList(teacherId);
  currentStudent.value = students.value[0];

  isLoading.value = false;
});
</script>

<style lang="scss" scoped></style>
