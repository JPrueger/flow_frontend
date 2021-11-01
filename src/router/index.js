import Vue from "vue";
import VueRouter from "vue-router";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import ProjectBoard from "../views/ProjectBoard.vue";

Vue.use(VueRouter);

const routes = [
  // {
  //   path: "*",
  //   name: "404",
  //   component: NotFound,
  // },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/project-board",
    name: "ProjectBoard",
    component: ProjectBoard,
  },
];
const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;
