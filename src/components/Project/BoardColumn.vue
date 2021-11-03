<template>
  <div class="lg:w-1/4">
    <h2 class="mb-4 font-bold text-xl text-left">{{ columnName }}</h2>
    <draggable
      class="bg-grey rounded-sm p-6"
      :list="list"
      group="tasks"
      animation="200"
      @change="updateStatus"
    >
      <div v-for="el in list" :key="el.title">
        <TaskItem
          :title="el.title"
          :storyPoints="el.storyPoints"
          :assignedUser="el.assignedUser"
          class="cursor-pointer"
        />
      </div>
    </draggable>
  </div>
</template>

<script>
import TaskItem from "@/components/Project/TaskItem.vue";
import draggable from "vuedraggable";

//tutorial for drag & drop
// https://www.youtube.com/watch?v=7UPoYcKhH4g&ab_channel=CodemitFloW

// todo: save status in DB
// todo: when task is done, remove drag

export default {
  name: "BoardColumn",
  components: {
    TaskItem,
    draggable
  },
  props: {
    columnName: String,
    list: {
      type: Array,
      required: true
    }
  },
  methods: {
    updateStatus() {
      //aus this.list neue reihung von alles task der spalte in db updaten
      // const newContent = this.list.map(task => {
      //   return task.id;
      // });
    }
  },
  data: () => ({
    newTodo: "",
    todos: []
  })
};
</script>
