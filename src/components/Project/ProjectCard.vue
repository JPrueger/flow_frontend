<template>
  <router-link :to="'/project-board/' + project_id">
    <div
      class="mx-auto px-5 py-5 text-left h-full flex flex-col ProjectCardList"
    >
      <div>
        <p class="font-bold text-lg leading-snug" v-text="projectTitle()" />
        <p class="text-sm mb-5">{{ tasks.length }} Tasks</p>
      </div>
      <div>
        <ul class="flex ProjectMember flex-wrap">
          <li
            v-for="member in users"
            :key="randomNumber() + `${member.name}`"
            class="ProjectMember__item pr-2 mb-2"
          >
            <ColoredUserIcon
              :userName="taskAssignee(member)"
              :color="member.tag_color"
            />
          </li>
        </ul>
      </div>
    </div>
  </router-link>
</template>

<script>
import ColoredUserIcon from "@/components/Partials/ColoredUserIcon.vue";
import axios from "axios";

export default {
  name: "ProjectCard",
  components: {
    ColoredUserIcon,
  },
  data: () => {
    return {
      users: "",
      tasks: "",
    };
  },
  props: {
    title: String,
    countTask: Number,
    members: [],
    project_id: Number,
  },
  methods: {
    /**
     * Gets all User of the current project.
     */
    getUsersOfProject() {
      axios
        .get(`${process.env.VUE_APP_API_URL}/project-users/` + this.project_id)
        .then((res) => {
          this.users = res.data;
        });
    },
    /**
     * Gets tasks of current project.
     */
    getTasksOfProject() {
      axios
        .get(`${process.env.VUE_APP_API_URL}/project-tasks/` + this.project_id)
        .then((res) => {
          this.tasks = res.data;
        });
    },
    /**
     * Creates random number to make sure that the keys used are always unique.
     */
    randomNumber() {
      return Math.floor(Math.random() * 1000);
    },
    /**
     * Method to have the first letter of the assignee capitalised. 
     */
    taskAssignee(member) {
      return member.name.charAt(0).toUpperCase() + member.name.slice(1);
    },
    /**
     * Method to have the first letter of the project title capitalised. 
     */
    projectTitle() {
      return this.title.charAt(0).toUpperCase() + this.title.slice(1);
    },
  },
  /**
   * getUsersOfProject() and getTasksOfProject() are getting called when page is created.
   */
  created() {
    this.getUsersOfProject();
    this.getTasksOfProject();
  },
};
</script>

<style lang="scss">
.ProjectCardList {
  max-width: 350px;
  min-width: 220px;
}

.ProjectMember {
  max-width: 350px;

  &__item {
    &:last-child {
      @apply pr-0;
    }
  }
}
</style>
