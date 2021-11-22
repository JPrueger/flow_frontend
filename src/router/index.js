import Vue from "vue";
import VueRouter from "vue-router";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import ProjectBoard from "../views/ProjectBoard.vue";
import ProjectsOverview from "../views/ProjectsOverview.vue";
import AddProject from "../views/AddProject.vue";
import AddTask from "../views/AddTask.vue";
import Task from "../views/Task.vue";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  // {
  //   path: "*",
  //   name: "404",
  //   component: NotFound,
  // },
  {
    path: "/",
    name: "Home",
    component: Home,
  },
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
  {
    path: "/add-task",
    name: "AddTask",
    component: AddTask,
  },
];
const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;
