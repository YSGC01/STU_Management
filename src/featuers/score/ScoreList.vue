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
          v-for="scoreItem in filteredBySearchScores"
          :key="scoreItem.id"
          :scoreItem
          :currentStudent="
            students.find(
              (student) => student.student_id === scoreItem.student_id
            )
          "
          v-if="students.length > 0"
        />
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";

import Loading from "@/ui/loading.vue";
import { useUserStore } from "@/stores/user.js";
import { useSearchStore } from "@/stores/search.js";
import { storeToRefs } from "pinia";

import ScoreListItem from "./ScoreListItem.vue";

import { getStudentById, getStudentList } from "@/services/apiStudent.js";
import { getScoreList } from "@/services/apiScore.js";
import { getUserId } from "@/utils/userHelper";

const scoreList = ref([]);
const students = ref([]);

const searchStore = useSearchStore();
const { scoreSearchCondition } = storeToRefs(searchStore);
const userStore = useUserStore();
const { isStudent } = storeToRefs(userStore);
const userId = getUserId();

const filteredScores = computed(() => {
  if (isStudent.value) {
    return scoreList.value.filter(
      (scoreItem) => scoreItem.student_id === userId
    );
  } else {
    // 使用 some 代替 includes
    // return scoreList.value.filter((scoreItem) =>
    //   students.value.some(
    //     (student) => student.student_id === scoreItem.student_id
    //   )
    // );
    return scoreList.value.filter((scoreItem) =>
      students.value
        .map((student) => student.student_id)
        .includes(scoreItem.student_id)
    );
  }
});

const filteredBySearchScores = computed(() => {
  if (scoreSearchCondition.value.length === 0) {
    return filteredScores.value;
  } else {
    return filteredScores.value.filter((scoreItem) => {
      const scoreInfoJSON = JSON.stringify([
        scoreItem.subject,
        scoreItem.semesterSeason,
        scoreItem.semesterYear,
        scoreItem.score,
      ]);

      for (const condition of scoreSearchCondition.value) {
        if (!scoreInfoJSON.toLowerCase().includes(condition.toLowerCase())) {
          return false;
        }
      }

      return true;
    });
  }
});

const isLoading = ref(true);

onMounted(async () => {
  isLoading.value = true;

  scoreList.value = await getScoreList();

  if (!isStudent.value) {
    students.value = await getStudentList(userId);
  } else {
    const student = await getStudentById(userId);
    students.value = [student];
  }

  isLoading.value = false;
});
</script>

<style lang="scss" scoped></style>
