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
    {{ onResize() }}
    <div class="flex justify-end bg-white">
      <vimeo-player
        class="mt-8 m-auto shadow"
        ref="player"
        :options="options"
        :video-id="'668811687'"
        :player-width="width"
        :player-height="height"
      />
    </div>
  </div>
</template>

<script>
import CtaLink from "../components/Partials/CtaLink";

export default {
  name: "Home",
  data: () => ({
    screenWidth: window.innerWidth,
    width: null,
    height: null,
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
    onResize() {
      this.screenWidth = window.innerWidth;
      if(this.screenWidth >= 912 && this.screenWidth < 1800) {
        this.width = 830;
        this.height = 500;
        return;
      } else if(this.screenWidth >= 1800) {
        this.width = 1200;
        this.height = 630;
        return;
      } else {
        this.width = this.screenWidth - 65;
        this.height = 260;
      }
    },
  },
  created() {
    window.addEventListener("resize", this.onResize);
  },
  destroyed() {
    window.removeEventListener("resize", this.onResize);
  },
};
</script>