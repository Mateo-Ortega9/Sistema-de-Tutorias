<template>
  <div class="app">

    <!-- BARRA SUPERIOR -->
    <header class="topbar">

      <div class="top-left">
        <button
          class="icon-button"
          type="button"
          aria-label="Mostrar menú"
          @click="alternarSidebar"
        >
          ☰
        </button>

        <button
          class="icon-button"
          type="button"
          aria-label="Ir al inicio del profesor"
          @click="irInicio"
        >
          🏠
        </button>
      </div>

      <div class="top-title">
        Sistema de Tutorías
      </div>

      <div class="perfil">

        <button
          class="user"
          type="button"
          aria-label="Abrir perfil"
          @click="mostrarPerfil = !mostrarPerfil"
        >
          <img
            v-if="perfil.foto"
            :src="perfil.foto"
            alt="Foto de perfil"
          />
          <span v-else>
            {{ inicialesPerfil }}
          </span>
        </button>

        <div
          v-if="mostrarPerfil"
          class="perfil-menu"
        >
          <div class="perfil-resumen">
            <div class="mini-avatar">
              <img
                v-if="perfil.foto"
                :src="perfil.foto"
                alt="Foto de perfil"
              />
              <span v-else>
                {{ inicialesPerfil }}
              </span>
            </div>

            <div>
              <strong>{{ nombreCompleto }}</strong>
              <small>{{ perfil.email || 'Profesor' }}</small>
            </div>
          </div>

          <button
            type="button"
            class="perfil-opcion"
            @click="abrirEditorPerfil"
          >
            👤 Mi perfil
          </button>

          <button
            type="button"
            class="cerrar-sesion"
            @click="cerrarSesion"
          >
            ↪ Cerrar sesión
          </button>
        </div>

      </div>

    </header>


    <div class="layout">

      <!-- MENÚ LATERAL -->
      <aside class="sidebar" :class="{ oculto: !mostrarSidebar }">

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
            :estudiantes="estudiantesFiltrados"
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

        <EnviarTutoria :estudiantes="estudiantesFiltrados" />

      </div>

    </div>

    <!-- PERFIL DEL PROFESOR -->
    <div
      v-if="mostrarEditorPerfil"
      class="fondo-modal perfil-fondo"
      @click.self="mostrarEditorPerfil = false"
    >
      <div class="modal perfil-modal">

        <button
          class="cerrar"
          type="button"
          aria-label="Cerrar perfil"
          @click="mostrarEditorPerfil = false"
        >
          ✕
        </button>

        <div class="perfil-encabezado">
          <div>
            <span class="etiqueta-perfil">CUENTA DEL PROFESOR</span>
            <h2>Mi perfil</h2>
            <p>Completá tus datos para que los estudiantes te reconozcan.</p>
          </div>
        </div>

        <div class="perfil-contenido">
          <div class="foto-editor">
            <div class="avatar-grande">
              <img
                v-if="perfil.foto"
                :src="perfil.foto"
                alt="Foto de perfil"
              />
              <span v-else>
                {{ inicialesPerfil }}
              </span>
            </div>

            <label
              class="boton-foto"
              for="fotoPerfil"
            >
              📷 Cambiar foto
            </label>

            <input
              id="fotoPerfil"
              class="input-foto"
              type="file"
              accept="image/png, image/jpeg, image/webp"
              @change="seleccionarFoto"
            />

            <small>JPG, PNG o WEBP. Máximo 2 MB.</small>
          </div>

          <div class="perfil-formulario">
            <div class="perfil-fila">
              <div class="perfil-campo">
                <label for="perfilNombre">Nombre</label>
                <input
                  id="perfilNombre"
                  v-model="perfil.nombre"
                  type="text"
                  placeholder="Tu nombre"
                />
              </div>

              <div class="perfil-campo">
                <label for="perfilApellido">Apellido</label>
                <input
                  id="perfilApellido"
                  v-model="perfil.apellido"
                  type="text"
                  placeholder="Tu apellido"
                />
              </div>
            </div>

            <div class="perfil-campo">
              <label for="perfilEmail">Correo institucional</label>
              <input
                id="perfilEmail"
                v-model="perfil.email"
                type="email"
                disabled
              />
            </div>

            <div class="perfil-campo">
              <label for="perfilMateria">Materia que enseñás</label>
              <select
                id="perfilMateria"
                v-model="perfil.materia"
              >
                <option
                  v-for="materia in materiasDisponibles"
                  :key="materia.valor"
                  :value="materia.valor"
                >
                  {{ materia.nombre }}
                </option>
              </select>
            </div>

            <div class="perfil-campo">
              <label for="perfilDescripcion">Sobre vos</label>
              <textarea
                id="perfilDescripcion"
                v-model="perfil.descripcion"
                rows="3"
                maxlength="180"
                placeholder="Contales algo breve a tus estudiantes..."
              ></textarea>
            </div>
          </div>
        </div>

        <div class="perfil-acciones">
          <button
            type="button"
            class="boton-secundario"
            @click="mostrarEditorPerfil = false"
          >
            Cancelar
          </button>

          <button
            type="button"
            class="boton-guardar"
            @click="guardarPerfil"
          >
            Guardar cambios
          </button>
        </div>

      </div>
    </div>

  </div>
