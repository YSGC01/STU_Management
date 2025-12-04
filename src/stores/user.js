import { ref } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const user = ref({
    avatar: "https://img.daisyui.com/images/profile/demo/yellingcat@192.webp",
  });

  function updateUser(newUserMetaData = {}) {
    user.value = newUserMetaData;
  }

  return { user, updateUser };
});
