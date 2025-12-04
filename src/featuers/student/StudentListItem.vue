<template>
  <tr>
    <th>
      <label>
        <input type="checkbox" class="checkbox" />
      </label>
    </th>
    <td>
      <div class="flex items-center gap-3">
        <div class="avatar">
          <div class="mask mask-squircle h-12 w-12">
            <img
              :src="studentItem.avatar"
              alt="Avatar Tailwind CSS Component"
            />
          </div>
        </div>
        <!-- 姓名和性别 -->
        <div>
          <div class="font-bold">{{ studentItem.name }}</div>
          <div class="text-sm opacity-50">{{ studentItem.gender }}</div>
        </div>
      </div>
    </td>
    <!-- 班级年级和班主任 -->
    <td>class {{ studentItem.class }} | year {{ studentItem.grade }}</td>
    <th>
      <button
        class="btn btn-ghost btn-sm"
        @click="
          router.push({
            name: 'student-edit',
            params: { id: studentItem.student_id },
          })
        "
      >
        details
      </button>
      <button class="btn btn-error btn-sm">delete</button>
    </th>
  </tr>
</template>

<script setup>
import { useRouter } from "vue-router";

defineProps(["studentItem"]);

const router = useRouter();
</script>

<style lang="scss" scoped></style>
