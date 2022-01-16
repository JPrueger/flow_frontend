<template>
  <div>
    <div class="max-w-lg mx-auto relative">
      <div class="flex justify-between items-baseline">
        <h1>Task: {{ task.title }}</h1>
        <button @click="deleteTask()">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
            <path
              fill="#99154E"
              d="M10.807 2c-.517 0-1.011.204-1.377.57L9 3H4a1 1 0 1 0 0 2h16a1 1 0 1 0 0-2h-5l-.43-.43A1.943 1.943 0 0 0 13.193 2h-2.386zM4.365 7l1.528 13.264c.132.99.984 1.736 1.982 1.736h8.248c.998 0 1.851-.745 1.984-1.744L19.635 7H4.365z"
            />
          </svg>
        </button>
      </div>
      <Loader v-if="loader" />

      <form @submit.prevent class="Form" v-if="!loader">
        <div>
          <div class="flex flex-col text-left mb-8" type="text">
            <div class="pb-2">Title</div>
            <div class="InputField font-normal bg-greyLight">{{ task.title }}</div>
          </div>
        </div>
        <div>
          <div class="flex flex-col text-left mb-8" type="text">
            <div class="pb-2">Description</div>
            <div class="InputField textarea font-normal bg-greyLight">{{ task.description }}</div>
          </div>
        </div>
        <div class="flex flex-col text-left mb-8">
          <div class="pb-2">Status:</div>
          <div class="InputField font-normal bg-greyLight">{{ task.status }}</div>
        </div>
        <div class="flex flex-col text-left mb-8">
          <div class="pb-2">Storypoints:</div>
          <div class="InputField font-normal bg-greyLight">{{ task.storypoints }}</div>
        </div>
        <div class="flex flex-col text-left mb-8">
          <div class="pb-2">Assigne:</div>
          <div class="user-icon-width">
            <ColoredUserIcon
              :userName="userData.name"
              :color="userData.tag_color"
            />
          </div>
        </div>

        <router-link
          class="Button mx-auto"
          :to="'/edit-task/' + task.id"
          v-if="task.status !== 'done'"
          >Edit Task</router-link
        >
      </form>
      <svg
        v-if="!loader"
        class="absolute -bottom-7 -left-7"
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
  </div>
</template>

<script>
import axios from "axios";
import Loader from "@/components/Partials/Loader";
import ColoredUserIcon from "@/components/Partials/ColoredUserIcon.vue";

export default {
  name: "TaskDetails",
  components: {
    Loader,
    ColoredUserIcon,
  },
  data: () => {
    return {
      task: "",
      userData: "",
      loader: true,
    };
  },
  methods: {
    /**
     * Gets task according to route parameter.
     */
    getPost() {
      axios
        .get(`${process.env.VUE_APP_API_URL}/task/` + this.$route.params.id)
        .then((res) => {
          this.task = res.data;
          this.getUserDetails();
        })
        .then(() => {
          this.loader = false;
        });
    },
    /**
     * Deletes selected task.
     */
    deleteTask() {
      axios
        .delete(
            `${process.env.VUE_APP_API_URL}/delete-task/` + this.$route.params.id
        )
        .then(() => {
          window.location.href = "/project-board/" + this.task.project_id;
        })
        .then(() => {
          this.loader = false;
        });
    },
    /**
     * Gets user details of current task.
     */
    getUserDetails() {
      axios
        .get(`${process.env.VUE_APP_API_URL}/user/` + this.task.assigne_id)
        .then((res) => {
          this.userData = res.data;
        });
    },
  },
  /**
   * getPost() gets called when page is created. 
   */
  created() {
    this.getPost();
  },
};
</script>
