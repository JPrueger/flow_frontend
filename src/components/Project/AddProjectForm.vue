<template>
  <div>
    <BaseForm
      v-model="newProject"
      @input="saveProject"
      headline="Add Project Headline"
      submitButton="Add Project"
      :fields="fields"
    />
    <multiselect
      v-model="value"
      :options="options"
      :show-labels="true"
      :allow-empty="true"
      :multiple="true"
      label="name"
      track-by="id"
    />
  </div>
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
      success: false,
      fields: addProjectFields,
      allUsers: [],
      value: null,

      newProject: {
        title: "",
        user_id: "",
      },
    };
  },
  methods: {
    saveProject() {
      console.log("saveProject aufgerufen");
      let formData = new FormData();
      formData.append("title", this.newProject.title);
      formData.append("user_id", this.newProject.user_id);
      formData.append("users", JSON.stringify(this.value.map((item) => item.id)));
      // todo: hier noch eingegebene user namen mitangeben

      axios
        .post("http://flow_backend.local/api/add-project/create", formData)
        .then(() => {
          // alert("Speichern erfolgreich");
          this.createSuccess = true;
          this.error = false;
          window.location.href = "/projects/";
        })
        .catch(() => {
          this.error = true;
        });
    },

    getAllUsers() {
      axios
        .get("http://flow_backend.local/api/user/all-users")
        .then((res) => {
          this.allUsers = res.data;
          console.log("users", this.allUsers);
        })
        .catch(() => {
          this.error = true;
        });
    },
  },
  computed:{
    options () {
      return this.allUsers.map((item) => ({name: item.name, id: item.id}))
    }
  },
  mounted() {
    userDataService
      .me()
      .then((userData) => {
        this.newProject.user_id = userData.id;
        console.log("user id here: ", this.newProject.user_id);
      })
      .catch(async (error) => {
        alert("Error: " + error.response.data.message);
        this.loading = false;
      });

    this.getAllUsers();
  },
  updated() {
    userDataService.me().then((userData) => {
      this.newProject.user_id = userData.id;
      console.log("user id here: ", this.newProject.user_id);
    });
  },
};
</script>
