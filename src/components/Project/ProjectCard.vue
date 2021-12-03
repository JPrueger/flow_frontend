<template>
  <router-link :to="'/project-board/' + project_id">
    <div class="bg-white shadow-md rounded-sm mx-auto p-3">
      <div class="text-left font-bold text-xl mb-1">{{ title }}</div>
      <div class="text-left mb-5">{{ countTask }} Tasks</div>

      <ul class="flex justify-between">
        <li v-for="member in members" :key="member.userName" class="px-2">
          <ColoredUserIcon :userName="member.userName" :color="member.color" />
        </li>
      </ul>
    </div>
  </router-link>
</template>

<script>
import ColoredUserIcon from "@/components/Partials/ColoredUserIcon.vue";

export default {
  name: "ProjectCard",
  data: () => ({
    newTodo: "",
    todos: []
  }),
  components: {
    ColoredUserIcon
  },
  props: {
    title: String,
    countTask: Number,
    members: [],
    project_id: Number,
  }
};
</script>
