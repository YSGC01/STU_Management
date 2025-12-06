import "./assets/main.css";
import "vue-toastification/dist/index.css";

import App from "./App.vue";
import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";

import Toast from "vue-toastification";
import { VueQueryPlugin } from "@tanstack/vue-query";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Toast, {
  transition: "Vue-Toastification__slideBlurred",
  position: "top-right",
  timeout: 3000,
});
app.use(VueQueryPlugin);

app.mount("#app");
