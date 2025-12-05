<template>
  <Loading v-show="isLoading" />

  <fieldset
    class="fieldset bg-base-300 border-base-300 rounded-box w-xs border p-4 mx-auto mt-20 shadow-md"
    v-show="!isLoading"
  >
    <legend class="fieldset-legend">Login</legend>

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

    <label class="label mt-2 justify-between">
      <div>
        <input type="checkbox" checked="checked" class="checkbox" />
        <span class="ml-1"> Remember me </span>
      </div>
      <button class="btn btn-link btn-sm">Forgot password?</button>
    </label>

    <button class="btn btn-neutral mt-4" @click="onClick">Login</button>
    <button
      class="btn btn-neutral btn-soft mt-4"
      @click="router.push({ name: 'signup' })"
    >
      Signup
    </button>
  </fieldset>
</template>

<script setup>
import { ref } from "vue";

import Loading from "@/ui/loading.vue";
import { useToast } from "vue-toastification";

import { signIn } from "@/services/apiAuth";
import { useRouter } from "vue-router";

const router = useRouter();

const toast = useToast();

const email = ref("");
const password = ref("");

const isLoading = ref(false);
async function onClick() {
  isLoading.value = true;
  toast.info("Logging in...");

  const data = await signIn(email.value, password.value);

  if (data) {
    router.push("/");
    toast.clear();
    toast.success("Logged in successfully!");
  } else {
    toast.clear();
    toast.error("Login failed. Please check your credentials.");
    isLoading.value = false;
  }
}
</script>

<style lang="scss" scoped></style>
