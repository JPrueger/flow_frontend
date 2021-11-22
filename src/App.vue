<template>
  <div id="app" class="wrapper relative">
    <Navigation />
    <svg class="background-shapes shape-top-right" xmlns="http://www.w3.org/2000/svg" width="74.611" height="65.995"><g data-name="Gruppe 59" stroke-linecap="round" stroke-linejoin="round" stroke-width="5"><path data-name="Pfad 35" d="M65.418 44.619a8.636 8.636 0 1 1-12.183-.852 8.636 8.636 0 0 1 12.183.852Z" fill="#fff" stroke="#49a6aa"/><g data-name="Gruppe 40" fill="none" stroke="#99154e"><path data-name="Pfad 20" d="M36.93 12.867c5.294-4.442 12.258 5.712 19.013.044"/><path data-name="Pfad 21" d="M14.66 31.555c5.293-4.442 12.257 5.71 19.01.044"/><path data-name="Pfad 22" d="M36.93 12.867c-5.293 4.442 3.496 13.064-3.26 18.732"/><path data-name="Pfad 24" d="M14.66 31.555c-5.293 4.44 3.497 13.063-3.259 18.73"/></g></g></svg>
    <router-view />
    <svg class="background-shapes shape-bottom-left" xmlns="http://www.w3.org/2000/svg" width="94.782" height="123.597"><g data-name="Gruppe 60" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="5"><path data-name="Pfad 25" d="m31.05 61.115 13.475-16.079-20.657-3.626-20.664-3.63 7.191 19.702 7.184 19.71Z" stroke="#ffb319"/><path data-name="Pfad 33" d="M60.599 18.413a15.842 15.842 0 1 1 31.683 0" stroke="#49a6aa"/><path data-name="Pfad 34" d="M67.716 120.97a15.842 15.842 0 1 1 1.658-31.64" stroke="#49a6aa"/></g></svg>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation/Navigation.vue'

export default {
  name: "App",
  components: {
    Navigation,
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
  height: 100vh;
}

.background-shapes {
  position: absolute;

  &.shape-top-right {
    @apply top-8 right-16;
  }
  &.shape-bottom-left {
    @apply bottom-16 left-16;
  }
}

.wrapper {
  padding: 1.25rem;
}

@media only screen and (min-width: 1000px) {
  .wrapper {
    padding: 2rem 4rem;
  }
}
</style>
