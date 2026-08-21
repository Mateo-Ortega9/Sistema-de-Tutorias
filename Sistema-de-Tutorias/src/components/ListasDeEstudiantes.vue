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
    }

  },


  data() {

    return {

      estudiantes: [

        {
          id: 1,
          nombre: "Juan Pérez",
          curso: "4A",
          materia: "matematica",
          email: "juan@gmail.com",
          whatsapp: "5493511111111"
        },

        {
          id: 2,
          nombre: "Ana López",
          curso: "4A",
          materia: "lengua",
          email: "ana@gmail.com",
          whatsapp: "5493512222222"
        },

        {
          id: 3,
          nombre: "Pedro Gómez",
          curso: "4B",
          materia: "programacion",
          email: "pedro@gmail.com",
          whatsapp: "5493513333333"
        },

        {
          id: 4,
          nombre: "Sofía Martínez",
          curso: "4B",
          materia: "matematica",
          email: "sofia@gmail.com",
          whatsapp: "5493514444444"
        },

        {
          id: 5,
          nombre: "Lucas Fernández",
          curso: "5A",
          materia: "ingles",
          email: "lucas@gmail.com",
          whatsapp: "5493515555555"
        },

        {
          id: 6,
          nombre: "Camila Rodríguez",
          curso: "5A",
          materia: "programacion",
          email: "camila@gmail.com",
          whatsapp: "5493516666666"
        },

        {
          id: 7,
          nombre: "Martín González",
          curso: "5B",
          materia: "matematica",
          email: "martin@gmail.com",
          whatsapp: "5493517777777"
        },

        {
          id: 8,
          nombre: "Valentina Díaz",
          curso: "5B",
          materia: "lengua",
          email: "valentina@gmail.com",
          whatsapp: "5493518888888"
        }

      ]

    };

  },


  computed: {

    estudiantesFiltrados() {

      return this.estudiantes.filter(estudiante => {

        const cursoCorrecto =
          this.curso === "todos" ||
          estudiante.curso === this.curso;


        const materiaCorrecta =
          this.materia === "todas" ||
          estudiante.materia === this.materia;


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

      return nombres[materia] || materia;

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