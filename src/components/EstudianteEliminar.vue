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
  </div>
</template>

<script>
import { eliminarFacade } from "../clients/Matriculaclient";
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
    eliminar() {
      if (this.targetId && this.token) {
        eliminarFacade(this.targetId, this.token)
          .then(() => {
            this.addNotification("Se ha borrado exitosamente", "success");
            this.targetId = null;
          })
          .catch((error) => {
            console.error("Error al eliminar:", error);
            if (error.response && error.response.status === 404) {
              this.addNotification(
                "No se puede eliminar: Estudiante no encontrado.",
                "error",
              );
            } else {
              this.addNotification(
                "Ocurrió un error al intentar eliminar.",
                "error",
              );
            }
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
</style>
