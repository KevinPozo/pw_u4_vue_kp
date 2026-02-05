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
      <div class="student-card">
        <h3>Detalle del Estudiante</h3>
        <div class="card-row">
          <strong>ID:</strong> <span>{{ apiResponse.id }}</span>
        </div>
        <div class="card-row">
          <strong>Nombre:</strong> <span>{{ apiResponse.nombre }}</span>
        </div>
        <div class="card-row">
          <strong>Apellido:</strong> <span>{{ apiResponse.apellido }}</span>
        </div>
        <div class="card-row">
          <strong>Fecha Nacimiento:</strong>
          <span>{{ apiResponse.fechaNacimiento }}</span>
        </div>
        <div class="card-row">
          <strong>Provincia:</strong> <span>{{ apiResponse.provincia }}</span>
        </div>
        <div class="card-row">
          <strong>Género:</strong> <span>{{ apiResponse.genero }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { consultarPorIdFacade } from "../clients/Matriculaclient";
import { getTokenFacade } from "../clients/AuthClient";

export default {
  data() {
    return {
      targetId: null,
      apiResponse: null,
      token: null,
    };
  },
  async mounted() {
    this.token = await getTokenFacade("admin", "admin");
  },
  methods: {
    consultarPorId() {
      if (this.targetId && this.token) {
        this.apiResponse = null; // Limpiar resultado anterior
        consultarPorIdFacade(this.targetId, this.token)
          .then((response) => {
            this.apiResponse = response;
          })
          .catch((error) => {
            console.error("Error al consultar:", error);
            if (error.response && error.response.status === 404) {
              alert("Estudiante no encontrado con el ID: " + this.targetId);
            } else {
              alert("Ocurrió un error al consultar el estudiante.");
            }
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
.student-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}
.student-card h3 {
  margin-top: 0;
  border-bottom: 2px solid #17a2b8;
  padding-bottom: 10px;
  color: #333;
}
.card-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
}
.card-row:last-child {
  border-bottom: none;
}
.card-row strong {
  color: #555;
}
</style>
