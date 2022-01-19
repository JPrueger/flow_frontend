<template>
  <div class="max-w-lg mx-auto relative">
    <h1>Edit: {{ project.title }}</h1>
    <form @submit.prevent class="Form bg-white">
      <div>
        <input v-model="project.id" type="hidden" />
        <div class="flex flex-col text-left mb-8" type="text">
          <span v-if="v$.project.title.$error" class="text-pink-main font-medium text-sm">
                {{ v$.project.title.$errors[0].$message }}
          </span>
          <label for="title" class="pb-2"
            >Title<span class="text-pink-main"> *</span></label
          ><input
            v-model="project.title"
            id="title"
            type="text"
            :placeholder="project.title"
            required="required"
            maxlength="255"
            class="InputField"
          />
        </div>
      </div>
      <div class="flex flex-col text-left mb-8">
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
      <input
        type="submit"
        @click="saveProject()"
        class="Button mx-auto"
        value="Save Project"
      />
    </form>
  </div>
</template>
<script>
import axios from "axios";
import userDataService from "@/services/userDataService";
import addProjectFields from "@/data/forms/addProject.js";
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
      project: "",
      allUsers: [],
      fields: addProjectFields,
      value: null,
      loader: false,
    };
  },
  validations () {
    return {
      project: {
        title: {
          required: helpers.withMessage('Please enter a title', required)
        }
      }
    }
  },
  methods: {
    /**
     * Updated Project gets saved to database.
     * Logged in user gets automatically added to the created project,
     * if value != null the chosen users are getting added as well.
     */
    saveProject() {
      let formData = new FormData();
      formData.append("title", this.project.title);
      formData.append("user_id", this.project.user_id);
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
            .post(
                `${process.env.VUE_APP_API_URL}/project/edit/` + this.project.id,
                formData
            )
            .then(() => {
              this.loader = false;
            })
            /**
             * When post request has been successfully, user gets redirected to all projects overview.
             */
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
            /**
             * Otherwise toasty error message is shown.
             */
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
     * Gets project details according to route parameter. 
     */
    getProjectDetails() {
      axios
        .get(
            `${process.env.VUE_APP_API_URL}/project-details/` +
            this.$route.params.id
        )
        .then((res) => {
          this.project = res.data;
        })
        .then(() => {
          this.loader = false;
        });
    },
    /**
     * Gets all users.
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
    /**
     * Gets all User of the current project.
     */
    getUsersOfProject() {
      axios
        .get(`${process.env.VUE_APP_API_URL}/project-users/` + this.$route.params.id)
        .then((res) => {
          this.value = res.data;
        });
    },
  },
  computed: {
    /**
     * Since only name and id of user is shown, we hand over only those two to options.
     */
    options() {
      return this.allUsers.map((item) => ({ name: item.name, id: item.id }));
    },
  },
  mounted() {
    /**
     * The me() function gets the current user that is logged in.
     * See userDataService.js file in src/services
     */
    userDataService
      .me()
      .then((userData) => {
        this.project.user_id = userData.id;
      })
      .catch(async () => {
        this.loading = false;
      });

    /**
     * getAllUsers() gets called when page has been mounted.
     */
    this.getAllUsers();
  },
  /**
   * getProjectDetails() gets called when page has been created.
   */
  created() {
    this.getProjectDetails();
    this.getUsersOfProject();
  },
  /**
   * When page has been updated:
   * The me() function gets the current user that is logged in.
   * See userDataService.js file in src/services
   */
  updated() {
    userDataService.me().then((userData) => {
      this.project.user_id = userData.id;
    });
  },
};
</script>
