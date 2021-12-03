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
      <!-- todo: statt @change die unterschiedlichen events (moved, added,... ) nehmen & dann eigenen functions dafür schreiebn -->
      <div v-for="el in list" :key="el.title">
        <TaskItem
          :title="el.title"
          :storyPoints="el.storypoints"
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
      /**
       * für added event neue logic
       */
      //aus this.list neue reihung von allen task der spalte in db updaten
      const newContent = this.list.map(task => {
            var taskObjekt = {
              id: task.id,
              status: task.status
            }
            return taskObjekt;

        // return task.id;
      });
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
          // this.errors = err.response.data.errors;
          console.log(this.errors);
        });
    }
  },
  data: () => ({
    newTodo: "",
    todos: []
  })
};
</script>
