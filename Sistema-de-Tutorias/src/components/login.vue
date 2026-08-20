<template>
  <div class="login-container">
    <div class="login-box">

      <h1>Iniciar sesión</h1>

      <p class="subtitle">
        Sistema de Tutorías PROA
      </p>

      <form @submit.prevent="iniciarSesion">

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

        <button type="submit">
          Iniciar sesión
        </button>

      </form>

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
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const formulario = reactive({
  email: '',
  password: ''
})

const iniciarSesion = () => {
  const email = formulario.email.toLowerCase().trim()

  // Verificar que sea un correo institucional PROA
  if (!email.endsWith('@escuelasproa.edu.ar')) {
    alert(
      'Debés utilizar un correo institucional de Escuelas PROA.'
    )
    return
  }

  // Obtener usuarios registrados
  const usuarios = JSON.parse(
    localStorage.getItem('usuariosPROA') || '[]'
  )

  // Buscar el usuario
  const usuario = usuarios.find(
    usuario =>
      usuario.email === email &&
      usuario.password === formulario.password
  )

  // Si no existe el usuario
  if (!usuario) {
    alert('Correo o contraseña incorrectos.')
    return
  }

  // Guardar la sesión actual
  localStorage.setItem(
    'usuarioActual',
    JSON.stringify(usuario)
  )

  alert(`¡Bienvenido/a ${usuario.nombre}!`)

  console.log('Usuario conectado:', usuario)

  // Ir a la página principal
  router.push('/')
}

const irAlRegistro = () => {
  router.push('/register')
}
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