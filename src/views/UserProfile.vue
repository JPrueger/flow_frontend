<template>
    <div>
        <h1>Profile</h1>

      <div class="flex justify-between shadow p-11 rounded mt-6">

        <svg class="absolute -bottom-6 -left-6" xmlns="http://www.w3.org/2000/svg" width="70.47" height="68.074"><g data-name="Gruppe 61" fill="none" stroke="#ffb319" stroke-linecap="round" stroke-linejoin="round" stroke-width="5"><g data-name="Gruppe 37"><path data-name="Pfad 27" d="M56.139 32.711c5.135 4.624-3.95 12.932 2.603 18.832"/><path data-name="Pfad 28" d="M34.533 13.258c5.136 4.623-3.948 12.932 2.603 18.831"/><path data-name="Pfad 29" d="M56.139 32.711c-5.136-4.624-12.45 5.278-19.003-.622"/><path data-name="Pfad 31" d="M34.533 13.258c-5.135-4.624-12.448 5.279-19.001-.622"/></g><g data-name="Gruppe 38"><path data-name="Pfad 27" d="M44.139 45.711c5.135 4.624-3.95 12.932 2.603 18.832"/><path data-name="Pfad 28" d="M22.533 26.258c5.136 4.623-3.948 12.932 2.603 18.831"/><path data-name="Pfad 29" d="M44.139 45.711c-5.136-4.624-12.45 5.278-19.003-.622"/><path data-name="Pfad 31" d="M22.533 26.258c-5.135-4.624-12.448 5.279-19.001-.622"/></g></g></svg>
        <div>
          <div class="slider-container">
            <ul class="slider" :style="styleObject">
              <li class="slide slide--image">
                <img src="@/assets/images/placeholder-dragon.png" alt="">
                <div class="mt-5 text-center">
                  <label class="ml-2 container" for="dragon">
                    Choose this character
                    <input type="checkbox" id="dragon" name="subscribe" value="1">
                    <span class="checkmark"></span>
                  </label>
                </div>
              </li>
              <li class="slide slide--image">
                <img src="@/assets/images/placeholder-ghost.png" alt="">
                <div class="mt-5 text-center">
                  <label class="ml-2 container" for="ghost">
                    Choose this character
                    <input type="checkbox" id="ghost" name="subscribe" value="2">
                    <span class="checkmark"></span>
                  </label>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <h2>Username:</h2>
      <p>{{userData.name}}</p>

      <h2>E-Mail Address: </h2>
      <p>{{userData.email}}</p>



    </div>
</template>

<script>
import axios from "axios";
import userDataService from "@/services/userDataService";

export default {
  name: "UserProfile",
    data: () => {
      return {
        userData: "",
        userId: "",
      };
    },
  methods: {
    getUserDetails() {
      axios
        .get(
          "http://flow_backend.local/api/user/" + this.userId
        )
        .then((res) => {
          this.userData = res.data;
          console.log(this.userData);
        });
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
