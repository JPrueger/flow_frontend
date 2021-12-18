<template>
<!--  <BaseForm-->
<!--      v-model="newTask"-->
<!--      @input="saveTask"-->
<!--      headline="Edit Task Headline"-->
<!--      submitButton="Save"-->
<!--      :fields="fields"-->
<!--  />-->
  <div class="max-w-lg mx-auto relative">
    <h1>Edit Task</h1>
  <form @submit.prevent class="Form">
    <div>
      <input v-model="task.project_id" type="hidden" />
      <div class="flex flex-col text-left mb-8" type="text">
        <label for="title" class="pb-2">Title</label
        ><input
          v-model="newTask.title"
          id="title"
          type="text"
          :placeholder="task.title"
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
          :placeholder="task.description"
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
          class="mb-10"
      />
    </div>
    <input type="submit" @click="saveTask()" class="Button" />
  </form>
  </div>
</template>
<script>
// import addTaskFields from "@/data/forms/addTask.js";
// import BaseForm from "../BaseForm/BaseForm.vue";
import axios from "axios";

export default {
  // components: {
  //   BaseForm,
  // },
  data() {
    return {
      loading: false,
      error: null,
      token: null,
      success: false,
      task: "",

      newTask: {
        title: "",
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
