<template>
  <div class="max-w-lg mx-auto relative">
    <h1>Edit task: {{ task.title }}</h1>
    <form @submit.prevent class="Form bg-white">
      <div>
        <input v-model="task.project_id" type="hidden" />
        <div class="flex flex-col text-left mb-8" type="text">
          <span v-if="v$.task.title.$error" class="text-pink-main font-medium text-sm">
                {{ v$.task.title.$errors[0].$message }}
          </span>
          <label for="title" class="pb-2"
            >Title<span class="text-pink-main"> *</span></label
          ><input
            v-model="task.title"
            id="title"
            type="text"
            :placeholder="task.title"
            required="required"
            maxlength="255"
            class="InputField"
          />
        </div>
      </div>
      <div>
        <div class="flex flex-col text-left mb-8" type="text">
          <span v-if="v$.task.description.$error" class="text-pink-main font-medium text-sm">
                {{ v$.task.description.$errors[0].$message }}
          </span>
          <label for="description" class="pb-2"
            >Description<span class="text-pink-main"> *</span></label>
          <textarea
              id="description"
              v-model="task.description"
              :placeholder="task.description"
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
        <label for="state" class="pb-2"
          >Status<span class="text-pink-main"> *</span></label
        >
        <select id="state" class="InputField arrow-icon" v-model="task.status">
          <option value="open">Open</option>
          <option value="progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
      <div class="flex flex-col text-left mb-8">
        <label for="storypoints" class="pb-2"
          >Storypoints<span class="text-pink-main"> *</span></label
        >
        <select id="storypoints" class="InputField arrow-icon" v-model="task.storypoints">
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
        <label for="name" class="pb-2"
          >Assignee<span class="text-pink-main">
            *</span
          ></label
        >
        <multiselect
          v-model="assigneeValue"
          :options="options"
          :show-labels="true"
          :allow-empty="false"
          :multiple="false"
          label="name"
          track-by="id"
        />
        <span class="mt-1 pl-0.5 text-xs font-normal">Choose from list.</span>
      </div>
      <input
        type="submit"
        @click="saveTask()"
        class="Button mx-auto"
        value="Save"
      />
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
import axios from "axios";
import addTaskFields from "@/data/forms/addTask.js";
import useVuelidate from '@vuelidate/core';
import { required, maxLength, helpers } from '@vuelidate/validators';

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
      fields: addTaskFields,
      task: "",
      projectUsers: [],
      value: null,
      assigneeValue: null,
    };
  },
  validations () {
    return {
      task: {
        title: {
          required: helpers.withMessage('Please enter a title', required)
        },
        description: {
          required: helpers.withMessage('Please enter a description', required),
          maxLength: maxLength(500)
        }
      }
    }
  },
  props: {
    taskId: Number,
  },
  methods: {
    /**
     * Task gets saved to database.
     * When successfully saved, user gets redirected to the general project board.
     * Otherwise toasty message with error gets shown.
     */
    saveTask() {
      let formData = new FormData();
      formData.append("project_id", this.task.project_id);
      formData.append("title", this.task.title);
      formData.append("description", this.task.description);
      formData.append("status", this.task.status);
      formData.append("storypoints", this.task.storypoints);
      formData.append("assigne_id", JSON.stringify(this.assigneeValue.id));

      // checks all inputs
      this.v$.$validate();


      if (!this.v$.$error) {
        axios
            .post(
                `${process.env.VUE_APP_API_URL}/edit-task/` + this.idOfTask,
                formData
            )
            .then(() => {
              this.$router.push("/project-board/" + this.task.project_id, () => {
                this.$toasted.show("Successfully updated your task!", {
                  duration: 5000,
                  type: "success",
                  position: "top-center",
                });
              });
            })
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
      }
    },
    /**
     * Gets task according to route parameter.
     */
    getPost() {
      axios
        .get(`${process.env.VUE_APP_API_URL}/task/` + this.$route.params.id)
        .then((res) => {
          this.task = res.data;
          this.getAllUsersForThisProject();
        });
    },
    /**
     * Gets all users for the current project.
     */
    getAllUsersForThisProject() {
      axios
        .get(
            `${process.env.VUE_APP_API_URL}/project-users/` + this.task.project_id
        )
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
     * Returns the task's id.
     */
    idOfTask() {
      return this.task.id;
    },
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
      var char = this.task?.description?.length,
          limit = 500;

      return (limit - char) + " characters remaining";
    }
  },
  /**
   * When page is mounted, getAllUsersForThisProject() and getAllUsersForThisProject() gets called
   */
  mounted() {
    this.getPost();
    this.getAllUsersForThisProject();
  },
};
</script>
