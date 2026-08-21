<template>
  <div class="pagina">

    <!-- BARRA SUPERIOR -->
    <header class="barra">

      <div>
        <h1>Sistema de Tutorías</h1>
        <p>Administración de estudiantes</p>
      </div>

      <button
        class="boton-filtros"
        @click="mostrarFiltros = !mostrarFiltros"
      >
        ⚙ Filtros
      </button>

    </header>


    <!-- CONTENIDO -->
    <main class="contenido">

      <div class="titulo">
        <h2>Estudiantes</h2>

        <p>
          Seleccioná un curso y una materia para mostrar
          los estudiantes correspondientes.
        </p>
      </div>


      <!-- FILTROS -->
      <section
        v-if="mostrarFiltros"
        class="panel-filtros"
      >

        <!-- CURSO -->
        <div class="campo">

          <label>Curso</label>

          <select v-model="cursoSeleccionado">

            <option value="todos">
              Todos los cursos
            </option>

            <option value="4A">
              4° A
            </option>

            <option value="4B">
              4° B
            </option>

            <option value="5A">
              5° A
            </option>

            <option value="5B">
              5° B
            </option>

          </select>

        </div>


        <!-- MATERIA -->
        <div class="campo">

          <label>Materia</label>

          <select v-model="materiaSeleccionada">

            <option value="todas">
              Todas las materias
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


        <button
          class="limpiar"
          @click="limpiarFiltros"
        >
          Limpiar
        </button>

      </section>


      <!-- FILTROS ACTUALES -->
      <div class="filtros-activos">

        <span>
          Curso:
          <strong>{{ nombreCurso }}</strong>
        </span>

        <span>
          Materia:
          <strong>{{ nombreMateria }}</strong>
        </span>

      </div>


      <!-- LISTA DE ESTUDIANTES -->
      <ListasDeEstudiantes
        :curso="cursoSeleccionado"
        :materia="materiaSeleccionada"
      />


      <!-- BOTÓN ENVIAR TUTORÍA -->
      <div class="contenedor-enviar">

        <button
          class="boton-enviar"
          @click="mostrarEnviar = true"
        >
          ✉ Enviar Tutoría
        </button>

      </div>

    </main>


    <!-- PANEL DE ENVIAR TUTORÍA -->
    <div
      v-if="mostrarEnviar"
      class="overlay"
      @click.self="mostrarEnviar = false"
    >

      <div class="panel-enviar">

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

      mostrarFiltros: true,

      mostrarEnviar: false,

      cursoSeleccionado: "todos",

      materiaSeleccionada: "todas"

    };

  },

  computed: {

    nombreCurso() {

      const cursos = {

        todos: "Todos",

        "4A": "4° A",

        "4B": "4° B",

        "5A": "5° A",

        "5B": "5° B"

      };

      return cursos[this.cursoSeleccionado];

    },


    nombreMateria() {

      const materias = {

        todas: "Todas",

        matematica: "Matemática",

        lengua: "Lengua",

        ingles: "Inglés",

        programacion: "Programación"

      };

      return materias[this.materiaSeleccionada];

    }

  },

  methods: {

    limpiarFiltros() {

      this.cursoSeleccionado = "todos";

      this.materiaSeleccionada = "todas";

    }

  }

};

</script>


<style scoped>

.pagina {
  min-height: 100vh;
  background: #f4f6f8;
  color: #20242a;
}


/* BARRA */

.barra {
  height: 75px;

  padding: 0 35px;

  background: white;

  border-bottom: 1px solid #ddd;

  display: flex;

  align-items: center;

  justify-content: space-between;
}

.barra h1 {
  margin: 0;

  font-size: 23px;
}

.barra p {
  margin: 5px 0 0;

  color: #777;

  font-size: 14px;
}


/* BOTÓN FILTROS */

.boton-filtros {
  padding: 11px 18px;

  border: 1px solid #ddd;

  border-radius: 8px;

  background: white;

  cursor: pointer;

  font-size: 14px;
}

.boton-filtros:hover {
  background: #f1f1f1;
}


/* CONTENIDO */

.contenido {
  padding: 30px 35px;
}

.titulo h2 {
  margin: 0;

  font-size: 28px;
}

.titulo p {
  margin-top: 7px;

  color: #777;
}


/* FILTROS */

.panel-filtros {
  margin-top: 25px;

  padding: 20px;

  background: white;

  border: 1px solid #ddd;

  border-radius: 12px;

  display: flex;

  align-items: end;

  gap: 20px;
}

.campo {
  display: flex;

  flex-direction: column;

  gap: 7px;
}

.campo label {
  font-size: 13px;

  font-weight: bold;

  color: #555;
}

.campo select {
  width: 220px;

  padding: 11px;

  border: 1px solid #ccc;

  border-radius: 8px;

  background: white;

  cursor: pointer;
}


/* LIMPIAR */

.limpiar {
  padding: 11px 18px;

  border: 1px solid #ccc;

  border-radius: 8px;

  background: white;

  cursor: pointer;
}


/* FILTROS ACTIVOS */

.filtros-activos {
  display: flex;

  gap: 10px;

  margin-top: 20px;
}

.filtros-activos span {
  padding: 8px 13px;

  background: white;

  border: 1px solid #ddd;

  border-radius: 8px;

  color: #666;

  font-size: 13px;
}


/* ENVIAR */

.contenedor-enviar {
  display: flex;

  justify-content: flex-end;

  margin-top: 20px;
}

.boton-enviar {
  padding: 12px 20px;

  border: none;

  border-radius: 8px;

  background: #222;

  color: white;

  font-weight: bold;

  cursor: pointer;
}


/* MODAL */

.overlay {
  position: fixed;

  inset: 0;

  background: rgba(0, 0, 0, 0.5);

  display: flex;

  align-items: center;

  justify-content: center;

  z-index: 100;
}

.panel-enviar {
  position: relative;

  width: 850px;

  max-width: 95%;

  max-height: 90vh;

  overflow-y: auto;

  background: white;

  border-radius: 15px;

  padding: 25px;
}

.cerrar {
  position: absolute;

  top: 12px;

  right: 12px;

  width: 35px;

  height: 35px;

  border: none;

  border-radius: 50%;

  background: #eee;

  cursor: pointer;
}

</style>