/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from "vue-router";
// import { setupLayouts } from 'virtual:generated-layouts'

const routes = [
  {
    path: "/",
    name: "inicio",
    component: () => import("../pages/InicioView.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/client/:id",
    name: "client",
    component: () => import("@/pages/ClienteView.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/gestion",
    name: "gestion",
    component: () => import("@/pages/GestionView.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/pages/LoginView.vue"),
  },
  {
    path: "/",
    redirect: "/",
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,

  // routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.getItem("token")) {
      next();
    } else {
      next({ name: "login" });
    }
  } else {
    if (localStorage.getItem("token") && to.name === "login") {
      next({ name: "inicio" });
    } else {
      next();
    }
  }
});

export default router;
