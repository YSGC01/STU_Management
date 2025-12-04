<template>
  <div class="navbar bg-base-300 shadow-sm">
    <!-- mobile '移动端导航' -->
    <div class="navbar-start">
      <div class="dropdown">
        <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </div>
        <ul
          tabindex="-1"
          class="menu menu-sm dropdown-content bg-base-200 rounded-box z-1 mt-3 w-52 p-2 shadow"
        >
          <li>
            <a
              :class="route.name === 'score' ? 'menu-active' : ''"
              @click="router.push({ name: 'score' })"
              >Score</a
            >
          </li>
          <li>
            <a
              :class="route.name === 'student' ? 'menu-active' : ''"
              @click="router.push({ name: 'student' })"
              >Student</a
            >
          </li>
        </ul>
      </div>
      <a class="btn btn-ghost text-xl" @click="router.push('/')">Sunshine</a>
    </div>

    <!-- desktop '桌面端导航' -->
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1">
        <li>
          <a
            :class="route.name === 'score' ? 'menu-active' : ''"
            @click="router.push({ name: 'score' })"
            >Score</a
          >
        </li>
        <li>
          <a
            :class="route.name === 'student' ? 'menu-active' : ''"
            @click="router.push({ name: 'student' })"
            >Student</a
          >
        </li>
      </ul>
    </div>

    <!-- avatar '头像' -->
    <div class="navbar-end">
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img alt="Tailwind CSS Navbar component" :src="user.avatar" />
          </div>
        </div>
        <ul
          tabindex="-1"
          class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
        >
          <li><a @click="router.push({ name: 'info' })">Profile</a></li>
          <li><a @click="onClick">Logout</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

import { signOut } from "@/services/apiAuth";
import { getConfig } from "@/utils/configHelper";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

const router = useRouter();
const route = useRoute();

const userStore = useUserStore();
const { updateUser } = userStore;
const { user } = storeToRefs(userStore);
console.log(user);

function onClick() {
  signOut();
  router.push({ name: "login" });
}

onMounted(() => {
  const token = getConfig("SUPABASE_TOKEN");
  const userToken = JSON.parse(localStorage.getItem(token));
  const userMetaData = userToken?.user?.user_metadata;

  updateUser(userMetaData);
});
</script>

<style lang="scss" scoped></style>
