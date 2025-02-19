import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "index",
      component: () => import("../views/index.vue"),
    },
    {
      path: "/agriculture",
      name: "agriculture",
      component: () => import("../views/agriculture/index.vue"),
    },
    {
      path: "/fish",
      name: "fish",
      component: () => import("../views/fish/index.vue"),
    },
  ],
});

export default router;
