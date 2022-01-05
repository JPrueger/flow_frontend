<template>
  <button class="Button" type="submit" @click.prevent="method">
    Submit hier
  </button>
</template>

<script>
export default {
  name: "submitbtn",
  props: {
    text: String,
    method: {
      type: Function,
    },
  },
};
</script>
