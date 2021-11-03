<template>
  <div class="hello">
    <h1 class="font-bold text-4xl mb-6">SAE BA-Project</h1>
    <div class="lg:flex lg:justify-around">
      <BoardColumn columnName="Open" :list="open" />
      <BoardColumn columnName="In Progress" :list="progress" />
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
    open: [
      {
        id: 1,
        title: "Wireframes",
        storyPoints: "5",
        assignedUser: { userName: "Kersi", color: "blueGreen-light" },
        status: "open"
      },
      {
        id: 2,
        title: "Screendesign",
        storyPoints: "8",
        assignedUser: { userName: "Jeannie", color: "yellow" },
        status: "open"
      },
      {
        id: 3,
        title: "Wireframes",
        storyPoints: "13",
        assignedUser: { userName: "Juri", color: "blueGreen-dark" },
        status: "open"
      }
    ],

    progress: [
      {
        id: 4,
        title: "Tailwind Config",
        storyPoints: "5",
        assignedUser: { userName: "Kersi", color: "blueGreen-light" }
      },
      {
        id: 5,
        title: "DB setup",
        storyPoints: "8",
        assignedUser: { userName: "Jeannie", color: "yellow" }
      }
    ],
    done: [
      {
        id: 6,
        title: "Projektplan",
        storyPoints: "5",
        assignedUser: { userName: "Danny", color: "pink" }
      }
    ]
  })
};
</script>
