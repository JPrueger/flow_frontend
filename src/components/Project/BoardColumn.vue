<template>
  <div class="lg:w-1/4 mb-10">
    <div class="flex justify-between">
      <h2 class="mb-4 font-bold text-xl text-left">{{ columnName }}</h2>
    </div>
    <draggable
      class="bg-grey h-full rounded-sm p-6"
      :list="list"
      group="tasks"
      animation="200"
      @change="updateStatus"
      :v-show="screenWidth >= 768 ? true : isOpen"
      :id="`collapse${_uid}`"
    >
      <div
        v-for="el in list"
        :key="el.title"
        :class="{ overlay: statusKey === 'done' }"
      >
        <TaskItem
          :title="el.title"
          :storyPoints="el.storypoints"
          :taskId="el.id"
          class="cursor-pointer"
        />
      </div>
    </draggable>
    <p class="mt-2 text-xs" v-if="statusKey === 'done'"><strong>Note: </strong>Once your task is dragged to done, it can't be reopened again.</p>
  </div>
</template>

<script>
import TaskItem from "@/components/Project/TaskItem.vue";
import draggable from "vuedraggable";
import axios from "axios";
/**
 * Tutorial draggable:
 * https://www.youtube.com/watch?v=7UPoYcKhH4g&ab_channel=CodemitFloW
 */
export default {
  name: "BoardColumn",
  components: {
    TaskItem,
    draggable,
  },
  props: {
    columnName: String,
    statusKey: String,
    list: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    newTodo: "",
    todos: [],
    isOpen: false,
    screenWidth: "",
  }),
  methods: {
    updateStatus() {
      /**
       * Updates status and posts newContent to database.
       */
      const newContent = this.list.map((task) => {
        task.status = this.statusKey;
        return {
          id: task.id,
          newStatus: this.statusKey,
        };
      });
      axios.post(`${process.env.VUE_APP_API_URL}/sort-task`, newContent);
    },
  },
  /**
   * Gets current screen width when page is created.
   */
  created() {
    this.screenWidth = screen.width;
  },
};
</script>

<style lang="scss">
// Once your task is "done", it can't be reopened again
.overlay {
  pointer-events: none;
  cursor: not-allowed;
}
</style>
