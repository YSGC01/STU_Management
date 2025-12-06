import { createRouter, createWebHistory } from "vue-router";
import { isAuthenticated } from "@/utils/AuthHelper";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "",
      redirect: "/home/score",
    },
    {
      path: "/home",
      name: "home",
      component: () => import("@/views/HomeView.vue"),
      //子路由
      children: [
        {
          path: "",
          redirect: "/home/score",
        },
        {
          path: "score",
          children: [
            {
              path: "",
              name: "score",
              component: () => import("@/featuers/score/ScoreList.vue"),
            },
            {
              path: ":id",
              name: "score-edit",
              component: () => import("@/featuers/score/ScoreEdit.vue"),
            },
            {
              path: "upload",
              name: "score-upload",
              component: () => import("@/featuers/score/ScoreUpload.vue"),
            },
          ],
        },
        {
          path: "student",
          children: [
            {
              path: "",
              name: "student",
              component: () => import("@/featuers/student/StudentList.vue"),
            },
            {
              path: ":id",
              name: "student-edit",
              component: () => import("@/featuers/student/StudentEdit.vue"),
            },
            {
              path: "add",
              name: "student-add",
              component: () => import("@/featuers/student/StudentAdd.vue"),
            },
          ],
        },
        {
          path: "info",
          name: "info",
          component: () => import("@/featuers/user/Info.vue"),
        },
      ],
    },
    {
      path: "/signup",
      name: "signup",
      component: () => import("@/featuers/auth/Signup.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/featuers/auth/Login.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("@/ui/NotFound.vue"),
    },
  ],
});

router.beforeEach(async (to, from) => {
  const routeName = to.name;
  if (routeName !== "login" && routeName !== "signup") {
    // Check if the user is authenticated
    const isLogin = await isAuthenticated();

    if (!isLogin) {
      // If not authenticated, redirect to the login page
      router.push({ name: "login" });
      return;
    }
  }
});

export default router;
