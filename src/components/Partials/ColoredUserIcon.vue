<template>
  <div class="text-left">
    <div
      class="rounded-lg py-1 px-3 text-white w-auto inline-block items-start"
      :class="'bg-' + `${color}`"
    >
      {{ userName }}
    </div>
  </div>
</template>

<script>
export default {
  name: "ColoredUserIcon",
  data: () => ({
    newTodo: "",
    todos: [],
  }),
  props: {
    userName: String,
    color: String,
  },
};
</script>
