<template>
  <div class="bg-white w-100 shadow-sm rounded-sm mx-auto p-3">
    <div class="flex justify-between mb-3">
      <div>{{ title }}</div>
      <div class="font-bold">1 SP</div>
    </div>
    <ColoredUserIcon userName="Kerstin" />
  </div>
</template>

<script>
import ColoredUserIcon from "@/components/Partials/ColoredUserIcon.vue";
// hier wird axios (http request library eingebunden), um die laravel endpunkte anzusteuern
// import axios from "axios";

export default {
  name: "TaskItem",
  data: () => ({
    newTodo: "",
    todos: [],
  }),
  components: {
    ColoredUserIcon,
  },
  props: {
    title: String,
  },
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
