<template>
    <div>
        <h1>Test Headline</h1>
        <ul class="w-80">
          <li v-for="task in tasks" v-bind:key="task.id">
            <pre> {{ task }} </pre>
          </li>
        </ul>
    </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Task",
    data: () => {
      return {
        tasks: "",
      };
    },
  methods: {
    getPost() {
      axios
        .get(
          "http://flow_backend.local/api/tasks/index/"
        )
        .then((res) => {
          this.tasks = res.data;
      });
    },
  },
  created() {
      this.getPost();
  },
};
</script>
