<template>
  <Loading v-show="isLoading" />

  <div class="overflow-x-auto" v-show="!isLoading">
    <table class="table table-lg">
      <thead>
        <tr>
          <th>Name</th>
          <th>Class</th>
          <th>Subject</th>
          <th>Term</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        <ScoreListItem
          v-for="scoreItem in filteredScores"
          :key="scoreItem.id"
          :scoreItem
          :currentStudent="
            students.find(
              (student) => student.student_id === scoreItem.student_id
            )
          "
        />
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";

import Loading from "@/ui/loading.vue";

import { getStudentList } from "@/services/apiStudent.js";
import { getScoreList } from "@/services/apiScore.js";
import ScoreListItem from "./ScoreListItem.vue";
import { getConfig } from "@/utils/configHelper";

const scoreList = ref([]);
const students = ref([]);

const filteredScores = computed(() => {
  return scoreList.value.filter((score) =>
    students.value.some((student) => student.student_id === score.student_id)
  );
});

const isLoading = ref(true);

onMounted(async () => {
  isLoading.value = true;

  scoreList.value = await getScoreList();

  const token = getConfig("SUPABASE_TOKEN");
  const userToken = JSON.parse(localStorage.getItem(token));
  const teacherId = userToken.user.id;

  students.value = await getStudentList(teacherId);

  isLoading.value = false;
});
</script>

<style lang="scss" scoped></style>
