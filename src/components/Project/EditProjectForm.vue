<template>
  <div class="max-w-lg mx-auto relative">
      <h1>Edit: {{project.title}}</h1>
      <form @submit.prevent class="Form">
        <div>
          <input v-model="project.id" type="hidden" />
          <div class="flex flex-col text-left mb-8" type="text">
            <label for="title" class="pb-2">Title<span class="text-pink-main"> *</span></label
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

        <input type="submit" @click="saveProject()" class="Button mx-auto" value="Save Project"/>
      </form>
    </div>
</template>
<script>
import axios from "axios";
import userDataService from "@/services/userDataService";
import addProjectFields from "@/data/forms/addProject.js";



export default {
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
      // project: {
      //   title: "",
      //   user_id: "",
      // },
    };
  },
  methods: {
    saveProject() {
      this.loader = true;
      let formData = new FormData();
      formData.append("title", this.project.title);
      formData.append("user_id", this.project.user_id);
      if(this.value != null) {
        formData.append("users", JSON.stringify(this.value.map((item) => item.id)));
      }

      axios
          .post("http://flow_backend.local/api/project/edit/" + this.project.id, formData)
          .then(() => {
            this.loader = false;
          })
          .then(() => {
            this.createSuccess = true;
            this.error = false;
            this.$router.push('/projects', () => {
              this.$toasted.show('Successfully added a new project!', {
                duration: 5000,
                type: 'success',
                position: 'top-center',
              });
            });
          })
          .catch(() => {
            this.loader = false;
            this.$toasted.show('Seems like something went wrong. Please try again!', {
              duration: 5000,
              type: 'error',
              position: 'top-center',
            });
          });
    },
    getProjectDetails() {
      axios
          .get(
              "http://flow_backend.local/api/project-details/" +
              this.$route.params.id
          )
          .then((res) => {
            this.project = res.data;
          })
          .then(() => {
            this.loader = false;
          });
    },
    getAllUsers() {
      axios
          .get("http://flow_backend.local/api/user/all-users")
          .then((res) => {
            this.allUsers = res.data;
          })
          .catch(() => {
            this.error = true;
          });
    },
  },
  computed: {
    options() {
      return this.allUsers.map((item) => ({ name: item.name, id: item.id }));
    },
  },
  mounted() {
    userDataService
        .me()
        .then((userData) => {
          this.project.user_id = userData.id;
        })
        .catch(async () => {
          this.loading = false;
        });

    this.getAllUsers();
  },
  created() {
    this.getProjectDetails();
  },
  updated() {
    userDataService.me().then((userData) => {
      this.project.user_id = userData.id;
    });
  },
};
</script>
