<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/estudiantes-todos">Todos</router-link> |
      <router-link to="/estudiantes-id">Por ID</router-link> |
      <router-link to="/estudiantes-guardar">Guardar</router-link> |
      <router-link to="/estudiantes-actualizar">Actualizar</router-link> |
      <router-link to="/estudiantes-parcial">Parcial</router-link> |
      <router-link to="/estudiantes-eliminar">Eliminar</router-link>
    </nav>
    <NotificationContainer
      :notifications="notifications"
      @remove="removeNotification"
    />
    <router-view />
  </div>
</template>

<script>
import NotificationContainer from "@/components/NotificationContainer.vue";
import { provide, ref } from "vue";

export default {
  name: "App",
  components: {
    NotificationContainer,
  },
  setup() {
    const notifications = ref([]);

    const removeNotification = (id) => {
      const index = notifications.value.findIndex((n) => n.id === id);
      if (index !== -1) {
        notifications.value.splice(index, 1);
      }
    };

    const addNotification = (message, type = "info", duration = 3000) => {
      const id = Date.now();
      notifications.value.push({ id, message, type });
      if (duration) {
        setTimeout(() => {
          removeNotification(id);
        }, duration);
      }
    };

    provide("addNotification", addNotification);

    return {
      notifications,
      removeNotification,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
