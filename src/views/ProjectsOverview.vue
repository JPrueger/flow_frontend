<template>
  <div>
    <h1>Projects</h1>
    <ul class="md:flex justify-start flex-wrap mb-10 ProjectCard">
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


export default {
  name: "ProjectsOverview",
  components: {
    ProjectCard
  },
  data: () => {
    return {
      projects: "",
      projectUsers: "",
      userId: "",
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
          });
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
