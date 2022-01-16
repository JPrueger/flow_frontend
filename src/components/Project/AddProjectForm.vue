<template>
  <div class="max-w-lg mx-auto relative">
    <h1>Add Project</h1>
    <form @submit.prevent class="shadow p-11 rounded mt-6 bg-white">
      <Loader v-if="loader" />
      <div v-if="!loader" class="flex flex-col text-left mb-8" type="text">
         <span v-if="v$.newProject.title.$error" class="text-pink-main font-medium text-sm">
                {{ v$.newProject.title.$errors[0].$message }}
          </span>
        <label for="title" class="pb-2">Title<span class="text-pink-main"> *</span></label>
        <input
          v-model="newProject.title"
          id="title"
          type="text"
          placeholder="Your Project Title"
          required="required"
          maxlength="255"
          class="InputField"
        />
      </div>
      <div v-if="!loader" class="text-left">
        <label for="name" class="pb-2">Assignees</label>
        <multiselect
          id="assignee"
          v-if="!loader"
          v-model="value"
          :options="options"
          :show-labels="true"
          :allow-empty="true"
          :multiple="true"
          label="name"
          track-by="id"
          class="mb-10"
        />
      </div>
      <div class="grid">
        <input
          v-if="!loader"
          type="submit"
          @click="saveProject()"
          class="Button justify-self-center"
          value="Save"
        />
      </div>
    </form>
    <svg
      class="absolute -bottom-7 -left-7 form-shape"
      xmlns="http://www.w3.org/2000/svg"
      width="70.47"
      height="68.074"
    >
      <g
        data-name="Gruppe 61"
        fill="none"
        stroke="#ffb319"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="5"
      >
        <g data-name="Gruppe 37">
          <path
            data-name="Pfad 27"
            d="M56.139 32.711c5.135 4.624-3.95 12.932 2.603 18.832"
          />
          <path
            data-name="Pfad 28"
            d="M34.533 13.258c5.136 4.623-3.948 12.932 2.603 18.831"
          />
          <path
            data-name="Pfad 29"
            d="M56.139 32.711c-5.136-4.624-12.45 5.278-19.003-.622"
          />
          <path
            data-name="Pfad 31"
            d="M34.533 13.258c-5.135-4.624-12.448 5.279-19.001-.622"
          />
        </g>
        <g data-name="Gruppe 38">
          <path
            data-name="Pfad 27"
            d="M44.139 45.711c5.135 4.624-3.95 12.932 2.603 18.832"
          />
          <path
            data-name="Pfad 28"
            d="M22.533 26.258c5.136 4.623-3.948 12.932 2.603 18.831"
          />
          <path
            data-name="Pfad 29"
            d="M44.139 45.711c-5.136-4.624-12.45 5.278-19.003-.622"
          />
          <path
            data-name="Pfad 31"
            d="M22.533 26.258c-5.135-4.624-12.448 5.279-19.001-.622"
          />
        </g>
      </g>
    </svg>
  </div>
</template>
<script>
import addProjectFields from "@/data/forms/addProject.js";
import axios from "axios";
import userDataService from "@/services/userDataService";
import Loader from "../Partials/Loader";
import useVuelidate from '@vuelidate/core';
import {required, helpers} from '@vuelidate/validators';

export default {
  components: {
    Loader,
  },
  setup () {
    return {
      v$: useVuelidate(),
    }
  },
  data() {
    return {
      loading: false,
      error: null,
      success: false,
      fields: addProjectFields,
      allUsers: [],
      value: null,
      loader: false,
      newProject: {
        title: "",
        user_id: "",
      },
    };
  },
  validations () {
    return {
      newProject: {
        title: {
          required: helpers.withMessage('Please enter a title', required)
        }
      }
    }
  },
  methods: {
    /**
     * Project gets saved to database.
     * Logged in user gets automatically added to the created project,
     * if value != null the chosen users are getting added as well.
     */
    saveProject() {
      let formData = new FormData();
      formData.append("title", this.newProject.title);
      formData.append("user_id", this.newProject.user_id);
      if (this.value != null) {
        formData.append(
          "users",
          JSON.stringify(this.value.map((item) => item.id))
        );
      }

      // checks all inputs
      this.v$.$validate();

      //if no errors are occurring, send to backend
      if (!this.v$.$error) {
        this.loader = true;
        axios
            .post(`${process.env.VUE_APP_API_URL}/add-project/create`, formData)
            .then(() => {
              this.loader = false;
            })
            .then(() => {
              this.createSuccess = true;
              this.error = false;
              this.$router.push("/projects", () => {
                this.$toasted.show("Successfully added a new project!", {
                  duration: 5000,
                  type: "success",
                  position: "top-center",
                });
              });
            })
            .catch(() => {
              this.loader = false;
              this.$toasted.show(
                  "Seems like something went wrong. Please try again!",
                  {
                    duration: 5000,
                    type: "error",
                    position: "top-center",
                  }
              );
            });
      }
    },
    /**
     * Getting all users from database to show them in multiselect.
     */
    getAllUsers() {
      axios
        .get(`${process.env.VUE_APP_API_URL}/user/all-users`)
        .then((res) => {
          this.allUsers = res.data;
        })
        .catch(() => {
          this.error = true;
        });
    },
  },
  computed: {
    /**
     * Hands over only name and id of all users to the multiselect. 
     */
    options() {
      return this.allUsers.map((item) => ({ name: item.name, id: item.id }));
    },
  },
  mounted() {
    userDataService
      .me()
      .then((userData) => {
        this.newProject.user_id = userData.id;
      })
      .catch(async () => {
        this.loading = false;
      });
    this.getAllUsers();
  },
  updated() {
    /**
     * gets current logged in user.
     */
    userDataService.me().then((userData) => {
      this.newProject.user_id = userData.id;
    });
  },
};
</script>
