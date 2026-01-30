<template>
  <div class="container">
    <h1>Actualizar Parcial</h1>
    <div class="form-container">
      <div class="form-group">
        <label>ID a Actualizar:</label>
        <input v-model="targetId" type="number" placeholder="Ingrese ID" />
      </div>
      <div class="form-group">
        <label>Nombre (Solo este campo se actualizará):</label>
        <input v-model="nombre" type="text" placeholder="Nuevo nombre" />
      </div>
      <button @click="actualizarParcial">Actualizar Parcialmente</button>
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
import { actualizarParcialFacade } from "../clients/Matriculaclient";

export default {
  data() {
    return {
      targetId: null,
      nombre: "",
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
    actualizarParcial() {
      if (this.targetId) {
        const body = { nombre: this.nombre };
        actualizarParcialFacade(this.targetId, body).then((response) => {
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
.form-group {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}
label {
  font-weight: bold;
  margin-bottom: 5px;
}
input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  padding: 10px 20px;
  background-color: #ffc107;
  color: black;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.json-viewer {
  background-color: #1e1e1e;
  color: #ce9178;
  padding: 15px;
  border-radius: 5px;
  margin-top: 20px;
  overflow: auto;
}
pre {
  margin: 0;
}
</style>
