<template>
  <div class="container">
    <h1>Componente About</h1>
    <div>
      <button @click="consultarTodos">Consultar todos</button>
      <button @click="consultarPorId">Consultar por id</button>
      <button @click="guardar">Guardar</button>
      <button @click="actualizar">Actualizar</button>
      <button @click="actualizarParcial">Actualizar parcial</button>
      <button @click="eliminar">Eliminar</button>
    </div>
  </div>
</template>

<script>
import { consultarTodosFacade } from "../clients/Matriculaclient";
import { consultarPorIdFacade } from "../clients/Matriculaclient";
import { guardarFacade } from "../clients/Matriculaclient";
import { actualizarFacade } from "../clients/Matriculaclient";
import { actualizarParcialFacade } from "../clients/Matriculaclient";
import { eliminarFacade } from "../clients/Matriculaclient";

export default {
  methods: {
    consultarTodos() {
      consultarTodosFacade().then((response) => {
        console.log("Todos:", response);
      });
    },
    consultarPorId() {
      const id = 2;
      consultarPorIdFacade(id).then((response) => {
        console.log("Por ID:", response);
      });
    },
    guardar() {
      const body = {
        nombre: "Juan",
        apellido: "Perez",
        fechaNacimiento: "2000-01-01T12:00:00",
        provincia: "Pichincha",
        genero: "Masculino",
      };

      guardarFacade(body).then((response) => {
        console.log("Guardado:", response);
      });
    },
    actualizar() {
      const id = 1;
      const body = {
        nombre: "Juan Actualizado",
        apellido: "Perez",
        fechaNacimiento: "2000-01-01T12:00:00",
        provincia: "Guayas",
        genero: "Masculino",
      };

      actualizarFacade(id, body).then((response) => {
        console.log("Actualizado:", response);
      });
    },
    actualizarParcial() {
      const id = 1;
      const body = { nombre: "Juan Parcial" };
      actualizarParcialFacade(id, body).then((response) => {
        console.log("Actualizado Parcial:", response);
      });
    },
    eliminar() {
      const id = 1;
      eliminarFacade(id).then((response) => {
        console.log("Eliminado:", response);
      });
    },
  },
};
</script>

<style>
.container {
  padding: 20px;
}
button {
  margin: 5px;
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
th {
  background-color: #f2f2f2;
}
</style>
