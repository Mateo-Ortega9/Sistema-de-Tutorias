<template>
  <div class="recover-container">
    <div class="recover-box">

      <h1>Recuperar contraseña</h1>

      <p class="subtitle">
        Ingresá tu correo institucional PROA
      </p>

      <!-- Buscar usuario -->
      <form
        v-if="!usuarioEncontrado"
        @submit.prevent="buscarUsuario"
      >

        <div class="input-group">
          <label for="email">
            Correo institucional
          </label>

          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="ejemplo@escuelasproa.edu.ar"
            required
          />
        </div>

        <button type="submit">
          Continuar
        </button>

      </form>

      <!-- Cambiar contraseña -->
      <form
        v-else
        @submit.prevent="cambiarPassword"
      >

        <div class="input-group">
          <label for="password">
            Nueva contraseña
          </label>

          <input
            id="password"
            v-model="nuevaPassword"
            type="password"
            placeholder="Ingresá una nueva contraseña"
            minlength="6"
            required
          />
        </div>

        <div class="input-group">
          <label for="confirmar">
            Confirmar nueva contraseña
          </label>

          <input
            id="confirmar"
            v-model="confirmarPassword"
            type="password"
            placeholder="Repetí la nueva contraseña"
            minlength="6"
            required
          />
        </div>

        <button type="submit">
          Cambiar contraseña
        </button>

      </form>

      <button
        type="button"
        class="link-button"
        @click="volverLogin"
      >
        Volver al inicio de sesión
      </button>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref('')
const nuevaPassword = ref('')
const confirmarPassword = ref('')
const usuarioEncontrado = ref(false)

const buscarUsuario = () => {
  const correo = email.value.toLowerCase().trim()

  // Verificar correo PROA
  if (!correo.endsWith('@escuelasproa.edu.ar')) {
    alert(
      'Debés utilizar un correo institucional de Escuelas PROA.'
    )
    return
  }

  // Obtener usuarios
  const usuarios = JSON.parse(
    localStorage.getItem('usuariosPROA') || '[]'
  )

  // Buscar usuario
  const usuario = usuarios.find(
    usuario => usuario.email === correo
  )

  if (!usuario) {
    alert(
      'No encontramos una cuenta registrada con ese correo.'
    )
    return
  }

  email.value = correo
  usuarioEncontrado.value = true
}

const cambiarPassword = () => {

  // Verificar longitud
  if (nuevaPassword.value.length < 6) {
    alert(
      'La contraseña debe tener al menos 6 caracteres.'
    )
    return
  }

  // Verificar contraseñas
  if (
    nuevaPassword.value !==
    confirmarPassword.value
  ) {
    alert(
      'Las contraseñas no coinciden.'
    )
    return
  }

  // Obtener usuarios
  const usuarios = JSON.parse(
    localStorage.getItem('usuariosPROA') || '[]'
  )

  // Buscar usuario
  const usuario = usuarios.find(
    usuario => usuario.email === email.value
  )

  if (!usuario) {
    alert('No se encontró el usuario.')
    return
  }

  // Cambiar contraseña
  usuario.password = nuevaPassword.value

  // Guardar usuarios actualizados
  localStorage.setItem(
    'usuariosPROA',
    JSON.stringify(usuarios)
  )

  alert(
    '¡Contraseña cambiada correctamente!'
  )

  // Volver al Login
  router.push('/login')
}

const volverLogin = () => {
  router.push('/login')
}
</script>

<style scoped>
.recover-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f2f4f7;
  padding: 20px;
}

.recover-box {
  width: 100%;
  max-width: 400px;
  background: white;
  padding: 35px;
  border-radius: 15px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.15);
}

h1 {
  text-align: center;
  margin: 0 0 10px;
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

.input-group input {
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 15px;
  outline: none;
  box-sizing: border-box;
}

.input-group input:focus {
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

.link-button {
  display: block;
  margin: 20px auto 0;
  border: none;
  background: none;
  color: #4f46e5;
  cursor: pointer;
  font-size: 14px;
}

.link-button:hover {
  text-decoration: underline;
}
</style>