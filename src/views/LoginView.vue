<template>
  <div class="login-container">
    <div class="login-card">
      <h2>Iniciar Sesión</h2>
      <div class="form-group">
        <label for="username">Usuario</label>
        <input
          type="text"
          id="username"
          v-model="username"
          placeholder="Ingrese su usuario"
        />
      </div>
      <div class="form-group">
        <label for="password">Contraseña</label>
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="Ingrese su contraseña"
        />
      </div>
      <button @click="login" :disabled="loading">
        {{ loading ? "Ingresando..." : "Ingresar" }}
      </button>
      <p v-if="error" class="error-msg">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import { getTokenFacade } from "../clients/AuthClient";

export default {
  name: "LoginView",
  data() {
    return {
      username: "",
      password: "",
      error: null,
      loading: false,
    };
  },
  methods: {
    async login() {
      if (!this.username || !this.password) {
        this.error = "Por favor ingrese usuario y contraseña.";
        return;
      }

      this.loading = true;
      this.error = null;

      try {
        const token = await getTokenFacade(this.username, this.password);
        if (token) {
          // Guardar en Session Storage
          sessionStorage.setItem("token", token);
          sessionStorage.setItem("username", this.username); // Opcional, para mostrar nombre

          // Redireccionar al Home
          this.$router.push("/");
        } else {
          this.error = "Credenciales incorrectas.";
        }
      } catch (err) {
        console.error(err);
        this.error = "Error de conexión o credenciales inválidas.";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5; /* Color de fondo suave */
}

.login-card {
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

h2 {
  margin-bottom: 24px;
  color: #333;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #666;
  font-weight: 500;
}

input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  transition: border-color 0.3s;
  box-sizing: border-box; /* Importante para que el padding no rompa el ancho */
}

input:focus {
  border-color: #42b983; /* Color Vue */
  outline: none;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-weight: bold;
}

button:hover {
  background-color: #3aa876;
}

button:disabled {
  background-color: #a8d5c2;
  cursor: not-allowed;
}

.error-msg {
  color: #dc3545;
  margin-top: 15px;
  font-size: 14px;
}
</style>
