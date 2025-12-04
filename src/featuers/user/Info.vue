<template>
  <Loading v-show="isLoading" />

  <fieldset
    class="fieldset bg-base-300 border-base-300 rounded-box w-xs border p-4 mx-auto mt-20 shadow-md"
    v-show="!isLoading"
  >
    <legend class="fieldset-legend">Information</legend>

    <!-- 头像 -->
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
    <label class="input">
      <svg
        class="h-[1em] opacity-50"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <g
          stroke-linejoin="round"
          stroke-linecap="round"
          stroke-width="2.5"
          fill="none"
          stroke="currentColor"
        >
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </g>
      </svg>
      <input type="email" placeholder="Email" value="Alex" disabled />
    </label>

    <ul
      class="menu bg-base-200 rounded-box w-auto"
      v-if="classInChargeArr.length > 0"
    >
      <li>
        <details open>
          <summary>Class in Charge</summary>
          <ul>
            <li v-for="(classItem, idx) in classInChargeArr" :key="idx">
              <a class="pointer-events-none"
                >Class {{ classItem.split("|")[0] }} | Year
                {{ classItem.split("|")[1] }}</a
              >
            </li>
          </ul>
        </details>
      </li>
    </ul>

    <button class="btn btn-neutral mt-4" @click="onClick">Update</button>
  </fieldset>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useToast } from "vue-toastification";

import Loading from "@/ui/loading.vue";

import { useUserStore } from "@/stores/user";
import { uploadAvatar } from "@/services/apiStorage";
import { getTeacherByTeacherId } from "@/services/apiTeacher";
import { getConfig } from "@/utils/configHelper";
import { updateUser as updateUserApi } from "@/services/apiAuth";

const userStore = useUserStore();
const { updateUser } = userStore;
const { user } = storeToRefs(userStore);
const toast = useToast();

const currentAvatarUrl = ref(user.value.avatar);

const avatarFile = ref(null);

function handleAvatarChange(event) {
  const file = event.target.files[0];
  avatarFile.value = file;

  const newAvatarUrl = URL.createObjectURL(file);
  currentAvatarUrl.value = newAvatarUrl;
}

async function onClick() {
  if (!avatarFile.value) {
    // TODO: Warning Toast
    toast.error("Please select an avatar image before updating.");
    return;
  }

  toast.info("Updating avatar...");
  //创建头像链接
  const token = getConfig("SUPABASE_TOKEN");
  const supabaseURL = getConfig("SUPABASE_URL");
  const userToken = JSON.parse(localStorage.getItem(token));
  const newAvatarFileName = `public/${userToken.user.email}-${Date.now()}.png`;

  // 上传头像文件（到avatar存储桶）
  await uploadAvatar(avatarFile.value, newAvatarFileName);

  // 更新supabase中的用户资料（avatar字段）
  const updateUserData = await updateUserApi({
    avatar: `${supabaseURL}/storage/v1/object/public/avatar/${newAvatarFileName}`,
  });

  // 更新pinia中的用户资料
  updateUser(updateUserData.user.user_metadata);

  toast.clear();
  toast.success("Avatar updated successfully!");
}

const classInChargeArr = ref([]);

const isLoading = ref(true);
onMounted(async () => {
  isLoading.value = true;

  currentAvatarUrl.value = user.value.avatar;
  const teacher = await getTeacherByTeacherId(user.value.sub);
  classInChargeArr.value = JSON.parse(teacher[0].class_in_charge);

  isLoading.value = false;
});
</script>

<style lang="scss" scoped></style>
