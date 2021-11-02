<template>
  <div class="hello">
    <h1 class="font-bold text-4xl mb-6">SAE BA-Project</h1>
    <div class="lg:flex lg:justify-around">
      <BoardColumn columnName="Open" :list="openTasks" />
      <BoardColumn columnName="In Progress" :list="inProgress" />
      <BoardColumn columnName="Done" :list="done" />
    </div>
  </div>
</template>

<script>
import BoardColumn from "@/components/Project/BoardColumn";

export default {
  name: "ProjectBoard",
  components: {
    BoardColumn
  },
  data: () => ({
    openTasks: [
      {
        title: "Wireframes",
        storyPoints: "5",
        assignedUser: { userName: "Kersi", color: "blueGreen-light" }
      },
      {
        title: "Screendesign",
        storyPoints: "8",
        assignedUser: { userName: "Jeannie", color: "yellow" }
      },
      {
        title: "Wireframes",
        storyPoints: "13",
        assignedUser: { userName: "Juri", color: "blueGreen-dark" }
      }
    ],

    inProgress: [
      {
        title: "Tailwind Config",
        storyPoints: "5",
        assignedUser: { userName: "Kersi", color: "blueGreen-light" }
      },
      {
        title: "DB setup",
        storyPoints: "8",
        assignedUser: { userName: "Jeannie", color: "yellow" }
      }
    ],
    done: [
      {
        title: "Projektplan",
        storyPoints: "5",
        assignedUser: { userName: "Danny", color: "pink" }
      }
    ]
  })
};
</script>
