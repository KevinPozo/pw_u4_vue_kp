<template>
  <div class="container">
    <h1>Guardar Estudiante</h1>
    <div class="form-container">
      <div class="form-group">
        <label>Nombre:</label>
        <input
          v-model="estudiante.nombre"
          type="text"
          placeholder="Ingrese nombre"
        />
      </div>
      <div class="form-group">
        <label>Apellido:</label>
        <input
          v-model="estudiante.apellido"
          type="text"
          placeholder="Ingrese apellido"
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
          placeholder="Ingrese provincia"
        />
      </div>
      <div class="form-group">
        <label>Género:</label>
        <input
          v-model="estudiante.genero"
          type="text"
          placeholder="Ingrese género"
        />
      </div>
      <button @click="guardar">Guardar</button>
    </div>

    <div v-if="mensaje" class="success-box">
      {{ mensaje }}
    </div>
  </div>
</template>

<script>
import { guardarFacade } from "../clients/Matriculaclient";

export default {
  data() {
    return {
      estudiante: {
        nombre: "",
        apellido: "",
        fechaNacimiento: null,
        provincia: "",
        genero: "",
      },
      mensaje: null,
    };
  },
  methods: {
    guardar() {
      const body = { ...this.estudiante };
      if (body.fechaNacimiento && body.fechaNacimiento.length === 16) {
        body.fechaNacimiento += ":00";
      }
      guardarFacade(body).then(() => {
        this.mensaje = "Se ha guardado exitosamente";
        this.limpiar();
        setTimeout(() => (this.mensaje = null), 3000);
      });
    },
    limpiar() {
      this.estudiante = {
        nombre: "",
        apellido: "",
        fechaNacimiento: null,
        provincia: "",
        genero: "",
      };
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
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #218838;
}
.success-box {
  margin-top: 20px;
  padding: 15px;
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
  border-radius: 4px;
  text-align: center;
}
</style>
