import Vue from "vue";
import VueRouter from "vue-router";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import ProjectBoard from "../views/ProjectBoard.vue";
import ProjectsOverview from "../views/ProjectsOverview.vue";
import AddProject from "../views/AddProject.vue";
import TaskDetails from "../views/TaskDetails.vue";
import AddTask from "../views/AddTask.vue";
import EditTask from "../views/EditTask.vue";
import Task from "../views/Task.vue";
import Home from "../views/Home.vue";
import Privacy from "../views/Privacy.vue";
import Terms from "../views/Terms.vue";
import NotFound from "../views/NotFound.vue";
import UserProfile from "../views/UserProfile.vue";
import EditUser from "../views/EditUser.vue";
import EditProject from "../views/EditProject.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    name: "404",
    component: NotFound,
  },
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/terms-and-conditions",
    name: "Terms",
    component: Terms,
  },
  {
    path: "/privacy-policy",
    name: "Privacy",
    component: Privacy,
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
    path: "/user/edit/:id",
    name: "EditUser",
    component: EditUser,
  },
  {
    path: "/project-board/:id",
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
    path: "/project/edit/:id",
    name: "EditProject",
    component: EditProject,
  },
  {
    path: "/tasks",
    name: "Task",
    component: Task,
  },
  {
    path: "/task/:id",
    name: "TaskDetails",
    component: TaskDetails,
  },
  {
    path: "/add-task/:id",
    name: "AddTask",
    component: AddTask,
  },
  {
    path: "/edit-task/:id",
    name: "EditTask",
    component: EditTask,
  },
  {
    path: "/user-profile",
    name: "UserProfile",
    component: UserProfile,
  },
];
const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;
