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
    <div class="xl:w-100 flex justify-end">
      <vimeo-player
        class="mt-8 m-auto"
        ref="player"
        :options="options"
        :video-id="'254736788'"
        :player-width="getScreenWidth()"
      />
      <!-- :player-height="height" -->
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
      controls: false,
      loop: true,
    },
    videoSource: "",
    userData: "",
  }),
  components: { CtaLink },
  methods: {
    getScreenWidth() {
      if(screen.width > 700) {
        return this.screenWidth = 600;
      }
      this.screenWidth = screen.width;
      return this.screenWidth - 65;
    }
  },
  created() {
    this.getScreenWidth();
  }
};
</script>