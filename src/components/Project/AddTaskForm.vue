<template>
  <div class="max-w-lg mx-auto relative">
    <h1>Add Task</h1>
    <form @submit.prevent class="Form">
      <div>
        <input v-model="newTask.project_id" type="hidden" />
        <div class="flex flex-col text-left mb-8" type="text">
          <label for="title" class="pb-2">Title</label
          ><input
            v-model="newTask.title"
            id="title"
            type="text"
            placeholder="Your Task Title"
            required="required"
            maxlength="255"
            class="InputField"
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
            class="InputField"
          />
        </div>
      </div>
      <div class="flex flex-col text-left mb-8">
        <label for="state" class="pb-2">Status:</label>
        <select
          id="state"
          class="InputField"
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
          class="InputField"
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
      <div>
        <multiselect
          v-model="value"
          :options="options"
          :show-labels="true"
          :allow-empty="false"
          :multiple="false"
          label="name"
          track-by="id"
        />
      </div>
      <input type="submit" @click="saveTask()" class="Button" />
    </form>
    <svg class="absolute -bottom-7 -left-7" xmlns="http://www.w3.org/2000/svg" width="70.47" height="68.074"><g data-name="Gruppe 61" fill="none" stroke="#ffb319" stroke-linecap="round" stroke-linejoin="round" stroke-width="5"><g data-name="Gruppe 37"><path data-name="Pfad 27" d="M56.139 32.711c5.135 4.624-3.95 12.932 2.603 18.832"/><path data-name="Pfad 28" d="M34.533 13.258c5.136 4.623-3.948 12.932 2.603 18.831"/><path data-name="Pfad 29" d="M56.139 32.711c-5.136-4.624-12.45 5.278-19.003-.622"/><path data-name="Pfad 31" d="M34.533 13.258c-5.135-4.624-12.448 5.279-19.001-.622"/></g><g data-name="Gruppe 38"><path data-name="Pfad 27" d="M44.139 45.711c5.135 4.624-3.95 12.932 2.603 18.832"/><path data-name="Pfad 28" d="M22.533 26.258c5.136 4.623-3.948 12.932 2.603 18.831"/><path data-name="Pfad 29" d="M44.139 45.711c-5.136-4.624-12.45 5.278-19.003-.622"/><path data-name="Pfad 31" d="M22.533 26.258c-5.135-4.624-12.448 5.279-19.001-.622"/></g></g></svg>
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
      projectUsers: [],
      value: null,

      newTask: {
        title: "",
        description: "",
        storypoints: "",
        status: "",
        project_id: "",
      },
    };
  },
  methods: {
    saveTask() {
      let formData = new FormData();
      formData.append("title", this.newTask.title);
      formData.append("description", this.newTask.description);
      formData.append("storypoints", this.newTask.storypoints);
      formData.append("status", this.newTask.status);
      formData.append("project_id", this.newTask.project_id);
      formData.append("assigne_id", JSON.stringify(this.value.id));

      axios
        .post("http://flow_backend.local/api/add-task/create", formData)
        .then(() => {
          window.location.href = "/project-board/" + this.project_id;
        })
        .catch((err) => {
          alert("Speichern nicht erfolgreich");
          this.errors = err.response.data.errors;
          console.log(this.errors);
        });
    },
    getAllUsersForThisProject() {
      axios
        .get("http://flow_backend.local/api/project-users/" + this.project_id)
        .then((res) => {
          this.projectUsers = res.data;
          console.log("users", this.projectUsers);
        })
        .catch(() => {
          this.error = true;
        });
    },
  },
  computed: {
    options() {
      return this.projectUsers.map((item) => ({
        name: item.name,
        id: item.id,
      }));
    },
  },
  mounted() {
    this.getAllUsersForThisProject();
  },
  created() {
    this.newTask.project_id = this.$route.params.id;
    console.log("created: ", this.newTask.project_id);
  },
};
</script>
