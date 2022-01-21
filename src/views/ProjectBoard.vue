<template>
  <div>
    <div class="flex justify-between md:justify-between items-baseline">
        <h1 v-text="projectTitle()" class="md:mr-8" />
        <div class="flex justify-between items-baseline">
          <router-link class="mr-4" :to="'/project/edit/' + this.$route.params.id">
            <img src="@/assets/images/edit.svg" class="mt-1" />
          </router-link>
          <button @click="deleteProject()">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
              <path
                  fill="#99154E"
                  d="M10.807 2c-.517 0-1.011.204-1.377.57L9 3H4a1 1 0 1 0 0 2h16a1 1 0 1 0 0-2h-5l-.43-.43A1.943 1.943 0 0 0 13.193 2h-2.386zM4.365 7l1.528 13.264c.132.99.984 1.736 1.982 1.736h8.248c.998 0 1.851-.745 1.984-1.744L19.635 7H4.365z"
              />
            </svg>
          </button>
        </div>
    </div>
    <!-- Lightbox gets triggered when specific storypoints have been reached -->
    <Lightbox
      :userId="userId"
      :videoId="getVideoIdFromLevel()"
      :storypoints="storypoints"
      :characterName="userData.character_name"
      v-if="
        (this.storypoints >= 15 &&
          this.storypoints <= 24 &&
          !userData.level_one_played) ||
        (this.storypoints >= 25 &&
          this.storypoints <= 39 &&
          !userData.level_two_played) ||
        (userData.storypoints >= 40 && !userData.level_three_played)"
      />
    <!-- Loader is shown until everything has been loaded successfully -->
    <Loader v-if="loader" />
    <div class="lg:flex lg:justify-between mb-10 columns-wrapper">
      <!-- we've split up open, in progress and done in different columns -->
      <BoardColumn
        v-if="!loader"
        columnName="Open"
        :list="opentasks"
        statusKey="open"
      />
      <BoardColumn
        v-if="!loader"
        columnName="In Progress"
        :list="progresstasks"
        statusKey="progress"
      />
      <BoardColumn
        v-if="!loader"
        columnName="Done"
        :list="donetasks"
        statusKey="done"
      />
    </div>
    <router-link :to="'/add-task/' + this.$route.params.id" class="Button mt-10"
      >Add New Task
    </router-link>
  </div>
</template>

<script>
import axios from "axios";
import BoardColumn from "@/components/Project/BoardColumn";
import userDataService from "@/services/userDataService";
import Lightbox from "../components/Lightbox/Lightbox.vue";
import Loader from "../components/Partials/Loader";

