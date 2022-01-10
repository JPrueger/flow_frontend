<template>
  <div class="Button">
    <router-link :to="userData ? '/add-project' : '/register'"> Start your Project</router-link>
  </div>
</template>

<script>
import userDataService from "@/services/userDataService";

export default {
  name: "CtaLink",
  data: () => {
    return {
      userData: null,
    };
  },
  created() {
    userDataService.me().then((userData) => {
      this.userData = userData;
    });
  },
};
</script>
