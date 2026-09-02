<template>
  <div class="register-container">
    <div class="register-box">

      <div class="logo-circle">
        P
      </div>

      <h1>Crear cuenta</h1>

      <p class="subtitle">
        Registrate en el sistema de tutorías PROA
      </p>

      <form @submit.prevent="registrarse">

        <!-- NOMBRE -->
        <div class="input-group">
          <label for="nombre">Nombre</label>

          <input
            id="nombre"
            v-model="formulario.nombre"
            type="text"
            placeholder="Ingresá tu nombre"
            autocomplete="given-name"
            required
          />
        </div>

        <!-- APELLIDO -->
        <div class="input-group">
          <label for="apellido">Apellido</label>

          <input
            id="apellido"
            v-model="formulario.apellido"
            type="text"
            placeholder="Ingresá tu apellido"
            autocomplete="family-name"
            required
          />
        </div>

        <!-- EMAIL -->
        <div class="input-group">
          <label for="email">
            Correo institucional
          </label>

          <input
            id="email"
            v-model="formulario.email"
            type="email"
            placeholder="ejemplo@escuelasproa.edu.ar"
            autocomplete="email"
            required
          />

          <small>
            Solo se permiten correos @escuelasproa.edu.ar
          </small>
        </div>

        <!-- CONTRASEÑA -->
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
            autocomplete="new-password"
            required
          />

          <small>
            Mínimo 6 caracteres.
          </small>
        </div>

        <!-- CONFIRMAR CONTRASEÑA -->
        <div class="input-group">
          <label for="confirmPassword">
            Confirmar contraseña
          </label>

          <input
            id="confirmPassword"
            v-model="formulario.confirmPassword"
            type="password"
            placeholder="Repetí tu contraseña"
            autocomplete="new-password"
            required
          />
        </div>

        <!-- TIPO DE USUARIO -->
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

            <option value="administrador">
              administrador
            </option>

            <option value="profesor">
              profesor
            </option>
          </select>
        </div>

        <!-- BOTÓN -->
        <button
          type="submit"
          class="register-button"
        >
          Crear cuenta
        </button>

      </form>

      <!-- LOGIN -->
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

  // Limpiar datos
  const nombre = formulario.nombre.trim()
  const apellido = formulario.apellido.trim()
  const email = formulario.email.trim().toLowerCase()
  const password = formulario.password
  const confirmPassword = formulario.confirmPassword
  const tipo = formulario.tipo

  // Verificar nombre
  if (!nombre) {
    alert('Ingresá tu nombre.')
    return
  }

  // Verificar apellido
  if (!apellido) {
    alert('Ingresá tu apellido.')
    return
  }

  // Verificar correo institucional
  if (!email.endsWith('@escuelasproa.edu.ar')) {
    alert(
      'Debés utilizar un correo institucional de Escuelas PROA.\n\n' +
      'Ejemplo: alumno@escuelasproa.edu.ar'
    )
    return
  }

  // Verificar contraseña
  if (password.length < 6) {
    alert(
      'La contraseña debe tener al menos 6 caracteres.'
    )
    return
  }

  // Verificar contraseñas
  if (password !== confirmPassword) {
    alert(
      'Las contraseñas no coinciden.'
    )
    return
  }

  // Verificar tipo de usuario
  if (!tipo) {
    alert(
      'Seleccioná si sos alumno o tutor.'
    )
    return
  }

  // Obtener usuarios guardados
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
    id: Date.now(),
    nombre: nombre,
    apellido: apellido,
    email: email,
    password: password,
    tipo: tipo
  }

  // Guardar usuario
  usuarios.push(nuevoUsuario)

  localStorage.setItem(
    'usuariosPROA',
    JSON.stringify(usuarios)
  )

  // Mensaje
  alert(
    '¡Registro exitoso! 🎉\n\n' +
    'Tu cuenta fue creada correctamente.\n\n' +
    'Ahora podés iniciar sesión.'
  )

  // Ir al login
  router.push('/login')
}

const irAlLogin = () => {
  router.push('/login')
}
</script>

<style scoped>

* {
  box-sizing: border-box;
}

.register-container {
  min-height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  background:
    linear-gradient(
      135deg,
      #eef2ff 0%,
      #f8fafc 50%,
      #e0e7ff 100%
    );

  padding: 25px;
}

.register-box {
  width: 100%;
  max-width: 450px;

  background: white;

  padding: 38px;

  border-radius: 20px;

  box-shadow:
    0 20px 50px rgba(0, 0, 0, 0.12);

  border: 1px solid #e5e7eb;
}

.logo-circle {
  width: 60px;
  height: 60px;

  margin: 0 auto 15px;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 50%;

  background: linear-gradient(
    135deg,
    #4f46e5,
    #6366f1
  );

  color: white;

  font-size: 28px;
  font-weight: 800;

  box-shadow:
    0 8px 20px rgba(79, 70, 229, 0.3);
}

h1 {
  text-align: center;

  margin: 0 0 8px;

  color: #111827;

  font-size: 30px;
}

.subtitle {
  text-align: center;

  color: #6b7280;

  margin: 0 0 28px;

  font-size: 15px;

  line-height: 1.5;
}

.input-group {
  display: flex;

  flex-direction: column;

  margin-bottom: 18px;
}

.input-group label {
  margin-bottom: 7px;

  font-weight: 700;

  color: #374151;

  font-size: 14px;
}

.input-group input,
.input-group select {
  width: 100%;

  padding: 13px 14px;

  border: 1px solid #d1d5db;

  border-radius: 10px;

  background: #fff;

  color: #111827;

  font-size: 15px;

  outline: none;

  transition: 0.2s;
}

.input-group input::placeholder {
  color: #9ca3af;
}

.input-group input:focus,
.input-group select:focus {
  border-color: #4f46e5;

  box-shadow:
    0 0 0 3px rgba(79, 70, 229, 0.12);
}

.input-group small {
  margin-top: 6px;

  color: #6b7280;

  font-size: 12px;
}

.register-button {
  width: 100%;

  padding: 14px;

  margin-top: 5px;

  border: none;

  border-radius: 10px;

  background: linear-gradient(
    135deg,
    #4f46e5,
    #6366f1
  );

  color: white;

  font-size: 16px;

  font-weight: 700;

  cursor: pointer;

  transition: 0.2s;

  box-shadow:
    0 7px 18px rgba(79, 70, 229, 0.25);
}

.register-button:hover {
  transform: translateY(-1px);

  box-shadow:
    0 10px 22px rgba(79, 70, 229, 0.35);
}

.register-button:active {
  transform: translateY(0);
}

.login-text {
  text-align: center;

  margin: 23px 0 0;

  color: #6b7280;

  font-size: 14px;
}

.link-button {
  border: none;

  background: none;

  color: #4f46e5;

  font-weight: 700;

  cursor: pointer;

  font-size: inherit;

  padding: 0;

  margin-left: 4px;
}

.link-button:hover {
  text-decoration: underline;
}

@media (max-width: 500px) {

  .register-container {
    padding: 15px;
  }

  .register-box {
    padding: 28px 22px;
  }

  h1 {
    font-size: 26px;
  }
}

</style>