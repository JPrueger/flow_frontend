<template>
    <div>
        <h1>Task Details Headline</h1>
        {{task.title}}
      {{task.description}}
    </div>
</template>

<script>
import axios from "axios";

export default {
  name: "TaskDetails",
    data: () => {
      return {
        task: "",
      };
    },
  methods: {
    getPost() {
      axios
        .get(
          "http://flow_backend.local/api/task/" + this.$route.params.id
        )
        .then((res) => {
          this.task = res.data;
      });
    },
  },
  created() {
      this.getPost();
  },
};
</script>
