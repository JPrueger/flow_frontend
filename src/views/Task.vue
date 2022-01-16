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
    /**
     * Gets Task.
     */
    getPost() {
      axios.get(`${process.env.VUE_APP_API_URL}/tasks/index/`).then((res) => {
        this.tasks = res.data;
      });
    },
  },
  /**
   * getPost() gets called when page is created. 
   */
  created() {
    this.getPost();
  },
};
</script>
