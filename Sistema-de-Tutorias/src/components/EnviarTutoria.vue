<template>

  <div class="enviar">

    <div class="titulo">
      <h2>Enviar tutoría</h2>
      <p>Seleccioná un estudiante.</p>
    </div>

    <div
      v-for="estudiante in estudiantes"
      :key="estudiante.id"
      class="estudiante"
      :class="{ seleccionado: seleccionado === estudiante.id }"
      @click="seleccionar(estudiante.id)"
    >

      <div>
        <strong>{{ estudiante.nombre }}</strong>

        <small>
          {{ estudiante.curso }} · {{ estudiante.materia }}
        </small>
      </div>

      <div
        v-if="seleccionado === estudiante.id"
        class="acciones"
      >
        <a
          :href="'mailto:' + estudiante.email"
          @click.stop
        >
          📧 Mail
        </a>

        <a
          :href="'https://wa.me/' + estudiante.whatsapp"
          target="_blank"
          @click.stop
        >
          💬 WhatsApp
        </a>

        <div class="agenda-fields" @click.stop>
          <label>
            Día
            <select v-model="dia">
              <option value="LUN">Lunes</option>
              <option value="MAR">Martes</option>
              <option value="MIÉ">Miércoles</option>
              <option value="JUE">Jueves</option>
              <option value="VIE">Viernes</option>
            </select>
          </label>

          <label>
            Horario
            <input v-model="horario" type="time" />
          </label>

          <button
            type="button"
            class="guardar-tutoria"
            @click="guardarTutoria(estudiante)"
          >
            Guardar tutoría
          </button>
        </div>
      </div>

    </div>

    <p v-if="estudiantes.length === 0" class="vacio">
      No hay estudiantes para el filtro seleccionado.
    </p>

  </div>

</template>

<script>
export default {

  name: "EnviarTutoria",

  props: {

    estudiantes: {
      type: Array,
      default: () => []
    }

  },

  data() {

    return {
      seleccionado: null,
      dia: "LUN",
      horario: ""
    }

  },

  watch: {

    estudiantes() {
      this.seleccionado = null;
    }

  },

  emits: ["guardar"],

  methods: {

    seleccionar(id) {
      if (this.seleccionado === id) {
        this.seleccionado = null;
      } else {
        this.seleccionado = id;
        this.dia = "LUN";
        this.horario = "";
      }
    },

    guardarTutoria(estudiante) {
      if (!this.horario) {
        alert("Elegí un horario para la tutoría.");
        return;
      }

      this.$emit("guardar", {
        materia: estudiante.materia,
        curso: estudiante.curso,
        dia: this.dia,
        horario: this.horario,
        estudiante: estudiante.nombre,
        email: estudiante.email,
        whatsapp: estudiante.whatsapp
      });
    }

  }

}
</script>

<style scoped>

.enviar {
  width: 90%;
  max-width: 900px;
  margin: 25px auto;
  background: white;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.titulo {
  padding: 18px 20px;
  border-bottom: 1px solid #ddd;
}

.titulo h2 {
  margin: 0;
}

.titulo p {
  margin-bottom: 0;
  color: #777;
}

.estudiante {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
}

.estudiante:hover {
  background: #f7f7f7;
}

.estudiante.seleccionado {
  background: #f1f1f1;
}

.estudiante strong {
  display: block;
}

.estudiante small {
  color: #777;
}

.acciones {
  display: flex;
  gap: 10px;
}

.acciones a {
  padding: 8px 12px;
  border: 1px solid #bbb;
  border-radius: 5px;
  text-decoration: none;
  color: #222;
  background: white;
}

.agenda-fields {
  display: flex;
  align-items: end;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
  width: 100%;
}

.agenda-fields label {
  display: flex;
  flex-direction: column;
  gap: 3px;
  color: #666;
  font-size: 11px;
}

.agenda-fields select,
.agenda-fields input {
  padding: 7px;
  border: 1px solid #bbb;
  border-radius: 5px;
  background: white;
}

.guardar-tutoria {
  padding: 8px 12px;
  border: 0;
  border-radius: 5px;
  background: #4f46e5;
  color: white;
  cursor: pointer;
}

.guardar-tutoria:hover {
  background: #3730a3;
}

.vacio {
  padding: 25px;
  text-align: center;
  color: #777;
}

</style>