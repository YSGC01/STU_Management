<template>
  <fieldset
    class="fieldset bg-base-300 border-base-300 rounded-box w-xs border p-4 mx-auto mt-20 shadow-md"
  >
    <legend class="fieldset-legend">Signup</legend>

    <h1 class="text-center text-3xl">Sunshine</h1>

    <label class="label">Email</label>
    <input type="text" class="input" placeholder="Email" v-model="email" />

    <label class="label">Password</label>
    <input
      type="password"
      class="input"
      placeholder="Password"
      v-model="password"
    />
    <label class="label">Confirm Password</label>
    <input
      type="password"
      class="input"
      placeholder="Confirm Password"
      v-model="confirmPassword"
    />

    <!-- 表单校验 -->
    <button class="btn btn-neutral mt-4" @click="onClick">Signup</button>
    <button
      class="btn btn-neutral btn-soft mt-4"
      @click="router.push({ name: 'login' })"
    >
      Login
    </button>
  </fieldset>
</template>

<script setup>
import { ref } from "vue";

import { signUp } from "@/services/apiAuth";
import router from "@/router";
import { createTeacher } from "@/services/apiTeacher";

const email = ref("");
const password = ref("");
const confirmPassword = ref("");

async function onClick() {
  const data = await signUp(email.value, password.value);
  console.log(data);

  const teacherId = data.user.id;
  await createTeacher({ teacher_id: teacherId });
}
</script>

<style lang="scss" scoped></style>
