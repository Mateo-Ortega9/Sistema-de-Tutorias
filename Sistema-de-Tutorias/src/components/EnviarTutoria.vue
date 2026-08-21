<template>

  <div class="enviar">

    <h2>Enviar Tutoría</h2>

    <p>
      Seleccioná los estudiantes a los que querés enviar
      la tutoría.
    </p>


    <div class="mensaje">

      <label>Mensaje de la tutoría</label>

      <textarea
        v-model="mensaje"
        rows="5"
        placeholder="Escribí el mensaje..."
      ></textarea>

    </div>


    <button
      class="boton"
      @click="confirmar"
    >
      Enviar tutoría
    </button>


    <div
      v-if="mostrarConfirmacion"
      class="confirmacion"
    >

      <div class="caja">

        <h3>¿Estás seguro?</h3>

        <p>
          Se enviará la tutoría a los estudiantes seleccionados.
        </p>

        <div class="acciones">

          <button
            @click="mostrarConfirmacion = false"
          >
            Cancelar
          </button>

          <button
            class="confirmar"
            @click="enviar"
          >
            Confirmar envío
          </button>

        </div>

      </div>

    </div>

  </div>

</template>


<script>

export default {

  name: "EnviarTutoria",

  data() {

    return {

      mensaje:
        "Hola, te contacto para informarte sobre una tutoría.",

      mostrarConfirmacion: false

    };

  },


  methods: {

    confirmar() {

      this.mostrarConfirmacion = true;

    },


    enviar() {

      this.mostrarConfirmacion = false;

      alert("Tutoría preparada para enviar.");

    }

  }

};

</script>


<style scoped>

.enviar {
  padding: 20px;
}

.enviar h2 {
  margin-top: 0;
}

.enviar p {
  color: #666;
}


.mensaje {
  margin-top: 20px;

  display: flex;

  flex-direction: column;

  gap: 8px;
}

.mensaje label {
  font-weight: bold;

  font-size: 14px;
}

textarea {
  width: 100%;

  padding: 12px;

  border: 1px solid #ccc;

  border-radius: 8px;

  resize: vertical;

  font-family: Arial, sans-serif;
}


.boton {
  margin-top: 15px;

  padding: 11px 18px;

  border: none;

  border-radius: 8px;

  background: #222;

  color: white;

  cursor: pointer;
}


/* CONFIRMACIÓN */

.confirmacion {
  position: fixed;

  inset: 0;

  background: rgba(0, 0, 0, 0.5);

  display: flex;

  align-items: center;

  justify-content: center;
}


.caja {
  width: 400px;

  max-width: 90%;

  padding: 25px;

  background: white;

  border-radius: 12px;
}


.acciones {
  display: flex;

  justify-content: flex-end;

  gap: 10px;

  margin-top: 20px;
}

.acciones button {
  padding: 9px 15px;

  border: 1px solid #ccc;

  border-radius: 7px;

  background: white;

  cursor: pointer;
}

.acciones .confirmar {
  background: #222;

  color: white;

  border: none;
}

</style>