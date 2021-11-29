<template>
  <BaseForm
    v-model="newProject"
    @input="saveProject"
    headline="Add Project Headline"
    submitButton="Add Project"
    :fields="fields"
  />
</template>
<script>
import addProjectFields from "@/data/forms/addProject.js";
import BaseForm from "../BaseForm/BaseForm.vue";
import axios from "axios";
import userDataService from "@/services/userDataService";

export default {
  components: {
    BaseForm,
  },
  data() {
    return {
      loading: false,
      error: null,
      token: null,
      success: false,
      fields: addProjectFields,

      newProject: {
        title: "",
        user_id: "",
      },
    };
  },
  methods: {
    saveProject() {
      console.log('saveProject aufgerufen')
      let formData = new FormData();
      formData.append("title", this.newProject.title);
      formData.append("user_id", this.newProject.user_id);

      axios
        .post("http://flow_backend.local/api/add-project/create", formData)
        .then(() => {
          this.createSuccess = true;
          this.error = false;
        })
        .catch(() => {
          this.error = true;
        });
    },
  },
  mounted() {
    userDataService.me().then((userData) => {
      this.newProject.user_id = userData.id;
      console.log('user id here: ', this.newProject.user_id);
    });
  },
  updated() {
    userDataService.me().then((userData) => {
      this.newProject.user_id = userData.id;
      console.log('user id here: ', this.newProject.user_id);
    });
  },
};
</script>
