<template>
  <div class="max-w-lg mx-auto relative">
    <h1>Add Task</h1>
    <form @submit.prevent class="Form bg-white">
      <div>
        <input v-model="newTask.project_id" type="hidden" />

        <div class="flex flex-col text-left mb-8" type="text">
          <span v-if="v$.newTask.title.$error" class="text-pink-main font-medium text-sm">
                {{ v$.newTask.title.$errors[0].$message }}
          </span>

          <label for="title" class="pb-2">Title<span class="text-pink-main"> *</span></label
          ><input
            v-model="newTask.title"
            id="title"
            type="text"
            placeholder="Your Task Title"
            required="required"
            maxlength="255"
            class="InputField"
          />
        </div>
      </div>
      <div>
        <div class="flex flex-col text-left mb-8" type="text">
          <span v-if="v$.newTask.description.$error" class="text-pink-main font-medium text-sm">
                {{ v$.newTask.description.$errors[0].$message }}
          </span>
          <label for="description" class="pb-2">Description<span class="text-pink-main"> *</span></label>

          <textarea
              id="description"
              v-model="newTask.description"
              placeholder="Your Task Description"
              required="required"
              maxlength="500"
              type="text"
              class="InputField textarea"
              rows="5">
          </textarea>
          <span class="mt-1 pl-0.5 text-xs font-normal">{{charactersLeft}}</span>
        </div>
      </div>
      <div class="flex flex-col text-left mb-8">
        <span v-if="v$.newTask.status.$error" class="text-pink-main font-medium text-sm">
                {{ v$.newTask.status.$errors[0].$message }}
          </span>
        <label for="state" class="pb-2">Status<span class="text-pink-main"> *</span></label>
        <select id="state" class="InputField arrow-icon" v-model="newTask.status" required>
          <option value="" selected="selected" disabled="disabled">Select...</option>
          <option value="open">Open</option>
          <option value="progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
      <div class="flex flex-col text-left mb-8">
        <span v-if="v$.newTask.storypoints.$error" class="text-pink-main font-medium text-sm">
                {{ v$.newTask.storypoints.$errors[0].$message }}
          </span>
        <label for="storypoints" class="pb-2">Storypoints<span class="text-pink-main"> *</span></label>
        <select
          id="storypoints"
          class="InputField arrow-icon"
          v-model="newTask.storypoints"
          required
        >
          <option value="" selected="selected" disabled="disabled" class="placeholder">Select...</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="5">5</option>
          <option value="8">8</option>
          <option value="13">13</option>
          <option value="20">20</option>
        </select>
      </div>
      <div class="flex flex-col text-left mb-8">
        <label for="name" class="pb-2">Assignee</label>
        <multiselect
          v-model="value"
          :options="options"
          :show-labels="true"
          :allow-empty="false"
          :multiple="false"
          label="name"
          track-by="id"
          class="mb-2"
        />
        <span class="pl-0.5 text-xs font-normal mb-2">You can choose another user to do this task.</span>
      </div>
      <div class="grid">
        <input
          type="submit"
          @click="saveTask()"
          value="Save"
          class="Button justify-self-center"
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
import addTaskFields from "@/data/forms/addTask.js";
import axios from "axios";
import useVuelidate from '@vuelidate/core';
import { required, maxLength, helpers } from '@vuelidate/validators';
import userDataService from "@/services/userDataService";


export default {
  props: {
    project_id: String,
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
      token: null,
      success: false,
      fields: addTaskFields,
      projectUsers: [],
      value: null,
      userId: '',

      newTask: {
        title: "",
        description: "",
        storypoints: "",
        status: "",
        assigne_id: "",
        project_id: "",
      },
    };
  },
  validations () {
    return {
      newTask: {
        title: {
          required: helpers.withMessage('Please enter a title', required)
        },
        description: {
          required: helpers.withMessage('Please enter a description', required),
          maxLength: maxLength(500)
        },
        storypoints: {
          required: helpers.withMessage('Please select Storypoints', required)
        },
        status: {
          required: helpers.withMessage('Please enter a status', required)
        }
      }
    }
  },
  methods: {
    /**
     * Appends all relevant input field values to formData.
     */
    saveTask() {
      let formData = new FormData();
      formData.append("title", this.newTask.title);
      formData.append("description", this.newTask.description);
      formData.append("storypoints", this.newTask.storypoints);
      formData.append("status", this.newTask.status);
      formData.append("project_id", this.newTask.project_id);

      //if no assignee is selected, choose current user as assigne
      if(this.value === null) {
        formData.append("assigne_id", this.userId);
      } else {
        formData.append("assigne_id", JSON.stringify(this.value.id));
      }

      // checks all inputs
      this.v$.$validate();

      //if no errors are occurring, send to backend
      if (!this.v$.$error) {
        axios
            .post(`${process.env.VUE_APP_API_URL}/add-task/create`, formData)
            .then(() => {
              this.$router.push("/project-board/" + this.project_id, () => {
                this.$toasted.show("Successfully added a new task!", {
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
     * Gets all users for the current project.
     */
    getAllUsersForThisProject() {
      axios
        .get(`${process.env.VUE_APP_API_URL}/project-users/` + this.project_id)
        .then((res) => {
          this.projectUsers = res.data;
        })
        .catch(() => {
          this.error = true;
        });
    },
  },
  computed: {
    /**
     * Since only name and id of user is shown, we hand over only those two to options.
     */
    options() {
      return this.projectUsers.map((item) => ({
        name: item.name,
        id: item.id,
      }));
    },
    charactersLeft() {
      var char = this.newTask.description.length,
          limit = 500;

      return (limit - char) + " characters remaining";
    }
  },
  /**
   * When page is mounted, getAllUsersForThisProject() gets called
   */
  mounted() {
    this.getAllUsersForThisProject();
    userDataService.me().then((userData) => {
      this.userId = userData.id;
    });
  },
  /**
   * When page is created, the parameter id gets saved in project_id
   */
  created() {
    this.newTask.project_id = this.$route.params.id;
  },
};
</script>
