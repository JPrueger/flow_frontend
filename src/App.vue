<template>
  <div id="app">
    <ProjectBoard msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import ProjectBoard from "./components/ProjectBoard.vue";

export default {
  name: "App",
  components: {
    ProjectBoard,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Catamaran:wght@400;500;700&display=swap");

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
