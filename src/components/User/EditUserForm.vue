<template>
  <div class="max-w-lg mx-auto relative">
      <h1>Edit user: {{ user.name }}</h1>
      <form @submit.prevent class="Form bg-white">
        <div>
          <input v-model="user.id" type="hidden" />
          <div class="flex flex-col text-left mb-8" type="text">
            <span v-if="v$.user.name.$error" class="text-pink-main font-medium text-sm">
                {{ v$.user.name.$errors[0].$message }}
            </span>
            <label for="name" class="pb-2">Name</label
            ><input
              v-model="user.name"
              id="name"
              type="text"
              :placeholder="user.name"
              required="required"
              maxlength="255"
              class="InputField"
          />
          </div>
        </div>
        <div class="flex flex-col text-left mb-8">
          <span v-if="v$.user.password.$error" class="text-pink-main font-medium text-sm">
                    {{ v$.user.password.$errors[0].$message }}
              </span>
          <label for="password" class="pb-2">Password</label>
          <input
              v-model="user.password"
              id="password"
              type="password"
              placeholder="***********"
              required="required"
              class="InputField"
          />
        </div>

        <input type="submit" @click="saveUser()" class="Button mx-auto" value="Save User"/>
      </form>
    </div>
</template>
<script>
import axios from "axios";
import useVuelidate from '@vuelidate/core';
import {required, helpers} from '@vuelidate/validators';

export default {
  setup () {
    return {
      v$: useVuelidate(),
    }
  },
  data() {
    return {
      loading: false,
      error: null,
      token: null,
      success: false,
      user: "",
    };
  },
  validations () {
    return {
      user: {
        name: {
          required: helpers.withMessage('Please enter a username', required)
        },
        password: {
          required: helpers.withMessage('Please enter a password', required)
        },
      }
    }
  },
  methods: {
    saveUser() {
      this.v$.$validate() // checks all inputs
      if (!this.v$.$error) {
        // submit form when there are no errors occurring
        axios
            .post(
                `${process.env.VUE_APP_API_URL}/user/edit/` + this.$route.params.id,
                this.user
            )
            .then(() => {
              window.location.href = "/user-profile";
            })
            .catch((err) => {
              alert("Speichern nicht erfolgreich");
              this.errors = err.response.data.errors;
            });
      }
    },
    getUserDetails() {
      axios
          .get(`${process.env.VUE_APP_API_URL}/user/` + this.$route.params.id)
          .then((res) => {
            this.user = res.data;
          })
          .then(() => {
            this.loader = false;
          })
    },
  },
  created() {
    this.getUserDetails();
  },
};
</script>
