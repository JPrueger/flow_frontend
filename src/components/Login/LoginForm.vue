<template>
 <div>
    <BaseForm
      v-model="credentials"
      @input="loginUser"
      headline="Login"
      submitButton="Login"
      :fields="fields"
      class="mb-4"
    />
    <p class="text-center">
      No account yet?
      <router-link to="/" class="text-center Link">Register here!</router-link>
    </p>
  </div>
</template>
<script>
import loginFields from "@/data/forms/login.js";
import userDataService from "@/services/userDataService";
import BaseForm from "../BaseForm/BaseForm.vue";

export default {
  components: {
    BaseForm
  },
  data() {
    return {
      credentials: {},
      loading: false,
      error: null,
      token: null,
      success: false,
      fields: loginFields
    };
  },
  methods: {
    loginUser: function() {
      this.loading = true;

      userDataService
        .login(this.credentials)
        .then(loginData => {
          this.success = true;
          this.token = loginData.token;
          localStorage.setItem("token", loginData.token);
          this.loading = false;

          setTimeout(() => {
            window.location.href = "/";
          }, 3000);
        })
        .catch(async error => {
          alert("Error: " + error.response.data.message);
          this.loading = false;
        });
    }
  }
};
</script>
