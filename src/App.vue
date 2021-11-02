<template>
  <div id="app" class="wrapper">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
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

.wrapper {
  padding: 1.25rem;
}

@media only screen and (min-width: 1000px) {
  .wrapper {
    padding: 2rem 8.75rem;
  }
}
</style>
