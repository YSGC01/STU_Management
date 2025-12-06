<template>
  <Form
    class="fieldset bg-base-300 border-base-300 rounded-box w-xs border p-4 mx-auto mt-20 shadow-md"
    @submit="onSubmit"
    :validation-schema="validationSchema"
  >
    <legend class="fieldset-legend">Signup</legend>

    <h1 class="text-center text-3xl">Sunshine</h1>

    <label class="label">Email</label>
    <Field
      name="email"
      type="text"
      class="input"
      placeholder="Email"
      v-model="email"
      :disabled="isSigning"
    />
    <ErrorMessage name="email" class="text-red-500" />

    <label class="label">Password</label>
    <Field
      name="password"
      type="password"
      class="input"
      placeholder="Password"
      v-model="password"
      :disabled="isSigning"
    />
    <ErrorMessage name="password" class="text-red-500" />
    <label class="label">Confirm Password</label>
    <Field
      name="confirmPassword"
      type="password"
      class="input"
      placeholder="Confirm Password"
      v-model="confirmPassword"
      :disabled="isSigning"
    />
    <ErrorMessage name="confirmPassword" class="text-red-500" />

    <!-- 表单校验 -->
    <button class="btn btn-neutral mt-4" :disabled="isSigning">Signup</button>
    <button
      class="btn btn-neutral btn-soft mt-4"
      @click="router.push({ name: 'login' })"
      :disabled="isSigning"
    >
      Login
    </button>
  </Form>
</template>

<script setup>
import { ref, computed } from "vue";
import router from "@/router";
import { useToast } from "vue-toastification";

import { Field, Form, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { useMutation } from "@tanstack/vue-query";

import { signUp as signUpApi } from "@/services/apiAuth";
import { createTeacher as createTeacherApi } from "@/services/apiTeacher";

const email = ref("");
const password = ref("");
const confirmPassword = ref("");

const validationSchema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required(),
});

const toast = useToast();

const isSigning = computed(() => isSigningUp.value || isCreating.value);

const { mutate: signUp, isPending: isSigningUp } = useMutation({
  mutationFn: ({ email, password }) => signUpApi(email, password),
  onSuccess: (data) => {
    createTeacher({ teacher_id: data.user.id });
  },
  onError: () => {},
});

const { mutate: createTeacher, isPending: isCreating } = useMutation({
  mutationFn: createTeacherApi,
  onSuccess: () => {
    router.push({ name: "login" });
    toast.success("注册成功！请验证邮箱后登录！", { timeout: 5000 });
  },
  onError: () => {
    toast.error("注册失败！请重试！");
  },
});

async function onSubmit() {
  // 注册
  signUp({ email: email.value, password: password.value });
}
</script>

<style lang="scss" scoped></style>
