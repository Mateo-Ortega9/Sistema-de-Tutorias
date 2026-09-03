<template>
  <div class="app">

    <!-- BARRA SUPERIOR -->
    <header class="topbar">

      <div class="top-left">
        <button class="icon-button">
          ☰
        </button>

        <button class="icon-button">
          🏠
        </button>
      </div>

      <div class="top-title">
        Sistema de Tutorías
      </div>

      <div class="user">
        👤
      </div>

    </header>


    <div class="layout">

      <!-- MENÚ LATERAL -->
      <aside class="sidebar">

        <div class="filtro">

          <label>Curso</label>

          <select v-model="cursoSeleccionado">

            <option value="todos">
              Todos
            </option>

            <option value="1° año">
              1° Año 
            </option>

            <option value="2° año">
              2° Año 
            </option>

            <option value="3° año">
              3° Año 
            </option>

            <option value="4° año">
              4° Año 
            </option>

          </select>

        </div>


        <div class="filtro">

          <label>Materia</label>

          <select v-model="materiaSeleccionada">

            <option value="todas">
              Todas
            </option>

            <option value="matematica">
              Matemática
            </option>

            <option value="lengua">
              Lengua
            </option>

            <option value="ingles">
              Inglés
            </option>

            <option value="programacion">
              Programación
            </option>

          </select>

        </div>


        <!-- NAVEGACIÓN -->
        <nav class="navegacion">

          <button
            :class="{ activo: vista === 'calendario' }"
            @click="vista = 'calendario'"
          >
            📅 Calendario
          </button>

          <button
            :class="{ activo: vista === 'estudiantes' }"
            @click="vista = 'estudiantes'"
          >
            👥 Estudiantes
          </button>

        </nav>


        <!-- REFERENCIA DE COLORES -->
        <div class="referencia">

          <div>
            <span class="color naranja"></span>
            Muchas personas citadas
          </div>

          <div>
            <span class="color azul"></span>
            Pocas personas citadas
          </div>

          <div>
            <span class="color verde"></span>
            No hay personas citadas
          </div>

        </div>

      </aside>


      <!-- CONTENIDO PRINCIPAL -->
      <main class="contenido">

        <!-- CALENDARIO -->
        <section
          v-if="vista === 'calendario'"
          class="calendario"
        >

          <h1>MARZO</h1>

          <div class="tabla-calendario">

            <div class="cabecera-calendario"></div>

            <div
              v-for="dia in dias"
              :key="dia"
              class="cabecera-calendario"
            >
              {{ dia }}
            </div>


            <template
              v-for="semana in semanas"
              :key="semana"
            >

              <div class="semana">
                Semana {{ semana }}
              </div>

              <div
                v-for="dia in dias"
                :key="dia"
                class="celda"
                :class="colorCelda(semana, dia)"
              >
              </div>

            </template>

          </div>

        </section>


        <!-- ESTUDIANTES -->
        <section class="zona-estudiantes">

          <div class="titulo-seccion">

            <div>
              <h2>Estudiantes</h2>

              <p>
                {{ estudiantesFiltrados.length }}
                estudiantes encontrados
              </p>
            </div>

            <button
              class="boton-tutoria"
              @click="mostrarEnviar = true"
            >
              ✉ Enviar Tutoría
            </button>

          </div>

  
          <ListasDeEstudiantes
            v-if="vista === 'estudiantes' || vista === 'calendario'"
            :curso="cursoSeleccionado"
            :materia="materiaSeleccionada"
          />

        </section>

      </main>

    </div>


    <!-- PANEL DE ENVÍO -->
    <div
      v-if="mostrarEnviar"
      class="fondo-modal"
      @click.self="mostrarEnviar = false"
    >

      <div class="modal">

        <button
          class="cerrar"
          @click="mostrarEnviar = false"
        >
          ✕
        </button>

        <EnviarTutoria />

      </div>

    </div>

  </div>
</template>


<script>
import ListasDeEstudiantes from "./ListasDeEstudiantes.vue";
import EnviarTutoria from "./EnviarTutoria.vue";

export default {

  name: "Filtros",

  components: {
    ListasDeEstudiantes,
    EnviarTutoria
  },

  data() {
    return {

      cursoSeleccionado: "todos",

      materiaSeleccionada: "todas",

      vista: "calendario",

      mostrarEnviar: false,

      dias: [
        "LUN",
        "MAR",
        "MIÉ",
        "JUE",
        "VIE"
      ],

      semanas: [1, 2, 3, 4]

    };
  },

  computed: {

    estudiantesFiltrados() {

      const estudiantes = [

        {
          curso: "1° año",
          materia: "matematica"
        },

        {
          curso: "1° año",
          materia: "lengua"
        },

        {
          curso: "2° año",
          materia: "programacion"
        },

        {
          curso: "3° año",
          materia: "ingles"
        }

      ];

      return estudiantes.filter(estudiante => {

        const curso =
          this.cursoSeleccionado === "todos" ||
          estudiante.curso === this.cursoSeleccionado;

        const materia =
          this.materiaSeleccionada === "todas" ||
          estudiante.materia === this.materiaSeleccionada;

        return curso && materia;

      });

    }

  },

  methods: {

    colorCelda(semana, dia) {

      if (semana === 1 && dia === "LUN") {
        return "naranja";
      }

      if (semana === 2 && dia === "VIE") {
        return "azul";
      }

      if (semana === 4 && dia === "MAR") {
        return "verde";
      }

      return "";

    }

  }

};
</script>


