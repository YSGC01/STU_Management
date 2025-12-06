<template>
  <Loading v-show="isLoading" />

  <Form
    class="fieldset bg-base-300 border-base-300 rounded-box w-xs border p-4 mx-auto mt-20 shadow-md"
    v-show="!isLoading"
    @submit="onSubmit"
    :validation-schema="validationSchema"
  >
    <legend class="fieldset-legend">Login</legend>

    <h1 class="text-center text-3xl">Sunshine</h1>

    <label class="label">Email</label>
    <Field
      name="email"
      type="text"
      class="input"
      placeholder="Email"
      v-model="email"
      :disabled="isLogging"
    />
    <ErrorMessage name="email" class="text-red-500" />

    <label class="label">Password</label>
    <Field
      name="password"
      type="password"
      class="input"
      placeholder="Password"
      v-model="password"
      :disabled="isLogging"
    />
    <ErrorMessage name="password" class="text-red-500" />

    <label class="label mt-2 justify-between">
      <div>
        <input type="checkbox" checked="checked" class="checkbox" />
        <span class="ml-1"> Remember me </span>
      </div>
      <button class="btn btn-link btn-sm">Forgot password?</button>
    </label>

    <button class="btn btn-neutral mt-4" :disabled="isLogging">Login</button>
    <button
      class="btn btn-neutral btn-soft mt-4"
      @click="router.push({ name: 'signup' })"
      :disabled="isLogging"
    >
      Signup
    </button>
  </Form>
</template>

<script setup>
import { ref } from "vue";
import { useToast } from "vue-toastification";

import { Field, Form, ErrorMessage } from "vee-validate";
import * as yup from "yup";

import { signIn } from "@/services/apiAuth";
import { useRouter } from "vue-router";

const router = useRouter();
const toast = useToast();

const email = ref("");
const password = ref("");

const validationSchema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required(),
});

const isLogging = ref(false);

async function onSubmit() {
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
