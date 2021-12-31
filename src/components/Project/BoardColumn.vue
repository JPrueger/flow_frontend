<template>
  <div class="lg:w-1/4 mb-10">
    <div class="flex justify-between"><h2 class="mb-4 font-bold text-xl text-left">{{ columnName }}</h2> <span @click="toggleAccordion()" :aria-expanded="isOpen"
                                                                                               :aria-controls="`collapse${_uid}`">+</span></div>
    <draggable
      class="bg-grey h-full rounded-sm p-6"
      :list="list"
      group="tasks"
      animation="200"
      @change="updateStatus"
      :v-show="screenWidth >= 768 ? true : isOpen"
      :id="`collapse${_uid}`"
    >
      <div v-for="el in list" :key="el.title">
        <TaskItem
          :title="el.title"
          :storyPoints="el.storypoints"
          :taskId="el.id"
          class="cursor-pointer"
        />
      </div>
    </draggable>
  </div>
</template>

<script>
import TaskItem from "@/components/Project/TaskItem.vue";
import draggable from "vuedraggable";
import axios from "axios";

// tutorial for drag & drop
// https://www.youtube.com/watch?v=7UPoYcKhH4g&ab_channel=CodemitFloW

// todo: when task is done, remove drag

export default {
  name: "BoardColumn",
  components: {
    TaskItem,
    draggable
  },
  props: {
    columnName: String,
    statusKey: String,
    list: {
      type: Array,
      required: true
    }
  },
  methods: {
    toggleAccordion() {
      this.isOpen = !this.isOpen;
    },
    updateStatus(params) {
      console.log(params, this.statusKey, this.list )
      console.log('updateStatus')
      /**
       * für added event neue logic
       */
          const newContent = this.list.map(task => {
            task.status = this.statusKey

            return {
              id: task.id,
              newStatus: this.statusKey
            }
          })
      axios
        /**
         * für moved event
         */
        .post("http://flow_backend.local/api/sort-task", newContent)
        .then(() => {
          console.log("Speichern erfolgreich");
        })
        .catch(() => {
          alert("Speichern nicht erfolgreich");
          console.log(this.errors);
        });
    },
  },
  created() {
    console.log(screen.width);
      // this.isOpen = true;
      this.screenWidth = screen.width;
      console.log(this.isOpen);
    },
  data: () => ({
    newTodo: "",
    todos: [],
    isOpen: false,
    screenWidth: ''
  })
};
</script>
