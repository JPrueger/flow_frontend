<template>
  <div>
    <form @submit.prevent class="shadow p-11 rounded mt-6">
      <div>
        <input
            v-model="newTask.project_id"
            type="hidden"
        />
        <div class="flex flex-col text-left mb-8" type="text">
          <label for="title" class="pb-2">Title</label
          ><input
            v-model="newTask.title"
            id="title"
            type="text"
            placeholder="Your Task Title"
            required="required"
            maxlength="255"
            class="rounded p-3 border border-borderGrey"
          />
        </div>
      </div>
      <div>
        <div class="flex flex-col text-left mb-8" type="text">
          <label for="description" class="pb-2">Description</label
          ><input
            id="description"
            v-model="newTask.description"
            type="text"
            placeholder="Your Task Description"
            required="required"
            maxlength="500"
            class="rounded p-3 border border-borderGrey"
          />
        </div>
      </div>
      <div class="flex flex-col text-left mb-8">
        <label for="state" class="pb-2">Status:</label>
        <select
          id="state"
          class="rounded p-3 border border-borderGrey"
          v-model="newTask.status"
        >
          <option value="open">Open</option>
          <option value="progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
      <div class="flex flex-col text-left mb-8">
        <label for="storypoints" class="pb-2">Storypoints:</label>
        <select
          id="storypoints"
          class="rounded p-3 border border-borderGrey"
          v-model="newTask.storypoints"
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="5">5</option>
          <option value="8">8</option>
          <option value="13">13</option>
          <option value="20">20</option>
        </select>
      </div>
      <input type="submit" @click="saveTask()" class="Button" />
    </form>
  </div>
</template>
<script>
import addTaskFields from "@/data/forms/addTask.js";
import axios from "axios";

export default {
  props: {
    project_id: String,
  },
  data() {
    return {
      loading: false,
      error: null,
      token: null,
      success: false,
      fields: addTaskFields,

      newTask: {
        title: "",
        description: "",
        storypoints: "",
        status: "",
        project_id: ""
      },
    };
  },
  methods: {
    saveTask() {
      axios
        .post("http://flow_backend.local/api/add-task/create", this.newTask)
        .then(() => {
          alert("Speichern erfolgreich");
        })
        .catch((err) => {
          alert("Speichern nicht erfolgreich");
          this.errors = err.response.data.errors;
          console.log(this.errors);
        });
    },
  },
  created() {
    this.newTask.project_id = this.$route.params.id;
    console.log('created: ', this.newTask.project_id)
  },
};
</script>
