<template>
  <div>
    <div class="flex">
      <RegisterForm
        v-model="newUser"
        @input="saveUser"
        headline="Hey there!"
        subheadline="Good seeing you. Tell us your details and choose a character to get you started into flow."
        submitButton="Submit!"
        :responseState="response"
        :fields="fields"
        class="mb-4"
      />
    </div>
    <p class="text-center">
      Already registered?
      <router-link to="/login" class="text-center Link">Login here!</router-link>
    </p>
  </div>
</template>
<script>
import RegisterForm from "../RegisterForm/RegisterForm.vue";

export default {
  components: {
    RegisterForm,
  },
  data() {
    return {
      response: {},
      fields: [],
      saveUser: '',
      newUser: {},
    };
  },
};
</script>