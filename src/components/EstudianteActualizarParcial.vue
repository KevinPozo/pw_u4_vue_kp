<template>
  <div class="container">
    <h1>Actualizar Parcial</h1>
    <div class="form-container">
      <div class="form-group">
        <label>ID a Actualizar:</label>
        <input v-model="targetId" type="number" placeholder="Ingrese ID" />
      </div>

      <div class="form-group">
        <label>Nombre (Opcional):</label>
        <input v-model="nombre" type="text" placeholder="Nuevo nombre" />
      </div>
      <div class="form-group">
        <label>Apellido (Opcional):</label>
        <input v-model="apellido" type="text" placeholder="Nuevo apellido" />
      </div>
      <div class="form-group">
        <label>Fecha Nacimiento (Opcional):</label>
        <input v-model="fechaNacimiento" type="datetime-local" />
      </div>
      <div class="form-group">
        <label>Provincia (Opcional):</label>
        <input v-model="provincia" type="text" placeholder="Nueva provincia" />
      </div>
      <div class="form-group">
        <label>Género (Opcional):</label>
        <input v-model="genero" type="text" placeholder="Nuevo género" />
      </div>

      <button @click="actualizarParcial">Actualizar Parcialmente</button>
    </div>

    <div v-if="apiResponse" class="result-container">
      <div class="student-card">
        <h3>Estudiante Actualizado (Parcial)</h3>
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
import { actualizarParcialFacade } from "../clients/Matriculaclient";
import { getTokenFacade } from "../clients/AuthClient";
import { useNotificationStore } from "./NotificationStore";

export default {
  setup() {
    const { addNotification } = useNotificationStore();
    return { addNotification };
  },
  data() {
    return {
      targetId: null,
      nombre: "",
      apellido: "",
      fechaNacimiento: null,
      provincia: "",
      genero: "",
      apiResponse: null,
      token: null,
    };
  },
  async mounted() {
    this.token = sessionStorage.getItem("token");
    if (!this.token) {
      this.addNotification("No hay token. Por favor inicie sesión.", "error");
      this.$router.push("/login");
    }
  },
  methods: {
    actualizarParcial() {
      if (this.targetId && this.token) {
        const body = {};
        if (this.nombre) body.nombre = this.nombre;
        if (this.apellido) body.apellido = this.apellido;
        if (this.provincia) body.provincia = this.provincia;
        if (this.genero) body.genero = this.genero;
        if (this.fechaNacimiento) {
          let fecha = this.fechaNacimiento;
          if (fecha.length === 16) fecha += ":00";
          body.fechaNacimiento = fecha;
        }

        if (Object.keys(body).length === 0) {
          if (Object.keys(body).length === 0) {
            this.addNotification(
              "Debe llenar al menos un campo para actualizar.",
              "info",
            );
            return;
          }
          return;
        }

        console.log("Enviando PATCH con body:", body);

        actualizarParcialFacade(this.targetId, body, this.token)
          .then((response) => {
            console.log("Respuesta servidor:", response);
            if (response) {
              this.apiResponse = response;
              this.addNotification("Actualización parcial exitosa", "success");
            } else {
              this.addNotification(
                "Actualización exitosa (Servidor no retornó contenido)",
                "success",
              );
            }
          })
          .catch((error) => {
            console.error("Error al actualizar:", error);
            this.addNotification("Error al actualizar: " + error, "error");
          });
      } else {
        this.addNotification("El ID es obligatorio", "info");
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
  background-color: #35495e;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #42b983;
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
</style>