</template>


<script>
import ListasDeEstudiantes from "./ListasDeEstudiantes.vue";
import ESTUDIANTES from "../data/estudiantes";
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
      mostrarPerfil: false,
      mostrarEditorPerfil: false,
      mostrarSidebar: true,

      perfil: {
        nombre: "",
        apellido: "",
        email: "",
        materia: "matematica",
        descripcion: "",
        foto: ""
      },

      materiasDisponibles: [
        { valor: "matematica", nombre: "Matemática" },
        { valor: "lengua", nombre: "Lengua" },
        { valor: "ingles", nombre: "Inglés" },
        { valor: "programacion", nombre: "Programación" }
      ],

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

  created() {
    const usuarioGuardado = JSON.parse(
      localStorage.getItem("usuarioActual") || "null"
    );

    if (usuarioGuardado) {
      this.perfil = {
        ...this.perfil,
        nombre: usuarioGuardado.nombre || "",
        apellido: usuarioGuardado.apellido || "",
        email: usuarioGuardado.email || "",
        materia: usuarioGuardado.materia || "matematica",
        descripcion: usuarioGuardado.descripcion || "",
        foto: usuarioGuardado.foto || ""
      };
    }
  },

  computed: {

    nombreCompleto() {
      const nombre = [this.perfil.nombre, this.perfil.apellido]
        .filter(Boolean)
        .join(" ");

      return nombre || "Profesor";
    },

    inicialesPerfil() {
      const letras = [this.perfil.nombre, this.perfil.apellido]
        .filter(Boolean)
        .map(texto => texto.charAt(0).toUpperCase());

      return letras.join("").slice(0, 2) || "P";
    },

    estudiantesFiltrados() {

      const estudiantes = ESTUDIANTES;

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

    alternarSidebar() {
      this.mostrarSidebar = !this.mostrarSidebar;
    },

    irInicio() {
      this.vista = "calendario";
      this.materiaSeleccionada = "todas";
      this.cursoSeleccionado = "todos";
    },

    abrirEditorPerfil() {
      this.mostrarPerfil = false;
      this.mostrarEditorPerfil = true;
    },

    seleccionarFoto(evento) {
      const archivo = evento.target.files?.[0];

      if (!archivo) {
        return;
      }

      if (archivo.size > 2 * 1024 * 1024) {
        alert("La foto no puede pesar más de 2 MB.");
        evento.target.value = "";
        return;
      }

      const lector = new FileReader();

      lector.onload = () => {
        this.perfil.foto = lector.result;
      };

      lector.readAsDataURL(archivo);
    },

    guardarPerfil() {
      const nombre = this.perfil.nombre.trim();
      const apellido = this.perfil.apellido.trim();

      if (!nombre || !apellido) {
        alert("Completá tu nombre y apellido.");
        return;
      }

      const usuarios = JSON.parse(
        localStorage.getItem("usuariosPROA") || "[]"
      );
      const usuarioActual = JSON.parse(
        localStorage.getItem("usuarioActual") || "null"
      );

      const usuario = usuarios.find(item =>
        (usuarioActual?.id && item.id === usuarioActual.id) ||
        item.email === this.perfil.email
      );

      const datosPerfil = {
        nombre,
        apellido,
        materia: this.perfil.materia,
        descripcion: this.perfil.descripcion.trim(),
        foto: this.perfil.foto
      };

      if (usuario) {
        Object.assign(usuario, datosPerfil);
        localStorage.setItem("usuariosPROA", JSON.stringify(usuarios));
        localStorage.setItem(
          "usuarioActual",
          JSON.stringify({ ...usuarioActual, ...usuario })
        );
      } else if (usuarioActual) {
        localStorage.setItem(
          "usuarioActual",
          JSON.stringify({ ...usuarioActual, ...datosPerfil })
        );
      }

      this.perfil = {
        ...this.perfil,
        ...datosPerfil
      };
      this.mostrarEditorPerfil = false;
      alert("Perfil actualizado correctamente.");
    },

    cerrarSesion() {
      localStorage.removeItem("usuarioActual");
      this.$router.push("/login");
    },

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
  padding: 0;
  overflow: hidden;
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  color: white;
  font-weight: 700;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
}

.user img,
.mini-avatar img,
.avatar-grande img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.perfil {
  position: relative;
}

.perfil-menu {
  position: absolute;
  top: 48px;
  right: 0;
  min-width: 150px;
  padding: 8px;
  background: white;
  border: 1px solid #222;
  border-radius: 7px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 10;
}

.cerrar-sesion {
  width: 100%;
  padding: 10px;
  border: none;
  background: white;
  text-align: left;
  cursor: pointer;
}

.cerrar-sesion:hover {
  background: #e9eff8;
}

.perfil-resumen {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 6px 12px;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 6px;
}

.perfil-resumen strong,
.perfil-resumen small {
  display: block;
}

.perfil-resumen strong {
  color: #1f2937;
  max-width: 180px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.perfil-resumen small {
  margin-top: 3px;
  color: #6b7280;
  font-size: 12px;
}

.mini-avatar {
  width: 38px;
  height: 38px;
  flex-shrink: 0;
  border-radius: 50%;
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  overflow: hidden;
}

.perfil-opcion,
.cerrar-sesion {
  border-radius: 6px;
}

.perfil-opcion {
  width: 100%;
  padding: 10px;
  border: none;
  background: white;
  text-align: left;
  cursor: pointer;
  color: #27364b;
}

.perfil-opcion:hover {
  background: #eef2ff;
}

/* PERFIL */
.perfil-fondo {
  z-index: 110;
}

.perfil-modal {
  width: 760px;
  max-width: 94%;
  padding: 30px;
}

.perfil-encabezado {
  padding-right: 25px;
  margin-bottom: 24px;
}

.etiqueta-perfil {
  color: #4f46e5;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.12em;
}

.perfil-encabezado h2 {
  margin: 7px 0 5px;
  color: #172033;
  font-size: 28px;
}

.perfil-encabezado p {
  margin: 0;
  color: #6b7280;
}

.perfil-contenido {
  display: grid;
  grid-template-columns: 180px 1fr;
  gap: 28px;
  align-items: start;
}

.foto-editor {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  text-align: center;
}

.avatar-grande {
  width: 128px;
  height: 128px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 38px;
  font-weight: 800;
  overflow: hidden;
  box-shadow: 0 12px 25px rgba(79, 70, 229, 0.25);
}

.boton-foto {
  padding: 9px 13px;
  border-radius: 8px;
  background: #eef2ff;
  color: #4338ca;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
}

.boton-foto:hover {
  background: #e0e7ff;
}

.input-foto {
  display: none;
}

.foto-editor small {
  color: #9ca3af;
  font-size: 11px;
  line-height: 1.4;
}

.perfil-formulario {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.perfil-fila {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.perfil-campo {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.perfil-campo label {
  color: #374151;
  font-size: 13px;
  font-weight: 700;
}

.perfil-campo input,
.perfil-campo select,
.perfil-campo textarea {
  width: 100%;
  box-sizing: border-box;
  padding: 11px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: white;
  color: #1f2937;
  font: inherit;
  outline: none;
  resize: vertical;
}

.perfil-campo input:focus,
.perfil-campo select:focus,
.perfil-campo textarea:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.12);
}

.perfil-campo input:disabled {
  background: #f3f4f6;
  color: #6b7280;
}

.perfil-acciones {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 26px;
}

.boton-secundario,
.boton-guardar {
  padding: 11px 17px;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
}

.boton-secundario {
  border: 1px solid #d1d5db;
  background: white;
  color: #4b5563;
}

.boton-guardar {
  border: none;
  background: #4f46e5;
  color: white;
}

.boton-guardar:hover {
  background: #4338ca;
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


.sidebar.oculto {
  display: none;
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


@media (max-width: 650px) {
  .perfil-modal {
    padding: 24px 18px;
  }

  .perfil-contenido {
    grid-template-columns: 1fr;
  }

  .perfil-fila {
    grid-template-columns: 1fr;
  }

  .perfil-acciones {
    flex-direction: column-reverse;
  }

  .boton-secundario,
  .boton-guardar {
    width: 100%;
  }
}

</style>