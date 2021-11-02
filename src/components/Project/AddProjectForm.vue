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
      },
    };
  },
  methods: {
    saveProject() {
      axios
        .post("http://flow_backend.local/api/add-project/create", this.newProject)
        .then(() => {
          alert("Speichern erfolgreich");
        })
        .catch((err) => {
            alert("Speichern nicht erfolgreich");
            this.errors = err.response.data.errors;
            console.log(this.errors);
        });
    }
  },
};
</script>
