<template>
  <div>
    <BaseForm
      v-model="newUser"
      @input="saveUser"
      headline="Hey there!"
      subheadline="Good seeing you. Tell us your details and choose a character to get you started into flow."
      submitButton="Submit!"
      :responseState="response"
      :fields="fields"
      class="mb-4"
    />
    <p class="text-center">
      Already registered?
      <router-link to="/login" class="text-center Link">Login here!</router-link>
    </p>
  </div>
</template>
<script>
import registerFields from "@/data/forms/registration.js";
import axios from "axios";
import BaseForm from "../BaseForm/BaseForm.vue";

export default {
  components: {
    BaseForm,
  },
  data() {
    return {
      formData: {},
      response: {},
      fields: registerFields,
      newUser: {
        name: "",
        email: "",
        password: "",
      },
      errors: [],
      succesSignin: false,
    };
  },
  methods: {
    saveUser() {
      console.log("clicked");
      axios
        .post("http://flow_backend.local/api/user/register", this.newUser)
        .then((response) => {
          console.log("test hier rein?", this.newUser);
          console.log("noch mal mikado: ", response);
          alert("Speichern erfolgreich");
        })
        .then(() => {
          this.succesSignin = true;
        })
        .catch((err) => {
          alert("Speichern nicht erfolgreich");
          this.errors = err.response.data.errors;
          console.log(this.errors);
        });
    },
  },
};
</script>