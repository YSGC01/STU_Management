<template>
  <div class="badge badge-neutral mx-1 mb-1">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      class="inline-block w-4 h-4 stroke-current cursor-pointer transition hover:rotate-180 hover:scale-140 duration-300 ease-in-out"
      @click="onDelete"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M6 18L18 6M6 6l12 12"
      ></path>
    </svg>
    <slot></slot>
  </div>
</template>

<script setup>
defineProps(["onDelete"]);
</script>

<style lang="scss" scoped></style>
