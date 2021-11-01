<template>
  <BaseForm
    v-model="newUser"
    @input="saveUser"
    headline="Registrieren Headline"
    submitButton="Registrieren"
    :responseState="response"
    :fields="fields"
  />
</template>
<script>
import registerFields from '@/data/forms/registration.js';
import axios from "axios";
import BaseForm from '../BaseForm/BaseForm.vue';

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
      console.log('clicked');
      axios
        .post("http://flow_backend.local/api/user/register", this.newUser)
        .then((response) => {
            console.log('test hier rein?', this.newUser);
            console.log('noch mal mikado: ', response);
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
