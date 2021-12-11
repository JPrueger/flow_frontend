<template>
  <div class="text-left">
    <p
      class="
        rounded
        py-1
        px-3
        text-white
        bg-pink-main
        text-xs
      "
      v-text="username"
    />
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
  computed: {
    username() {
      return this.userName.charAt(0).toUpperCase() + this.userName.slice(1);
    }
  }
};
</script>
