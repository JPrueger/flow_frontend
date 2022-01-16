<template>
  <div>
    <h1>Projects</h1>
    <Loader v-if="loader" />
    <ul
      v-if="!loader"
      class="
        grid
        gap-6
        md:grid-cols-2
        lg:grid-cols-4
        xl:grid-cols-5
        ProjectCard
        w-full
      "
    >
      <li
        v-for="project in projects"
        :key="randomNumber() + `${project.title}`"
        class="bg-white shadow-md rounded-sm"
      >
        <ProjectCard
          :title="project.title"
          :members="project.members"
          :project_id="project.id"
        />
      </li>
    </ul>
    <router-link v-if="!loader" class="Button mt-10" to="/add-project"
      >Add New Project</router-link
    >
  </div>
</template>

<script>
import axios from "axios";
import ProjectCard from "@/components/Project/ProjectCard";
import userDataService from "@/services/userDataService";
import Loader from "@/components/Partials/Loader";

export default {
  name: "ProjectsOverview",
  components: {
    ProjectCard,
    Loader,
  },
  data: () => {
    return {
      projects: "",
      projectUsers: "",
      userId: "",
      loader: true,
    };
  },
  methods: {
    /**
     * Gets current project.
     */
    getProjects() {
      axios
        .get(`${process.env.VUE_APP_API_URL}/projects/` + this.userId)
        .then((res) => {
          this.projects = res.data;
        })
        .then(() => {
          this.loader = false;
        });
    },
    /**
     * Creates random number to make sure that the keys used are always unique.
     */
    randomNumber() {
      return Math.floor(Math.random() * 1000);
    },
  },
  /**
   * The me() function gets the current user that is logged in.
   * See userDataService.js file in src/services
   */
  created() {
    userDataService.me().then((userData) => {
      this.userId = userData.id;
      this.getProjects();
    });
  },
};
</script>
