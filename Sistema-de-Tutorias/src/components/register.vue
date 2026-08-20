<template>
  <div class="register-container">
    <div class="register-box">

      <h1>Crear cuenta</h1>

      <p class="subtitle">
        Registrate en el sistema de tutorías PROA
      </p>

      <form @submit.prevent="registrarse">

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

          <small>
            Solo se permiten correos @escuelasproa.edu.ar
          </small>
        </div>

        <div class="input-group">
          <label for="password">
            Contraseña
          </label>

          <input
            id="password"
            v-model="formulario.password"
            type="password"
            placeholder="Ingresá una contraseña"
            minlength="6"
            required
          />
        </div>

        <div class="input-group">
          <label for="confirmPassword">
            Confirmar contraseña
          </label>

          <input
            id="confirmPassword"
            v-model="formulario.confirmPassword"
            type="password"
            placeholder="Repetí tu contraseña"
            required
          />
        </div>

        <div class="input-group">
          <label for="tipo">
            Tipo de usuario
          </label>

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

        <button type="submit">
          Registrarme
        </button>

      </form>

      <p class="login-text">
        ¿Ya tenés una cuenta?

        <button
          type="button"
          class="link-button"
          @click="irAlLogin"
        >
          Iniciar sesión
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
  nombre: '',
  apellido: '',
  email: '',
  password: '',
  confirmPassword: '',
  tipo: ''
})

const registrarse = () => {
  const email = formulario.email.toLowerCase().trim()

  // Verificar correo PROA
  if (!email.endsWith('@escuelasproa.edu.ar')) {
    alert(
      'Debés utilizar un correo institucional de Escuelas PROA.'
    )
    return
  }

  // Verificar contraseña
  if (formulario.password.length < 6) {
    alert(
      'La contraseña debe tener al menos 6 caracteres.'
    )
    return
  }

  // Verificar que las contraseñas coincidan
  if (
    formulario.password !==
    formulario.confirmPassword
  ) {
    alert(
      'Las contraseñas no coinciden.'
    )
    return
  }

  // Verificar tipo de usuario
  if (!formulario.tipo) {
    alert(
      'Seleccioná si sos alumno o tutor.'
    )
    return
  }

  // Obtener usuarios existentes
  const usuarios = JSON.parse(
    localStorage.getItem('usuariosPROA') || '[]'
  )

  // Verificar si el correo ya existe
  const usuarioExiste = usuarios.some(
    usuario => usuario.email === email
  )

  if (usuarioExiste) {
    alert(
      'Ese correo ya está registrado.'
    )
    return
  }

  // Crear nuevo usuario
  const nuevoUsuario = {
    nombre: formulario.nombre.trim(),
    apellido: formulario.apellido.trim(),
    email: email,
    password: formulario.password,
    tipo: formulario.tipo
  }

  // Guardar usuario
  usuarios.push(nuevoUsuario)

  localStorage.setItem(
    'usuariosPROA',
    JSON.stringify(usuarios)
  )

  alert(
    '¡Registro exitoso!\n\n' +
    'Ahora podés iniciar sesión.'
  )

  // Ir al Login
  irAlLogin()
}

const irAlLogin = () => {
  router.push('/login')
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
  margin: 0 0 8px;
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
  box-sizing: border-box;
}

.input-group input:focus,
.input-group select:focus {
  border-color: #4f46e5;
}

.input-group small {
  margin-top: 5px;
  color: #777;
  font-size: 12px;
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

.login-text {
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