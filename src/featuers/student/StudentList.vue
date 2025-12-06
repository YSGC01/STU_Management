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
          v-for="studentItem in filteredStudents"
          :key="studentItem.id"
          :studentItem
        />
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useSearchStore } from "@/stores/search";

import StudentListItem from "./StudentListItem.vue";

import { getStudentList } from "@/services/apiStudent";
import { getConfig } from "@/utils/configHelper";
import Loading from "@/ui/loading.vue";

const studentList = ref([]);

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

const isLoading = ref(true);

onMounted(async () => {
  isLoading.value = true;

  const token = getConfig("SUPABASE_TOKEN");
  const userToken = JSON.parse(localStorage.getItem(token));
  const teacherId = userToken.user.id;

  studentList.value = await getStudentList(teacherId);

  isLoading.value = false;
});
</script>

<style lang="scss" scoped></style>
