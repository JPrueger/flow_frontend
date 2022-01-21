<template>
  <div>
    <form @submit.prevent>
      <div v-if="isActive" class="Lightbox" @click="toggleLightbox">
        <div class="Lightbox--card text-left p-7 rounded flex justify-between">
          <div class="flex flex-col justify-between">
            <div>
              <div class="md:flex justify-between">
                <div>
                  <h1 class="font-bold text-5xl mb-2">You made it!</h1>
                  <p class="font-bold">{{ characterName }} keeps growing.</p>
                </div>
                <div>
                  <div>
                    <vimeo-player
                      class="mt-4 Video"
                      ref="player"
                      :options="options"
                      :video-id="videoId"
                      :player-height="height"
                      :player-width="'350'"
                    />
                  </div>
                </div>
              </div>
              <div class="Storypoints">
                <p>Current Storypoints:</p>
                <p class="text-xl font-bold">{{ storypoints }}</p>
              </div>
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
    },
  },
  data: () => ({
    isActive: true,
    height: 350,
    // see options here: https://www.npmjs.com/package/vue-vimeo-player
    options: {
      muted: true,
      autoplay: true,
      controls: true,
      loop: true,
    },
    videoSource: "",
    levelOnePlayed: 1,
    levelTwoPlayed: 1,
    levelThreePlayed: 1,
    userData: "",
  }),
  methods: {
    /**
     * Appends each level that has been played already.
     * Once user closes the lightbox, it gets saved to the database,
     * so the lightbox won't get triggered again.
     */
    toggleLightbox() {
      this.isActive = false;
      let formData = new FormData();
      if (this.storypoints >= 15 && this.storypoints <= 24) {
        formData.append("levelOnePlayed", this.levelOnePlayed);
      } else if (this.storypoints >= 25 && this.storypoints <= 39) {
        formData.append("levelTwoPlayed", this.levelTwoPlayed);
      } else if (this.storypoints >= 40) {
        formData.append("levelThreePlayed", this.levelThreePlayed);
      }

      if(!this.isActive) {
        this.enableScroll();
      }

      axios
        .post(
            `${process.env.VUE_APP_API_URL}/user/update/` + this.userId,
          formData
        )
        .then(() => {
          this.$emit.isActive = !this.isActive;
        });
    },
     disableScroll() {
       // scroll to top and disable scrolling when overlay is active
       window.scrollTo(0, 0);
          window.onscroll = function() {
            window.scrollTo(0, 0);
          };
     },
      enableScroll() {
        // enable scrolling again
        window.onscroll = function() {};
      },
  },
  created() {
    if(this.isActive) {
      this.disableScroll();
    }
  }
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

  &--card {
    width: 400px;
    transform: translate(-50%, -50%);
    @apply bg-white absolute top-1/2 left-1/2;
  }

  @media screen and (min-width: 767px) {
    .Video {
      transform: translateY(60px);
      @apply mt-12;
    }

    &--card {
      width: 750px;
    }
  }
}
.active {
  @apply block;
}
</style>
