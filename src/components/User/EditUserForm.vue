<template>
  <div class="max-w-lg mx-auto relative">
      <h1>Edit user: {{ user.name }}</h1>
      <form @submit.prevent class="Form">
        <div>
          <input v-model="user.id" type="hidden" />
          <div class="flex flex-col text-left mb-8" type="text">
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
          <label for="email" class="pb-2">Email</label>
          <input
              v-model="user.email"
              id="email"
              type="email"
              :placeholder="user.email"
              class="InputField"
          />
        </div>
        <div class="flex flex-col text-left mb-8">
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

export default {
  data() {
    return {
      loading: false,
      error: null,
      token: null,
      success: false,
      user: "",
    };
  },
  methods: {
    saveUser() {
      axios
        .post(
          "http://flow_backend.local/api/user/edit/" + this.$route.params.id,
          this.user
        )
        .then(() => {
          // alert("Speichern erfolgreich");
          window.location.href = "/user-profile";
        })
        .catch((err) => {
          alert("Speichern nicht erfolgreich");
          this.errors = err.response.data.errors;
          console.log(this.errors);
        });
    },
    getUserDetails() {
      axios
          .get("http://flow_backend.local/api/user/" + this.$route.params.id)
          .then((res) => {
            this.user = res.data;
            console.log(this.userData);
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
