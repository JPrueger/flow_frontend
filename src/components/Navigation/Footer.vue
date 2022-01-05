<template>
  <footer class="px-6 py-6 lg:px-12 w-full flex justify-end">
    <ul class="flex justify-between text-right border-t pt-2 px-2">
      <li class="font-medium mr-7">
        <router-link to="/privacy-policy" class="hover:text-pink-hover">
          Privacy
        </router-link>
      </li>
      <li class="font-medium">
        <router-link to="/terms-and-conditions" class="hover:text-pink-hover">
          Terms and Conditions
        </router-link>
      </li>
    </ul>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style lang="scss" scoped>
footer a.router-link-active {
  @apply text-pink-main;
  font-weight: 700;
}
</style>
