<template>
  <div>
<!--    <h1>{{projectTitle}}</h1>-->
<!--    <pre>-->
<!--      {{ userData }}-->
<!--    </pre>-->
    <Lightbox
      :userId="userId"
      :videoId="getVideoIdFromLevel()"
      :storypoints="storypoints"
      v-if="(
        (this.storypoints >= 5 && this.storypoints <= 9) && userData.level_one_played !== 1)
        || ((this.storypoints >= 10 && this.storypoints <= 14) && userData.level_two_played !== 1)
        || (userData.storypoints >= 15 && userData.level_three_played !== 1)"
    />
    <!-- <Loader v-if="loader" /> -->
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
// import Loader from "../components/Partials/Loader";

export default {
  name: "ProjectBoard",

  components: {
    BoardColumn,
    Lightbox,
    // Loader
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
    updateTask() {
      //unused?
      let formData = new FormData();
      formData.append("status", this.newUserData.username);
      formData.append("_method", "PUT");

      axios
        .post("http://api.ipito.local/api/tasks/{id}", formData, {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then(() => {
          this.taskUpdated = true;
        });
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
      console.log("aktuelle sp: ", this.storypoints);
      if (this.storypoints >= 5 && this.storypoints <= 9) {
        return String("648594265");
      } else if (this.storypoints >= 10 && this.storypoints <= 14) {
        return String("648594814");
      } else if (this.storypoints >= 15) {
        return String("648594265");
      } else {
        return String("254736788");
      }
    },
  },
  computed: {
    usersStorypoints() {
      return this.storypoints;
    },
    projectTitle() {
      return (
          console.log('project title: ', this.project),
        this.project.title.charAt(0).toUpperCase() + this.project.title.slice(1)
      );
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