export default {
  name: "ProjectBoard",
  components: {
    BoardColumn,
    Lightbox,
    Loader,
  },
  props: {
    project_id: Number,
    isActiveGhost: Boolean,
  },

  data: () => {
    return {
      tasks: [],
      opentasks: [],
      progresstasks: [],
      donetasks: [],
      filters: {
        open: "open",
        progress: "progress",
        done: "done",
      },
      taskUpdated: false,
      projectId: "",
      project: "",
      userData: "",
      storypoints: null,
      characterName: "",
      loader: true,
      polling: null,
      userId: "",
    };
  },
  methods: {
    /**
     * Für den copy/paste code bekommst du nochmal eine box muffins von uns Alex!
     * Kerstin gibt dieses mal auch sicher mehr Zucker rein :)
     * Klingt nach einer Ausrede, aber unser ToDo Liste wächst und wächst deshalb stellen wir das 
     * refactoren mal ganz nach hinten an: https://media.giphy.com/media/COYGe9rZvfiaQ/giphy.gif
     */

    /**
     * Gets tasks according to route parameter.
     */
    getPost() {
      axios
        .get(
            `${process.env.VUE_APP_API_URL}/tasks/index/` + this.$route.params.id
        )
        .then((res) => {
          this.tasks = res.data;
        })
        .then(() => {
          this.getOpenedTask();
          this.getProgressTask();
          this.getDoneTask();
        })
        .then(() => {
          this.loader = false;
        });
    },
    /**
     * Deletes selected project.
     */
    deleteProject() {
      axios
        .delete(
            `${process.env.VUE_APP_API_URL}/delete-project/` +
            this.$route.params.id
        )
        .then(() => {
          this.loader = false;
          this.$router.push("/projects", () => {
            this.$toasted.show("Successfully deleted the project!", {
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
    },
    /**
     * Gets project details accoring to route parameter.
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
     * Filters tasks with status 'open'.
     */
    filtered_tasks() {
      if (!this.filters.open) {
        return [];
      }
      return this.sortedTasks().filter((task) => {
        return (
          task.status.toLowerCase().indexOf(this.filters.open.toLowerCase()) !=
          -1
        );
      });
    },
    /**
     * Sorts all tasks.
     */
    sortedTasks: function () {
      function compare(a, b) {
        if (a.sort_index < b.sort_index) return -1;
        if (a.sort_index > b.sort_index) return 1;

        return 0;
      }
      var sortedArr = this.tasks.sort(compare);
      return sortedArr;
    },
    /**
     * Gets tasks with status 'open'.
     */
    getOpenedTask() {
      this.opentasks = this.filtered_tasks();
      return this.opentasks;
    },
    /**
     * Filters tasks with status 'in progress'.
     */
    filtered_tasks_progress() {
      if (!this.filters.progress) {
        return [];
      }
      return this.sortedTasks().filter((task) => {
        return (
          task.status
            .toLowerCase()
            .indexOf(this.filters.progress.toLowerCase()) != -1
        );
      });
    },
    /**
     * Gets tasks with status 'in progress'.
     */
    getProgressTask() {
      this.progresstasks = this.filtered_tasks_progress();
      return this.progresstasks;
    },
    /**
     * Filters tasks with status 'done'.
     */
    filtered_tasks_done() {
      if (!this.filters.done) {
        return [];
      }
      return this.sortedTasks().filter((task) => {
        return (
          task.status.toLowerCase().indexOf(this.filters.done.toLowerCase()) !=
          -1
        );
      });
    },
    /**
     * Gets tasks with status 'done'.
     */
    getDoneTask() {
      this.donetasks = this.filtered_tasks_done();
      return this.donetasks;
    },
    /**
     * Gets all User details according to logged in user (by its userId).
     */
    getUserDetails() {
      axios
        .get(`${process.env.VUE_APP_API_URL}/user/` + this.userId)
        .then((res) => {
          this.userData = res.data;
        });
    },
    /**
     * Sends post request when video has been played already. 
     */
    firstTimePlayed() {
      axios
        .post(`${process.env.VUE_APP_API_URL}/user/` + this.userId)
        .then((res) => {
          this.userData = res.data;
        });
    },
    /**
     * Polling getting the logged in user details to make sure
     * to be always up to date with the collected storypoints.
     */
    pollData() {
      this.polling = setInterval(() => {
        this.getUserDetails();
      }, 3000);
    },
    getVideoIdFromLevel() {
      /**
       * character_id === 2 = ghost
       */
      if (this.userData.character_id === 2) {
        if (this.storypoints >= 15 && this.storypoints <= 24) {
          return String("668307087");
        } else if (this.storypoints >= 25 && this.storypoints <= 39) {
          return String("668307150");
        } else if (this.storypoints >= 40) {
          return String("668307207");
        }
        /**
         * character_id === 1 = dragon
         */
      } else if (this.userData.character_id === 1) {
        if (this.storypoints >= 15 && this.storypoints <= 24) {
          return String("668306876");
        } else if (this.storypoints >= 25 && this.storypoints <= 39) {
          return String("668306936");
        } else if (this.storypoints >= 40) {
          return String("668307006");
        }
      }
    },
    /**
     * Method to have the first letter of the project title capitalised. 
     */
    projectTitle() {
      return (
        this.project?.title.charAt(0).toUpperCase() + this.project.title.slice(1)
      );
    },
  },
  /**
   * Returns Storypoints.
   */
  computed: {
    usersStorypoints() {
      return this.storypoints;
    },
  },
  /**
   * getPost(), getProjectDetails() and pollData() are getting called when page is created.
   */
  created() {
    this.getPost();
    this.getProjectDetails();
    this.pollData();
    /**
     * The me() function gets the current user that is logged in.
     * See userDataService.js file in src/services
     */
    userDataService.me().then((userData) => {
      this.userId = userData.id;
      this.getUserDetails();
    });
  },
  /**
   * storypoints and characterName are getting saved to data once page is updated.
   */
  updated() {
    this.storypoints = this.userData.storypoints;
    this.characterName = this.userData.characterName;
  },
  /**
   * Destroys the used interval, to avoid conflicts on other pages (since it's a SPA).
   */
  beforeDestroy() {
    clearInterval(this.polling);
  },
};
</script>

<style lang="scss">
.columns-wrapper {
  min-height: calc(100vh - 500px);
}
</style>
