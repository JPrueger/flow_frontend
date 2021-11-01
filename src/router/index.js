import Vue from "vue";
import VueRouter from "vue-router";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";

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
];
const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;
