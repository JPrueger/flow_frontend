<template>
  <div class="hello">
    <h1 class="font-bold text-4xl mb-6">Projects</h1>

    <ul class="md:flex justify-between flex-wrap">
      <li v-for="project in projects" :key="project.title" class="w-1/4">
<!--        <ProjectCard-->
<!--          :title="project.title"-->
<!--         :countTask="project.tasks.size()"-->
<!--          :members="project.members"-->
<!--        />-->
        <ProjectCard
            :title="project.title"
            :members="project.members"
        />
      </li>
    </ul>
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
      userId: "",
    };
  },
  methods: {
    getPost() {
      axios
          .get(
              "http://flow_backend.local/api/projects/" + this.userId
          )
          .then((res) => {
            this.projects = res.data;
          });
      },
  },
  created() {
    userDataService.me().then((userData) => {
      this.userId = userData.id;
      this.getPost();
    });
  },
};


// export default {
//   name: "ProjectsOverview",
//   components: {
//     ProjectCard
//   },
//   data: () => ({
//     projects: [
//       {
//         title: "Wireframes",
//         countTask: "15",
//         members: [
//           { userName: "Kersi", color: "blueGreen-light" },
//           { userName: "Jeannie", color: "yellow" }
//         ]
//       },
//       {
//         title: "Screendesign",
//         countTask: "28",
//         members: [
//           { userName: "Kersi", color: "blueGreen-light" },
//           { userName: "Jeannie", color: "yellow" },
//           { userName: "Juri", color: "blueGreen-dark" }
//         ]
//       },
//       {
//         title: "Testing",
//         countTask: "5",
//         members: [
//           { userName: "Jeannie", color: "yellow" },
//           { userName: "Danny", color: "pink-main" }
//         ]
//       },
//       {
//         title: "Titan Killer Tour",
//         countTask: "5",
//         members: [
//           { userName: "Jeannie", color: "yellow" },
//           { userName: "Kersi", color: "blueGreen-light" }
//         ]
//       },
//       {
//         title: "Titan Killer Tour",
//         countTask: "5",
//         members: [
//           { userName: "Jeannie", color: "yellow" },
//           { userName: "Kersi", color: "blueGreen-light" }
//         ]
//       }
//     ],
//
//     doing: [],
//     done: []
//   })
// };
</script>
