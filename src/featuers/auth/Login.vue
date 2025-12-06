<template>
  <Loading v-show="isLoading" />

  <fieldset
    class="fieldset bg-base-300 border-base-300 rounded-box w-xs border p-4 mx-auto mt-20 shadow-md"
    v-show="!isLoading"
  >
    <legend class="fieldset-legend">Login</legend>

    <h1 class="text-center text-3xl">Sunshine</h1>

    <label class="label">Email</label>
    <input
      type="text"
      class="input"
      placeholder="Email"
      v-model="email"
      :disabled="isLogging"
    />

    <label class="label">Password</label>
    <input
      type="password"
      class="input"
      placeholder="Password"
      v-model="password"
      :disabled="isLogging"
      @keydown.enter="onClick"
    />

    <label class="label mt-2 justify-between">
      <div>
        <input type="checkbox" checked="checked" class="checkbox" />
        <span class="ml-1"> Remember me </span>
      </div>
      <button class="btn btn-link btn-sm">Forgot password?</button>
    </label>

    <button class="btn btn-neutral mt-4" @click="onClick" :disabled="isLogging">
      Login
    </button>
    <button
      class="btn btn-neutral btn-soft mt-4"
      @click="router.push({ name: 'signup' })"
      :disabled="isLogging"
    >
      Signup
    </button>
  </fieldset>
</template>

<script setup>
import { ref } from "vue";

import { useToast } from "vue-toastification";

import { signIn } from "@/services/apiAuth";
import { useRouter } from "vue-router";

const router = useRouter();
const toast = useToast();

const email = ref("");
const password = ref("");

const isLogging = ref(false);

async function onClick() {
  // 禁用按钮和输入
  isLogging.value = true;

  // 开始登录
  const data = await signIn(email.value, password.value);

  if (data) {
    router.push("/");
    toast.success("登录成功！");
  } else {
    isLogging.value = false;
    toast.error("登录失败。请检查您的邮箱和密码！");
  }
}
</script>

<style lang="scss" scoped></style>
