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
import { ref } from "vue";
import router from "@/router";
import { useToast } from "vue-toastification";

import { Field, Form, ErrorMessage } from "vee-validate";
import * as yup from "yup";

import { signUp } from "@/services/apiAuth";
import { createTeacher } from "@/services/apiTeacher";

const email = ref("");
const password = ref("");
const confirmPassword = ref("");

const toast = useToast();

const isSigning = ref(false);

async function onSubmit() {
  // 禁用按钮和输入
  isSigning.value = true;

  const data = await signUp(email.value, password.value);
  // console.log(data);

  if (data) {
    router.push({ name: "login" });
    toast.success("注册成功！请验证邮箱后登录！");
    const teacherId = data.user.id;
    await createTeacher({ teacher_id: teacherId });
    return;
  } else {
    toast.error("注册失败！请重试！");
    return;
  }
}

const validationSchema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required(),
});
</script>

<style lang="scss" scoped></style>
