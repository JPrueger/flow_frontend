<template>
  <div>
    <h1 class="pl-11 font-bold text-4xl mb-16">Show Videos (Testingpage)</h1>
    <div class="Button">
      <div class="bg-pink text-white rounded p-2 text-center">
        <button @click="toggleLightboxGhost" class="bg-pink font-bold">
          Show Ghost
        </button>
      </div>
      <div v-if="isActiveGhost" class="Lightbox" @click="closeLightboxGhost">
        <div class="Lightbox--card text-left p-12 rounded flex justify-between">
          <div class="flex flex-col justify-between">
            <div>
              <h1 class="font-bold text-5xl mb-2">You made it!</h1>
              <p class="font-bold">Casper keeps growing.</p>
              <video class="mt-4 absolute Video Video--ghost" width="320" height="240" autoplay loop>
                <source src="@/assets/videos/ghost-1.mp4" type="video/mp4">
              </video>
              <!-- <vimeo-player
                class="mt-4 absolute Video"
                ref="player"
                :options="options"
                :video-id="videoID"
                :player-height="height"
              /> -->
              <!-- <video-embed :params="{autoplay: 1, controls: 0, showinfo: 1, modestbranding: 1, autohide: 1, showinfo: 0}" class="mt-6" width="640" height="360" src="https://www.youtube.com/watch?v=bQmzk05I3nw"></video-embed> -->
              <button
                @click="toggleLightboxGhost"
                class="
                  absolute
                  -right-6
                  -top-6
                  w-12
                  h-12
                  text-white
                  bg-pink
                  font-bold
                  rounded-full
                "
              >
                X
              </button>
            </div>

            <div>
              <p>Current Storypoints:</p>
              <p class="text-xl font-bold">30 SP</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="Button">
      <div class="bg-pink text-white rounded p-2 text-center">
        <button @click="toggleLightboxDragon" class="bg-pink font-bold">
          Show Dragon
        </button>
      </div>
      <div v-if="isActiveDragon" class="Lightbox" @click="closeLightboxDragon">
        <div class="Lightbox--card text-left p-12 rounded flex justify-between">
          <div class="flex flex-col justify-between">
            <div>
              <h1 class="font-bold text-5xl mb-2">You made it!</h1>
              <p class="font-bold">Casper keeps growing.</p>
              <video class="mt-4 absolute Video Video--dragon" width="320" height="240" autoplay loop>
                <source src="@/assets/videos/dragon-1.mp4" type="video/mp4">
              </video>
              <!-- <vimeo-player
                class="mt-4 absolute Video"
                ref="player"
                :options="options"
                :video-id="videoID"
                :player-height="height"
              /> -->
              <!-- <video-embed :params="{autoplay: 1, controls: 0, showinfo: 1, modestbranding: 1, autohide: 1, showinfo: 0}" class="mt-6" width="640" height="360" src="https://www.youtube.com/watch?v=bQmzk05I3nw"></video-embed> -->
              <button
                @click="toggleLightboxDragon"
                class="
                  absolute
                  -right-6
                  -top-6
                  w-12
                  h-12
                  text-white
                  bg-pink
                  font-bold
                  rounded-full
                "
              >
                X
              </button>
            </div>

            <div>
              <p>Current Storypoints:</p>
              <p class="text-xl font-bold">30 SP</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "TestVideo",
  props: {
    showLightboxGhost: {
      type: Boolean,
      default: false
    },
    showLightboxDragon: {
      type: Boolean,
      default: false
    },
  },
  data: () => ({
    isActiveGhost: false,
    isActiveDragon: false,
    videoID: '648594265',
    height: 380,
    // see options here: https://www.npmjs.com/package/vue-vimeo-player
    options: {
      muted: false,
      autoplay: true,
      controls: false,
      loop: true,
    },
  }),
  methods: {
    toggleLightboxGhost() {
      this.isActiveGhost = !this.isActiveGhost;
    },
    toggleLightboxDragon() {
      this.isActiveDragon = !this.isActiveDragon;
    },
    closeLightboxGhost() {
      this.isActiveGhost = false;
    },
    closeLightboxDragon() {
      this.isActiveDragon = false;
    },
  },
};
</script>

<style lang="scss">
.Button {
  max-width: 300px;
  margin: 0 auto;
  @apply mb-8;
}

.Lightbox {
  background-color: rgba(0, 0, 0, 0.7);
  @apply w-screen h-screen absolute top-0 left-0;

  .Video {
    &--ghost {
      @apply right-8 bottom-8 -z-10;
    }

    &--dragon {
      width: 650px;
      @apply right-0 bottom-16 -z-10;
    }
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
