<template>
  <router-link :to="'/project-board/' + project_id">
    <div class="bg-white shadow-md rounded-sm mx-auto p-3">
      <div class="text-left font-bold text-xl mb-1">{{ title }}</div>
      <div class="text-left mb-5">{{ countTask }} Tasks</div>
      <ul class="flex justify-between">
        <li v-for="member in users" :key="member.name" class="px-2">

          <ColoredUserIcon :userName="member.name" :color="member.color" />
        </li>
      </ul>
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
  }
};
</script>
