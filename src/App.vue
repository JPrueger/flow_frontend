<template>
  <div id="app" class="wrapper relative flex flex-col h-screen justify-between">
    <Navigation />
    <router-view class="mt-20 lg:mt-24 px-6 lg:px-16 py-10 mb-auto" />
    <img
      class="background-shapes shape-top-right mt-3"
      src="@/assets/images/bg/bg-shape-1.svg"
      alt=""
    />
    <img
      class="background-shapes shape-bottom-left mt-3"
      src="@/assets/images/bg/bg-shape-2.svg"
      alt=""
    />
    <img
      class="background-shapes shape-bottom-right mt-3"
      src="@/assets/images/bg/bg-shape-4.svg"
      alt=""
    />
    <Footer />
  </div>
</template>

<script>
import Navigation from "@/components/Navigation/Navigation.vue";
import Footer from "@/components/Navigation/Footer.vue";

export default {
  name: "App",
  components: {
    Navigation,
    Footer,
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Catamaran:wght@400;500;700&display=swap");

#app {
  font-family: Catamaran, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.background-shapes {
  z-index: -10;
  @apply absolute;

  &.shape-top-right {
    width: 60px;
    @apply top-16 right-4;
  }

  &.shape-bottom-left {
    width: 60px;
    @apply bottom-24 left-6;
  }

  &.shape-bottom-right {
    display: none;
  }
}

@media screen and (min-width: 767px) {
  .background-shapes {
    &.shape-top-right {
      @apply top-20 right-12;
    }

    &.shape-bottom-left {
      width: 60px;
      @apply bottom-12 left-12;
    }
  }
}

@media screen and (min-width: 1000px) {
  .background-shapes {
    &.shape-top-right {
      @apply top-16 right-12 fixed;
    }

    &.shape-bottom-left {
      width: 60px;
      @apply bottom-24 left-16 fixed;
    }

    &.shape-bottom-right {
      display: block;
      width: 110px;
      @apply bottom-20 right-12 fixed;
    }
  }
}
</style>
