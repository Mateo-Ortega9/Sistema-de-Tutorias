<template>
  <div class="register-container">

    <div class="register-box">

      <h1>Crear cuenta</h1>
      <p class="subtitle">Registrate en el sistema de tutorías</p>

      <form @submit.prevent="registrarse">

        <!-- Nombre -->
        <div class="input-group">
          <label for="nombre">Nombre</label>
          <input
            id="nombre"
            v-model="formulario.nombre"
            type="text"
            placeholder="Ingresá tu nombre"
            required
          />
        </div>

        <!-- Apellido -->
        <div class="input-group">
          <label for="apellido">Apellido</label>
          <input
            id="apellido"
            v-model="formulario.apellido"
            type="text"
            placeholder="Ingresá tu apellido"
            required
          />
        </div>

        <!-- Correo -->
        <div class="input-group">
          <label for="email">Correo electrónico</label>
          <input
            id="email"
            v-model="formulario.email"
            type="email"
            placeholder="ejemplo@gmail.com"
            required
          />
        </div>

        <!-- Contraseña -->
        <div class="input-group">
          <label for="password">Contraseña</label>
          <input
            id="password"
            v-model="formulario.password"
            type="password"
            placeholder="Ingresá una contraseña"
            required
          />
        </div>

        <!-- Confirmar contraseña -->
        <div class="input-group">
          <label for="confirmPassword">Confirmar contraseña</label>
          <input
            id="confirmPassword"
            v-model="formulario.confirmPassword"
            type="password"
            placeholder="Repetí tu contraseña"
            required
          />
        </div>

        <!-- Tipo de usuario -->
        <div class="input-group">
          <label for="tipo">Tipo de usuario</label>

          <select
            id="tipo"
            v-model="formulario.tipo"
            required
          >
            <option value="" disabled>
              Seleccioná una opción
            </option>

            <option value="alumno">
              Alumno
            </option>

            <option value="tutor">
              Tutor
            </option>
          </select>
        </div>

        <!-- Botón -->
        <button type="submit">
          Registrarme
        </button>

      </form>

      <!-- Login -->
      <p class="login-text">
        ¿Ya tenés una cuenta?
        <a href="#">Iniciar sesión</a>
      </p>

    </div>

  </div>
</template>


<script setup>

import { reactive } from 'vue'


// Datos del formulario
const formulario = reactive({

  nombre: '',

  apellido: '',

  email: '',

  password: '',

  confirmPassword: '',

  tipo: ''

})


// Función para registrar
const registrarse = () => {

  // Comprobar que las contraseñas coincidan
  if (formulario.password !== formulario.confirmPassword) {

    alert('Las contraseñas no coinciden')

    return
  }


  // Comprobar que se haya seleccionado un tipo
  if (!formulario.tipo) {

    alert('Seleccioná si sos alumno o tutor')

    return
  }


  // Mostrar los datos en la consola
  console.log('Usuario registrado:')

  console.log('Nombre:', formulario.nombre)

  console.log('Apellido:', formulario.apellido)

  console.log('Email:', formulario.email)

  console.log('Tipo:', formulario.tipo)


  // Mensaje de registro exitoso
  alert('¡Registro exitoso!')


  // Limpiar formulario
  formulario.nombre = ''

  formulario.apellido = ''

  formulario.email = ''

  formulario.password = ''

  formulario.confirmPassword = ''

  formulario.tipo = ''

}

</script>


<style scoped>

.register-container {

  min-height: 100vh;

  display: flex;

  justify-content: center;

  align-items: center;

  background: #f2f4f7;

  padding: 20px;

}


.register-box {

  width: 100%;

  max-width: 430px;

  background: white;

  padding: 35px;

  border-radius: 15px;

  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.15);

}


h1 {

  text-align: center;

  margin-bottom: 8px;

  color: #222;

}


.subtitle {

  text-align: center;

  color: #777;

  margin-bottom: 25px;

}


.input-group {

  display: flex;

  flex-direction: column;

  margin-bottom: 17px;

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

}


.input-group input:focus,

.input-group select:focus {

  border-color: #4f46e5;

}


button {

  width: 100%;

  padding: 13px;

  border: none;

  border-radius: 8px;

  background: #4f46e5;

  color: white;

  font-size: 16px;

  font-weight: bold;

  cursor: pointer;

  margin-top: 5px;

}


button:hover {

  background: #3730a3;

}


.login-text {

  text-align: center;

  margin-top: 20px;

  color: #666;

}


.login-text a {

  color: #4f46e5;

  text-decoration: none;

  font-weight: bold;

}


.login-text a:hover {

  text-decoration: underline;

}

</style>