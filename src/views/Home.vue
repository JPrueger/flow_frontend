<template>
  <div class="xl:flex justify-between">
    <div class="xl:w-1/3 xl:mr-10">
      <h1 class="font-bold my-6">Manage your projects.</h1>
      <p class="mb-6">
        <span class="font-bold">flow<span class="font-bold text-xl text-pink-main">.</span></span> is a powerful tool to manage your projects in a still simple way.
        First choose your character and see it’s growth every time you finish up
        a ticket. All you need to do first is register and we’ll help you to
        keep your projects going.
      </p>
      <CtaLink />
    </div>
    <div class="flex justify-end bg-white">
      <vimeo-player
        class="mt-8 m-auto Video"
        ref="player"
        :options="options"
        :video-id="'664821191'"
        :player-width="getScreenWidth()"
        :player-height="getScreenHeight()"
      />
    </div>
  </div>
</template>

<script>
import CtaLink from "../components/Partials/CtaLink";

export default {
  name: "Home",
  data: () => ({
    screenWidth: null,
    // see options here: https://www.npmjs.com/package/vue-vimeo-player
    options: {
      muted: true,
      autoplay: true,
      controls: true,
      loop: true,
    },
    videoSource: "",
    userData: "",
  }),
  components: { CtaLink },
  methods: {
    getScreenWidth() {
      if(screen.width > 700) {
        return this.screenWidth = 850;
      }
      const width = screen.width;
      return this.screenWidth = width - 65;
    },
    getScreenHeight() {
      if(screen.width > 700) {
        return this.screenWidth = 500;
      }
      return this.screenWidth = 250;
    }
  },
  created() {
    this.getScreenWidth();
    this.getScreenHeight();
  }
};
</script>

<style lang="scss" scoped>
.Video {
  border: 1px solid lightgray;
}
</style>