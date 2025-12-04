<template>
  <Loading v-show="isLoading" />

  <fieldset
    class="fieldset bg-base-300 border-base-300 rounded-box w-xs border p-4 mx-auto mt-20 shadow-md"
    v-show="!isLoading"
  >
    <legend class="fieldset-legend">Update Score</legend>

    <h1 class="text-center text-3xl">{{ currentStudent.name }}</h1>

    <label class="label">Class</label>
    <input
      type="text"
      class="input"
      :value="`Class ${currentStudent.class} | Year ${currentStudent.grade}`"
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
        <option>Full</option>
      </select>
    </div>

    <button class="btn btn-neutral mt-4" @click="onClick">Update Score</button>
  </fieldset>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useToast } from "vue-toastification";

import Loading from "@/ui/loading.vue";

import { getScoreById, updateScore } from "@/services/apiScore";
import { getStudentById } from "@/services/apiStudent";
import { toastInjectionKey } from "vue-toastification";

const route = useRoute();
const router = useRouter();
const toast = useToast();

const currentStudent = ref({
  name: "",
  class: "",
  grade: "",
});

const score = ref(0);
const subject = ref("Mathmatics");
const semesterSeason = ref("Spring");
const semesterYear = ref(new Date().getFullYear());

const yearList = Array.from(
  { length: new Date().getFullYear() - 2000 + 1 },
  (_, index) => 2000 + index
);

async function onClick() {
  toast.info("Updating score...");

  const newScore = {
    score: score.value,
    subject: subject.value,
    semesterSeason: semesterSeason.value,
    semesterYear: semesterYear.value,
  };
  const updatedScore = await updateScore(route.params.id, newScore);
  console.log(updatedScore);

  toast.clear();
  toast.success("Score updated successfully!");
  router.push({ name: "score" });
}

const isLoading = ref(true);

onMounted(async () => {
  isLoading.value = true;

  const scores = await getScoreById(route.params.id);
  const scoreData = scores[0];

  score.value = scoreData.score;
  subject.value = scoreData.subject;
  semesterSeason.value = scoreData.semesterSeason;
  semesterYear.value = scoreData.semesterYear;

  const student = await getStudentById(scoreData.student_id);
  currentStudent.value = student;

  isLoading.value = false;
});
</script>

<style lang="scss" scoped></style>
