<template>
  <div>
    <h1>Projects</h1>
    <Loader v-if="loader" />
    <ul v-if="!loader" class="md:flex justify-start flex-wrap mb-10 ProjectCard">
      <li v-for="project in projects" :key="project.title" class="mr-5 bg-white shadow-md rounded-sm mb-8">
        <ProjectCard
          :title="project.title"
          :members="project.members"
          :project_id="project.id"
        />
      </li>
    </ul>
    <router-link class="Button" to="/add-project">Add Project</router-link> 
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
    getProjects() {
      axios
          .get(
            "http://flow_backend.local/api/projects/" + this.userId
          )
          .then((res) => {
            console.log(res.data);
            this.projects = res.data;
          })
          .then(() => {
            this.loader = false;
          })
      },
  },
  created() {
    userDataService.me().then((userData) => {
      this.userId = userData.id;
      this.getProjects();
    });
  },
};
</script>
