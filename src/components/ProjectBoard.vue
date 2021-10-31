<template>
  <div class="hello">
    <h1 class="font-bold text-4xl mb-6">SAE BA-Project</h1>
    <div class="lg:flex lg:justify-around">
      <BoardColumn columnName="Open" :list="todo" />
      <BoardColumn columnName="In Progress" :list="doing" />
      <BoardColumn columnName="Done" :list="done" />
    </div>
  </div>
</template>

<script>
import BoardColumn from "./BoardColumn.vue";

// hier wird axios (http request library eingebunden), um die laravel endpunkte anzusteuern
// import axios from "axios";

export default {
  name: "ProjectBoard",
  components: {
    BoardColumn,
  },
  data: () => ({
    newTodo: "",
    todo: [{ name: "Wireframes" }, { name: "Screendesign" }],
    doing: [],
    done: [],
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
