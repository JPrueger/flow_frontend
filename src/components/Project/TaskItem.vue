<template>
  <router-link :to="'/task/' + taskId">
    <div class="bg-white w-100 shadow-sm rounded-sm mx-auto p-3 mb-4">
      <div class="flex justify-between mb-3">
        <div class="font-normal">{{ task.title }}</div>
        <div class="font-bold">{{ task.storypoints }}</div>
      </div>
      <div class="user-icon-width">
        <ColoredUserIcon :userName="userData.name" :color="userData.tag_color" />
      </div>
    </div>
  </router-link>
</template>

<script>
import ColoredUserIcon from "@/components/Partials/ColoredUserIcon.vue";

import axios from "axios";

export default {
  name: "TaskItem",
  data: () => {
    return {
      task: "",
      userData:"",
    };
  },
  components: {
    ColoredUserIcon
  },
  props: {
    title: String,
    taskId: Number,
    storypoints: Number,
    assignedUser: String
  },
  methods: {
    getPost() {
      axios
          .get(
              "http://flow_backend.local/api/task/" + this.taskId
          )
          .then((res) => {
            this.task = res.data;
            this.getUserDetails();
          });
    },
    getUserDetails() {
      axios
          .get("http://flow_backend.local/api/user/" + this.task.assigne_id)
          .then((res) => {
            this.userData = res.data;
          });
    },
  },
  created() {
    this.getPost();
  },
};
</script>

<style>
.user-icon-width {
  max-width: fit-content;
}
</style>