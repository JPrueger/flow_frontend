<template>
  <div class="max-w-3xl mx-auto">
    <h1>Profile</h1>
    <Loader v-if="loader" />
    <div v-if="!loader" class="md:flex justify-between shadow p-6 rounded md:h-80 relative">
      <div class="text-left flex flex-col justify-between md:mr-10 lg:mr-12">
        <div>
          <h2>Username:</h2>
          <p class="mb-4">{{ userData.name }}</p>
          <h2>E-Mail Address:</h2>
          <p>{{ userData.email }}</p>
        </div>
        <div class="mt-4 md:mt-0">
          <h2>Current Storypoints:</h2>
          <p v-if="userData.storypoints === null" class="text-lg font-bold">No Storypoints collected yet.</p>
          <p v-else class="text-lg font-bold">{{ userData.storypoints }} SP</p>
        </div>
      </div>
      <div class="flex justify-end h-auto flex-col">
        <div>
          <video class="w-52-why" width="380" height="240" autoplay loop>
            <source src="@/assets/videos/dragon-1.mp4" type="video/mp4">
          </video>
        </div>
      </div>
      <svg class="absolute -bottom-7 -left-7 form-shape" xmlns="http://www.w3.org/2000/svg" width="70.47" height="68.074"><g data-name="Gruppe 61" fill="none" stroke="#ffb319" stroke-linecap="round" stroke-linejoin="round" stroke-width="5"><g data-name="Gruppe 37"><path data-name="Pfad 27" d="M56.139 32.711c5.135 4.624-3.95 12.932 2.603 18.832"/><path data-name="Pfad 28" d="M34.533 13.258c5.136 4.623-3.948 12.932 2.603 18.831"/><path data-name="Pfad 29" d="M56.139 32.711c-5.136-4.624-12.45 5.278-19.003-.622"/><path data-name="Pfad 31" d="M34.533 13.258c-5.135-4.624-12.448 5.279-19.001-.622"/></g><g data-name="Gruppe 38"><path data-name="Pfad 27" d="M44.139 45.711c5.135 4.624-3.95 12.932 2.603 18.832"/><path data-name="Pfad 28" d="M22.533 26.258c5.136 4.623-3.948 12.932 2.603 18.831"/><path data-name="Pfad 29" d="M44.139 45.711c-5.136-4.624-12.45 5.278-19.003-.622"/><path data-name="Pfad 31" d="M22.533 26.258c-5.135-4.624-12.448 5.279-19.001-.622"/></g></g></svg>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import userDataService from "@/services/userDataService";
import Loader from "@/components/Partials/Loader";

export default {
  components: {
    Loader,
  },
  name: "UserProfile",
  data: () => {
    return {
      userData: "",
      userId: "",
      loader: true,
    };
  },
  methods: {
    getUserDetails() {
      axios
        .get("http://flow_backend.local/api/user/" + this.userId)
        .then((res) => {
          this.userData = res.data;
          console.log(this.userData);
        })
        .then(() => {
          this.loader = false;
        })
    },
  },
  created() {
    userDataService.me().then((userData) => {
      this.userId = userData.id;
      this.getUserDetails();
    });
  },
};
</script>

<style lang="scss" scoped>
.slide {
  @apply mt-0;
}
</style>
