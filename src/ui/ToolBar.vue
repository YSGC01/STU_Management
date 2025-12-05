<template>
  <div class="my-4 grid grid-cols-4">
    <!-- 搜索标签 -->
    <section class="col-span-1">
      <div class="badge badge-neutral mx-1 mb-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="inline-block w-4 h-4 stroke-current cursor-pointer transition hover:rotate-180 hover:scale-140 duration-300 ease-in-out"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
        Neutral
      </div>
      <div class="badge badge-info mx-1 mb-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="inline-block w-4 h-4 stroke-current cursor-pointer transition hover:rotate-180 hover:scale-140 duration-300 ease-in-out"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
        Info
      </div>
    </section>

    <!-- 搜索框 -->
    <div class="col-span-2">
      <label class="input w-3/5 flex items-center mx-auto">
        <input type="search" class="grow" placeholder="Search" />
        <svg
          class="h-[1em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
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
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const { isStudent } = storeToRefs(userStore);

const route = useRoute();
const router = useRouter();

function onClick() {
  if (route.name === "score") {
    router.push({ name: "score-upload" });
  } else {
    router.push({ name: "student-add" });
  }
}
</script>

<style lang="scss" scoped></style>
