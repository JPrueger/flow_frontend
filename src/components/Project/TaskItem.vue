<template>
  <div class="bg-white w-100 shadow-sm rounded-sm mx-auto p-3">
    <div class="flex justify-between mb-3">
      <div>{{ title }}</div>
      <div class="font-bold">{{storyPoints}}</div>
    </div>
    <ColoredUserIcon :userName="assignedUser.userName" :color="assignedUser.color" />
  </div>
</template>

<script>
import ColoredUserIcon from "@/components/Partials/ColoredUserIcon.vue";

export default {
  name: "TaskItem",
  data: () => ({
    newTodo: "",
    todos: []
  }),
  components: {
    ColoredUserIcon
  },
  props: {
    title: String,
    storyPoints: Number,
    assignedUser: String
  }
};
</script>
