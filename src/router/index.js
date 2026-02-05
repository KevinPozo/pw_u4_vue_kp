import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/estudiantes-todos",
    name: "estudiantes-todos",
    component: () => import("../views/EstudianteConsultarTodosView.vue"),
  },
  {
    path: "/estudiantes-id",
    name: "estudiantes-id",
    component: () => import("../views/EstudianteConsultarPorIdView.vue"),
  },
  {
    path: "/estudiantes-guardar",
    name: "estudiantes-guardar",
    component: () => import("../views/EstudianteGuardarView.vue"),
  },
  {
    path: "/estudiantes-actualizar",
    name: "estudiantes-actualizar",
    component: () => import("../views/EstudianteActualizarView.vue"),
  },
  {
    path: "/estudiantes-parcial",
    name: "estudiantes-parcial",
    component: () => import("../views/EstudianteActualizarParcialView.vue"),
  },
  {
    path: "/estudiantes-eliminar",
    name: "estudiantes-eliminar",
    component: () => import("../views/EstudianteEliminarView.vue"),
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

export default router;
