<template>
  <BaseForm
    v-model="credentials"
    @input="loginUser"
    headline="Add Project Headline"
    submitButton="Add Project"
    :fields="fields"
  />
</template>
<script>
import addProjectFields from "@/data/forms/addProject.js";
import BaseForm from "../BaseForm/BaseForm.vue";

export default {
  components: {
    BaseForm,
  },
  data() {
    return {
      credentials: {},
      loading: false,
      error: null,
      token: null,
      success: false,
      fields: addProjectFields,
    };
  },
};
</script>
