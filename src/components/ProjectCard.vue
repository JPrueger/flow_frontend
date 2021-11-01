<template>
  <div class="bg-white w-100 shadow-md rounded-sm mx-auto p-3">
    <div class="text-left font-bold text-xl mb-1">{{ title }}</div>
    <div class="text-left mb-5">{{ countTask }} Tasks</div>

    <ul class="flex justify-between">
      <li v-for="member in members" :key="member.userName">
        <ColoredUserIcon :userName="member.userName" :color="member.color" />
      </li>
    </ul>
  </div>
</template>

<script>
import ColoredUserIcon from "./ColoredUserIcon.vue";

export default {
  name: "ProjectCard",
  data: () => ({
    newTodo: "",
    todos: [],
  }),
  components: {
    ColoredUserIcon,
  },
  props: {
    title: String,
    countTask: Number,
    members: [],
  },
};
</script>
