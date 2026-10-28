<template>

  <section class="lista">

    <div class="cabecera">

      <div>
        <h3>Lista de estudiantes</h3>

        <p>
          {{ estudiantesFiltrados.length }}
          estudiante(s)
        </p>
      </div>

    </div>


    <div
      v-for="estudiante in estudiantesFiltrados"
      :key="estudiante.id"
      class="estudiante"
    >

      <div class="avatar">
        {{ estudiante.nombre.charAt(0) }}
      </div>


      <div class="datos">

        <strong>
          {{ estudiante.nombre }}
        </strong>

        <span>
          {{ estudiante.curso }}
          ·
          {{ nombreMateria(estudiante.materia) }}
        </span>

      </div>


      <div class="contacto">

        <span>
          ✉ {{ estudiante.email }}
        </span>

        <span>
          📱 {{ estudiante.whatsapp }}
        </span>

      </div>

    </div>


    <div
      v-if="estudiantesFiltrados.length === 0"
      class="sin-resultados"
    >
      No hay estudiantes con esos filtros.

    </div>

  </section>

</template>


<script>
import ESTUDIANTES from "../data/estudiantes";

export default {

  name: "ListasDeEstudiantes",

  props: {

    curso: {
      type: String,
      default: "todos"
    },

    materia: {
      type: String,
      default: "todas"
    },

    estudiantes: {
      type: Array,
      default: () => ESTUDIANTES
    }

  },


  computed: {

    estudiantesFiltrados() {

      return this.estudiantes.filter(estudiante => {

        const cursoCorrecto =
          this.curso === "todos" ||
          estudiante.curso === this.curso;


        const materiaCorrecta =
          this.materia === "todas" ||
          String(estudiante.materia).toLowerCase() ===
          String(this.materia).toLowerCase();


        return cursoCorrecto && materiaCorrecta;

      });

    }

  },


  methods: {

    nombreMateria(materia) {

      const nombres = {

        matematica: "Matemática",

        lengua: "Lengua",

        ingles: "Inglés",

        programacion: "Programación"

      };

      return nombres[String(materia).toLowerCase()] || materia;

    }

  }

};

</script>


<style scoped>

.lista {
  margin-top: 20px;

  background: white;

  border: 1px solid #ddd;

  border-radius: 12px;

  overflow: hidden;
}

.cabecera {
  padding: 20px;

  border-bottom: 1px solid #eee;
}

.cabecera h3 {
  margin: 0;
}

.cabecera p {
  margin: 5px 0 0;

  color: #777;

  font-size: 13px;
}


.estudiante {
  display: flex;

  align-items: center;

  gap: 15px;

  padding: 16px 20px;

  border-bottom: 1px solid #eee;
}


.avatar {
  width: 42px;

  height: 42px;

  border-radius: 50%;

  background: #e8e8e8;

  display: flex;

  justify-content: center;

  align-items: center;

  font-weight: bold;
}


.datos {
  display: flex;

  flex-direction: column;

  gap: 5px;

  width: 230px;
}

.datos span {
  color: #777;

  font-size: 13px;
}


.contacto {
  margin-left: auto;

  display: flex;

  flex-direction: column;

  gap: 5px;

  color: #666;

  font-size: 12px;
}


.sin-resultados {
  padding: 40px;

  text-align: center;

  color: #777;
}

</style>