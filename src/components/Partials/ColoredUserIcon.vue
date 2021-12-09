<template>
  <div class="text-left">
    <p
      class="rounded-lg py-1 px-3 text-white w-auto inline-block items-start bg-pink-main"
    >
      {{ userName }}
    </p>


<!--    <div-->
<!--        class="rounded-lg py-1 px-3 text-white w-auto inline-block items-start bg-pink-main"-->
<!--        :class="'bg-' + `${color}`"-->
<!--    >-->
<!--      {{ userName }}-->
<!--    </div>-->
  </div>
</template>

<script>
export default {
  name: "ColoredUserIcon",
  data: () => ({
    newTodo: "",
    todos: [],
  }),
  props: {
    userName: String,
    color: String,
  },
};
</script>