<style scoped>

.app {
  min-height: 100vh;
  background: #f7f8fa;
}


/* BARRA SUPERIOR */

.topbar {
  height: 70px;
  background: white;
  border-bottom: 1px solid #222;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 25px;
}

.top-left {
  display: flex;
  gap: 12px;
}

.icon-button {
  border: 1px solid #222;
  background: white;

  width: 40px;
  height: 40px;

  border-radius: 7px;

  cursor: pointer;
  font-size: 18px;
}

.top-title {
  font-size: 20px;
  font-weight: 600;
}

.user {
  border: 1px solid #222;
  width: 40px;
  height: 40px;
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;
}


/* ESTRUCTURA */

.layout {
  display: flex;
  min-height: calc(100vh - 70px);
}


/* SIDEBAR */

.sidebar {
  width: 250px;
  background: white;
  border-right: 1px solid #222;

  padding: 30px 22px;

  flex-shrink: 0;
}

.filtro {
  margin-bottom: 25px;
}

.filtro label {
  display: block;

  font-size: 18px;
  margin-bottom: 9px;
}

.filtro select {
  width: 100%;

  padding: 12px;

  border: 1px solid #222;
  border-radius: 5px;

  background: white;

  font-size: 14px;
}


/* NAVEGACIÓN */

.navegacion {
  margin-top: 35px;

  display: flex;
  flex-direction: column;
}

.navegacion button {
  border: none;

  background: white;

  text-align: left;

  padding: 14px 10px;

  font-size: 16px;

  cursor: pointer;

  border-radius: 6px;
}

.navegacion button:hover,
.navegacion .activo {
  background: #e9eff8;
}


/* REFERENCIA */

.referencia {
  margin-top: 120px;

  display: flex;
  flex-direction: column;

  gap: 15px;

  font-size: 12px;
}

.referencia div {
  display: flex;
  align-items: center;
  gap: 8px;
}

.color {
  width: 18px;
  height: 18px;

  display: inline-block;

  border: 1px solid #555;
}

.color.naranja {
  background: #ffd9bd;
}

.color.azul {
  background: #ccd9f5;
}

.color.verde {
  background: #c9e9d0;
}


/* CONTENIDO */

.contenido {
  flex: 1;

  padding: 30px;

  overflow-x: auto;
}


/* CALENDARIO */

.calendario h1 {
  text-align: center;

  font-size: 24px;

  margin: 0 0 20px;
}

.tabla-calendario {
  display: grid;

  grid-template-columns:
    120px repeat(5, minmax(100px, 1fr));

  border: 1px solid #222;

  min-width: 700px;
}

.cabecera-calendario,
.semana,
.celda {
  min-height: 55px;

  border-right: 1px solid #222;
  border-bottom: 1px solid #222;

  display: flex;
  align-items: center;
  justify-content: center;
}

.semana {
  font-size: 13px;
}

.celda.naranja {
  background: #ffd9bd;
}

.celda.azul {
  background: #ccd9f5;
}

.celda.verde {
  background: #c9e9d0;
}


/* ESTUDIANTES */

.zona-estudiantes {
  margin-top: 35px;
}

.titulo-seccion {
  display: flex;

  justify-content: space-between;

  align-items: center;

  margin-bottom: 15px;
}

.titulo-seccion h2 {
  margin: 0;

  font-size: 25px;
}

.titulo-seccion p {
  margin: 5px 0 0;

  color: #777;
}


/* BOTÓN */

.boton-tutoria {
  padding: 12px 20px;

  border: 1px solid #222;

  background: #dce7f8;

  border-radius: 6px;

  cursor: pointer;

  font-weight: bold;
}


/* MODAL */

.fondo-modal {
  position: fixed;

  inset: 0;

  background: rgba(0, 0, 0, 0.35);

  display: flex;

  align-items: center;

  justify-content: center;

  z-index: 100;
}

.modal {
  position: relative;

  width: 600px;
  max-width: 90%;

  max-height: 90vh;

  overflow-y: auto;

  background: white;

  border: 1px solid #222;

  border-radius: 10px;

  padding: 25px;
}

.cerrar {
  position: absolute;

  right: 15px;
  top: 15px;

  border: none;

  background: transparent;

  font-size: 20px;

  cursor: pointer;
}

</style>