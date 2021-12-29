<template>
  <div>
    <form @submit.prevent>
      <div v-if="isActiveGhost" class="Lightbox" @click="closeLightboxGhost">
        <div class="Lightbox--card text-left p-10 rounded flex justify-between">
          <div class="flex flex-col justify-between">
            <div>
              <h1 class="font-bold text-5xl mb-2">You made it!</h1>
              <p class="font-bold">Casper keeps growing.</p>
              <vimeo-player
                class="mt-4 absolute Video"
                ref="player"
                :options="options"
                :video-id="videoID"
                :player-height="height"
              />
              <button
                type="submit"
                @click="toggleLightboxGhost"
                class="
                  absolute
                  -right-6
                  -top-6
                  w-12
                  h-12
                  text-white
                  bg-pink-main
                  font-bold
                  rounded-full
                "
              >
                X
              </button>
            </div>

            <div>
              <p>Current Storypoints:</p>
              <!-- <p v-if="userData.storypoints" class="text-xl font-bold">{{ userData.storypoints }}</p> -->
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import userDataService from "@/services/userDataService";

export default {
  name: "LightboxFinal",
  props: {
    showLightboxGhost: {
      type: Boolean,
      default: false,
    },
    userData: {
      type: Object,
      required: false,
    },
  },
  data: () => ({
    isActiveGhost: true,
    videoID: "648594265",
    // videoID: "648594814",
    height: 380,
    // see options here: https://www.npmjs.com/package/vue-vimeo-player
    options: {
      muted: true,
      autoplay: true,
      controls: false,
      loop: true,
    },
    videoSource: "",
    videoPlayed: 1,
    userData: "",
    userId: "",
  }),
  methods: {
    toggleLightboxGhost() {
      console.log("testtttt hier drinnen ja");
      this.isActiveGhost = !this.isActiveGhost;
      let formData = new FormData();
      formData.append("videoPlayed", this.videoPlayed);
      axios.post(
        "http://flow_backend.local/api/user/update/" + 21,
        formData
      )
      //  todo: polling clear interval
      .then(() => {
        this.$emit.isActiveGhost = !this.isActiveGhost;
      })
    },
    closeLightboxGhost() {
      this.isActiveGhost = false;
    },
  },
  created() {
    userDataService.me().then((userData) => {
      this.userId = userData.id;
      this.getUserDetails();
    });
    console.log('id vom user: ', this.userId)
    console.log('video: ', this.video_played)
  },
};
</script>

<style lang="scss" scoped>
.Button {
  max-width: 300px;
  @apply mb-8;
}

.Lightbox {
  background-color: rgba(0, 0, 0, 0.7);
  @apply w-screen h-screen absolute top-0 left-0;

  .Video {
    right: -120px;
    @apply bottom-8 -z-10;
  }

  &--card {
    width: 700px;
    height: 500px;
    transform: translate(-50%, -50%);
    @apply bg-white absolute top-1/2 left-1/2;
  }
}
.active {
  @apply block;
}
</style>
