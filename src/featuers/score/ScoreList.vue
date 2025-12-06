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
          v-for="scoreItem in paginatedScores"
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
  <Pagination v-show="!isLoading" :currentPage :pageCount />
</template>

<script setup>
import { onMounted, ref, computed, watch } from "vue";
import { useUserStore } from "@/stores/user.js";
import { useSearchStore } from "@/stores/search.js";
import { storeToRefs } from "pinia";
import { useRouter, useRoute } from "vue-router";

import ScoreListItem from "./ScoreListItem.vue";
import Loading from "@/ui/loading.vue";
import Pagination from "@/ui/Pagination.vue";

import { getStudentById, getStudentList } from "@/services/apiStudent.js";
import { getScoreList } from "@/services/apiScore.js";
import { getUserId } from "@/utils/userHelper";
import { getConfig } from "@/utils/configHelper";

const scoreList = ref([]);
const students = ref([]);

const route = useRoute();
const router = useRouter();

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

const currentPage = ref(1);
const pageSize = getConfig("PAGE_SIZE");
const pageCount = computed(() => {
  return Math.ceil(filteredBySearchScores.value.length / pageSize);
});

const paginatedScores = computed(() => {
  const startIdx = (currentPage.value - 1) * pageSize;
  return filteredBySearchScores.value.slice(startIdx, startIdx + pageSize);
});

watch(
  () => currentPage.value,
  (newPage) => {
    router.push({ query: { page: newPage } });
  }
);

watch(
  () => route.query.page,
  (newPage) => {
    const pageNumber = parseInt(newPage) || 1;
    if (pageNumber >= 1 && pageNumber <= pageCount.value) {
      currentPage.value = pageNumber;
    } else {
      currentPage.value = 1;
    }
  },
  { immediate: true }
);

const isLoading = ref(true);

onMounted(async () => {
  router.push({ query: { page: currentPage.value } });

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
