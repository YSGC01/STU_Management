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
          v-if="students.length > 0"
        />
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";

import Loading from "@/ui/loading.vue";

import { getStudentById, getStudentList } from "@/services/apiStudent.js";
import { getScoreList } from "@/services/apiScore.js";
import ScoreListItem from "./ScoreListItem.vue";
import { getUserId } from "@/utils/userHelper";
import { useUserStore } from "@/stores/user.js";
import { storeToRefs } from "pinia";

const scoreList = ref([]);
const students = ref([]);

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
