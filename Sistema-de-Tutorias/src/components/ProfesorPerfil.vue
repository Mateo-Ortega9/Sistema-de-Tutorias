<template>
  <div class="perfil-container">

    <div class="perfil-card">

      <!-- ENCABEZADO -->
      <div class="perfil-header">

        <div class="foto-container">
          <div class="foto-placeholder">
            {{ iniciales }}
          </div>
        </div>

        <h1>
          {{ usuario.nombre }} {{ usuario.apellido }}
        </h1>

        <p class="rol">
          🎓 Profesor
        </p>

      </div>


      <!-- INFORMACIÓN PERSONAL -->
      <div class="seccion">

        <h2>Información personal</h2>

        <div class="dato">
          <span class="icono">👤</span>

          <div>
            <small>Usuario</small>

            <p>
              {{ usuario.nombre }} {{ usuario.apellido }}
            </p>
          </div>
        </div>


        <div class="dato">
          <span class="icono">🎓</span>

          <div>
            <small>Rol</small>

            <p>
              Profesor
            </p>
          </div>
        </div>


        <div class="dato">
          <span class="icono">📧</span>

          <div>
            <small>Correo institucional</small>

            <p>
              {{ usuario.email }}
            </p>
          </div>
        </div>

      </div>


      <!-- INFORMACIÓN PROFESIONAL -->
      <div class="seccion">

        <h2>Información profesional</h2>


        <div class="dato">
          <span class="icono"></span>

          <div>
            <small>Materia</small>

            <p>
              {{ usuario.materia || 'Sin especificar' }}
            </p>
          </div>
        </div>


        <div class="dato">
          <span class="icono"></span>

          <div>
            <small>Escuela / Sede</small>

            <p>
              PROA La Falda
            </p>
          </div>
        </div>


        <div class="dato">
          <span class="icono"></span>

          <div>
            <small>Descripción</small>

            <p>
              {{ usuario.descripcion || 'Sin especificar' }}
            </p>
          </div>
        </div>

      </div>


      <!-- BOTONES -->
      <div class="acciones">

        <button
          class="editar-button"
          @click="editarPerfil"
        >
           Editar perfil
        </button>


        <button
          class="cerrar-button"
          @click="cerrarSesion"
        >
           Cerrar sesión
        </button>

      </div>

    </div>

  </div>
</template>


<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()


// Obtener usuario que inició sesión
const usuario = JSON.parse(
  localStorage.getItem('usuarioActual') || '{}'
)


// Crear iniciales automáticamente
const iniciales = computed(() => {

  const nombre = usuario.nombre || ''
  const apellido = usuario.apellido || ''

  return (
    nombre.charAt(0) +
    apellido.charAt(0)
  ).toUpperCase()

})


// Editar perfil
const editarPerfil = () => {

  alert(
    'La edición del perfil estará disponible próximamente.'
  )

}


// Cerrar sesión
const cerrarSesion = () => {

  const confirmar = confirm(
    '¿Estás seguro de que querés cerrar sesión?'
  )

  if (!confirmar) {
    return
  }


  // Eliminar sesión actual
  localStorage.removeItem('usuarioActual')


  // Volver al Login
  router.push('/login')

}
</script>


<style scoped>

.perfil-container {

  min-height: 100vh;

  display: flex;

  justify-content: center;

  align-items: center;

  background: #f2f4f7;

  padding: 30px;

}


.perfil-card {

  width: 100%;

  max-width: 550px;

  background: white;

  border-radius: 20px;

  padding: 40px;

  box-shadow:
    0 5px 25px rgba(0, 0, 0, 0.12);

}


/* ENCABEZADO */

.perfil-header {

  text-align: center;

  margin-bottom: 30px;

}


.foto-container {

  display: flex;

  justify-content: center;

  margin-bottom: 20px;

}


.foto-placeholder {

  width: 130px;

  height: 130px;

  border-radius: 50%;

  background: #4f46e5;

  color: white;

  display: flex;

  justify-content: center;

  align-items: center;

  font-size: 40px;

  font-weight: bold;

  box-shadow:
    0 4px 12px rgba(0, 0, 0, 0.15);

}


h1 {

  margin: 10px 0 5px;

  color: #222;

  font-size: 28px;

}


.rol {

  color: #4f46e5;

  font-size: 18px;

  font-weight: bold;

  margin: 0;

}


/* SECCIONES */

.seccion {

  margin-top: 25px;

}


.seccion h2 {

  font-size: 18px;

  color: #333;

  margin-bottom: 10px;

}


/* DATOS */

.dato {

  display: flex;

  align-items: center;

  gap: 15px;

  padding: 15px;

  border-bottom: 1px solid #eee;

}


.icono {

  font-size: 25px;

  width: 35px;

  text-align: center;

}


.dato small {

  display: block;

  color: #777;

  font-size: 12px;

}


.dato p {

  margin: 4px 0 0;

  color: #222;

  font-weight: 500;

}


/* BOTONES */

.acciones {

  margin-top: 30px;

  display: flex;

  flex-direction: column;

  gap: 12px;

}


.editar-button,
.cerrar-button {

  width: 100%;

  padding: 13px;

  border: none;

  border-radius: 8px;

  font-size: 16px;

  font-weight: bold;

  cursor: pointer;

}


.editar-button {

  background: #4f46e5;

  color: white;

}


.editar-button:hover {

  background: #3730a3;

}


.cerrar-button {

  background: #f1f1f1;

  color: #d32f2f;

}


.cerrar-button:hover {

  background: #ffe5e5;

}


/* CELULAR */

@media (max-width: 600px) {

  .perfil-container {

    padding: 15px;

  }


  .perfil-card {

    padding: 25px;

  }


  h1 {

    font-size: 23px;

  }

}

</style>