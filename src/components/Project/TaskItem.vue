<template>
  <router-link :to="'/task/' + taskId">
    <div class="bg-white w-100 shadow-sm rounded-sm mx-auto p-3 mb-4">
      <div class="flex justify-between mb-3">
        <div>{{ title }}</div>
        <div class="font-bold">{{ storypoints }}</div>
      </div>
      <!-- <ColoredUserIcon :userName="assigned_id.name" :color="assignedUser.color" /> -->
    </div>
  </router-link>
</template>

<script>
// import ColoredUserIcon from "@/components/Partials/ColoredUserIcon.vue";

export default {
  name: "TaskItem",
  data: () => ({
    newTodo: "",
    todos: []
  }),
  components: {
    // ColoredUserIcon
  },
  props: {
    title: String,
    taskId: Number,
    storypoints: Number,
    assignedUser: String
  },
};
</script>
