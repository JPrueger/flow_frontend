<template>
  <div>
    <AddTaskForm :project_id="this.$route.params.id" />
  </div>
</template>

<script>
import AddTaskForm from "../components/Project/AddTaskForm.vue";

export default {
  name: "AddTask",
  components: {
    AddTaskForm,
  },
};
</script>
