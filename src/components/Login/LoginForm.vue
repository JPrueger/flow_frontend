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
      <router-link to="/register" class="text-center Link"
        >Register here!</router-link
      >
    </p>
  </div>
</template>
<script>
import loginFields from "@/data/forms/login.js";
import userDataService from "@/services/userDataService";
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
      fields: loginFields,
    };
  },
  methods: {
    loginUser: function () {
      this.loading = true;
      /**
       * Token gets set when user is logged in.
       * User gets redirected to the start page and success is shown.
       */
      userDataService
        .login(this.credentials)
        .then((loginData) => {
          this.success = true;
          this.token = loginData.token;
          localStorage.setItem("token", loginData.token);
          this.loading = false;
          this.$router.push("/", () => {
            this.$toasted.show("Successfully logged in. Good to see you!", {
              duration: 5000,
              type: "success",
              position: "top-center",
            });
          });
        })
        /**
         * In case something went wrong, error message is shown.
         */
        .catch(() => {
          this.$toasted.show(
            "Seems like something went wrong. Please try again!",
            {
              duration: 5000,
              type: "error",
              position: "top-center",
            }
          );
        });
    },
  },
};
</script>
