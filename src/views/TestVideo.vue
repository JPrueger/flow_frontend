<template>
  <div class="Button">
    <div class="bg-pink text-white rounded p-2 text-center">
      <button @click="toggleLightbox" class="bg-pink font-bold">Click me</button>
    </div>
    <div v-if="isActive" class="Lightbox">
      <div
        class="
          Lightbox--card
          text-left
          p-12
          rounded
          flex
          justify-between
        "
      >
        <div class="flex flex-col justify-between">
          <div>
            <h1 class="font-bold text-5xl mb-2">You made it!</h1>
            <p class="font-bold">Casper keeps growing.</p>
            <vimeo-player class="mt-4" ref="player" :options="options" :video-id="videoID" :player-height="height"/>
            <!-- <video-embed :params="{autoplay: 1, controls: 0, showinfo: 1, modestbranding: 1, autohide: 1, showinfo: 0}" class="mt-6" width="640" height="360" src="https://www.youtube.com/watch?v=bQmzk05I3nw"></video-embed> -->
            <button @click="toggleLightbox" class="absolute -right-6 -top-6 w-12 h-12 text-white bg-pink font-bold rounded-full">X</button>
          </div>

          <div>
            <p>Current Storypoints:</p>
            <p class="text-xl font-bold">30 SP</p>
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
    showLightbox: {
      type: Boolean,
      default: false
    },
  },
  data: () => ({
    isActive: false,
    videoID: '91983146',
    /**
     * ToDo: Video in Hochformat
     * Wk was hältst du davon, wenn das video doch im querformat erstellt wird,
     * aber die character nur rechts den platz einnehmen? dann könnten den text absolut über 
     * den video links platzieren :) glaub hochformat kann man gar nicht einbinden, weil der
     * player von vimeo immer querformat ist
     */
    height: 200,
    // see options here: https://www.npmjs.com/package/vue-vimeo-player
    options: {
      muted: false,
      autoplay: true,
      controls: false,
      loop: true, 
    },
  }),
  methods: {
    toggleLightbox() {
      this.isActive = !this.isActive;
    },
  },
};
</script>

<style lang="scss">
.Button {
  margin-top: 50px;
  max-width: 300px;
}
.Lightbox {
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  top: 0;
  left: 0;

  &--card {
    background-color: white;
    width: 700px;
    height: 500px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .Image img {
    height: -webkit-fill-available;
  }
}
.active {
  display: block;
}
</style>
