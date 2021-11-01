<template>
  <div class="hello">
    <h1 class="font-bold text-4xl mb-6">Projects</h1>

    <ul class="md:flex">
      <li v-for="project in projects" :key="project.title">
        <ProjectCard
          :title="project.title"
          :countTask="project.countTask"
          :members="project.members"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import ProjectCard from "@/components/Project/ProjectCard";

export default {
  name: "ProjectsOverview",
  components: {
    ProjectCard,
  },
  data: () => ({
    projects: [
      {
        title: "Wireframes",
        countTask: "15",
        members: [
          { userName: "Kersi", color: "green-700" },
          { userName: "Jeannie", color: "yellow-400" },
        ],
      },
      {
        title: "Screendesign",
        countTask: "28",
        members: [
          { userName: "Kersi", color: "green-700" },
          { userName: "Jeannie", color: "yellow-400" },
          { userName: "Juri", color: "yellow-700" },
        ],
      },
      {
        title: "Testing",
        countTask: "5",
        members: [
          { userName: "Jeannie", color: "yellow-400" },
          { userName: "Danny", color: "pink-700" },
        ],
      },
    ],

    doing: [],
    done: [],
  }),
};
</script>
