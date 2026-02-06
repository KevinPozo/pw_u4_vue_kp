import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      requiresAuth: true,
      esPublica: false,
    },
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
    meta: {
      requiresAuth: true,
      esPublica: false,
    },
  },
  {
    path: "/estudiantes-todos",
    name: "estudiantes-todos",
    component: () => import("../views/EstudianteConsultarTodosView.vue"),
    meta: {
      requiresAuth: true,
      esPublica: false,
    },
  },
  {
    path: "/estudiantes-id",
    name: "estudiantes-id",
    component: () => import("../views/EstudianteConsultarPorIdView.vue"),
    meta: {
      requiresAuth: true,
      esPublica: false,
    },
  },
  {
    path: "/estudiantes-guardar",
    name: "estudiantes-guardar",
    component: () => import("../views/EstudianteGuardarView.vue"),
    meta: {
      requiresAuth: true,
      esPublica: false,
    },
  },
  {
    path: "/estudiantes-actualizar",
    name: "estudiantes-actualizar",
    component: () => import("../views/EstudianteActualizarView.vue"),
    meta: {
      requiresAuth: true,
      esPublica: false,
    },
  },
  {
    path: "/estudiantes-parcial",
    name: "estudiantes-parcial",
    component: () => import("../views/EstudianteActualizarParcialView.vue"),
    meta: {
      requiresAuth: true,
      esPublica: false,
    },
  },
  {
    path: "/estudiantes-eliminar",
    name: "estudiantes-eliminar",
    component: () => import("../views/EstudianteEliminarView.vue"),
    meta: {
      requiresAuth: true,
      esPublica: false,
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView.vue"),
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const estaAutenticado = sessionStorage.getItem("estaAutenticado");
    const token = sessionStorage.getItem("token");

    if (!estaAutenticado || !token) {
      console.log("Redirigiendo al Login");
      next({ name: "login" });
    } else {
      next();
    }
  } else {
    console.log("Pase libre");
    next();
  }
});

export default router;
