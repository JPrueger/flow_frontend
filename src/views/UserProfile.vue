<template>
  <div class="max-w-3xl mx-auto">
    <Loader v-if="loader" />
    <div v-if="!loader">
      <div class="flex justify-between">
        <div>
          <h1>Profile</h1>
        </div>
        <router-link :to="'/user/edit/' + userId">
          <img src="@/assets/images/edit.svg" class="mt-1" />
        </router-link>
      </div>
      <div
        class="
          md:flex
          justify-between
          shadow
          p-6
          rounded
          md:h-80
          relative
          wrapper-profile
          bg-white
        "
      >
        <div class="md:flex md:justify-between">
          <div
            class="text-left flex flex-col justify-between md:mr-10 lg:mr-12"
          >
            <div>
              <h2>Username:</h2>
              <p class="mb-4">{{ userData.name }}</p>
              <h2>E-Mail Address:</h2>
              <p>{{ userData.email }}</p>
            </div>
            <div class="mt-4 md:mt-0">
              <h2>Current Storypoints:</h2>
              <p v-if="userData.storypoints === null" class="text-lg font-bold">
                0
              </p>
              <p v-else class="text-lg font-bold">
                {{ userData.storypoints }} SP
              </p>
              <p v-if="userData.storypoints <= 39" class="mt-3 block text-xs">Collect {{ nextLevel }} SP in total to reach next level.</p>
              <p v-if="userData.storypoints >= 40" class="mt-3 block text-xs"><strong class="block">Awesome!</strong> Your character has reached it's final level.</p>
            </div>
          </div>
          <div>
            <div>
              <vimeo-player
                class="mt-4 Video"
                ref="player"
                :options="options"
                :video-id="videoId"
                :player-width="'350'"
              />
            </div>
          </div>
          <svg
            class="absolute -bottom-7 -left-7 form-shape"
            xmlns="http://www.w3.org/2000/svg"
            width="70.47"
            height="68.074"
          >
            <g
              data-name="Gruppe 61"
              fill="none"
              stroke="#ffb319"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="5"
            >
              <g data-name="Gruppe 37">
                <path
                  data-name="Pfad 27"
                  d="M56.139 32.711c5.135 4.624-3.95 12.932 2.603 18.832"
                />
                <path
                  data-name="Pfad 28"
                  d="M34.533 13.258c5.136 4.623-3.948 12.932 2.603 18.831"
                />
                <path
                  data-name="Pfad 29"
                  d="M56.139 32.711c-5.136-4.624-12.45 5.278-19.003-.622"
                />
                <path
                  data-name="Pfad 31"
                  d="M34.533 13.258c-5.135-4.624-12.448 5.279-19.001-.622"
                />
              </g>
              <g data-name="Gruppe 38">
                <path
                  data-name="Pfad 27"
                  d="M44.139 45.711c5.135 4.624-3.95 12.932 2.603 18.832"
                />
                <path
                  data-name="Pfad 28"
                  d="M22.533 26.258c5.136 4.623-3.948 12.932 2.603 18.831"
                />
                <path
                  data-name="Pfad 29"
                  d="M44.139 45.711c-5.136-4.624-12.45 5.278-19.003-.622"
                />
                <path
                  data-name="Pfad 31"
                  d="M22.533 26.258c-5.135-4.624-12.448 5.279-19.001-.622"
                />
              </g>
            </g>
          </svg>
        </div>
      </div>
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
      options: {
        muted: true,
        autoplay: true,
        controls: true,
        loop: true,
      },
      videoId: "",
      nextLevel: '',
    };
  },
  methods: {
    /**
     * Gets the current user details.
     */
    getUserDetails() {
      axios
        .get(`${process.env.VUE_APP_API_URL}/user/` + this.userId)
        .then((res) => {
          this.userData = res.data;
        })
        .then(() => {
          this.loader = false;
        });
    },
  },
  beforeUpdate() {
    /**
     * Before page gets updated, the right vimeo video is gets handed over
     * accordingly to the current amount of collected storypoints.
     */

    /**
     * character_id === 2 is the ghost
     */
    if (this.userData.character_id === 2) {
      if (this.userData.storypoints === null || this.userData.storypoints <= 14) {
          this.videoId = "668756005";
      } else if (
        this.userData.storypoints >= 15 &&
        this.userData.storypoints <= 24
      ) {
        this.videoId = "662431051";
      } else if (this.userData.storypoints >= 25 &&
        this.userData.storypoints <= 39
      ) {
        this.videoId = "662431018";
      } else if (this.userData.storypoints >= 40) {
        this.videoId = "662430984";
      }
      /**
       * character_id === 1 is the dragon
       */
    } else if (this.userData.character_id === 1) {
      if (this.userData.storypoints === null || this.userData.storypoints <= 14) {
        this.videoId = "668756110";
      } else if (
        this.userData.storypoints >= 15 &&
        this.userData.storypoints <= 24
      ) {
        this.videoId = "662430956";
      }  else if (this.userData.storypoints >= 25 &&
        this.userData.storypoints <= 39
      ) {
        this.videoId = "662430924";
      }
      else if (this.userData.storypoints >= 40) {
        this.videoId = "662430854";
      }
    }

    /**
     * Returns String on how many SO have to be collected in total to reach next character level.
     */
    if (this.userData.storypoints === null || this.userData.storypoints <= 14) {
      this.nextLevel = '15 SP';
    } else if (
      this.userData.storypoints >= 15 &&
      this.userData.storypoints <= 24
    ) {
      this.nextLevel = '25';
    }  else if (this.userData.storypoints >= 25 &&
      this.userData.storypoints <= 39
    ) {
      this.nextLevel = '40';
    }
    else if (this.userData.storypoints >= 40) {
      this.nextLevel = 'Awesome! You have reached the final level.';
    }
  },
  /**
   * The me() function gets the current user that is logged in.
   * See userDataService.js file in src/services
   */
  mounted() {
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

.wrapper-profile {
  min-width: 420px;
}
</style>
