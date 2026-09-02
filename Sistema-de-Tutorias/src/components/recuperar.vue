<template>
  <div class="recuperar-container">

    <div class="recuperar-box">

      <div class="logo">
        🔐
      </div>

      <h1>Recuperar contraseña</h1>

      <p class="descripcion">
        Recuperá el acceso a tu cuenta de PROA.
      </p>

      <form @submit.prevent="recuperar">

        <!-- TIPO DE USUARIO -->
        <div class="campo">

          <label>
            Tipo de usuario
          </label>

          <select v-model="tipo" required>

            <option value="" disabled>
              Seleccioná una opción
            </option>

            <option value="profesor">
              Profesor
            </option>

            <option value="administrador">
              Administración
            </option>

          </select>

        </div>


        <!-- CORREO -->
        <div class="campo">

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


        <!-- BOTÓN -->
        <button
          type="submit"
          class="boton"
        >
          Recuperar contraseña
        </button>

      </form>


      <!-- VOLVER -->
      <button
        type="button"
        class="volver"
        @click="volver"
      >
        ← Volver al inicio de sesión
      </button>

    </div>

  </div>
</template>


<script setup>

import { ref } from 'vue'

import { useRouter } from 'vue-router'


const router = useRouter()


const email = ref('')

const tipo = ref('')


const recuperar = () => {

  const correo = email.value
    .trim()
    .toLowerCase()


  // Verificar correo
  if (!correo.endsWith('@escuelasproa.edu.ar')) {

    alert(
      'Debés utilizar un correo institucional de Escuelas PROA.'
    )

    return
  }


  // Verificar tipo
  if (!tipo.value) {

    alert(
      'Seleccioná Profesor o Administración.'
    )

    return
  }


  // Obtener usuarios
  const usuarios = JSON.parse(
    localStorage.getItem('usuariosPROA') || '[]'
  )


  // Buscar usuario
  const usuario = usuarios.find(

    usuario =>

      usuario.email === correo &&

      usuario.tipo === tipo.value

  )


  if (!usuario) {

    alert(
      'No encontramos una cuenta con ese correo y tipo de usuario.'
    )

    return

  }


  // Pedir nueva contraseña
  const nuevaPassword = prompt(
    'Ingresá tu nueva contraseña:'
  )


  if (nuevaPassword === null) {

    return

  }


  if (nuevaPassword.length < 6) {

    alert(
      'La contraseña debe tener al menos 6 caracteres.'
    )

    return

  }


  // Actualizar contraseña
  usuario.password = nuevaPassword


  // Guardar cambios
  localStorage.setItem(
    'usuariosPROA',
    JSON.stringify(usuarios)
  )


  alert(
    '¡Contraseña cambiada correctamente!'
  )


  router.push('/login')

}


const volver = () => {

  router.push('/login')

}

</script>


<style scoped>

* {
  box-sizing: border-box;
}


.recuperar-container {

  min-height: 100vh;

  display: flex;

  justify-content: center;

  align-items: center;

  padding: 20px;

  background:

    linear-gradient(

      135deg,

      #eef2ff,

      #f8fafc,

      #e0e7ff

    );

}


.recuperar-box {

  width: 100%;

  max-width: 420px;

  padding: 40px;

  background: white;

  border-radius: 20px;

  box-shadow:

    0 20px 50px

    rgba(0, 0, 0, 0.12);

}


.logo {

  width: 70px;

  height: 70px;

  margin: 0 auto 20px;

  display: flex;

  justify-content: center;

  align-items: center;

  border-radius: 50%;

  background: #eef2ff;

  font-size: 32px;

}


h1 {

  margin: 0;

  text-align: center;

  color: #111827;

  font-size: 28px;

}


.descripcion {

  margin: 12px 0 30px;

  text-align: center;

  color: #6b7280;

  font-size: 14px;

  line-height: 1.5;

}


.campo {

  margin-bottom: 20px;

}


.campo label {

  display: block;

  margin-bottom: 8px;

  color: #374151;

  font-size: 14px;

  font-weight: 700;

}


.campo input,

.campo select {

  width: 100%;

  padding: 13px;

  border: 1px solid #d1d5db;

  border-radius: 10px;

  background: white;

  color: #111827;

  font-size: 15px;

  outline: none;

}


.campo input:focus,

.campo select:focus {

  border-color: #4f46e5;

  box-shadow:

    0 0 0 3px

    rgba(79, 70, 229, 0.12);

}


.boton {

  width: 100%;

  padding: 14px;

  border: none;

  border-radius: 10px;

  background: #4f46e5;

  color: white;

  font-size: 16px;

  font-weight: bold;

  cursor: pointer;

}


.boton:hover {

  background: #3730a3;

}


.volver {

  display: block;

  margin: 22px auto 0;

  padding: 0;

  border: none;

  background: none;

  color: #4f46e5;

  font-size: 14px;

  font-weight: bold;

  cursor: pointer;

}


.volver:hover {

  text-decoration: underline;

}


@media (max-width: 500px) {

  .recuperar-box {

    padding: 30px 22px;

  }

  h1 {

    font-size: 24px;

  }

}

</style>