<template>
  <NavBar />
  <ToolBar v-show="showToolBar" />
  <RouterView />
</template>

<script setup>
import { RouterView, useRoute } from "vue-router";
import { computed } from "vue";

import NavBar from "@/ui/NavBar.vue";
import ToolBar from "@/ui/ToolBar.vue";

const route = useRoute();
const showToolBar = computed(
  () => route.name === "score" || route.name === "student"
);
</script>
