<template>
  <div>
    <div v-if="isActiveGhost" class="Lightbox" @click="closeLightboxGhost">
      <div class="Lightbox--card text-left p-10 rounded flex justify-between">
        <div class="flex flex-col justify-between">
          <div>
            <h1 class="font-bold text-5xl mb-2">You made it!</h1>
            <p class="font-bold">Casper keeps growing.</p>
            <video class="mt-4 absolute Video Video--ghost" width="320" height="240" autoplay loop>
              <source src="@/assets/videos/ghost-1.mp4" type="video/mp4">
            </video>
            <button
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
  </div>
</template>

<script>

export default {
  name: "LightboxFinal",
  props: {
    showLightboxGhost: {
      type: Boolean,
      default: false
    },
    userData: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    isActiveGhost: true,
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
      console.log('testtttt hier drinnen ja');
      this.isActiveGhost = !this.isActiveGhost;
    },
    closeLightboxGhost() {
      this.isActiveGhost = false;
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
  background-color: rgba(0, 0, 0, 0.7);
  @apply w-screen h-screen absolute top-0 left-0;

  .Video {
    &--ghost {
      @apply right-8 bottom-8 -z-10;
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
