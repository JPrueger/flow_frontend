<template>
  <BaseForm
      v-model="newTask"
      @input="saveTask"
      headline="Edit Task Headline"
      submitButton="Save"
      :fields="fields"
  />
</template>
<script>
import addTaskFields from "@/data/forms/addTask.js";
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
      fields: addTaskFields,

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
    }
  },
};
</script>
