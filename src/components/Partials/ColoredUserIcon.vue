<template>
  <div class="text-left">
    <!-- dynamic color get added via class binding -->
    <p
      class="rounded py-1 px-3 text-white text-xs"
      :style="`background-color:`+ `${ color }`"
      v-text="taskAssignee()"
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
    color: String,
    userName: String
  },
  methods: {
    /**
     * Method to have the first letter of the assignee capitalised. 
     */
    taskAssignee() {
      if(this.userName) {
        return this.userName.charAt(0).toUpperCase() + this.userName.slice(1);
      }
    }
  }
};
</script>
