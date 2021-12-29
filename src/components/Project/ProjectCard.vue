<template>
  <router-link :to="'/project-board/' + project_id">
    <div class="mx-auto px-5 py-5 text-left h-full flex flex-col ProjectCardList">
      <div>
        <p class="font-bold text-lg leading-snug" v-text="projectTitle" />
        <p class="text-sm mb-5">{{ tasks.length }} Tasks</p>
      </div>
      <div>
        <ul class="flex ProjectMember flex-wrap">
          <li v-for="member in users" :key="randomNumber() + `${member.name}`" class="ProjectMember__item pr-2 mb-2">
            <ColoredUserIcon :userName="taskAssignee(member)" :color="member.tag_color" />
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
  data: () => {
    return {
      users: "",
      tasks: "",
    };
  },
  methods: {
    getUsersOfProject() {
      axios
          .get(
              "http://flow_backend.local/api/project-users/" + this.project_id
          )
          .then((res) => {
            this.users = res.data;
          });
    },
    getTasksOfProject() {
      axios
          .get(
              "http://flow_backend.local/api/project-tasks/" + this.project_id
          )
          .then((res) => {
            this.tasks = res.data;
          });
    },
    randomNumber() {
      return Math.floor(Math.random() * 1000);
    },
    taskAssignee(member) {
      return member.name.charAt(0).toUpperCase() + member.name.slice(1);
    }
  },
  created() {
    this.getUsersOfProject();
    this.getTasksOfProject();

    console.log(this.users);
  },
  components: {
    ColoredUserIcon
  },
  props: {
    title: String,
    countTask: Number,
    members: [],
    project_id: Number,
  },
  computed: {
    projectTitle() {
      return this.title.charAt(0).toUpperCase() + this.title.slice(1);
    },
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
