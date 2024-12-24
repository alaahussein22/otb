import { createRouter, createWebHistory } from "vue-router";
import wrapperLayout from "@/layouts/dashboard/Index.vue";
import homeRoutes from "@/modules/home/home.routes";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: wrapperLayout,
      children: [...homeRoutes],
    },
  ],
});

export default router;
