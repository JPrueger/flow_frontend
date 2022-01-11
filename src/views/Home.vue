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
          ref="player"
          :options="options"
          :video-id="664821191"
          :player-height="height"
          :player-width="width"
      />
<!--      <img-->
<!--        class="invisible lg:visible md:mt-6"-->
<!--        src="../assets/images/home/home_header_img.png"-->
<!--        alt="preview of the project board"-->
<!--      />-->
    </div>
  </div>
</template>

<script>
import CtaLink from "../components/Partials/CtaLink";

export default {
  name: "Home",
  data: () => ({
    height: 550,
    width: 1000,
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
};
</script>