<template>
  <div class="hello">
    <h1 class="font-bold text-4xl mb-6">SAE BA-Project</h1>
    <div class="lg:flex lg:justify-around">
      <BoardColumn columnName="Open" :list="todo" />
      <BoardColumn columnName="In Progress" :list="doing" />
      <BoardColumn columnName="Done" :list="done" />
    </div>
  </div>
</template>

<script>
import BoardColumn from "@/components/Project/BoardColumn";

export default {
  name: "ProjectBoard",
  components: {
    BoardColumn,
  },
  data: () => ({
    newTodo: "",
    todo: [{ name: "Wireframes" }, { name: "Screendesign" }],
    doing: [],
    done: [],
  }),
};
</script>
