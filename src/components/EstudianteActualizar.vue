<template>
  <div class="container">
    <h1>Actualizar Estudiante</h1>
    <div class="form-container">
      <div class="form-group">
        <label>ID a Actualizar:</label>
        <input v-model="targetId" type="number" placeholder="Ingrese ID" />
      </div>
      <hr />
      <div class="form-group">
        <label>Nombre:</label>
        <input
          v-model="estudiante.nombre"
          type="text"
          placeholder="Nuevo nombre"
        />
      </div>
      <div class="form-group">
        <label>Apellido:</label>
        <input
          v-model="estudiante.apellido"
          type="text"
          placeholder="Nuevo apellido"
        />
      </div>
      <div class="form-group">
        <label>Fecha Nacimiento:</label>
        <input v-model="estudiante.fechaNacimiento" type="datetime-local" />
      </div>
      <div class="form-group">
        <label>Provincia:</label>
        <input
          v-model="estudiante.provincia"
          type="text"
          placeholder="Nueva provincia"
        />
      </div>
      <div class="form-group">
        <label>Género:</label>
        <input
          v-model="estudiante.genero"
          type="text"
          placeholder="Nuevo género"
        />
      </div>
      <button @click="actualizar">Actualizar</button>
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
import { actualizarFacade } from "../clients/Matriculaclient";

export default {
  data() {
    return {
      targetId: null,
      estudiante: {
        nombre: "",
        apellido: "",
        fechaNacimiento: null,
        provincia: "",
        genero: "",
      },
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
    actualizar() {
      if (this.targetId) {
        const body = { ...this.estudiante };
        if (body.fechaNacimiento && body.fechaNacimiento.length === 16) {
          body.fechaNacimiento += ":00";
        }
        actualizarFacade(this.targetId, body).then((response) => {
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
