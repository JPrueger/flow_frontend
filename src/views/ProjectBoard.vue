<template>
  <div class="hello">
    <h1 class="font-bold text-4xl mb-6">Test Headline</h1>
    <div class="lg:flex lg:justify-around">
      <BoardColumn columnName="Open" :list="opentasks" statusKey="open" />
      <BoardColumn
        columnName="In Progress"
        :list="progresstasks"
        statusKey="progress"
      />
      <BoardColumn columnName="Done" :list="donetasks" statusKey="done" />
    </div>

    <router-link :to="'/add-task/' + this.$route.params.id"
      >Add New Task
    </router-link>
  </div>
</template>

<script>
import axios from "axios";
import BoardColumn from "@/components/Project/BoardColumn";

export default {
  watch: {},
  name: "ProjectBoard",

  components: {
    BoardColumn,
  },
  props: {
    project_id: Number,
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
        console.log(a, b)
        if (a.sort_index < b.sort_index) return -1;
        if (a.sort_index > b.sort_index) return 1;

        return 0;
      }
      var sortedArr = this.tasks.sort(compare);
      return sortedArr;
    },
    getOpenedTask() {
      console.log("test: ", this.filtered_tasks());
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
      console.log("updateTask");
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
  },
  beforeCreate() {
    console.log(
      "beforeCreate: ",
      "At this point, events and lifecycle have been initialized."
    );
  },
  created() {
    this.getPost();
    console.log(
      "created: ",
      "At this point, this.property is now reactive and propertyComputed will update."
    );
  },
  beforeMount() {
    console.log(
      "beforeMount: ",
      `At this point, vm.$el has not been created yet.`
    );
  },
  mounted() {
    console.log(
      "mounted: ",
      `At this point, vm.$el has been created and el has been replaced.`
    );
  },
  beforeUpdate() {
    // this.getOpenedTask();
    // this.getProgressTask();
    // this.getDoneTask();
    console.log(
      "beforeUpdate: ",
      `At this point, Virtual DOM has not re-rendered or patched yet.`
    );
    // Logs the counter value every second, before the DOM updates.
  },
  updated() {
    console.log(
      "updated: ",
      `At this point, Virtual DOM has re-rendered and patched.`
    );
    // Fired every second, should always be true
  },
};
</script>
