<template>
  <div class="container">
    <h1>Consultar Todos</h1>
    <button @click="consultarTodos">Consultar</button>

    <div v-if="apiResponse" class="result-container">
      <h3>Resultados:</h3>
      <div class="json-viewer">
        <pre>{{ formattedApiResponse }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
import { consultarTodosFacade } from "../clients/Matriculaclient";

export default {
  data() {
    return {
      apiResponse: null,
    };
  },
  computed: {
    formattedApiResponse() {
      if (!this.apiResponse) return "";
      return JSON.stringify(this.apiResponse, null, 2);
    },
  },
  methods: {
    consultarTodos() {
      consultarTodosFacade().then((response) => {
        this.apiResponse = response;
      });
    },
  },
};
</script>

<style scoped>
.container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}
button {
  padding: 10px 20px;
  background-color: #17a2b8;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 20px;
}
button:hover {
  background-color: #138496;
}
.json-viewer {
  background-color: #1e1e1e;
  color: #ce9178;
  padding: 15px;
  border-radius: 5px;
  overflow: auto;
  max-height: 500px;
}
pre {
  margin: 0;
}
</style>
