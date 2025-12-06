<template>
  <div class="join flex justify-center items-center my-4">
    <button
      v-for="(_, idx) in new Array(pageCount)"
      :class="`join-item btn btn-lg ${
        currentPage === idx + 1 ? 'btn-active' : ''
      }`"
      @click="handlePageChange(idx + 1)"
    >
      {{ idx + 1 }}
    </button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

defineProps(["currentPage", "pageCount"]);

const router = useRouter();

function handlePageChange(page) {
  router.push({ query: { page } });
}
</script>

<style lang="scss" scoped></style>
