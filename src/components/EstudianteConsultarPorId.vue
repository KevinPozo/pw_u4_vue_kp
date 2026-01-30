<template>
  <div class="container">
    <h1>Consultar Por ID</h1>
    <div class="search-box">
      <input
        v-model="targetId"
        type="number"
        placeholder="Ingrese ID del estudiante"
      />
      <button @click="consultarPorId">Consultar</button>
    </div>

    <div v-if="apiResponse" class="result-container">
      <h3>Resultado:</h3>
      <div class="json-viewer">
        <pre>{{ formattedApiResponse }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
import { consultarPorIdFacade } from "../clients/Matriculaclient";

export default {
  data() {
    return {
      targetId: null,
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
    consultarPorId() {
      if (this.targetId) {
        consultarPorIdFacade(this.targetId).then((response) => {
          this.apiResponse = response;
        });
      }
    },
  },
};
</script>

<style scoped>
.container {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}
.search-box {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  padding: 8px 15px;
  background-color: #17a2b8;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.json-viewer {
  background-color: #1e1e1e;
  color: #ce9178;
  padding: 15px;
  border-radius: 5px;
  overflow: auto;
}
pre {
  margin: 0;
}
</style>
