<template>
  <div class="container">
    <h1>Consultar Todos</h1>
    <button @click="consultarTodos">Consultar</button>

    <div v-if="apiResponse" class="result-container">
      <h3>Resultados:</h3>

      <!-- Tabla de Resultados -->
      <table class="student-table" v-if="apiResponse.length">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Fecha Nacimiento</th>
            <th>Provincia</th>
            <th>Género</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="est in apiResponse" :key="est.id">
            <td>{{ est.id }}</td>
            <td>{{ est.nombre }}</td>
            <td>{{ est.apellido }}</td>
            <td>{{ est.fechaNacimiento }}</td>
            <td>{{ est.provincia }}</td>
            <td>{{ est.genero }}</td>
          </tr>
        </tbody>
      </table>
      <p v-else>No se encontraron datos.</p>
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
  max-width: 1000px;
  margin: 0 auto;
}
button {
  padding: 10px 20px;
  background-color: #35495e; /* Color Vue, azul oscuro */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 20px;
}
button:hover {
  background-color: #42b983; /* Color Vue, verde */
}
.student-table {
  width: 100%;
  border: 1px solid #ccc; /* Borde simple */
  border-collapse: collapse;
  margin-top: 10px;
}
.student-table th,
.student-table td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: left;
}
/* Sin colores de fondo alternados ni encabezados complejos */
</style>
