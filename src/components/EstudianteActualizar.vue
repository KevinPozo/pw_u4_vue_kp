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
      <div class="student-card">
        <h3>Estudiante Actualizado</h3>
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
          <strong>Fecha Nac:</strong>
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
import { actualizarFacade } from "../clients/Matriculaclient";
import { getTokenFacade } from "../clients/AuthClient";

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
      token: null,
    };
  },
  async mounted() {
    this.token = sessionStorage.getItem("token");
    if (!this.token) {
      alert("No hay token. Por favor inicie sesión.");
      this.$router.push("/login");
    }
  },
  methods: {
    actualizar() {
      if (this.targetId && this.token) {
        const body = { ...this.estudiante };
        if (body.fechaNacimiento && body.fechaNacimiento.length === 16) {
          body.fechaNacimiento += ":00";
        }
        actualizarFacade(this.targetId, body, this.token)
          .then((response) => {
            this.apiResponse = response;
          })
          .catch((error) => {
            console.error("Error al actualizar:", error);
            if (error.response && error.response.status === 404) {
              alert("No se puede actualizar: Estudiante no encontrado.");
            } else {
              alert("Ocurrió un error al intentar actualizar.");
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
.student-card {
  border: 1px solid #ffc107;
  border-radius: 8px;
  padding: 20px;
  background-color: #fff3cd;
  margin-top: 20px;
}
.student-card h3 {
  margin-top: 0;
  border-bottom: 2px solid #ffc107;
  padding-bottom: 10px;
  color: #856404;
}
.card-row {
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
  border-bottom: 1px solid #ffeeba;
}
.card-row:last-child {
  border-bottom: none;
}
</style>
