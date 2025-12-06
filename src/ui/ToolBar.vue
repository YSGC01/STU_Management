<template>
  <div class="my-4 grid grid-cols-4">
    <!-- 搜索标签 -->
    <section class="col-span-1">
      <searchCondition
        v-if="isStudentList"
        v-for="(condition, idx) in studentSearchCondition"
        :key="idx"
        :onDelete="() => onDelete(idx)"
        >{{ condition }}</searchCondition
      >
      <searchCondition
        v-if="!isStudentList"
        v-for="(condition, idx) in scoreSearchCondition"
        :key="idx"
        :onDelete="() => onDelete(idx)"
        >{{ condition }}</searchCondition
      >
    </section>

    <!-- 搜索框 -->
    <div class="col-span-2">
      <label class="input w-3/5 flex items-center mx-auto">
        <input
          type="search"
          class="grow"
          placeholder="Search"
          v-model="searchString"
          @keydown.enter="onSearch"
        />
        <svg
          class="h-[1em] opacity-50 cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          @click="onSearch"
        >
          <g
            stroke-linejoin="round"
            stroke-linecap="round"
            stroke-width="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
      </label>
    </div>

    <!-- 按钮 -->
    <div class="col-span-1 text-center">
      <button class="btn btn-neutral" @click="onClick" v-if="!isStudent">
        {{ route.name === "score" ? "Upload Score" : "Add Student" }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useSearchStore } from "@/stores/search";
import { storeToRefs } from "pinia";

import { useToast } from "vue-toastification";

import searchCondition from "@/ui/searchCondition.vue";

const searchStore = useSearchStore();
const { isStudent } = storeToRefs(searchStore);

const route = useRoute();
const router = useRouter();
const store = useSearchStore();
const { studentSearchCondition, scoreSearchCondition } = storeToRefs(store);
const toast = useToast();

const isStudentList = computed(() => route.name === "student");

function onClick() {
  if (route.name === "score") {
    router.push({ name: "score-upload" });
  } else {
    router.push({ name: "student-add" });
  }
}

const searchString = ref("");
function onSearch() {
  if (!searchString.value) {
    toast.warning("搜索内容不能为空！");
    return;
  }

  if (isStudentList.value) {
    studentSearchCondition.value = [
      ...studentSearchCondition.value,
      searchString.value.toLowerCase(),
    ];
  } else {
    scoreSearchCondition.value = [
      ...scoreSearchCondition.value,
      searchString.value.toLowerCase(),
    ];
  }

  searchString.value = "";
}

function onDelete(idx) {
  if (isStudentList.value) {
    studentSearchCondition.value.splice(idx, 1);
  } else {
    scoreSearchCondition.value.splice(idx, 1);
  }
}
</script>

<style lang="scss" scoped></style>
