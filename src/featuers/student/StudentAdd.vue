<template>
  <Loading v-show="isLoading" />

  <Form
    class="fieldset bg-base-300 border-base-300 rounded-box w-xs border p-4 mx-auto mt-20 shadow-md"
    v-show="!isLoading"
    @submit="onSubmit"
    :validation-schema="validationSchema"
  >
    <legend class="fieldset-legend">Add Student</legend>

    <!-- <h1 class="text-center text-3xl">Alex</h1> -->

    <label class="label">Email</label>
    <Field
      name="email"
      type="text"
      class="input"
      placeholder="Email"
      v-model="email"
    />
    <ErrorMessage name="email" class="text-red-500" />

    <label class="label">Name</label>
    <Field
      name="name"
      type="text"
      class="input"
      placeholder="Someone"
      v-model="name"
    />
    <ErrorMessage name="name" class="text-red-500" />

    <label class="label">Gender</label>
    <select class="select" v-model="gender">
      <option disabled selected>Choose Gender</option>
      <option>male</option>
      <option>female</option>
    </select>

    <label class="label">Class</label>
    <select class="select" v-model="classInfo">
      <option disabled selected>Choose Class</option>
      <option
        v-for="(classItem, idx) in classInChargeArr"
        :key="idx"
        :value="classItem"
      >
        Class {{ classItem.split("|")[0] }} | Year
        {{ classItem.split("|")[1] }}
      </option>
    </select>

    <button class="btn btn-neutral mt-4">Add Student</button>
  </Form>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

import { Field, Form, ErrorMessage } from "vee-validate";
import * as yup from "yup";

import Loading from "@/ui/loading.vue";

import { addStudent } from "@/services/apiStudent";
import { getTeacherByTeacherId } from "@/services/apiTeacher";
import { signUp } from "@/services/apiAuth";
import { getUserId } from "@/utils/userHelper";

const router = useRouter();
const toast = useToast();

const email = ref("123456@sample.com");
const name = ref("Alex");
const gender = ref("male");
const classInfo = ref("Class X| Year X");
const classInChargeArr = ref([]);
const teacherId = ref("");

async function onSubmit() {
  toast.info("Adding student...");

  const userdata = await signUp(email.value, "123456", { isStudent: true });
  const studentId = userdata.user.id;

  const students = await addStudent({
    name: name.value,
    gender: gender.value,
    class: classInfo.value.split("|")[0],
    grade: classInfo.value.split("|")[1],
    teacher_id: teacherId.value,
    avatar: "https://img.daisyui.com/images/profile/demo/yellingcat@192.webp",
    student_id: studentId,
  });
  // console.log(students);

  toast.clear();
  toast.success("Student added successfully!");
  router.push({ name: "student" });
}

const isLoading = ref(true);
onMounted(async () => {
  isLoading.value = true;

  teacherId.value = getUserId();
  const teachers = await getTeacherByTeacherId(teacherId.value);
  classInChargeArr.value = JSON.parse(teachers[0].class_in_charge);
  classInfo.value = classInChargeArr.value[0];

  isLoading.value = false;
});

const validationSchema = yup.object({
  email: yup.string().required().email(),
  name: yup.string().required(),
});
</script>

<style lang="scss" scoped></style>
