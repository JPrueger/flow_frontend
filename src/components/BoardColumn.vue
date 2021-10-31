<template>
  <div class="lg:w-1/4">
    <h2 class="mb-4 font-bold text-xl text-left">{{ columnName }}</h2>
    <draggable
      class="bg-gray-200 rounded-sm p-6"
      :list="list"
      group="tasks"
      animation="200"
    >
      <div v-for="el in list" :key="el.name">
        <TaskItem :title="el.name" class="cursor-pointer" />

        <!-- <div class="cursor-pointer" @click="$emit('click-close', el)">
          delete
        </div> -->
      </div>
    </draggable>
  </div>
</template>

<script>
import TaskItem from "./TaskItem.vue";
import draggable from "vuedraggable";

//tutorial for drag & drop
// https://www.youtube.com/watch?v=7UPoYcKhH4g&ab_channel=CodemitFloW

// hier wird axios (http request library eingebunden), um die laravel endpunkte anzusteuern
// import axios from "axios";

export default {
  name: "BoardColumn",
  components: {
    TaskItem,
    draggable,
  },
  props: {
    columnName: String,
    list: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    newTodo: "",
    todos: [],
  }),
  // ich verwende hier wieder localStorage, aber das Ganze würde natürlich auch mit Laravel funktionieren
  //   methods: {
  //     async saveTodo() {
  //       const newTodoData = {
  //         title: this.newTodo,
  //         done: false,
  //       };

  //       this.todos.push(newTodoData);

  //       try {
  //         const dataEndpointUrl = "http://flow_backend.local/api/todos";
  //         // bitte beachte hier -> wir verwenden axios.post (um einen POST request zu machen)
  //         await axios.post(dataEndpointUrl, {
  //           todo: newTodoData,
  //         });

  //         this.newTodo = "";

  //         alert("Speichern erfolgreich");
  //       } catch (error) {
  //         alert("Es trat ein Fehler beim speichern auf: " + error);
  //       }
  //     },
  //   },
  //   async created() {
  //     try {
  //       const dataEndpointUrl = "http://flow_backend.local/api/todos";
  //       // bitte beachte hier -> wir verwenden axios.get (um einen GET request zu machen)
  //       const response = await axios.get(dataEndpointUrl);
  //       console.log("MIKADO: ", response);

  //       this.todos = response.data;
  //     } catch (error) {
  //       alert("Es trat ein Fehler beim speichern auf: " + error);
  //     }
  //   },
};
</script>
