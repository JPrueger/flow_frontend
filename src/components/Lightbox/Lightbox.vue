<template>
  <div>
    <form @submit.prevent>
      <div v-if="isActive" class="Lightbox" @click="toggleLightbox">
        <div class="Lightbox--card text-left p-10 rounded flex justify-between">
          <div class="flex flex-col justify-between">
            <div>
              <h1 class="font-bold text-5xl mb-2">You made it!</h1>
              <p class="font-bold">{{ characterName }} keeps growing.</p>
              <vimeo-player
                class="mt-4 absolute Video"
                ref="player"
                :options="options"
                :video-id="videoId"
                :player-height="height"
              />
              <button
                type="submit"
    
                @click="toggleLightbox"
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
              <p class="text-xl font-bold">{{ storypoints }}</p>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Lightbox",
  props: {
    showLightboxGhost: {
      type: Boolean,
      default: false,
    },
    videoId: {
      type: String,
      required: true,
    },
    characterName: {
      type: String,
      required: true,
    },
    storypoints: {
      type: Number,
      required: true,
    },
    userId: {
      type: Number,
      required: true,
    }
  },
  data: () => ({
    isActive: true,
    height: 380,
    // see options here: https://www.npmjs.com/package/vue-vimeo-player
    options: {
      muted: true,
      autoplay: true,
      controls: false,
      loop: true,
    },
    videoSource: "",
    levelOnePlayed: 1,
    levelTwoPlayed: 1,
    levelThreePlayed: 1,
    userData: "",
  }),
  methods: {
    toggleLightbox() {
      this.isActive = !this.isActive;
      let formData = new FormData();
      if (this.storypoints >= 5 && this.storypoints <= 9) {
        formData.append("levelOnePlayed", this.levelOnePlayed);
      } else if (this.storypoints >= 10 && this.storypoints <= 14) {
        formData.append("levelTwoPlayed", this.levelTwoPlayed);
      } else if (this.storypoints >= 15) {
        formData.append("levelThreePlayed", this.levelThreePlayed);
      }
      axios.post(
        "http://flow_backend.local/api/user/update/" + this.userId,
        formData
      )
      .then(() => {
        this.$emit.isActive = !this.isActive;
      })
    },
  },
};
</script>

<style lang="scss" scoped>
.Button {
  max-width: 300px;
  @apply mb-8;
}

.Lightbox {
  z-index: 1;
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
