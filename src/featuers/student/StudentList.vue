<template>
  <Loading v-show="isLoading" />

  <div class="overflow-x-auto" v-show="!isLoading">
    <table class="table table-lg">
      <!-- head -->
      <thead>
        <tr>
          <th>
            <label>
              <input type="checkbox" class="checkbox" />
            </label>
          </th>
          <th>Name</th>
          <th>Class</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <!-- 列表项 -->
        <StudentListItem
          v-for="studentItem in paginatedStudents"
          :key="studentItem.id"
          :studentItem
        />
      </tbody>
    </table>
  </div>
  <Pagination v-show="!isLoading" :currentPage :pageCount />
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { storeToRefs } from "pinia";
import { useSearchStore } from "@/stores/search";
import { useRouter, useRoute } from "vue-router";

import StudentListItem from "./StudentListItem.vue";
import Loading from "@/ui/loading.vue";
import Pagination from "@/ui/Pagination.vue";

import {
  getPaginatedStudentList,
  getStudentCount,
} from "@/services/apiStudent";
import { getUserId } from "@/utils/userHelper";

const studentList = ref([]);

const route = useRoute();
const router = useRouter();

const searchStore = useSearchStore();
const { studentSearchCondition } = storeToRefs(searchStore);

const filteredStudents = computed(() => {
  if (studentSearchCondition.value.length === 0) {
    return studentList.value;
  } else {
    return studentList.value.filter((student) => {
      const studentInfoJSON = JSON.stringify([
        student.name,
        student.gender,
        student.class,
        student.grade,
      ]);

      for (const condition of studentSearchCondition.value) {
        if (!studentInfoJSON.toLowerCase().includes(condition.toLowerCase())) {
          return false;
        }
      }

      return true;
    });
  }
});

const currentPage = ref(1);
const pageSize = 3; // 暂定为3，后续再加点数据
const studentCount = ref(0);
const pageCount = computed(() => {
  return Math.ceil(studentCount.value / pageSize);
});

const paginatedStudents = computed(() => {
  return filteredStudents.value;
});

const isLoading = ref(true);

async function fetchData() {
  isLoading.value = true;

  const teacherId = getUserId();

  studentList.value = await getPaginatedStudentList(
    teacherId,
    currentPage.value,
    pageSize
  );

  isLoading.value = false;
}

watch(
  () => currentPage.value,
  (newPage) => {
    fetchData();
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

onMounted(async () => {
  const userId = getUserId();
  router.push({ query: { page: currentPage.value } });

  await fetchData();
  studentCount.value = await getStudentCount(userId);
});
</script>

<style lang="scss" scoped></style>
