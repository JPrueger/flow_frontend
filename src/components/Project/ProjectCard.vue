<template>
  <router-link :to="'/project-board/' + project_id">
    <div class="mx-auto px-3 pt-2 text-left h-full flex flex-col justify-between ProjectCardList">
      <div>
        <p class="font-bold text-lg leading-snug" v-text="projectTitle" />
        <p class="text-sm mb-5">{{ countTask }} 12 Tasks</p>
      </div>
      <div>
        <ul class="flex ProjectMember flex-wrap">
          <li v-for="member in users" :key="member.name" class="ProjectMember__item pr-2 mb-2">
            <ColoredUserIcon :userName="member.name" :color="member.color" />
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
  },
  created() {
      this.getUsersOfProject();
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
    }
  }
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
