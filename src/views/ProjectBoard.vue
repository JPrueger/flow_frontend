<template>
  <div>
    <div class="flex justify-between items-baseline">
      <h1 v-text="projectTitle()" />
      <button @click="deleteProject()">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path fill="#99154E" d="M10.807 2c-.517 0-1.011.204-1.377.57L9 3H4a1 1 0 1 0 0 2h16a1 1 0 1 0 0-2h-5l-.43-.43A1.943 1.943 0 0 0 13.193 2h-2.386zM4.365 7l1.528 13.264c.132.99.984 1.736 1.982 1.736h8.248c.998 0 1.851-.745 1.984-1.744L19.635 7H4.365z"/></svg>
      </button>
    </div>
    <Lightbox
      :userId="userId"
      :videoId="getVideoIdFromLevel()"
      :storypoints="storypoints"
      :characterName="userData.character_name"
      v-if="(
        (this.storypoints >= 5 && this.storypoints <= 9) && userData.level_one_played !== 1)
        || ((this.storypoints >= 10 && this.storypoints <= 14) && userData.level_two_played !== 1)
        || (userData.storypoints >= 15 && userData.level_three_played !== 1)"
    />
     <Loader v-if="loader" />
    <div class="lg:flex lg:justify-between mb-10 columns-wrapper">
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
    Loader
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
      characterName: '',
      loader: true,
      polling: null,
      userId: ''
    };
  },
  methods: {
    getPost() {
      axios
        .get(
          "http://flow_backend.local/api/tasks/index/" + this.$route.params.id
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
    deleteProject() {
      axios
          // todo: löschen geht bei mir nicht, toasty hinzufügen
          .delete(
              "http://flow_backend.local/api/delete-project/" + this.$route.params.id
          )
          .then(() => {
            window.location.href = "/projects";
          })
          .then(() => {
            this.loader = false;
          });
    },
    gerProjectDetails() {
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
    // open
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
    sortedTasks: function () {
      function compare(a, b) {
        if (a.sort_index < b.sort_index) return -1;
        if (a.sort_index > b.sort_index) return 1;

        return 0;
      }
      var sortedArr = this.tasks.sort(compare);
      return sortedArr;
    },
    getOpenedTask() {
      this.opentasks = this.filtered_tasks();
      return this.opentasks;
    },
    // progress
    filtered_tasks_progress() {
      if (!this.filters.progress) {
        return [];
      }
      return this.sortedTasksProgress().filter((task) => {
        return (
          task.status
            .toLowerCase()
            .indexOf(this.filters.progress.toLowerCase()) != -1
        );
      });
    },
    sortedTasksProgress: function () {
      function compare(a, b) {
        if (a.sort_index < b.sort_index) return -1;
        if (a.sort_index > b.sort_index) return 1;

        return 0;
      }
      var sortedArr = this.tasks.sort(compare);
      return sortedArr;
    },
    getProgressTask() {
      this.progresstasks = this.filtered_tasks_progress();
      return this.progresstasks;
    },
    // done
    filtered_tasks_done() {
      if (!this.filters.done) {
        return [];
      }
      return this.sortedTasksDone().filter((task) => {
        return (
          task.status.toLowerCase().indexOf(this.filters.done.toLowerCase()) !=
          -1
        );
      });
    },
    sortedTasksDone: function () {
      function compare(a, b) {
        if (a.sort_index < b.sort_index) return -1;
        if (a.sort_index > b.sort_index) return 1;

        return 0;
      }
      var sortedArr = this.tasks.sort(compare);
      return sortedArr;
    },
    getDoneTask() {
      this.donetasks = this.filtered_tasks_done();
      return this.donetasks;
    },
    getUserDetails() {
      axios
        .get("http://flow_backend.local/api/user/" + this.userId)
        .then((res) => {
          this.userData = res.data;
        });
    },
    firstTimePlayed() {
      axios
        .post("http://flow_backend.local/api/user/" + this.userId)
        .then((res) => {
          this.userData = res.data;
        });
    },
    pollData() {
      this.polling = setInterval(() => {
        this.getUserDetails();
      }, 3000);
    },
    getVideoIdFromLevel() {
       // ghost
      if (this.userData.character_id === 2) {
        if (this.storypoints >= 5 && this.storypoints <= 9) {
          return String("662269881");
        } else if (
          this.storypoints >= 10 &&
          this.storypoints <= 14
        ) {
          return String("662269923");
        } else if (this.storypoints >= 15) {
          return String("662269819");
        }
        // dragon
      } else if (this.userData.character_id === 1) {
        if (this.storypoints >= 5 && this.storypoints <= 9) {
          return String("662269711");
        } else if (
          this.storypoints >= 10 &&
          this.storypoints <= 14
        ) {
          return String("662269767");
        } else if (this.storypoints >= 15) {
          return String("662269639");
        }
      }
    },
    projectTitle() {
      return (
        this.project.title.charAt(0).toUpperCase() + this.project.title.slice(1)
      );
    },
  },
  computed: {
    usersStorypoints() {
      return this.storypoints;
    },
  },
  created() {
    this.getPost();
    this.gerProjectDetails();
    this.pollData();
    userDataService.me().then((userData) => {
      this.userId = userData.id;
      this.getUserDetails();
    });
  },
  updated() {
    this.storypoints = this.userData.storypoints;
    this.characterName = this.userData.characterName;
  },
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
