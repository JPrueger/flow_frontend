import Vue from "vue";
import VueRouter from "vue-router";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import ProjectBoard from "../views/ProjectBoard.vue";
import ProjectsOverview from "../views/ProjectsOverview.vue";
import AddProject from "../views/AddProject.vue";
import Task from "../views/Task.vue";

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
  {
    path: "/projects",
    name: "ProjectsOverview",
    component: ProjectsOverview,
  },
  {
    path: "/add-project",
    name: "AddProject",
    component: AddProject,
  },
  {
    path: "/tasks",
    name: "Task",
    component: Task,
  },
];
const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;
