<template>
  <div>
    <div class="max-w-lg mx-auto relative">


    <h1>Task: {{task.title}}</h1>
    <form @submit.prevent class="Form">
       <div>
        <div class="flex flex-col text-left mb-8" type="text">
          <div class="pb-2">Title</div>
          <div class="InputField font-normal">{{task.title}}</div>
        </div>
      </div>
      <div>
        <div class="flex flex-col text-left mb-8" type="text">
          <div class="pb-2">Description</div>
          <div class="InputField font-normal">{{task.description}}</div>

        </div>
      </div>
      <div class="flex flex-col text-left mb-8">
        <div class="pb-2">Status:</div>
        <div class="InputField font-normal">{{task.status}}</div>

      </div>
      <div class="flex flex-col text-left mb-8">
        <div class="pb-2">Storypoints:</div>
        <div class="InputField font-normal">{{task.storypoints}}</div>
      </div>
      <router-link class="Button" :to="'/edit-task/' + task.id">Edit Task</router-link>
    </form>
    <svg class="absolute -bottom-7 -left-7" xmlns="http://www.w3.org/2000/svg" width="70.47" height="68.074"><g data-name="Gruppe 61" fill="none" stroke="#ffb319" stroke-linecap="round" stroke-linejoin="round" stroke-width="5"><g data-name="Gruppe 37"><path data-name="Pfad 27" d="M56.139 32.711c5.135 4.624-3.95 12.932 2.603 18.832"/><path data-name="Pfad 28" d="M34.533 13.258c5.136 4.623-3.948 12.932 2.603 18.831"/><path data-name="Pfad 29" d="M56.139 32.711c-5.136-4.624-12.45 5.278-19.003-.622"/><path data-name="Pfad 31" d="M34.533 13.258c-5.135-4.624-12.448 5.279-19.001-.622"/></g><g data-name="Gruppe 38"><path data-name="Pfad 27" d="M44.139 45.711c5.135 4.624-3.95 12.932 2.603 18.832"/><path data-name="Pfad 28" d="M22.533 26.258c5.136 4.623-3.948 12.932 2.603 18.831"/><path data-name="Pfad 29" d="M44.139 45.711c-5.136-4.624-12.45 5.278-19.003-.622"/><path data-name="Pfad 31" d="M22.533 26.258c-5.135-4.624-12.448 5.279-19.001-.622"/></g></g></svg>
    </div>
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

<style lang="scss">
//#TaskDetails {
//  @apply mt-28 px-0 py-0;
//}
</style>
