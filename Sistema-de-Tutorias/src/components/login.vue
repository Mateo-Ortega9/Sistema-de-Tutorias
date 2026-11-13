<template>
  <div class="login-container">
    <div class="login-box">

      <h1>Iniciar sesión</h1>

      <p class="subtitle">
        Sistema de Tutorías PROA
      </p>

      <!-- Tipo de usuario -->
      <div class="input-group">
        <label for="rol">
          Tipo de usuario
        </label>

        <select
          id="rol"
          v-model="formulario.rol"
          required
        >
          <option value="" disabled>
            Seleccioná una opción
          </option>

          <option value="profesor">
            Profesor
          </option>

          <option value="administracion">
            Administración
          </option>
        </select>
      </div>

      <!-- Formulario -->
      <form @submit.prevent="iniciarSesion">

        <!-- Correo -->
        <div class="input-group">
          <label for="email">
            Correo institucional
          </label>

          <input
            id="email"
            v-model="formulario.email"
            type="email"
            placeholder="ejemplo@escuelasproa.edu.ar"
            required
          />
        </div>

        <!-- Contraseña -->
        <div class="input-group">
          <label for="password">
            Contraseña
          </label>

          <input
            id="password"
            v-model="formulario.password"
            type="password"
            placeholder="Ingresá tu contraseña"
            required
          />
        </div>

        <!-- Botón iniciar sesión -->
        <button type="submit">
          Iniciar sesión
        </button>

      </form>

      <!-- Recuperar contraseña -->
      <button
        type="button"
        class="forgot-button"
        @click="irRecuperar"
      >
        ¿Olvidaste tu contraseña?
      </button>

      <!-- Registro -->
      <p class="register-text">
        ¿No tenés una cuenta?

        <button
          type="button"
          class="link-button"
          @click="irAlRegistro"
        >
          Registrate
        </button>
      </p>

    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { supabaseConfigurado } from "../lib/supabase";
import { iniciarSesion } from "../services/auth";

const router = useRouter();

const formulario = reactive({
  rol: "",
  email: "",
  password: ""
});

const iniciarSesion = async () => {
  if (!formulario.rol) {
    alert("Seleccioná si sos Profesor o Administración.");
    return;
  }

  const email = formulario.email.trim().toLowerCase();

  if (!email.endsWith("@escuelasproa.edu.ar")) {
    alert("Debés utilizar un correo institucional de Escuelas PROA.");
    return;
  }

  try {
    if (supabaseConfigurado) {
      const resultado = await iniciarSesion({
        email,
        password: formulario.password,
        rol: formulario.rol
      });

      const usuario = {
        id: resultado.user.id,
        nombre: resultado.perfil?.nombre || "",
        apellido: resultado.perfil?.apellido || "",
        email: resultado.user.email,
        rol: resultado.perfil?.rol || formulario.rol
      };

      localStorage.setItem("usuarioActual", JSON.stringify(usuario));
    } else {
      const usuarios = JSON.parse(localStorage.getItem("usuariosPROA") || "[]");
      const usuario = usuarios.find(item => {
        const rol = String(item.rol || item.tipo || "").trim().toLowerCase();
        return String(item.email || "").trim().toLowerCase() === email &&
          item.password === formulario.password &&
          (rol === "administrador" ? "administracion" : rol) === formulario.rol;
      });

      if (!usuario) {
        throw new Error("Correo, contraseña o tipo de usuario incorrectos.");
      }

      localStorage.setItem("usuarioActual", JSON.stringify(usuario));
    }

    alert("¡Inicio de sesión correcto!");

    router.push(formulario.rol === "profesor" ? "/filtros" : "/admin");
  } catch (error) {
    console.error(error);
    alert(error.message || "No se pudo iniciar sesión.");
  }
};

const irAlRegistro = () => router.push("/register");
const irRecuperar = () => router.push("/recuperar");

</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f2f4f7;
  padding: 20px;
}

.login-box {
  width: 100%;
  max-width: 400px;
  background: white;
  padding: 35px;
  border-radius: 15px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.15);
}

h1 {
  text-align: center;
  margin: 0 0 8px;
  color: #222;
}

.subtitle {
  text-align: center;
  color: #777;
  margin-bottom: 30px;
}

.input-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.input-group label {
  margin-bottom: 7px;
  font-weight: bold;
  color: #333;
}

.input-group input,
.input-group select {
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 15px;
  outline: none;
  box-sizing: border-box;
  background: white;
}

.input-group input:focus,
.input-group select:focus {
  border-color: #4f46e5;
}

button[type="submit"] {
  width: 100%;
  padding: 13px;
  border: none;
  border-radius: 8px;
  background: #4f46e5;
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}

button[type="submit"]:hover {
  background: #3730a3;
}

/* Recuperar contraseña */

.forgot-button {
  display: block;
  margin: 18px auto 0;
  border: none;
  background: none;
  color: #4f46e5;
  cursor: pointer;
  font-size: 14px;
}

.forgot-button:hover {
  text-decoration: underline;
}

/* Registro */

.register-text {
  text-align: center;
  margin-top: 20px;
  color: #666;
}

.link-button {
  border: none;
  background: none;
  color: #4f46e5;
  font-weight: bold;
  cursor: pointer;
  font-size: inherit;
}

.link-button:hover {
  text-decoration: underline;
}
</style>
