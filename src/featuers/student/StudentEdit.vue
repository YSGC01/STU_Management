<template>
  <Loading v-show="isLoading" />

  <fieldset
    class="fieldset bg-base-300 border-base-300 rounded-box w-xs border p-4 mx-auto mt-20 shadow-md"
    v-show="!isLoading"
  >
    <legend class="fieldset-legend">Update Profile</legend>

    <div class="avatar flex justify-center">
      <div class="w-24 rounded-full ring-2 ring-offset-3 ring-gray-300">
        <label
          for="avatarInput"
          class="cursor-pointer hover:opacity-80 transition duration-300 ease-in-out"
        >
          <img :src="currentAvatarUrl" />
        </label>
      </div>
    </div>

    <input
      id="avatarInput"
      type="file"
      accept="image/*"
      @change="handleAvatarChange"
      class="hidden"
    />

    <label class="label">Name</label>
    <input
      type="text"
      class="input"
      placeholder="Class 1 | Year 9"
      v-model="name"
    />

    <label class="label">Gender</label>
    <select class="select" v-model="gender">
      <option disabled selected>Choose Gender</option>
      <option>male</option>
      <option>female</option>
    </select>

    <button class="btn btn-neutral mt-4" @click="onClick">
      Update Profile
    </button>
  </fieldset>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useToast } from "vue-toastification";

import Loading from "@/ui/loading.vue";

import { getStudentById, updateStudent } from "@/services/apiStudent";
import { getConfig } from "@/utils/configHelper";
import { uploadAvatar } from "@/services/apiStorage";

const route = useRoute();
const router = useRouter();
const toast = useToast();

const name = ref("Alex");
const gender = ref("male");

const currentAvatarUrl = ref(
  "https://img.daisyui.com/images/profile/demo/yellingcat@192.webp"
);

const avatarFile = ref(null);

function handleAvatarChange(event) {
  const file = event.target.files[0];
  avatarFile.value = file;

  const newAvatarUrl = URL.createObjectURL(file);
  currentAvatarUrl.value = newAvatarUrl;
}

async function onClick() {
  toast.info("Updating profile...");

  const newStudent = {
    name: name.value,
    gender: gender.value,
  };

  if (avatarFile.value) {
    //创建头像链接
    const token = getConfig("SUPABASE_TOKEN");
    const supabaseURL = getConfig("SUPABASE_URL");
    const userToken = JSON.parse(localStorage.getItem(token));
    const newAvatarFileName = `public/${
      userToken.user.email
    }-${Date.now()}.png`;

    // 上传头像文件（到avatar存储桶）
    await uploadAvatar(avatarFile.value, newAvatarFileName);

    // 更新supabase中的学生资料（avatar字段）
    const avatarUrl = `${supabaseURL}/storage/v1/object/public/avatar/${newAvatarFileName}`;

    newStudent.avatar = avatarUrl;
  }

  const updatedStudent = await updateStudent(route.params.id, newStudent);
  // console.log(updatedStudent);

  toast.clear();
  toast.success("Profile updated successfully!");
  router.push({ name: "student" });
}

const isLoading = ref(true);

onMounted(async () => {
  isLoading.value = true;

  const studentId = route.params.id;

  const student = await getStudentById(studentId);
  // console.log(student);
  name.value = student.name;
  gender.value = student.gender;
  currentAvatarUrl.value = student.avatar;

  isLoading.value = false;
});
</script>
