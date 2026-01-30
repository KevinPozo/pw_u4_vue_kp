<template>
  <div class="container">
    <h1>Eliminar Estudiante</h1>
    <div class="search-box">
      <input
        v-model="targetId"
        type="number"
        placeholder="Ingrese ID del estudiante a eliminar"
      />
      <button @click="eliminar">Eliminar</button>
    </div>

    <div v-if="mensaje" class="success-box">
      {{ mensaje }}
    </div>
  </div>
</template>

<script>
import { eliminarFacade } from "../clients/Matriculaclient";

export default {
  data() {
    return {
      targetId: null,
      mensaje: null,
    };
  },
  methods: {
    eliminar() {
      if (this.targetId) {
        eliminarFacade(this.targetId)
          .then(() => {
            this.mensaje = "Se ha borrado exitosamente";
            this.targetId = null;
            setTimeout(() => (this.mensaje = null), 3000);
          })
          .catch((error) => {
            console.error("Error al eliminar:", error);
            if (error.response && error.response.status === 404) {
              alert("No se puede eliminar: Estudiante no encontrado.");
            } else {
              alert("Ocurrió un error al intentar eliminar.");
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
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #c82333;
}
.success-box {
  margin-top: 20px;
  padding: 15px;
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
  text-align: center;
}
</style>
